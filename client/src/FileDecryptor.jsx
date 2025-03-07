import React, { useState } from "react";
import CryptoJS from "crypto-js";

const FileDecryptor = () => {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const secretKey = "your-strong-password"; // Use a secure key

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const decryptAndViewPDF = () => {
    if (!file) {
      alert("Please select an encrypted PDF file!");
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      try {
        const decrypted = CryptoJS.AES.decrypt(reader.result, secretKey);
        const decryptedBytes = new Uint8Array(decrypted.sigBytes);
        for (let i = 0; i < decrypted.sigBytes; i++) {
          decryptedBytes[i] = (decrypted.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        }

        // Create a Blob URL for viewing the PDF
        const blob = new Blob([decryptedBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error("Decryption error:", error);
        alert("Failed to decrypt the file!");
      }
    };
  };

  return (
    <div>
      <h2>Decrypt & View PDF</h2>
      <input type="file" onChange={handleFileChange} accept=".enc" />
      <button onClick={decryptAndViewPDF}>Decrypt & View</button>

      {/* Show PDF in iframe if available */}
      {pdfUrl && (
  <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
    <iframe
      src={pdfUrl}
      style={{
        width: "80vw",        // 80% of viewport width
        height: "80vh",       // 80% of viewport height
        maxWidth: "900px",    // Prevents it from being too wide
        maxHeight: "600px",   // Keeps it from being too tall
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
      title="Decrypted PDF"
    />
  </div>
)}
    </div>
  );
};

export default FileDecryptor;
