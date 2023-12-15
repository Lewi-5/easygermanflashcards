import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom';
import { deleteDeck } from './api/deleteDeck';
import { getDecks } from './api/getDecks';
import { createDeck } from './api/createDeck';

interface Deck {
  _id: string;
  title: string;
}

function App() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [title, setTitle] = useState('');




  async function handleCreateGroup (e: React.FormEvent){
    e.preventDefault();
    if (title === "") return;
    console.log("button clicked");
    const deck = await createDeck(title);
    setDecks([...decks, deck]);
    setTitle("");
  }

  async function handleDelete(deckId: string) {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId))
  }

  useEffect(() => {
    console.log("use effect has fired");
    async function fetchDecks() {
      const decksList = await getDecks();
      setDecks(decksList);
    }
    fetchDecks();
  }, []);

  return <div className='App'>
    <ul className="decks">
    {decks.map((deck) => (
        <li key={deck._id}> 
        <Link to={`decks/${deck._id}`}>{deck.title}</Link>
        <button onClick={() => handleDelete(deck._id)}>X</button>
        </li>
      ))}
    </ul>
    <form onSubmit={handleCreateGroup}>
      <label htmlFor='deck-title'><span id='vocabGroup'>Vocabulary Group</span></label>
      <input id='deck-title' value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          {
            setTitle(e.target.value);
          }
        }}
      />
      <button>Create Group</button>
    </form>
  </div>;
  
}

export default App
