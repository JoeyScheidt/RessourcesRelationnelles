import React from 'react';
import './Help.css';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Help = () => {
    const faqData = [
        {
            question: 'Comment créer ma ressource',
            answer: 'Il faut se connecter ou créer un compte puis se rendre dans l\'onglet ressources. Ensuite il faut cliquer sur "Mes Ressources" pour pouvoir acceder au bouton de création de ressources'
        },
        {
            question: 'Comment partager une ressource',
            answer: 'Acceder à la ressource et cliquez sur l\'icone de partage'
        },
    ];

    const [expandedIndex, setExpandedIndex] = React.useState(-1);

    const handleToggle = (index: number) => {
      if (index === expandedIndex) {
        setExpandedIndex(-1);
      } else {
        setExpandedIndex(index);
      }
    };

    return (
        <div className="layout">
            <h3>Foire aux questions : réponses clés</h3>

            <div className="accordion">
                {faqData.map((item, index) => (
                    <div key={index} className="accordion-item">
                        <div
                            className="accordion-header"
                            onClick={() => handleToggle(index)}
                        >
                            <span className="question">{item.question}</span>
                            {expandedIndex === index ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
                        </div>
                        {expandedIndex === index && <div className="reponse">{item.answer}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};
  
export default Help;