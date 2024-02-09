import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import ministere from '../../assets/img/ministere.png';
import './Header.css';

const Header = () => {
    return (
        <div>
            <div className="mainHeader">
                <img src={ministere} className="ministereLogo" alt="logo" />
                <h2>
                    (Re)sources Relationnelles
                </h2>
                <div className="endHeader">
                    <div className="loginHeader">
                        <FontAwesomeIcon icon={faCircleUser} />
                        <a 
                            className="loginLink"
                            href="/login"
                        >
                            Se connecter
                        </a>
                    </div>
                    <input type="text" placeholder="Rechercher" />
                </div>
            </div>

            <nav className="navbar">
                <ul className="navList">
                    <li className="navItems">
                        <a className="navLinks" href="/">
                            Accueil
                        </a>
                    </li>
                    <li className="navItems">
                        <a className="navLinks" href="/resources">
                            Ressources
                        </a>
                    </li>
                    <li className="navItems">
                        <a className="navLinks" href="/help">
                            Aide
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
  
export default Header;