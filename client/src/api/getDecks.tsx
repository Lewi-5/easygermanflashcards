import { API_URL } from "./config";

export type GDeck = {
    title: string,
    _id: string
}

export async function getDecks(): Promise<GDeck[]> {
    const response = await fetch(`${API_URL}/decks`);
    return response.json();
}