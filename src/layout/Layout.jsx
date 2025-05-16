import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import GenresDropdown from '../components/GenresDropdown';

export default function Layout() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return (
        <div className="drawer md:drawer-open min-h-screen bg-gradient-to-b from-[#001F3F] to-black text-lime-300">
            <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 pt-20 overflow-y-auto">
                    <Outlet />
                </main>
                <Footer />
            </div>

        </div>
    );
}