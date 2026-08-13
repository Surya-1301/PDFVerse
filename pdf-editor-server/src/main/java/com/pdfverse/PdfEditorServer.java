package com.pdfverse;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.MultipartConfigElement;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.pdfbox.Loader;
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

    private static final int PORT = 8080;

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

            setCors(response);

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

            setCors(response);

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

            setCors(response);

            response.setStatus(
                HttpServletResponse.SC_NO_CONTENT
            );
        }

        @Override
        protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response
        ) throws IOException, ServletException {

            setCors(response);

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
             * Existing native PDF text that has not changed
             * should remain untouched.
             */
            if (
                !changed &&
                !"new".equalsIgnoreCase(source)
            ) {
                return;
            }

            /*
             * If nothing changed and this is not a new object,
             * there is nothing to export.
             */
            if (
                !changed &&
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
        HttpServletResponse response
    ) {

        response.setHeader(
            "Access-Control-Allow-Origin",
            "http://localhost:3000"
        );

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
}
