import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Crud from "./Crud.jsx";
import Encrypt from "./Encrypt.jsx";
import FileEncryptor from "./FileEncryptor.jsx";
import FileDecryptor from "./FileDecryptor.jsx";
import Connect from "./components/connect.jsx";

export default function App() {
 return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<Crud />} />
       <Route path="/enc" element={<FileEncryptor />} />
       <Route path="/dec" element={<FileDecryptor />}></Route>
       <Route path="/home" element={<Connect/>}></Route>
     </Routes>
   </BrowserRouter>
 )
}
