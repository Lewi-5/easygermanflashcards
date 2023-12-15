import {Request, Response} from 'express';
import Deck from "../models/Deck";

export async function getDecksController(){
    async (req: Request, res: Response) => {
        const decks = await Deck.find();
    
        res.json(decks);
}
}