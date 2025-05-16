import { useState, useEffect, useContext } from 'react';
import { FaTrashAlt, FaHeart } from 'react-icons/fa';
import supabase from '../../supabase/supabase-client';
import SessionContext from '../../context/SessionContext';
import FavoritesContext from '../../context/FavoritesContext';
import Avatar from '../../components/Avatar';

export default function AccountPage() {
    const { session } = useContext(SessionContext);
    const { favorites, removeFavorite } = useContext(FavoritesContext);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        window.scrollTo(0, 0)
        let ignore = false;

        const getProfile = async () => {
            setLoading(true);
            const { user } = session;

            const { data, error } = await supabase
                .from('profiles')
                .select('username, first_name, last_name, avatar_url')
                .eq('id', user.id)
                .single();

            if (!ignore) {
                if (error) {
                    console.error(error);
                } else if (data) {
                    setUsername(data.username || '');
                    setFirstName(data.first_name || '');
                    setLastName(data.last_name || '');
                    setAvatarUrl(data.avatar_url);
                }
            }
            setLoading(false);
        };

        if (session) {
            getProfile();
        }

        return () => {
            ignore = true;
        };
    }, [session]);

    const updateProfile = async (event, newAvatarUrl) => {
        event.preventDefault();
        setLoading(true);
        setShowSuccess(false);
        const { user } = session;

        const updates = {
            id: user.id,
            username,
            first_name: firstName,
            last_name: lastName,
            avatar_url: newAvatarUrl || avatarUrl,
            updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);

        if (error) {
            alert(error.message);
        } else {
            if (newAvatarUrl) {
                setAvatarUrl(newAvatarUrl);
            }
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen g-gradient-to-b from-[#001F3F] to-black text-lime-400 font-mono">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row p-8 gap-6">

                <div className="w-full md:w-1/4 flex flex-col items-center bg-gray-900 px-6 py-4 rounded-xl shadow-neon border border-cyan-500">
                    <Avatar
                        url={avatarUrl}
                        size={120}
                        onUpload={(event, url) => updateProfile(event, url)}
                        className="border border-lime-400 rounded-full shadow-neon"
                    />
                    <h2 className="text-xl text-cyan-300 font-bold mt-4 drop-shadow">
                        {firstName || 'User'} {lastName}
                    </h2>
                    <p className="text-sm text-lime-300">@{username || 'username'}</p>


                    <div className="mt-6 flex flex-col w-full gap-3">
                        <button
                            className={`py-3 px-5 rounded-lg border text-left font-semibold transition-all ${activeTab === 'profile'
                                ? 'bg-lime-500 text-black border-lime-400 shadow-neon'
                                : 'hover:bg-lime-600 border-lime-400 hover:scale-105'
                                }`}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile
                        </button>
                        <button
                            className={`py-3 px-5 rounded-lg border text-left font-semibold transition-all ${activeTab === 'favorites'
                                ? 'bg-cyan-500 text-black border-cyan-400 shadow-neon'
                                : 'hover:bg-cyan-600 border-cyan-400 hover:scale-105'
                                }`}
                            onClick={() => setActiveTab('favorites')}
                        >
                            Favorites ({favorites.length})
                        </button>
                    </div>
                </div>


                <div className="w-full md:w-3/4 bg-black rounded-xl p-8 shadow-neon border border-lime-400">
                    {activeTab === 'profile' ? (
                        <div>
                            <h1 className="text-2xl text-cyan-400 font-semibold mb-6">Update your profile</h1>

                            {showSuccess && (
                                <div className="text-lime-300 border border-lime-400 bg-lime-900 p-4 mb-4 rounded-lg shadow-neon">
                                    Profile updated successfully!
                                </div>
                            )}

                            <form onSubmit={updateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-lime-300 mb-2">Email</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-800 text-lime-200 border border-lime-500 p-3 rounded-md shadow-neon"
                                        value={session?.user?.email || ''}
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="block text-lime-300 mb-2">Username</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-800 text-lime-200 border border-lime-500 p-3 rounded-md shadow-neon"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-lime-300 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-800 text-lime-200 border border-lime-500 p-3 rounded-md shadow-neon"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-lime-300 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-800 text-lime-200 border border-lime-500 p-3 rounded-md shadow-neon"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-full mt-6">
                                    <button
                                        type="submit"
                                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-lg shadow-neon transition-all hover:scale-105"
                                        disabled={loading}
                                    >
                                        {loading ? 'Updating...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-2xl text-lime-300 font-semibold mb-6">Your Favorites</h1>

                            {favorites.length === 0 ? (
                                <div className="text-center text-lime-500">
                                    <FaHeart className="mx-auto text-5xl text-lime-700 mb-2" />
                                    <p>No favorites yet. Find something cool!</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {favorites.map((game) => (
                                        <div
                                            key={game.id}
                                            className="bg-gray-900 border border-cyan-700 p-6 rounded-lg shadow-neon hover:scale-105 transition-all"
                                        >
                                            <img
                                                src={game.game_image}
                                                alt={game.game_name}
                                                className="w-full h-40 object-cover rounded shadow-lg"
                                            />
                                            <div className="mt-4 flex justify-between items-center">
                                                <p className="text-lime-300 text-lg font-semibold">{game.game_name}</p>
                                                <button
                                                    className="text-red-500 hover:text-red-300"
                                                    onClick={() => removeFavorite(game)}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}