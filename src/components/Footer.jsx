import logo from "../assets/logo.png";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-800 text-lime-300 border-t border-cyan-500 shadow-neon py-10">
            <div className="container mx-auto flex flex-col items-center gap-6">

                <aside className="mb-4">
                    <img
                        src={logo}
                        alt="Cyberpunk Logo"
                        className="w-48 h-48 object-contain border border-cyan-500 shadow-neon hover:scale-110 transition-transform duration-300"
                    />
                </aside>

                <div className="text-center text-gray-200">
                    <p className="text-lg font-semibold">🚀 Enter the Future of Gaming</p>
                    <p className="text-sm text-gray-400">Powered by futuristic ideas & advanced technologies.</p>
                </div>


                <div className="flex flex-wrap justify-center gap-6">
                    <p className="flex items-center gap-2 text-cyan-300 hover:text-lime-400 transition-colors duration-300">

                        <a href="mailto:albertonencha02@gmail.com">albertonencha02@gmail.com</a>
                    </p>

                    {[
                        { icon: "bi-linkedin", label: "LinkedIn", link: "https://www.linkedin.com/in/alberto-nencha-72768133b/" },
                        { icon: "bi-github", label: "GitHub", link: "https://github.com/Alberto-Nencha" }
                    ].map(({ icon, label, link }, index) => (
                        <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-cyan-300 hover:text-lime-400 transition-colors duration-300"
                        >

                            {label}
                        </a>
                    ))}
                </div>


                <div className="mt-6 flex flex-wrap justify-center gap-8 text-gray-300 text-sm">
                    <p>🔥 Inspired by the Cyberpunk aesthetic</p>
                    <p>💾 Built with advanced technologies & AI</p>
                    <p>🚀 Pushing the boundaries of gaming UX</p>
                </div>


                <div className="mt-6 text-gray-500 text-xs text-center">
                    © 2025 Cyberpunk Gaming Universe | Designed for future innovators 🚀
                </div>
            </div>
        </footer>
    );
}