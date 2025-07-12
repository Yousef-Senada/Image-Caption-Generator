import React from "react";
import { Routes, Route } from "react-router";
import ImageCaptionGenrator from "./pages/ImageCaptionGenrator";
import Landing from "./pages/Landing";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<ImageCaptionGenrator />} />
        </Routes>
    );
}

export default App;
