import { useContext, useRef } from 'react';
import { Link } from "react-router"; import supabase from '../supabase/supabase-client';
import SessionContext from '../context/SessionContext';
import RealtimeChat from './RealtimeChat';

export default function Chatbox({ game }) {
    const { session } = useContext(SessionContext);
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const message = formData.get('message');

        if (!message?.trim() || !session) return;

        const { error } = await supabase
            .from('messages')
            .insert({
                profile_id: session.user.id,
                profile_username: session.user.user_metadata.username || session.user.email.split('@')[0],
                game_id: game.id,
                content: message
            });

        if (error) {
            console.error('Error sending message:', error);
        } else {
            formRef.current?.reset();
        }
    };

    return (
        <div className="card bg-base-200 mt-8">
            <div className="card-body p-4">

                <RealtimeChat game={game} />

                {session ? (
                    <form onSubmit={handleSubmit} ref={formRef} className="mt-4">
                        <div className="mt-4 flex items-center gap-4">
                            <input
                                name="message"
                                type="text"
                                placeholder="Type your message..."
                                className="flex-1 p-3 bg-gray-800 text-white border border-cyan-400 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                                required
                            />
                            <button className="px-4 py-2 bg-lime-500 text-black font-bold rounded-lg shadow-neon hover:bg-cyan-500 transition-all duration-300 transform hover:scale-110">
                                Send
                            </button>
                        </div>
                    </form>
                ) : (

                    <Link to="/register" className="btn btn-primary px-2">You can acces the chat only if logged in</Link>
                )}
            </div>
        </div>
    );
}

