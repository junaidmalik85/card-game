
//Currnetly there is no database connected.
//Using interfaces as model schemas.

export type suit = "CLUBS" | "DIAMONDS" | "HEARTS" | "SPADES"
export type type = "FULL" | "SHORT"

export interface Selection {
    type: type;
    shuffled: boolean;
}

export interface SuitObject {
    value: string;
    suit: suit;
    code: string;
}

export type SuitObjects = Array<SuitObject>

export interface Cards extends Selection {
    deckId: string;
    cards: SuitObjects;
    remaining: number
}