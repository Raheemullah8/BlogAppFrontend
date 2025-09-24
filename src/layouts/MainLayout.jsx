import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
    return (
        <div>
            <Navbar  />
            <main className="min-h-screen">
                <Outlet /> {/* child route yahan render hoga */}
            </main>
            <Footer />
        </div>
    )
}
export default MainLayout;