const DB_NAME = "pdfverse-editor";
const STORE_NAME = "files";
const FILE_KEY = "pending-pdf";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(
        request.error ||
          new Error("Could not open PDF editor storage."),
      );
    };
  });
}

export async function storePdfForEditor(
  file: File,
): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  const db = await openDatabase();

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(
      STORE_NAME,
      "readwrite",
    );

    const store = transaction.objectStore(STORE_NAME);

    store.put(
      {
        name: file.name,
        type: file.type || "application/pdf",
        lastModified: file.lastModified,
        blob: file,
      },
      FILE_KEY,
    );

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = () => {
      reject(
        transaction.error ||
          new Error("Could not save PDF."),
      );
    };
  });

  db.close();
}

export async function getPdfForEditor(): Promise<File | null> {
  if (typeof window === "undefined") {
    return null;
  }

  const db = await openDatabase();

  const stored = await new Promise<any>(
    (resolve, reject) => {
      const transaction = db.transaction(
        STORE_NAME,
        "readonly",
      );

      const request = transaction
        .objectStore(STORE_NAME)
        .get(FILE_KEY);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(
          request.error ||
            new Error("Could not read stored PDF."),
        );
      };
    },
  );

  db.close();

  if (!stored?.blob) {
    return null;
  }

  return new File(
    [stored.blob],
    stored.name || "document.pdf",
    {
      type: stored.type || "application/pdf",
      lastModified:
        stored.lastModified || Date.now(),
    },
  );
}

export async function clearPdfForEditor(): Promise<void> {
  if (typeof window === "undefined") {
    return;
  }

  const db = await openDatabase();

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(
      STORE_NAME,
      "readwrite",
    );

    transaction.objectStore(STORE_NAME).delete(FILE_KEY);

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = () => {
      reject(
        transaction.error ||
          new Error("Could not clear stored PDF."),
      );
    };
  });

  db.close();
}

// Backward-compatible aliases used by the PDF editor route.
export const getPendingPdfForEditor = getPdfForEditor;
export const clearPendingPdfForEditor = clearPdfForEditor;
