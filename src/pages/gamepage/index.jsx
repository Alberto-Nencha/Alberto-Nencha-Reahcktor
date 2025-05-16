import { useParams } from "react-router";
import useFetchSolution from '../../hooks/useFetchSolution';
import config from '../../apiKeys/config';
import ToggleFavorite from '../../components/ToggleFavorite';
import Chatbox from '../../components/Chatbox';

export default function GamePage() {
    const { id } = useParams();
    const initialUrl = `${config.API_URL}/games/${id}?key=${config.API_KEY}`;
    const { data: game, loading, error } = useFetchSolution(initialUrl);


    if (loading) return <div className="text-center py-10 text-cyan-400 animate-pulse">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500 bg-gray-800 p-4 rounded-md">{error}</div>;
    if (!game) return <div className="text-center py-10 text-lime-400">Game not found</div>;

    return (
        <div className="container mx-auto px-4 py-8 pt-5 text-lime-400 min-h-screen flex flex-col">


            <div className="relative w-full h-[500px] overflow-hidden">
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                />


                <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black/50 p-6">
                    <h1 className="text-5xl font-extrabold text-cyan-400 neon-glow tracking-wide">
                        {game.name}
                    </h1>
                    <div className="flex items-center gap-4 mt-4">
                        <ToggleFavorite game={game} />
                        <p className="text-lg text-gray-300">
                            <strong>Released:</strong> <span className="text-lime-400">{game.released}</span> |
                            <strong> Rating:</strong> <span className="text-cyan-400">{game.rating}/5</span>
                        </p>
                    </div>
                </div>
            </div>


            <div className="mt-6 px-6 py-4 bg-gray-900/90 rounded-lg border border-lime-500">
                <div className="prose max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: game.description }} />
            </div>


            <div className="mt-8 bg-gray-900 border border-lime-500 shadow-neon rounded-lg p-6 flex flex-col">
                <h2 className="text-2xl font-bold text-cyan-400 text-glitch mb-4">Live Chat</h2>


                <div className="flex-1 overflow-y-auto border border-gray-700 p-4 bg-black/60 rounded-lg">
                    <Chatbox game={game} />
                </div>



            </div>
        </div>
    );
}