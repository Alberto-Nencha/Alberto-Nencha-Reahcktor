import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hooks/useFetchSolution";
import config from '../../apiKeys/config';

export default function SearchPage() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");

    const initialUrl = `${config.API_URL}/games?key=${config.API_KEY}&search=${encodeURIComponent(game)}`;
    const { loading, data, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        if (game) {
            updateUrl(initialUrl);
        }
    }, [game, initialUrl, updateUrl]);

    return (
        <div className="container mx-auto min-h-screen bg-black text-lime-400 flex flex-col">


            <div className="relative w-full h-[400px] overflow-hidden">

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/60 p-6">
                    <h1 className="text-5xl font-extrabold text-cyan-400 neon-glow tracking-wide">
                        Searching for "{game}"
                    </h1>
                    <p className="mt-4 text-lg text-white animate-pulse">
                        Discover the best cyberpunk games!
                    </p>
                </div>
            </div>


            {loading && (
                <div className="text-center py-10 text-cyan-400 animate-pulse">
                    Searching...
                </div>
            )}


            {error && (
                <div className="text-center py-10 text-red-500 bg-gray-800 p-4 rounded-md">
                    {error}
                </div>
            )}


            {data?.results?.length > 0 ? (
                <div className="mt-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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


                                <a
                                    href={`/game/${game.id}`}
                                    className="mt-3 inline-block px-6 py-2 bg-lime-500 text-black font-bold rounded-lg shadow-neon 
                                    hover:bg-cyan-500 transition-all duration-300 transform hover:scale-110"
                                >
                                    Discover More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-lime-400 mt-10 text-xl">
                    No results found. Try another search!
                </p>
            )}
        </div>
    );
}