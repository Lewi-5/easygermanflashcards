import {Request, Response} from 'express';
import Deck from "../models/Deck";

export async function createDeckController() {
    async (req: Request, res: Response) => {
        const newDeck = new Deck({
          title: req.body.title,
        });
        const madeDeck = await newDeck.save();
        res.status(201).json(madeDeck);
}
}