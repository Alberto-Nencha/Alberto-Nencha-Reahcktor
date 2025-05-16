import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase/supabase-client";
import { ConfirmSchema, getErrors, getFieldError } from "../../lib/validationForm";

export default function RegisterPage() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        const result = ConfirmSchema.safeParse(formState);
        if (!result.success) {
            setFormErrors(getErrors(result.error));
        } else {
            try {
                const { data, error } = await supabase.auth.signUp({
                    email: formState.email,
                    password: formState.password,
                    options: {
                        data: {
                            first_name: formState.firstName,
                            last_name: formState.lastName,
                            username: formState.username,
                        },
                    },
                });

                if (error) throw error;

                alert("Registration completed!");
                navigate("/");
            } catch (error) {
                alert("Error while registering: " + error.message);
            }
        }
    };

    const setField = (field) => (e) => {
        setFormState((prev) => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <div className="container mx-auto min-h-screen px-8 py-12 bg-transparent from-gray-900 to-black text-lime-400 flex flex-col items-center justify-center">
            <h1 className="text-5xl font-extrabold text-cyan-400 tracking-wide mb-6">
                Register now!
            </h1>

            <div className="w-full max-w-md bg-gray-900 border border-cyan-500 shadow-neon rounded-lg p-6">
                <form onSubmit={onSubmit} noValidate>
                    {["email", "firstName", "lastName", "username", "password"].map((field) => (
                        <div key={field} className="mb-6">
                            <label className="block text-lime-400 mb-2 capitalize">{field}</label>
                            <input
                                type={field === "password" ? "password" : "text"}
                                placeholder={`Enter your ${field}`}
                                className="w-full p-3 bg-black border border-cyan-500 rounded-lg shadow-neon focus:ring focus:ring-cyan-500 text-white"
                                value={formState[field]}
                                onChange={setField(field)}
                                required
                            />
                        </div>
                    ))}

                    <button type="submit" className="w-full py-3 bg-lime-500 text-black font-bold rounded-lg shadow-neon hover:bg-cyan-500 transition-all duration-300 transform hover:scale-105">
                        Register
                    </button>

                    <div className="text-center mt-6">
                        <span className="text-sm">Already have an account? </span>
                        <a href="/login" className="text-cyan-400 hover:text-lime-500 transition-all">
                            Log in here
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}