import useFetchSolution from "../hooks/useFetchSolution";
import { Link } from "react-router-dom";
import config from "../apiKeys/config";
import SearchBar from "../components/SearchBar";

export default function GenresDropdown() {
    const initialUrl = `${config.API_URL}/genres?key=${config.API_KEY}`;
    const { data, loading, error } = useFetchSolution(initialUrl);

    if (loading) return <div className="text-center py-2 text-cyan-400 animate-pulse">Loading genres...</div>;
    if (error) return <div className="text-red-500 bg-gray-800 p-4 rounded-md">{error}</div>;

    return (
        <div className="p-6 bg-gray-900 border border-cyan-500 shadow-neon rounded-lg max-h-64 overflow-y-auto">

            <div className="md:hidden my-5">
                <SearchBar mobile />
            </div>


            <ul className="flex flex-col gap-3">
                {data?.results.map((genre) => (
                    <li key={genre.id} className="group">
                        <Link
                            to={`/games/${genre.slug}`}
                            className="block py-3 px-6 bg-gray-800 text-lime-400 font-bold rounded-md border border-cyan-400 
                            transition-all duration-300 transform hover:scale-105 hover:bg-cyan-500 shadow-neon"
                        >
                            {genre.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}