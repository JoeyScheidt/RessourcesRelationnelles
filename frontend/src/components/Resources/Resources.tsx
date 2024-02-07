import './Resources.css';

const Resources = () => {
    return (
        <div>
            <h3>Listes des ressources</h3>

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