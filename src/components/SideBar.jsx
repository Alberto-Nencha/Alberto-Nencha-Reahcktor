import GenresDropdown from "./GenresDropdown";

export default function Sidebar() {
    return (
        <aside className="w-72 p-4 bg-gray-900 border-r border-cyan-500 shadow-neon min-h-screen">

            <h2 className="text-cyan-400 text-xl font-bold tracking-wider mb-4">Game Categories</h2>


            <GenresDropdown />
        </aside>
    );
}