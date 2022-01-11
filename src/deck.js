import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Card from './card';
import './deck.css';

const BASE_URL = 'http://deckofcardsapi.com/api/deck';


function Deck(){

    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [autoDraw, setAutoDraw] = useState(false);
    const timerRef = useRef(null); 

    useEffect(() => {
        async function getDeck(){
            try{
            let card = await axios.get(`${BASE_URL}/new/shuffle/`);
            //console.log('deck:', card.data);
            setDeck(card.data);
            }catch(err){
                alert(err);
            }
        };
        getDeck(); 
    },[]);
    
    useEffect(() => {
        async function getCard(){
            //return previous deck
            if(deck === null){
                return; 
            }
            let { deck_id } = deck;
            try{
                //draw from deck
                let c = await axios.get(
                `${BASE_URL}/${deck_id}/draw/`
                );

                if(c.data.remaining === 0){
                throw new Error('no cards remaining!');
                }
                //get card
                const card = c.data.cards[0];
                //add card to drawn
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

    if(autoDraw){
        timerRef.current = setInterval(async () => {
            await getCard();
        }, 1000);
    };

    return() =>  {
        clearInterval(timerRef.current);
        timerRef.current = null;
    };
}, [autoDraw, deck]);

    const handleDraw = () => {
        //getCard();
        setAutoDraw(auto => !auto);
    };
        
    const cards = drawn.map(c =>(
        <Card img={c.img} name={c.name} key={c.id} />
    ));

    return(
        <div>
            <button onClick={handleDraw}>{autoDraw ? 'Stop ': 'Keep '}Drawing Cards!</button>
            <div className='Deck'>{cards}</div>
        </div>
    );
}

export default Deck;
