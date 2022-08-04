import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../components/Layout";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async () => {
        setLoading(true);

        const req = await signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: ''
        });

        if (req.error) setError(req.error);

        if (req.url) router.push(req.url);

        setLoading(false);
    }

    return (

        <Layout>
            <div>
                {loading &&
                    <div>Carregando...</div>
                }
                {!loading &&
                    <div>
                        {error && <div>{error}</div>}
                        <input placeholder="Digite o email" type="email" value={email} onChange={e => setEmail(e.target.value)} /><br /><br />
                        <input placeholder="Digite a senha" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br /><br />
                        <button onClick={handleSubmit}>Entrar</button>
                    </div>
                }
            </div>
        </Layout>
    );
}

export default Login;