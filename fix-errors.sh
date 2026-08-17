#!/usr/bin/env bash
# ────────────────────────────────────────────────────────────
# PDFVerse — Fix all TypeScript / build errors in one script
# Run from the ROOT of your Next.js project (the folder with package.json)
# Usage:  bash fix-errors.sh
# ────────────────────────────────────────────────────────────
set -e

echo "╔══════════════════════════════════════════════════════╗"
echo "║  PDFVerse Error Fix Script                          ║"
echo "╚══════════════════════════════════════════════════════╝"

# ── 1. Install missing npm packages ──────────────────────────
# tools.ts imports these but they are not in your package.json
echo ""
echo "▸ Step 1: Installing missing packages (docx, jszip, mammoth, pptxgenjs, xlsx)…"
npm install docx jszip mammoth pptxgenjs xlsx --save
echo "  ✓ Done."

# ── 2. Fix "canvas does not exist in RenderParameters" ────────
# pdfjs-dist v6 requires `canvas` at runtime but the TS type
# doesn't include it. Add `as never` cast to both render calls.
echo ""
echo "▸ Step 2: Fixing LivePdfEditor.tsx canvas type error…"
if [ -f "components/LivePdfEditor.tsx" ]; then
  cp components/LivePdfEditor.tsx components/LivePdfEditor.tsx.bak
  perl -i -0pe 's/(pdfPage\.render\(\{.*?\})\)\.promise/$1 as never).promise/gs' \
    components/LivePdfEditor.tsx
  FIXED=$(grep -c "as never" components/LivePdfEditor.tsx)
  echo "  ✓ Fixed $FIXED render call(s). Backup saved as LivePdfEditor.tsx.bak"
else
  echo "  ⚠ components/LivePdfEditor.tsx not found — skipping."
fi

# Also fix the same error in components/editor/PdfEditor.tsx if present
if [ -f "components/editor/PdfEditor.tsx" ]; then
  if grep -q "pdfPage.render\|page.render" components/editor/PdfEditor.tsx 2>/dev/null; then
    if ! grep -q "as never" components/editor/PdfEditor.tsx 2>/dev/null; then
      cp components/editor/PdfEditor.tsx components/editor/PdfEditor.tsx.bak
      perl -i -0pe 's/(\.render\(\{.*?canvas.*?\})\)\.promise/$1 as never).promise/gs' \
        components/editor/PdfEditor.tsx
      echo "  ✓ Also patched components/editor/PdfEditor.tsx"
    else
      echo "  ✓ components/editor/PdfEditor.tsx already has the fix"
    fi
  fi
fi

# ── 3. Verify node_modules is complete ─────────────────────────
echo ""
echo "▸ Step 3: Verifying node_modules…"
npm install  # ensures everything is properly installed & linked
echo "  ✓ node_modules verified."

# ── 4. Regenerate next-env.d.ts ────────────────────────────────
echo ""
echo "▸ Step 4: Regenerating Next.js type declarations…"
# Running next build once regenerates next-env.d.ts and .next/types
# but a faster way is to just touch the file:
if [ ! -f "next-env.d.ts" ]; then
  cat > next-env.d.ts << 'EOF'
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
EOF
  echo "  ✓ Created next-env.d.ts"
else
  echo "  ✓ next-env.d.ts already exists"
fi

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║  All automated fixes applied!                        ║"
echo "╠══════════════════════════════════════════════════════╣"
echo "║  FINAL STEP — restart VS Code's TypeScript server:  ║"
echo "║  1. Press Cmd+Shift+P (Mac) / Ctrl+Shift+P (Win)    ║"
echo "║  2. Type: 'TypeScript: Restart TS Server'           ║"
echo "║  3. Hit Enter                                       ║"
echo "║                                                     ║"
echo "║  This clears the 'Cannot find module next/*' errors ║"
echo "║  that are caused by a stale TS server cache.        ║"
echo "╚══════════════════════════════════════════════════════╝"
