import useFetchSolution from '../../hooks/useFetchSolution';
import CardGame from '../../components/CardGame';
import config from '../../apiKeys/config';

import { Link } from "react-router-dom";

export default function HomePage() {
    const initialUrl = `${config.API_URL}/games?key=${config.API_KEY}&dates=2024-01-01,2024-12-31&page=1`;
    const { data, loading, error } = useFetchSolution(initialUrl);

    return (
        <div className="container mx-auto min-h-screen bg-transparent text-lime-400 flex flex-col">


            <div className="relative w-full h-[500px] overflow-hidden">
                <img
                    src="https://p325k7wa.twic.pics/high/cyberpunk/cyberpunk-2077/00-page-setup/cp2077_game-thumbnail.jpg?twic=v1/resize=760/step=10/quality=80"
                    alt="Cyberpunk Gaming"
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/60 p-6">
                    <h1 className="text-6xl font-extrabold text-cyan-400 neon-glow tracking-wide">
                        Cyberpunk Gaming
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 animate-pulse">
                        The best games in the palm of your hand
                    </p>
                </div>
            </div>


            {loading && (
                <div className="text-center py-10 text-cyan-400 animate-pulse">
                    Loading...
                </div>
            )}


            {error && (
                <div className="text-center py-10 text-red-500 bg-gray-800 p-4 rounded-md">
                    {error}
                </div>
            )}


            {data && (
                <div className="mt-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {data.results.map((game, index) => (
                        <div
                            key={game.id}
                            className={`relative group rounded-lg overflow-hidden border border-cyan-500 shadow-neon 
                                ${index % 2 === 0 ? "transform hover:rotate-2 hover:scale-105" : "transform hover:-rotate-2 hover:scale-105"}
                            `}
                        >

                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="w-full h-64 object-cover transition-transform duration-300"
                            />


                            <div className="absolute inset-0 flex flex-col justify-end bg-black/60 p-4">
                                <h2 className="text-xl font-bold text-lime-400">{game.name}</h2>
                                <p className="text-gray-300">{game.rating}/5 ⭐</p>


                                <Link to={`/game/${game.id}`} className="mt-3 inline-block px-6 py-2 bg-lime-500 text-black font-bold rounded-lg shadow-neon 
                                    hover:bg-cyan-500 transition-all duration-300 transform hover:scale-110"
                                >
                                    Scopri di più
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}