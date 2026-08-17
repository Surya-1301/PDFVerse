package com.pdfverse;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.MultipartConfigElement;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.cos.COSArray;
import org.apache.pdfbox.cos.COSBase;
import org.apache.pdfbox.cos.COSName;
import org.apache.pdfbox.cos.COSString;
import org.apache.pdfbox.contentstream.operator.Operator;
import org.apache.pdfbox.pdfparser.PDFStreamParser;
import org.apache.pdfbox.pdfwriter.ContentStreamWriter;
import org.apache.pdfbox.pdmodel.common.PDStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;

import org.eclipse.jetty.ee10.servlet.ServletContextHandler;
import org.eclipse.jetty.ee10.servlet.ServletHolder;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;

/**
 * PDFVerse PDF editing backend.
 *
 * Endpoint:
 *   POST http://localhost:8080/api/pdf/edit
 *
 * Multipart fields:
 *   file    -> source PDF
 *   objects -> JSON array produced by LivePdfEditor.tsx
 *
 * The service keeps unchanged PDF content untouched.
 * Changed/new text is written into the PDF after covering
 * the original text region. Deleted text is covered only.
 */
public final class PdfEditorServer {

    private static final int PORT = Integer.getInteger("pdfverse.port", 8080);

    private static final String ALLOWED_ORIGINS =
        firstNonBlank(
            System.getenv("PDFVERSE_ALLOWED_ORIGINS"),
            System.getProperty(
                "pdfverse.allowedOrigins",
                System.getProperty(
                    "pdfverse.allowedOrigin",
                    "http://localhost:3000"
                )
            )
        );

    private static final long MAX_FILE_SIZE =
        100L * 1024L * 1024L;

    private static final long MAX_REQUEST_SIZE =
        110L * 1024L * 1024L;

    private static final int FILE_SIZE_THRESHOLD =
        1024 * 1024;

    private static final ObjectMapper OBJECT_MAPPER =
        new ObjectMapper();

    private PdfEditorServer() {
    }

    public static void main(String[] args) throws Exception {
        Server server = new Server();

        ServerConnector connector =
            new ServerConnector(server);

        connector.setPort(PORT);

        server.addConnector(connector);

        ServletContextHandler context =
            new ServletContextHandler(
                ServletContextHandler.SESSIONS
            );

        context.setContextPath("/");

        ServletHolder editorServlet =
            new ServletHolder(
                "pdfEditor",
                new EditPdfServlet()
            );

        /*
         * Jetty 12 / EE10:
         * multipart configuration belongs to the servlet
         * registration, not ServletContextHandler.
         */
        MultipartConfigElement multipartConfig =
            new MultipartConfigElement(
                System.getProperty(
                    "java.io.tmpdir"
                ),
                MAX_FILE_SIZE,
                MAX_REQUEST_SIZE,
                FILE_SIZE_THRESHOLD
            );

        editorServlet
            .getRegistration()
            .setMultipartConfig(
                multipartConfig
            );

        context.addServlet(
            editorServlet,
            "/api/pdf/edit"
        );

        /*
         * Small health endpoint so you can verify the backend
         * from a browser:
         *
         * http://localhost:8080/health
         */
        ServletHolder healthServlet =
            new ServletHolder(
                "health",
                new HealthServlet()
            );

        context.addServlet(
            healthServlet,
            "/health"
        );

        server.setHandler(context);

        server.start();

        System.out.println();
        System.out.println(
            "========================================"
        );
        System.out.println(
            " PDFVerse PDF Editor Server"
        );
        System.out.println(
            "========================================"
        );
        System.out.println(
            "API:    http://localhost:" +
            PORT +
            "/api/pdf/edit"
        );
        System.out.println(
            "Health: http://localhost:" +
            PORT +
            "/health"
        );
        System.out.println(
            "========================================"
        );
        System.out.println();

        server.join();
    }

    /**
     * Simple health check.
     */
    public static final class HealthServlet
        extends jakarta.servlet.http.HttpServlet {

        @Override
        protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response
        ) throws IOException {

            setCors(request, response);

            response.setStatus(
                HttpServletResponse.SC_OK
            );

            response.setContentType(
                "application/json"
            );

            response
                .getWriter()
                .write(
                    "{\"ok\":true,\"service\":\"pdfverse-pdf-editor\"}"
                );
        }

        @Override
        protected void doOptions(
            HttpServletRequest request,
            HttpServletResponse response
        ) {

            setCors(request, response);

            response.setStatus(
                HttpServletResponse.SC_NO_CONTENT
            );
        }
    }

    /**
     * PDF editing endpoint.
     */
    public static final class EditPdfServlet
        extends jakarta.servlet.http.HttpServlet {

        @Override
        protected void doOptions(
            HttpServletRequest request,
            HttpServletResponse response
        ) {

            setCors(request, response);

            response.setStatus(
                HttpServletResponse.SC_NO_CONTENT
            );
        }

        @Override
        protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response
        ) throws IOException, ServletException {

            setCors(request, response);

            response.setCharacterEncoding(
                StandardCharsets.UTF_8.name()
            );

            jakarta.servlet.http.Part filePart =
                request.getPart("file");

            jakarta.servlet.http.Part objectsPart =
                request.getPart("objects");

            if (filePart == null) {
                sendError(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Missing multipart field: file"
                );
                return;
            }

            if (objectsPart == null) {
                sendError(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Missing multipart field: objects"
                );
                return;
            }

            if (
                filePart.getSize() <= 0
            ) {
                sendError(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "The uploaded PDF is empty."
                );
                return;
            }

            if (
                filePart.getSize() >
                MAX_FILE_SIZE
            ) {
                sendError(
                    response,
                    HttpServletResponse.SC_REQUEST_ENTITY_TOO_LARGE,
                    "PDF exceeds the 100 MB upload limit."
                );
                return;
            }

            byte[] inputPdf;

            try (
                InputStream input =
                    filePart.getInputStream()
            ) {
                inputPdf =
                    input.readAllBytes();
            }

            String objectsJson;

            try (
                InputStream input =
                    objectsPart.getInputStream()
            ) {
                objectsJson =
                    new String(
                        input.readAllBytes(),
                        StandardCharsets.UTF_8
                    );
            }

            try {
                byte[] output =
                    editPdf(
                        inputPdf,
                        objectsJson
                    );

                response.setStatus(
                    HttpServletResponse.SC_OK
                );

                response.setContentType(
                    "application/pdf"
                );

                response.setHeader(
                    "Content-Disposition",
                    "attachment; filename=\"edited.pdf\""
                );

                response.setContentLengthLong(
                    output.length
                );

                response
                    .getOutputStream()
                    .write(output);

                response
                    .getOutputStream()
                    .flush();

            } catch (Exception error) {

                error.printStackTrace();

                sendError(
                    response,
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "PDF editing failed: " +
                    safeMessage(error)
                );
            }
        }

        private byte[] editPdf(
            byte[] pdfBytes,
            String objectsJson
        ) throws IOException {

            JsonNode root =
                OBJECT_MAPPER.readTree(
                    objectsJson
                );

            if (
                root == null ||
                !root.isArray()
            ) {
                throw new IOException(
                    "Editor objects must be a JSON array."
                );
            }

            try (
                PDDocument document =
                    Loader.loadPDF(pdfBytes)
            ) {

                Iterator<JsonNode> iterator =
                    root.elements();

                while (
                    iterator.hasNext()
                ) {

                    JsonNode object =
                        iterator.next();

                    processObject(
                        document,
                        object
                    );
                }

                ByteArrayOutputStream output =
                    new ByteArrayOutputStream();

                document.save(output);

                return output.toByteArray();
            }
        }

        private void processObject(
            PDDocument document,
            JsonNode object
        ) throws IOException {

            if (
                object == null ||
                !object.isObject()
            ) {
                return;
            }

            int pageNumber =
                object
                    .path("page")
                    .asInt(1);

            if (
                pageNumber < 1 ||
                pageNumber >
                    document.getNumberOfPages()
            ) {
                return;
            }

            PDPage page =
                document.getPage(
                    pageNumber - 1
                );

            boolean deleted =
                object
                    .path("deleted")
                    .asBoolean(false);

            boolean changed =
                object
                    .path("changed")
                    .asBoolean(false);

            String source =
                object
                    .path("source")
                    .asText("");

            String text =
                object
                    .path("text")
                    .asText("");

            String originalText =
                object
                    .path("originalText")
                    .asText("");

            /*
             * The browser editor sends the complete object state. For
             * native PDF text, infer a content change directly from the
             * original/current text values so the server does not depend
             * on a separate "changed" flag.
             */
            boolean nativeTextChanged =
                "existing".equalsIgnoreCase(source) &&
                (
                    deleted ||
                    !text.equals(originalText)
                );

            /*
             * Native PDF text is edited at the content-stream level first.
             * This keeps the original PDF font resource instead of drawing
             * a new font over a white rectangle.
             */
            if (
                ("existing".equalsIgnoreCase(source) ||
                 "ocr".equalsIgnoreCase(source)) &&
                (
                    changed ||
                    nativeTextChanged
                )
            ) {
                if (
                    "existing".equalsIgnoreCase(source) &&
                    replaceNativeText(
                        document,
                        page,
                        originalText,
                        deleted ? "" : text
                    )
                ) {
                    return;
                }
                // OCR text is not part of the original content stream and
                // therefore continues through the fallback overlay path.
            }

            /*
             * Existing text that was not changed stays untouched.
             */
            if (
                !changed &&
                !nativeTextChanged &&
                !"new".equalsIgnoreCase(source)
            ) {
                return;
            }

            if (
                !changed &&
                !nativeTextChanged &&
                text.equals(originalText)
            ) {
                return;
            }

            float x =
                finiteFloat(
                    object.path("x").asDouble(0),
                    0
                );

            float yTop =
                finiteFloat(
                    object.path("y").asDouble(0),
                    0
                );

            float width =
                finiteFloat(
                    object.path("width").asDouble(100),
                    100
                );

            float height =
                finiteFloat(
                    object.path("height").asDouble(20),
                    20
                );

            float fontSize =
                finiteFloat(
                    object
                        .path("fontSize")
                        .asDouble(
                            Math.max(
                                height,
                                12
                            )
                        ),
                    Math.max(
                        height,
                        12
                    )
                );

            width =
                Math.max(
                    width,
                    8
                );

            height =
                Math.max(
                    height,
                    8
                );

            fontSize =
                Math.max(
                    fontSize,
                    6
                );

            PDRectangle mediaBox =
                page.getMediaBox();

            float pageHeight =
                mediaBox.getHeight();

            /*
             * PDF coordinates start at the bottom-left.
             * PDFVerse editor coordinates start at the top-left.
             */
            float y =
                pageHeight -
                yTop -
                height;

            /*
             * Cover the original text region.
             *
             * For a first free implementation this is the safest
             * generic way to replace arbitrary PDF text operators.
             */
            coverOriginalArea(
                document,
                page,
                x,
                y,
                width,
                height
            );

            if (
                deleted ||
                text.trim().isEmpty()
            ) {
                return;
            }

            drawReplacementText(
                document,
                page,
                text,
                x,
                y,
                fontSize,
                object
                    .path("color")
                    .asText("#111111")
            );
        }

        /**
         * Replace an existing native PDF text operator instead of painting
         * a replacement on top of the page.
         *
         * Supports Tj, TJ, apostrophe (') and quote (") text-showing
         * operators. The active PDF font is tracked from the Tf operator
         * and used to encode the replacement, preserving embedded fonts
         * and CID fonts whenever the original font can encode the new text.
         */
        /**
         * Replace existing native PDF text in the page content stream.
         *
         * The browser sends the text as it appears to the user. PDF content
         * streams can store that same text in many different ways:
         *
         *   (Surya) Tj
         *   [ (Sur) 20 (ya) ] TJ
         *   (Surya) '
         *   (Surya) "
         *
         * We therefore decode every text-showing operand with the currently
         * active PDF font and match against the complete original text.
         *
         * When a match is found, only the text operand is replaced. We do not
         * paint a white rectangle over native text, so the original page
         * graphics remain untouched.
         */
        private boolean replaceNativeText(
            PDDocument document,
            PDPage page,
            String originalText,
            String replacementText
        ) throws IOException {

            if (
                originalText == null ||
                originalText.isEmpty()
            ) {
                return false;
            }

            PDFStreamParser parser =
                new PDFStreamParser(page);

            java.util.List<Object> tokens =
                parser.parse();

            PDFont currentFont = null;

            for (
                int index = 0;
                index < tokens.size();
                index += 1
            ) {
                Object token =
                    tokens.get(index);

                if (!(token instanceof Operator)) {
                    continue;
                }

                Operator operator =
                    (Operator) token;

                String operation =
                    operator.getName();

                /*
                 * Track:
                 *
                 *   /FontName fontSize Tf
                 *
                 * The resource is read from the page's current resource
                 * dictionary, so embedded/CID fonts can be used to encode
                 * the replacement text.
                 */
                if (
                    "Tf".equals(operation) &&
                    index >= 2
                ) {
                    Object fontToken =
                        tokens.get(index - 2);

                    if (fontToken instanceof COSName) {
                        COSName fontName =
                            (COSName) fontToken;

                        if (page.getResources() != null) {
                            currentFont =
                                page.getResources()
                                    .getFont(fontName);
                        }
                    }

                    continue;
                }

                if (
                    !(
                        "Tj".equals(operation) ||
                        "TJ".equals(operation) ||
                        "'".equals(operation) ||
                        "\"".equals(operation)
                    )
                ) {
                    continue;
                }

                if (index == 0) {
                    continue;
                }

                Object operand =
                    tokens.get(index - 1);

                /*
                 * Simple text-showing operator:
                 *
                 *   (text) Tj
                 *   (text) '
                 *   (text) "
                 *
                 * Replace the operand itself instead of mutating COSString
                 * with the deprecated setValue(byte[]) API.
                 */
                if (operand instanceof COSString) {
                    COSString string =
                        (COSString) operand;

                    String decoded =
                        decodeText(
                            string,
                            currentFont
                        );

                    if (
                        textMatches(
                            decoded,
                            originalText
                        )
                    ) {
                        byte[] encoded =
                            encodeReplacement(
                                currentFont,
                                replacementText
                            );

                        tokens.set(
                            index - 1,
                            new COSString(encoded)
                        );

                        writeTokensToPage(
                            document,
                            page,
                            tokens
                        );

                        return true;
                    }

                    /*
                     * Some producers put several logical pieces into one
                     * COSString. If the browser's text is contained inside
                     * that decoded string, replacing the whole text-showing
                     * operand is safer than painting over the page.
                     *
                     * This is intentionally restricted to an exact decoded
                     * text object or a unique substring.
                     */
                    int position =
                        decoded.indexOf(originalText);

                    if (
                        position >= 0 &&
                        currentFont != null
                    ) {
                        String updated =
                            decoded.substring(
                                0,
                                position
                            ) +
                            (
                                replacementText == null
                                    ? ""
                                    : replacementText
                            ) +
                            decoded.substring(
                                position +
                                originalText.length()
                            );

                        /*
                         * PDF font encodings are not guaranteed to have a
                         * reversible Unicode -> byte mapping for arbitrary
                         * substrings. Only perform this path when the entire
                         * updated string can be encoded successfully.
                         */
                        try {
                            byte[] encoded =
                                currentFont.encode(updated);

                            tokens.set(
                                index - 1,
                                new COSString(encoded)
                            );

                            writeTokensToPage(
                                document,
                                page,
                                tokens
                            );

                            return true;
                        } catch (IOException ignored) {
                            // Continue searching/fallback rendering.
                        }
                    }
                }

                /*
                 * TJ arrays are commonly used by PDF generators:
                 *
                 *   [ (Sur) 20 (ya Pratap) 10 (Singh) ] TJ
                 *
                 * Decode the complete textual portion of the array. If it
                 * matches the browser's original text, replace the complete
                 * text portion with one encoded COSString while preserving
                 * the TJ operator itself.
                 */
                if (operand instanceof COSArray) {
                    COSArray array =
                        (COSArray) operand;

                    StringBuilder decoded =
                        new StringBuilder();

                    for (
                        COSBase item :
                        array
                    ) {
                        if (item instanceof COSString) {
                            decoded.append(
                                decodeText(
                                    (COSString) item,
                                    currentFont
                                )
                            );
                        }
                    }

                    String decodedText =
                        decoded.toString();

                    if (
                        textMatches(
                            decodedText,
                            originalText
                        )
                    ) {
                        COSArray replacementArray =
                            new COSArray();

                        byte[] encoded =
                            encodeReplacement(
                                currentFont,
                                replacementText
                            );

                        replacementArray.add(
                            new COSString(encoded)
                        );

                        tokens.set(
                            index - 1,
                            replacementArray
                        );

                        writeTokensToPage(
                            document,
                            page,
                            tokens
                        );

                        return true;
                    }

                    /*
                     * Handle the common case where the requested text is a
                     * substring of a TJ sequence. Reconstruct the text in a
                     * single COSString. This deliberately drops the original
                     * kerning numbers for the matched text, which is preferable
                     * to leaving the old glyphs visible.
                     */
                    int position =
                        decodedText.indexOf(originalText);

                    if (
                        position >= 0 &&
                        currentFont != null
                    ) {
                        String updated =
                            decodedText.substring(
                                0,
                                position
                            ) +
                            (
                                replacementText == null
                                    ? ""
                                    : replacementText
                            ) +
                            decodedText.substring(
                                position +
                                originalText.length()
                            );

                        try {
                            byte[] encoded =
                                currentFont.encode(updated);

                            COSArray replacementArray =
                                new COSArray();

                            replacementArray.add(
                                new COSString(encoded)
                            );

                            tokens.set(
                                index - 1,
                                replacementArray
                            );

                            writeTokensToPage(
                                document,
                                page,
                                tokens
                            );

                            return true;
                        } catch (IOException ignored) {
                            // Continue searching/fallback rendering.
                        }
                    }
                }
            }

            return false;
        }

        private static boolean textMatches(
            String actual,
            String expected
        ) {
            if (
                actual == null ||
                expected == null
            ) {
                return false;
            }

            if (actual.equals(expected)) {
                return true;
            }

            /*
             * PDF text extraction can contain different whitespace around
             * line boundaries. Normalize only whitespace for comparison;
             * never alter the actual replacement text.
             */
            return normalizePdfText(actual)
                .equals(
                    normalizePdfText(expected)
                );
        }

        private static String normalizePdfText(
            String value
        ) {
            return value
                .replace('\u00a0', ' ')
                .replaceAll("\\s+", " ")
                .trim();
        }

        private byte[] encodeReplacement(
            PDFont font,
            String replacementText
        ) throws IOException {

            String safe =
                replacementText == null
                    ? ""
                    : replacementText;

            if (safe.isEmpty()) {
                return new byte[0];
            }

            if (font != null) {
                return font.encode(safe);
            }

            /*
             * If the PDF does not expose a font before the text operator,
             * native replacement is unsafe. Returning an empty byte array
             * would silently delete the text, so fail and let the caller use
             * its fallback path instead.
             */
            throw new IOException(
                "Unable to encode replacement text: no active PDF font."
            );
        }

        private void writeTokensToPage(
            PDDocument document,
            PDPage page,
            java.util.List<Object> tokens
        ) throws IOException {

            PDStream updatedStream =
                new PDStream(document);

            try (
                OutputStream output =
                    updatedStream.createOutputStream()
            ) {
                ContentStreamWriter writer =
                    new ContentStreamWriter(
                        output
                    );

                writer.writeTokens(tokens);
            }

            page.setContents(updatedStream);
        }

        private String decodeText(
            COSString string,
            PDFont font
        ) throws IOException {

            if (font == null) {
                return string.getString();
            }

            byte[] bytes =
                string.getBytes();

            StringBuilder decoded =
                new StringBuilder();

            try (
                java.io.ByteArrayInputStream input =
                    new java.io.ByteArrayInputStream(
                        bytes
                    )
            ) {
                while (
                    input.available() > 0
                ) {
                    int code =
                        font.readCode(input);

                    String unicode =
                        font.toUnicode(code);

                    if (unicode != null) {
                        decoded.append(
                            unicode
                        );
                    }
                }
            }

            return decoded.toString();
        }

        private void coverOriginalArea(
            PDDocument document,
            PDPage page,
            float x,
            float y,
            float width,
            float height
        ) throws IOException {

            /*
             * A small padding prevents remnants of the original
             * glyphs from showing around the replacement.
             */
            float paddingX = 2.5f;
            float paddingY = 2.5f;

            try (
                PDPageContentStream content =
                    new PDPageContentStream(
                        document,
                        page,
                        PDPageContentStream.AppendMode.APPEND,
                        true,
                        true
                    )
            ) {

                content.setNonStrokingColor(
                    255,
                    255,
                    255
                );

                content.addRect(
                    x - paddingX,
                    y - paddingY,
                    width +
                        paddingX * 2,
                    height +
                        paddingY * 2
                );

                content.fill();
            }
        }

        private void drawReplacementText(
            PDDocument document,
            PDPage page,
            String text,
            float x,
            float y,
            float fontSize,
            String color
        ) throws IOException {

            int[] rgb =
                parseColor(color);

            String safeText =
                sanitizeText(text);

            if (
                safeText.isEmpty()
            ) {
                return;
            }

            /*
             * Standard Helvetica is used as a safe fallback.
             *
             * A later font-preservation layer can map the original
             * PDF font resource and use it here.
             */
            PDType1Font font =
                new PDType1Font(
                    Standard14Fonts.FontName.HELVETICA
                );

            try (
                PDPageContentStream content =
                    new PDPageContentStream(
                        document,
                        page,
                        PDPageContentStream.AppendMode.APPEND,
                        true,
                        true
                    )
            ) {

                content.setNonStrokingColor(
                    rgb[0],
                    rgb[1],
                    rgb[2]
                );

                content.beginText();

                content.setFont(
                    font,
                    fontSize
                );

                content.newLineAtOffset(
                    x,
                    y
                );

                /*
                 * PDFBox's simple showText does not support
                 * arbitrary line breaks in one call.
                 */
                String[] lines =
                    safeText.split(
                        "\\n",
                        -1
                    );

                float leading =
                    fontSize * 1.15f;

                for (
                    int i = 0;
                    i < lines.length;
                    i++
                ) {

                    if (
                        i > 0
                    ) {
                        content.newLineAtOffset(
                            0,
                            -leading
                        );
                    }

                    String line =
                        lines[i];

                    if (
                        !line.isEmpty()
                    ) {
                        content.showText(
                            line
                        );
                    }
                }

                content.endText();
            }
        }

        private static String sanitizeText(
            String value
        ) {

            if (
                value == null
            ) {
                return "";
            }

            /*
             * Standard Helvetica is WinAnsi encoded.
             * Characters that cannot be represented are replaced
             * rather than causing PDF export to fail.
             */
            return value
                .replace(
                    "\r\n",
                    "\n"
                )
                .replace(
                    "\r",
                    "\n"
                )
                .replace(
                    "\t",
                    " "
                )
                .replace(
                    "\u0000",
                    ""
                )
                .chars()
                .mapToObj(
                    codePoint ->
                        isWinAnsiCompatible(
                            codePoint
                        )
                            ? new String(
                                Character.toChars(
                                    codePoint
                                )
                            )
                            : "?"
                )
                .collect(
                    java.util.stream.Collectors.joining()
                );
        }

        private static boolean isWinAnsiCompatible(
            int codePoint
        ) {

            /*
             * Basic ASCII.
             */
            if (
                codePoint >= 32 &&
                codePoint <= 126
            ) {
                return true;
            }

            /*
             * Common Latin-1 / WinAnsi characters.
             */
            return
                codePoint >= 160 &&
                codePoint <= 255;
        }

        private static int[] parseColor(
            String value
        ) {

            if (
                value == null
            ) {
                return new int[]{
                    17,
                    17,
                    17
                };
            }

            String hex =
                value.trim();

            if (
                hex.startsWith("#")
            ) {
                hex =
                    hex.substring(1);
            }

            /*
             * Support short RGB notation.
             */
            if (
                hex.length() == 3
            ) {
                hex =
                    ""
                    + hex.charAt(0)
                    + hex.charAt(0)
                    + hex.charAt(1)
                    + hex.charAt(1)
                    + hex.charAt(2)
                    + hex.charAt(2);
            }

            if (
                hex.length() != 6
            ) {
                return new int[]{
                    17,
                    17,
                    17
                };
            }

            try {

                return new int[]{
                    Integer.parseInt(
                        hex.substring(0, 2),
                        16
                    ),
                    Integer.parseInt(
                        hex.substring(2, 4),
                        16
                    ),
                    Integer.parseInt(
                        hex.substring(4, 6),
                        16
                    )
                };

            } catch (
                NumberFormatException ignored
            ) {

                return new int[]{
                    17,
                    17,
                    17
                };
            }
        }

        private static float finiteFloat(
            double value,
            float fallback
        ) {

            if (
                Double.isNaN(value) ||
                Double.isInfinite(value)
            ) {
                return fallback;
            }

            return (float) value;
        }
    }

    private static void sendError(
        HttpServletResponse response,
        int status,
        String message
    ) throws IOException {

        if (
            response.isCommitted()
        ) {
            return;
        }

        response.resetBuffer();

        response.setStatus(status);

        response.setContentType(
            "application/json"
        );

        response.setCharacterEncoding(
            StandardCharsets.UTF_8.name()
        );

        String safeMessage =
            message == null
                ? "Unknown error"
                : message
                    .replace(
                        "\\",
                        "\\\\"
                    )
                    .replace(
                        "\"",
                        "\\\""
                    )
                    .replace(
                        "\r",
                        ""
                    )
                    .replace(
                        "\n",
                        "\\n"
                    );

        response
            .getWriter()
            .write(
                "{\"ok\":false,\"error\":\"" +
                safeMessage +
                "\"}"
            );
    }

    private static String safeMessage(
        Throwable error
    ) {

        if (
            error == null
        ) {
            return "Unknown error";
        }

        String message =
            error.getMessage();

        if (
            message == null ||
            message.isBlank()
        ) {
            return error
                .getClass()
                .getSimpleName();
        }

        return message;
    }

    private static void setCors(
        HttpServletRequest request,
        HttpServletResponse response
    ) {
        String origin =
            request.getHeader("Origin");

        if (isAllowedOrigin(origin)) {
            response.setHeader(
                "Access-Control-Allow-Origin",
                origin
            );
            response.setHeader(
                "Vary",
                "Origin"
            );
        } else {
            response.setHeader(
                "Access-Control-Allow-Origin",
                firstAllowedOrigin()
            );
        }

        response.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS"
        );

        response.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type"
        );

        response.setHeader(
            "Access-Control-Expose-Headers",
            "Content-Disposition"
        );
    }

    private static boolean isAllowedOrigin(
        String origin
    ) {
        if (
            origin == null ||
            origin.isBlank()
        ) {
            return false;
        }

        for (
            String allowed :
            ALLOWED_ORIGINS.split(",")
        ) {
            if (
                origin.trim().equals(
                    allowed.trim()
                )
            ) {
                return true;
            }
        }

        return false;
    }

    private static String firstAllowedOrigin() {
        String[] origins =
            ALLOWED_ORIGINS.split(",");

        return origins.length > 0
            ? origins[0].trim()
            : "http://localhost:3000";
    }

    private static String firstNonBlank(
        String... values
    ) {
        for (String value : values) {
            if (
                value != null &&
                !value.isBlank()
            ) {
                return value;
            }
        }

        return "http://localhost:3000";
    }
}
