import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/supabase-client";
import logo from "../assets/logo.png";
import GenresDropdown from "../components/GenresDropdown";

export default function Header() {
    const { session, loading } = useContext(SessionContext);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!session?.user) return;

        const fetchUsername = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("username")
                .eq("id", session.user.id)
                .single();

            if (!error && data?.username) {
                setUsername(data.username);
            } else {
                setUsername(session.user.email.split("@")[0]);
            }
        };

        fetchUsername();
    }, [session]);

    const signOut = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    return (
        <header className="w-full fixed top-0 left-0 z-50 bg-gray-900 text-lime-300 shadow-neon border-b border-cyan-500 py-6">
            <div className="container mx-auto flex items-center justify-between px-8">


                <Link to="/" className="flex items-center gap-4 text-cyan-400 hover:text-lime-500 transition-colors duration-300">
                    <img src={logo} alt="Cyberpunk Logo" className="w-16 h-16 object-contain border border-cyan-500 shadow-neon" />
                    <span className="text-2xl font-bold">Cyberpunk Gaming</span>
                </Link>





                <div className="flex items-center gap-4">
                    <div className="flex justify-between items-center gap-6 bg-gray-800 px-8 py-3 rounded-full border border-cyan-500 shadow-neon min-w-[260px] flex-nowrap">
                        <SearchBar />

                        {session ? (
                            <div className="dropdown dropdown-end flex items-center gap-x-6">

                                <Link to="/account" className="text-cyan-300 hover:text-lime-500 truncate text-lg font-semibold">
                                    {username || "Profile"}
                                </Link>


                                <div className="relative group">
                                    <button className="px-6 py-2 bg-gray-700 border border-cyan-500 rounded-lg shadow-cyan-500 text-cyan-300 hover:bg-cyan-500 transition-all duration-300 hover:scale-105">
                                        Genres
                                    </button>
                                    <div className="absolute left-0 mt-2 bg-gray-900 border border-cyan-500 rounded-lg shadow-neon w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                                        <GenresDropdown />
                                    </div>
                                </div>


                                <button onClick={signOut} className="px-6 py-2 bg-red-500 text-black font-bold rounded-lg shadow-neon hover:bg-red-600 transition-all duration-300 hover:scale-105">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-x-6">
                                <Link to="/login" className="btn btn-outline px-6 py-2 rounded-lg shadow-neon hover:bg-cyan-500 transition-all duration-300 hover:scale-105">Login</Link>
                                <Link to="/register" className="btn btn-primary px-6 py-2 rounded-lg shadow-neon hover:bg-lime-500 hover:text-blue-500 transition-all duration-300 hover:scale-105">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}