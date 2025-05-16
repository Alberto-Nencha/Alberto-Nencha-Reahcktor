import { useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";

export default function Avatar({ url, size, onUpload }) {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (url) downloadImage(url);
    }, [url]);

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from("avatars").download(path);
            if (error) throw error;
            const url = URL.createObjectURL(data);
            setAvatarUrl(url);
        } catch (error) {
            console.log("Error downloading image: ", error.message);
        }
    };

    const uploadAvatar = async (event) => {
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const file = event.target.files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file);

            if (uploadError) throw uploadError;
            onUpload(event, filePath);
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="rounded-full object-cover border border-cyan-500 shadow-neon hover:scale-105 transition-transform duration-300"
                    style={{ height: size, width: size }}
                />
            ) : (
                <div
                    className="rounded-full bg-gray-800 border border-cyan-500 shadow-neon"
                    style={{ height: size, width: size }}
                />
            )}


            <label className="mt-3 px-4 py-2 bg-lime-500 text-black font-bold rounded-lg shadow-neon hover:bg-cyan-500 transition-all duration-300 transform hover:scale-110">
                {uploading ? "Uploading..." : "Upload"}
                <input
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                    className="hidden"
                />
            </label>
        </div>
    );
}