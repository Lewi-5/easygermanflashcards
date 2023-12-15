import {config} from "dotenv";
config();
import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import Deck from "./models/Deck";
import cors from 'cors';
const app = express();

app.use(cors({
    origin: "*",
}));
app.use(express.json());

const PORT = 5003 || process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    
    res.send("testing");
});

app.get('/decks', async (req: Request, res: Response) => {
    const decks = await Deck.find();

    res.json(decks);
})

app.get('/decks/:deckId', async (req: Request, res: Response) => {
    const {deckId} = req.params;
    const deck = await Deck.findById(deckId);
    res.json(deck);
})

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const madeDeck = await newDeck.save();
  res.status(201).json(madeDeck);
})

app.post("/decks/:deckId/cards", async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const deck = await Deck.findById(deckId);
  if(!deck) return res.status(404).send('resource was not found');
  
  const {text} = req.body;

  deck?.cards.push(text);
  await deck?.save();
  res.json(deck);
})

app.delete('/decks/:deckId', async (req: Request, res: Response) => {
    const deckId = req.params.deckId;

    await Deck.findByIdAndDelete(deckId);

    res.json({
        message: "successfully deleted deck",
    })
})

app.delete("/decks/:deckId/cards/:index",async (req: Request, res: Response) =>{
    const deckId = req.params.deckId;
    const index = req.params.index;
    const deck = await Deck.findById(deckId);
    if (!deck) return res.status(400).send("no such resource was found");
    deck.cards.splice(parseInt(index), 1);
    await deck.save();
    res.json(deck);
})

mongoose.connect(process.env.MONGO_URL ?? "").then(()=>{
  
app.listen(PORT, () => {
    console.log(`Server is now lstening on port ${PORT}`);
});

})