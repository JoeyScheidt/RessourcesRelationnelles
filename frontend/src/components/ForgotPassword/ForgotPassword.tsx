import { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleLogin = (e: any) => {
        e.preventDefault();
        // handle login logic here
    }

    return (
        <div className="layout">
            <form onSubmit={handleLogin} className="loginForm">
                <h3>
                    Modification de mot de passe
                </h3>
                <input
                    type="email"
                    placeholder="Adresse mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="loginInput"
                />
                
                <button className="createBtn">
                    Envoyer un mail de reset
                </button>
            </form>
        </div>
    );
};
  
export default ForgotPassword;