import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Hero from "./Hero";
import Process from "./Process";
import ProductSection from "./Product";
import Pricing from "./Pricing";
import Contact from "./Contact";
import Footer from "../Components/Footer";

export default function Home() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace("#","");
            const timer = setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({behavior : "smooth"});
            },150)
            return () => clearTimeout(timer);
        }
    },[location])
    return (
        <div className="Home ">
            <Navbar />
            <Hero />
            <ProductSection />
            <Process />
            <Pricing />
            <Contact />
            <Footer />
        </div>
    )
}