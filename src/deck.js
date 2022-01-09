import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from './card';

const BASE_URL = 'http://deckofcardsapi.com/api/deck';


function Deck(){

    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]); 

    useEffect(() => {
        async function getDeck(){
            let card = await axios.get(`${BASE_URL}/new/shuffle/`);
            console.log(card.data);
            setDeck(card.data);
            console.log(deck);
        };
        getDeck(); 
    },[setDeck]);

    useEffect(() => {
        async function getCard(){
            let { deck_id } = deck;
            console.log(deck_id);
            try{
            let c = await axios.get(`${BASE_URL}/${deck_id}/draw/?count=1`);

            if(c.data.remaining === 0){
                throw new Error('No more cards!');
            }

            let card = c.data.cards[0];

            setDrawn(d => [
                ...d,
                {
                 name: card.suit + " " + card.value,
                 img: card.image,
                 id: card.code   
                }
            ]);
            }catch(err){
                alert(err);
            }
        };
       getCard();
    },);

    const handleDraw = () => {
        setDrawn(deck);
    };
        
    const cards = drawn.map(c =>
        (<Card img={c.img} name={c.name} key={c.id}/>)
    );

    return(
        <div>
            <button onClick={handleDraw}>Draw a Card!</button>
            <div>{cards}</div>
        </div>
    )
}

export default Deck;
