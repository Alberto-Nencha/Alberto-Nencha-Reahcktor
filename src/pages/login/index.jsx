import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabase/supabase-client";
import { FormSchema, getErrors, getFieldError } from "../../lib/validationForm";


export default function LoginPage() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();


    const onSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted!");

        setFormSubmitted(true);
        const result = FormSchema.pick({ email: true, password: true }).safeParse(formState);

        if (!result.success) {
            setFormErrors(getErrors(result.error));
            console.log("Form validation failed:", formErrors);
        } else {
            try {
                console.log("Attempting login with Supabase...");
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: formState.email,
                    password: formState.password,
                });

                console.log("Login response:", { data, error });

                if (error) throw error;

                alert("Login successful!");
                console.log("Redirecting...");
                navigate("/");
            } catch (error) {
                console.error("Login error:", error);
                alert("Login error: " + error.message);
            }
        }
    };


    const setField = (field) => (e) => {
        setFormState((prev) => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <div className="container mx-auto min-h-screen px-8 py-12 bg-transparent from-gray-900 to-black text-lime-400 flex flex-col items-center justify-center">


            <h1 className="text-5xl font-extrabold text-cyan-400 tracking-wide mb-6">
                Sign in now!
            </h1>
            <p className="text-lg text-gray-300 animate-pulse mb-8">
                Log in to your account to enjoy all our exclusive services.
            </p>


            <div className="w-full max-w-md bg-gray-900 border border-cyan-500 shadow-neon rounded-lg p-6">
                <form onSubmit={onSubmit} noValidate>


                    <div className="mb-6">
                        <label className="block text-lime-400 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="w-full p-3 bg-black border border-cyan-500 rounded-lg shadow-neon focus:ring focus:ring-cyan-500 text-white"
                            value={formState.email}
                            onChange={setField("email")}
                            required
                        />
                    </div>


                    <div className="mb-6">
                        <label className="block text-lime-400 mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-3 bg-black border border-cyan-500 rounded-lg shadow-neon focus:ring focus:ring-cyan-500 text-white"
                            value={formState.password}
                            onChange={setField("password")}
                            required
                        />
                    </div>


                    <button type="submit" className="w-full py-3 bg-lime-500 text-black font-bold rounded-lg shadow-neon hover:bg-cyan-500 transition-all duration-300 transform hover:scale-105">
                        Log in
                    </button>


                    <div className="text-center mt-6">
                        <span className="text-sm">Don't have an account? </span>
                        <Link to="/register" className="text-cyan-400 hover:text-lime-500 transition-all">
                            Register here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}