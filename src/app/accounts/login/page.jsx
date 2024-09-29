"use client"

import Link from "next/link";
import {useEffect, useState} from "react";
import {signIn, signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {motion} from "framer-motion";
import {jwtDecode} from "jwt-decode";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (email === '') {
            setErrorMessage("Email can't be blank");
            setLoading(false);
            return;
        }

        if (password === '') {
            setErrorMessage("Password can't be blank");
            setLoading(false);
            return;
        }

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        });

        if (result.error) {
            setLoading(false);
            setErrorMessage(result.error);
        } else {
            const response = await fetch("/api/auth/session");
            const session = await response.json();
            const role = session.user.role;

            setLoading(false);
            router.push(role === 'USER' ? "/dashboard/user" : "/dashboard/admin");
        }
    };

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch("/api/auth/session");
            return response.json();
        };

        fetchSession().then(async response => {
            const session = response;

            if (session.accessToken) {
                const accessToken = session.accessToken;
                const decodedToken = jwtDecode(accessToken);
                const expiryTime = decodedToken.exp * 10000;
                const currentTime = Date.now();

                if (currentTime > expiryTime) {
                    await signOut({callbackUrl: '/accounts/login'});
                }
            }

            if (session.user) {
                const role = session.user.role;
                router.push(role === 'USER' ? "/dashboard/user" : "/dashboard/admin");
            }
        });
    }, []);

    return (
        <section className={`h-full p-4 flex items-center justify-center`}>
            <motion.div
                className={`flex flex-col gap-6 w-[90%] md:w-[60%]`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <h1 className={`font-bold text-3xl text-indigo-600`}>Welcome Back! 👋</h1>
                    <p className={`text-sm text-gray-700`}>Please log in to continue</p>
                </div>
                <form className={`flex flex-col gap-4`} onSubmit={handleSubmit}>
                    {errorMessage && (
                        <p className={`text-red-600 text-sm`}>{errorMessage}</p>
                    )}
                    <div className={`login-input-box`}>
                        <label htmlFor={`email`} className={`label`}>Email address *</label>
                        <input
                            type={`email`}
                            name={`email`}
                            className={`input border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                            id={`email`}
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </div>

                    <div className={`login-input-box`}>
                        <label htmlFor={`password`} className={`label`}>Password *</label>
                        <input
                            type={`password`}
                            name={`password`}
                            className={`input border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                            id={`password`}
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>

                    <button className={`bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition duration-200`}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                <div className={`flex justify-between`}>
                    <Link href={`/accounts/forgot-password`} className={`text-sm text-gray-700 underline`}>
                        Forgot password?
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};

export default Login;
