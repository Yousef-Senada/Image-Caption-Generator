import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link as ScrollLink, Element } from "react-scroll";
import { useEffect } from "react";
import { Link } from "react-router";
import {
    Sparkles,
    Zap,
    Monitor,
    Image,
    Upload,
    Smartphone,
} from "lucide-react";

export default function Landing() {
    const navItems = [
        { name: "Home", to: "hero" },
        { name: "Features", to: "features" },
        { name: "Demo", to: "demo" },
    ];

    const icons = [Sparkles, Zap, Monitor, Image, Upload, Smartphone];
    const featuresList = [
        "Multiple AI Models",
        "Lightning-fast Results",
        "Modern UI & UX",
        "Image Preview",
        "Drag & Drop Upload",
        "Fully Responsive",
    ];

    useEffect(() => {
        document.title = "Image Caption Generator";
    }, []);

    return (
        <div className="bg-[#0d0d0d] text-white font-sans">
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-600/30 rounded-full blur-[120px] animate-pulse z-0" />
            {/* Navbar */}
            <motion.nav
                className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#1a1a1a] backdrop-blur-xl bg-opacity-70 border border-gray-700 rounded-full px-6 py-3 z-50 shadow-lg flex gap-6 items-center"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {navItems.map((item) => (
                    <ScrollLink
                        key={item.to}
                        to={item.to}
                        smooth={true}
                        duration={500}
                        className="cursor-pointer text-sm sm:text-base text-gray-300 hover:text-white transition-all relative group"
                    >
                        {item.name}
                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
                    </ScrollLink>
                ))}
            </motion.nav>

            {/* Hero Section */}
            <section
                className="min-h-screen flex items-center justify-center text-center px-6"
                id="hero"
            >
                <motion.div
                    className="mt-24 max-w-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                        Generate Stunning Image Captions with AI
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Powered by LSTM, GRU, RNN, and Transformers — all in one
                        click.
                    </p>
                    <ScrollLink to="cta" smooth duration={800}>
                        <Link
                            to={"/app"}
                            className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-3 text-white text-lg"
                        >
                            Try it Now
                        </Link>
                    </ScrollLink>
                </motion.div>
            </section>

            {/* Features Section */}
            <Element name="features">
                <section className="py-20 px-6 bg-[#111] text-center">
                    <motion.h3
                        className="text-3xl font-bold mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        Features
                    </motion.h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        {featuresList.map((feature, i) => {
                            const Icon = icons[i];
                            return (
                                <motion.div
                                    key={i}
                                    className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-700 shadow-md hover:scale-105 transition-transform duration-300"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.1,
                                    }}
                                >
                                    <Icon className="w-8 h-8 text-blue-400 mb-2" />
                                    <h4 className="text-lg font-semibold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        {feature}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        Powerful feature to enhance your
                                        experience.
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            </Element>

            {/* Demo Section */}
            <Element name="demo">
                <section className="py-20 px-6 text-center">
                    <motion.h3
                        className="text-3xl font-bold mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        Demo Preview
                    </motion.h3>
                    <motion.div
                        className="relative mx-auto w-full max-w-xl group"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                        <motion.img
                            src="/demo.png"
                            alt="Demo Preview"
                            className="relative rounded-xl shadow-2xl border border-gray-700 w-full group-hover:scale-105 transition-transform duration-300"
                        />
                        <Button className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 rounded-full px-4 py-2 text-sm">
                            Watch Demo
                        </Button>
                    </motion.div>
                </section>
            </Element>

            {/* CTA Section */}
            <Element name="cta">
                <section className="relative overflow-hidden py-24 px-6 text-center bg-[#111]">
                    <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-20 blur-3xl animate-pulse-slow rounded-full z-0" />
                    <motion.div
                        className="relative z-10"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h3
                            className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            Ready to Generate?
                        </motion.h3>
                        <ScrollLink to="hero" smooth duration={800}>
                            <Button className="hover:-translate-y-3 cursor-pointer group relative rounded-2xl px-8 py-4 text-white text-lg shadow-xl transition-all duration-500 overflow-hidden bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                                <span className="absolute inset-0 bg-pink-400 blur-xl opacity-20 animate-pulse-slow rounded-2xl z-0" />
                                <span className="relative z-10 flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 animate-bounce"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                                        />
                                    </svg>
                                    Scroll to Top
                                </span>
                            </Button>
                        </ScrollLink>
                    </motion.div>
                </section>
            </Element>
        </div>
    );
}
