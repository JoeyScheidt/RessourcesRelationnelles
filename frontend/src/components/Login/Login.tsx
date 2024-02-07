import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const createAccount = () => {
        navigate('/registration');
    }
  
    const handleLogin = (e: any) => {
      e.preventDefault();
      // handle login logic here
    }

    return (
        <form onSubmit={handleLogin} className="loginForm">
            <h3 className="loginTitle">
                Connexion
            </h3>
            <input
                type="email"
                placeholder="Adresse mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="loginInput"
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="loginInput"
            />
            <a href="#" className="forgotPassword">
                Mot de passe oublié?
            </a>

            <div className="containerBtn">
                <button className="createBtn" onClick={createAccount}>
                    Créer un compte
                </button>
                <button type="submit" className="loginBtn">
                    Se connecter
                </button>
            </div>
        </form>
    );
};
  
export default Login;