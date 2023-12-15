import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, useParams } from 'react-router-dom';
import { deleteDeck } from './api/deleteDeck';
import { GDeck, getDecks } from './api/getDecks';
import { createDeck } from './api/createDeck';
import { createCard } from './api/createCard';
import { getDeck } from './api/getDeck';
import { deleteCard } from './api/deleteCard';



export default function Deck() {;
  const [deck, setDeck] = useState<GDeck | undefined>(); 
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState('');
  let {deckId} = useParams();




  async function handleCreateCard (e: React.FormEvent){
    e.preventDefault();
    if (text === "") return;
    console.log("create card button clicked");
    const {cards: deliveredCards} = await createCard(deckId!, text);
    setCards(deliveredCards);
    setText("");
  }

  async function handleDeleteCard(index: number) {
    if (!deckId) return;
    await deleteCard(deckId, index);
    const currDeck = await getDeck(deckId);
    setCards(currDeck.cards);
    //setDecks(decks.filter((deck) => deck._id !== deckId))
  }

  useEffect(() => {;
    console.log("use effect has fired");
    async function fetchDeck() {;
        if (!deckId) return;
      const currDeck = await getDeck(deckId);
      setDeck(currDeck);
      setCards(currDeck.cards);
    };
    fetchDeck();
  }, [deckId]);

  return <div className='App'>
    <Link to={'/'} id="homeLink">Home</Link>
    <h1>{deck?.title}</h1>
     <ul className="decks">
     {cards.map((card, index) => (
         <li key={index}> 
         {card}
         <button onClick={() => handleDeleteCard(index)}>X</button>
         </li>
       ))}
     </ul> 
    <form onSubmit={handleCreateCard}>
       <label htmlFor='card-text'><span id='vocabGroup'>Card Content</span></label>
       <input id='card-text' value={text}
         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          {
             setText(e.target.value);
           }
         }}
       />
      <button>Add Card</button>
     </form>
    </div>;
}