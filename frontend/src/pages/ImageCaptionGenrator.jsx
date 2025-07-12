import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, Languages } from "lucide-react";

export default function ImageCaptionGenerator() {
    const [image, setImage] = useState(null);
    const [captionText, setCaptionText] = useState("");
    const [captionArabic, setCaptionArabic] = useState("");
    const [captionsVisible, setCaptionsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [translated, setTranslated] = useState(false);
    const [loadingTranslations, setLoadingTranslations] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setCaptionsVisible(false);
        }
    };

    const handleGenerate = async () => {
        if (!image) return;

        setLoading(true);
        setCaptionsVisible(false);

        try {
            const fileInput = document.querySelector("input[type='file']");
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch("http://127.0.0.1:5000/caption", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setCaptionText(data.captionText);
                setCaptionArabic(data.captionArabic);
                setCaptionsVisible(true);
            } else {
                alert("An error occurred: " + data.error);
            }
        } catch (err) {
            alert("Connection to the server failed");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center p-6 text-white"
            transition={{ duration: 1 }}
        >
            <motion.div
                className="absolute top-4 left-4 z-50"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                <a
                    href="/"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                >
                    <motion.span
                        animate={{ x: [0, -5, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "easeInOut",
                        }}
                    >
                        ←
                    </motion.span>
                    Back
                </a>
            </motion.div>

            <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400  to-purple-400 drop-shadow-xl text-center mb-10"
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            >
                Image Caption Generator
            </motion.h1>

            <motion.label
                className={`mb-6 w-full max-w-md cursor-pointer border-2 ${
                    dragActive
                        ? "border-purple-500 bg-gray-700"
                        : "border-dashed border-gray-600"
                } rounded-xl transition`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                }}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith("image/")) {
                        setImage(URL.createObjectURL(file));
                        setCaptionsVisible(false);
                    }
                }}
            >
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                />
                <div className="w-full h-60 sm:h-72 flex items-center justify-center overflow-hidden">
                    {image ? (
                        <motion.img
                            src={image}
                            alt="Uploaded"
                            key={image}
                            className="object-cover w-full h-full rounded-xl"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                            <ImagePlus size={36} className="mb-2" />
                            <p>
                                Click or{" "}
                                <span className="text-purple-400">
                                    Drag & Drop
                                </span>{" "}
                                to Upload
                            </p>
                        </div>
                    )}
                </div>
            </motion.label>

            <motion.div
                className="mt-4 mb-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl shadow-lg"
                    onClick={handleGenerate}
                    disabled={!image || loading}
                >
                    {loading ? (
                        <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity,
                                duration: 1,
                                ease: "linear",
                            }}
                        ></motion.div>
                    ) : (
                        "Generate"
                    )}
                </Button>
            </motion.div>

            <div className="grid grid-cols-1 w-full max-w-2xl">
                <AnimatePresence>
                    {captionsVisible && (
                        <motion.div
                            className="col-span-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="bg-[#1a1a1a] border border-gray-700 text-white rounded-xl">
                                <CardContent className="p-5">
                                    <div className="flex items-center justify-end mb-2">
                                        <button
                                            className="text-xs px-2 py-1 bg-purple-700 hover:bg-purple-800 rounded-full transition text-white flex items-center gap-1 min-w-[60px] justify-center"
                                            onClick={() => {
                                                setLoadingTranslations(true);
                                                setTimeout(() => {
                                                    setTranslated(
                                                        (prev) => !prev
                                                    );
                                                    setLoadingTranslations(
                                                        false
                                                    );
                                                }, 1000);
                                            }}
                                        >
                                            {loadingTranslations ? (
                                                <motion.div
                                                    className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"
                                                    initial={{ rotate: 0 }}
                                                    animate={{ rotate: 360 }}
                                                    transition={{
                                                        repeat: Infinity,
                                                        duration: 1,
                                                        ease: "linear",
                                                    }}
                                                />
                                            ) : (
                                                <>
                                                    <Languages size={14} />
                                                    {translated
                                                        ? "EN"
                                                        : "Translate"}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {translated
                                            ? captionArabic
                                            : captionText}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
