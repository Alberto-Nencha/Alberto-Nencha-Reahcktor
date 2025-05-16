import { Link } from "react-router-dom";
import LazyLoadGameImage from "./LazyLoadGameImage";

export default function CardGame({ game }) {
    const genres = game.genres?.map((genre) => genre.name).join(", ") || "No genres";

    return (
        <div className="relative group rounded-lg overflow-hidden border border-cyan-500 shadow-neon 
            hover:scale-105 transition-transform duration-300 bg-gray-900 text-lime-400 p-4"
        >

            <figure className="relative">
                <LazyLoadGameImage image={game.background_image} className="w-full h-48 object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </figure>


            <div className="mt-4">
                <h2 className="text-xl font-bold text-cyan-400 tracking-wide">{game.name}</h2>
                <p className="text-sm text-gray-300">{genres}</p>
                <p className="text-sm text-lime-400">Release Date: {game.released}</p>


                <div className="mt-4 text-center">
                    <Link
                        to={`/games/${game.slug}/${game.id}`}
                        className="inline-block px-6 py-2 bg-lime-500 text-black font-bold rounded-lg shadow-neon 
                        hover:bg-cyan-500 transition-all duration-300 transform hover:scale-110"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}