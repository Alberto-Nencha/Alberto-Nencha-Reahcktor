export default function ErrorPage() {
    return (
        <div className="container mx-auto px-4 py-8 pt-5 min-h-screen flex flex-col items-center justify-center bg-black text-lime-400">
            <div className="text-center">

                <h1 className="text-7xl font-extrabold tracking-widest text-red-600 animate-glitch">
                    404
                </h1>


                <p className="py-6 text-lg text-cyan-400 animate-pulse">
                    pagina non trovata
                </p>


                <a
                    href="/"
                    className="mt-6 inline-block px-6 py-3 bg-lime-500 text-black font-bold text-lg rounded-lg shadow-neon hover:bg-cyan-500 transition-all duration-300 transform hover:scale-110"
                >
                    HomePage
                </a>
            </div>
        </div>
    );
}