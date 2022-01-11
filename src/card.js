import React, {useState} from 'react';
import './card.css';

function Card({img, name}) {
    const [{xPos, yPos, angle}] = useState({
        xPos: Math.random() * 40 - 20,
        yPos: Math.random() * 40 - 20,
        angle: Math.random() * 90 - 45
    });

    const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;

    return (
        <img className='Card' 
        src={img} 
        alt={name} 
        style={{transform}}
        />
    );
};

export default Card;