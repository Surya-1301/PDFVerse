# PDFVerse

PDFVerse is a free online PDF editor toolkit built with Next.js. It provides browser-friendly PDF tools for organizing, editing, converting, compressing, protecting, and repairing PDF files.

Live site:

```txt
https://pdfverse.pages.dev
```

PDF backend:

```txt
https://pdf-verse-api.onrender.com
```

---

## Features

PDFVerse includes tools such as:

### Organize PDF

- Merge PDF
- Split PDF
- Remove pages
- Extract pages
- Organize/Reorder PDF
- Add Pages to PDF
- Compare PDF
- Rotate PDF
- Add page numbers

### Edit PDF

- Compress PDF
- Add watermark
- Image watermark
- Crop PDF
- PDF Forms
- Flatten PDF
- Header & Footer
- Sign PDF
- Repair PDF
- Metadata Editor
- Batch Compress
- Batch Watermark
- Batch Header & Footer
- Batch Repair

### Convert to PDF

- JPG to PDF
- Scan to PDF
- Word to PDF
- PowerPoint to PDF
- Excel to PDF
- HTML to PDF

### Convert from PDF

- PDF to JPG
- PDF to Word
- PDF to Text
- Extract Images
- PDF to PowerPoint
- PDF to Excel
- PDF to PDF/A

### PDF Security

- Protect PDF
- Unlock PDF
- Redact PDF
- Batch Protect
- Batch Unlock

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React icons
- pdf-lib
- pdfjs-dist
- dnd-kit

### Backend

The PDF backend is deployed separately on Render.

- Node.js
- Express
- Multer
- Python PDF tooling
- Ghostscript
- PDF conversion utilities
- ZIP processing

---

## Project Structure

```txt
PDF-Verse/
├─ app/
│  ├─ page.tsx
│  ├─ layout.tsx
│  ├─ globals.css
│  ├─ favicon.ico
│  ├─ pdf-editor/
│  │  └─ page.tsx
│  ├─ privacy/
│  │  └─ page.tsx
│  ├─ terms/
│  │  └─ page.tsx
│  ├─ contact/
│  │  └─ page.tsx
│  └─ report-abuse/
│     └─ page.tsx
├─ components/
│  ├─ Container.tsx
│  ├─ Footer.tsx
│  ├─ Header.tsx
│  └─ HowToUse.tsx
├─ lib/
│  ├─ apiBase.ts
│  ├─ apiError.ts
│  └─ formatFileSize.ts
├─ pdf-backend/
│  ├─ server.js
│  ├─ Dockerfile
│  ├─ package.json
│  └─ package-lock.json
├─ public/
│  ├─ sitemap.xml
│  ├─ robots.txt
│  ├─ manifest.webmanifest
│  └─ logo.png
├─ package.json
├─ package-lock.json
├─ next.config.ts
├─ postcss.config.mjs
├─ tsconfig.json
└─ wrangler.json
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Surya-1301/PDF-Verse.git
cd PDF-Verse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create:

```txt
.env.local
```

Add:

```env
NEXT_PUBLIC_PDF_API_BASE_URL=https://pdf-verse-api.onrender.com
```

### 4. Run development server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## Environment Variables

### Frontend

```env
NEXT_PUBLIC_PDF_API_BASE_URL=https://pdf-verse-api.onrender.com
```

This tells the frontend where to send server-side PDF processing requests.

---

## Frontend Deployment

The frontend is deployed on Cloudflare Pages.

### Cloudflare Pages settings

```txt
Framework preset: Next.js
Build command: npm run build
Build output directory: out
Root directory: /
```

### Required environment variable

```txt
NEXT_PUBLIC_PDF_API_BASE_URL=https://pdf-verse-api.onrender.com
```

---

## Static Export Configuration

For Cloudflare Pages static deployment, `next.config.ts` should use:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

---

## Backend Deployment

The PDF backend is deployed on Render.

Backend URL:

```txt
https://pdf-verse-api.onrender.com
```

### Render settings

```txt
Service type: Web Service
Environment: Docker
Root directory: pdf-backend
Dockerfile path: ./Dockerfile
```

If not using Docker:

```txt
Build command: npm install
Start command: npm start
Root directory: pdf-backend
```

Docker is recommended because the PDF backend may need PDF processing system packages.

---

## Backend API

The frontend calls backend routes through:

```ts
fetchPdfApi()
```

Defined in:

```txt
lib/apiBase.ts
```

Common backend routes include:

```txt
GET  /health
POST /api/pdf/compress
POST /api/pdf/protect
POST /api/pdf/unlock
POST /api/pdf/repair
POST /api/pdf/to-jpg
POST /api/pdf/to-word
POST /api/pdf/to-excel
POST /api/pdf/to-powerpoint
POST /api/pdf/to-pdfa
POST /api/pdf/extract-images
POST /api/pdf/batch/compress
POST /api/pdf/batch/protect
POST /api/pdf/batch/unlock
POST /api/pdf/batch/watermark
POST /api/pdf/batch/header-footer
POST /api/pdf/batch/repair
```

---

## File Handling and Privacy

PDFVerse uses two types of PDF processing:

### Browser-side processing

Many tools run directly in the browser using `pdf-lib` and `pdfjs-dist`. These files do not need to be uploaded to the backend.

Examples:

- Merge PDF
- Split PDF
- Remove pages
- Reorder PDF
- Add Pages to PDF
- Add page numbers
- Text watermark
- Image watermark
- PDF Forms
- Flatten PDF
- Metadata Editor
- PDF to Text

### Backend-side processing

Some advanced tools require server-side processing and upload files temporarily to the Render backend.

Examples:

- Compress PDF
- PDF to Word
- PDF to Excel
- PDF to PowerPoint
- PDF to PDF/A
- Protect PDF
- Unlock PDF
- Repair PDF
- Redact PDF
- Extract Images
- Batch tools

Uploaded files are intended to be processed temporarily and deleted after processing.

---

## Sitemap

Sitemap location:

```txt
public/sitemap.xml
```

Live sitemap URL:

```txt
https://pdfverse.pages.dev/sitemap.xml
```

Google Search Console should use:

```txt
https://pdfverse.pages.dev/sitemap.xml
```

---

## Robots

Robots file:

```txt
public/robots.txt
```

Recommended content:

```txt
User-agent: *
Allow: /

Sitemap: https://pdfverse.pages.dev/sitemap.xml
```

---

## Useful Commands

### Run locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Commit changes

```bash
git add .
git commit -m "Update PDFVerse"
git push origin main
```

---

## GitHub Large File Notes

Do not commit generated folders or large files.

Recommended `.gitignore`:

```txt
node_modules
.next
out
.vercel
.open-next
.wrangler
dist
build

.env
.env.local
.env.*.local

.DS_Store

uploads
data/*.json

*.zip
*.pdf
*.jpg
*.jpeg
*.webp
*.gif

!app/favicon.ico
!public/logo.png
```

If GitHub rejects a push because of large files, remove build output from history before pushing.

---

## Support Pages

PDFVerse includes basic legal/support routes:

```txt
/privacy
/terms
/contact
/report-abuse
```

---

## License

This project is private unless you choose to publish it with an open-source license.

---

## Author

Built by PDFVerse.
