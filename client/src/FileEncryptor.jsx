import React, { useState } from "react";
import CryptoJS from "crypto-js";

const FileEncryptor = () => {
  const [file, setFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null); // Store encrypted file
  const secretKey = "your-strong-password"; // Use a secure key

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const encryptFile = () => {
    if (!file) {
      alert("Please select a file to encrypt!");
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const wordArray = CryptoJS.lib.WordArray.create(new Uint8Array(reader.result));
      const encrypted = CryptoJS.AES.encrypt(wordArray, secretKey).toString();

      // Create Blob and store in state
      const blob = new Blob([encrypted], { type: "text/plain" });
      setEncryptedFile({ blob, name: file.name + ".enc" });
    };
  };

  const downloadEncryptedFile = () => {
    if (!encryptedFile) return;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(encryptedFile.blob);
    link.download = encryptedFile.name;
    link.click();
    console.log(encryptedFile);
  };

  return (
    <div>
      <h2>Encrypt File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={encryptFile}>Encrypt</button>

      {encryptedFile && (
        <div>
          <p>Encrypted file ready: <b>{encryptedFile.name}</b></p>
          <button onClick={downloadEncryptedFile}>Download Encrypted File</button>
        </div>
      )}
    </div>
  );
};

export default FileEncryptor;
