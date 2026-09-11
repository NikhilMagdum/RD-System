import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import React from "react";

import Rduser from "./Rduser";
import PassbookEntry from "./PassbookEntry";
import AdminLogin from "./AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Default Page */}
        <Route path="/" element={<Navigate to="/admin-login" />} />

        {/* RD User Page */}
        <Route path="/rduser" element={<Rduser />} />

        {/* Passbook Entry Page */}
        <Route path="/passbook-entry/:rid" element={<PassbookEntry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
