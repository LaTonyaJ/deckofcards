import React from 'react';

function Card({img, name, id}) {
    return (
        <div>
            <img src={img} alt={name}/>
        </div>
    );
};

export default Card;