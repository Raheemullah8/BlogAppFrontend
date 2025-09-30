import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SearchProvider } from "../context/SearchContext";
import { CategoryProvider } from "../context/CategoryContext";

function MainLayout() {
    return (
      
        <div>
            <SearchProvider>
                <CategoryProvider>
            <Navbar  />
            <main className="min-h-screen">
                <Outlet /> {/* child route yahan render hoga */}
            </main>
            <Footer />
            </CategoryProvider>
            </SearchProvider>
        </div>
     
    )
}
export default MainLayout;