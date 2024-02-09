import { useNavigate } from 'react-router';
import './Resources.css';

const Resources = () => {
    const navigate = useNavigate();

    const handleButtonClick = (route: any) => {
      navigate(route);
    };
  
    return (
        <div className="layout">
            <h3>Listes des ressources</h3>

            <button onClick={() => handleButtonClick('/resources/add')}>Création de ressources</button>

            <div>
            <label htmlFor="categorie">Catégorie:</label>
            <input
                type="text"
                id="categorie"
                name="categorie"
            />

            <label htmlFor="typeRelation">Type de relations:</label>
            <input
                type="text"
                id="typeRelation"
                name="typeRelation"
            />

            <label htmlFor="typeRessources">Type de ressources:</label>
            <input
                type="text"
                id="typeRessources"
                name="typeRessources"
            />
            </div>
        </div>
    );
};
  
export default Resources;