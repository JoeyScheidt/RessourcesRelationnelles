import ministere from '../assets/img/ministere.png';
import './Header.css';

const Header = () => {
    return (
        <div>
            <div className="MainHeader">
                <img src={ministere} className="MinistereLogo" alt="logo"/>
                <h1>
                    (Re)sources Relationnelles
                </h1>
                <div className="EndHeader">
                    <p className="LoginHeader">
                        Se connecter
                    </p>
                    <input type="text" placeholder="Rechercher" />
                </div>
            </div>

            <nav className="Nav">
                <ul className="NavList">
                <li className="NavItems">
                    <a className="NavLinks" href="/">
                        Accueil
                    </a>
                </li>
                <li className="NavItems">
                    <a className="NavLinks" href="/ressources">
                        Ressources
                    </a>
                </li>
                <li className="NavItems">
                    <a className="NavLinks" href="/aide">
                        Aide
                    </a>
                </li>
                </ul>
            </nav>
        </div>
    );
};
  
export default Header;