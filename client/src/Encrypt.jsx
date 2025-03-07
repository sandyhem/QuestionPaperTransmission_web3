import React, { useState } from "react";
import CryptoJS from "crypto-js";

const FileEncryptor = () => {
  const [file, setFile] = useState(null);
  const [encryptedData, setEncryptedData] = useState(null);
  const secretKey = "your-strong-password"; // Use a secure key

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // Convert ArrayBuffer to WordArray (for CryptoJS)
  const arrayBufferToWordArray = (arrayBuffer) => {
    const u8 = new Uint8Array(arrayBuffer);
    const words = [];
    for (let i = 0; i < u8.length; i += 4) {
      words.push(
        (u8[i] << 24) |
          (u8[i + 1] << 16) |
          (u8[i + 2] << 8) |
          u8[i + 3]
      );
    }
    return CryptoJS.lib.WordArray.create(words, u8.length);
  };

  // Convert WordArray to Uint8Array
  const wordArrayToUint8Array = (wordArray) => {
    const words = wordArray.words;
    const byteArray = new Uint8Array(wordArray.sigBytes);
    for (let i = 0; i < wordArray.sigBytes; i++) {
      byteArray[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }
    return byteArray;
  };

  // Encrypt File
  const encryptFile = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(file); // Read file as binary data
    reader.onload = () => {
      const wordArray = arrayBufferToWordArray(reader.result);
      const encrypted = CryptoJS.AES.encrypt(wordArray, secretKey).toString();
      setEncryptedData(encrypted);

      // Convert encrypted text to Blob and download
      const blob = new Blob([encrypted], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = file.name + ".enc";
      link.click();
    };
  };

  // Decrypt File
  const decryptFile = () => {
    if (!encryptedData) {
      alert("No encrypted file available!");
      return;
    }

    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, secretKey);
      const byteArray = wordArrayToUint8Array(decrypted);

      // Convert back to Blob and download
      const blob = new Blob([byteArray], { type: file.type });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = file.name.replace(".enc", ""); // Restore original filename
      link.click();
    } catch (error) {
      console.error("Decryption error:", error);
      alert("Error decrypting file!");
    }
  };

  return (
    <div>
      <h2>File Encryption & Decryption</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={encryptFile}>Encrypt & Download</button>
      <button onClick={decryptFile}>Decrypt & Download</button>
    </div>
  );
};

export default FileEncryptor;
