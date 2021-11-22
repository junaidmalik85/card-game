import { v4 } from "uuid";
import { shuffle, findWhere } from "underscore"
import { Cards, Selection, suit, type, SuitObjects } from "../models"

export class CardsService {
    private decks: Array<Cards>; //Use to store decks in memory
    constructor() {
        this.decks = []
    }
    createDeck(userSelection: Selection) {
        if (!userSelection.type) {
            throw ('type is required i.e. FULL or SHORT')
        }
        if (!userSelection.shuffled) {
            userSelection.shuffled = false
        }
        const newDeck: Cards = {
            deckId: v4(),
            ...userSelection,
            remaining: 0,
            cards: [
                ...this.generateSuit('CLUBS', userSelection.type),
                ...this.generateSuit('DIAMONDS', userSelection.type),
                ...this.generateSuit('HEARTS', userSelection.type),
                ...this.generateSuit('SPADES', userSelection.type)
            ]
        }
        newDeck.remaining = newDeck.cards.length
        if (userSelection.shuffled) {
            newDeck.cards = shuffle(newDeck.cards)
        }
        this.decks.push(newDeck)
        return {
            deckId: newDeck.deckId,
            shuffled: newDeck.shuffled,
            type: newDeck.type,
            remaining: newDeck.remaining
        };
    }

    openDeck(deckId: string) {
        return this.findDeckById(deckId)
    }

    drawFromDeck(deckId: string, count: number) {
        let drawnCards: SuitObjects = [];
        if (!count) {
            throw ('Please provide count')
        }
        const deck = this.findDeckById(deckId)
        if (count > deck.remaining) {
            throw ('Cannot draw more than remaining number of cards.')
        }
        drawnCards = deck.cards.slice(0, count)
        deck.cards = deck.cards.slice(count)
        deck.remaining = deck.cards.length
        if (deck.shuffled) {
            deck.cards = shuffle(deck.cards)
        }
        return {
            cards: drawnCards
        }
    }

    generateSuit(suit: suit, type: type) {
        const suitGroup: SuitObjects = [];
        for (let i = 1; i <= 13; i++) {
            if (type === 'SHORT' && (i > 2 && i < 7)) {
                continue
            }
            const value = i === 1 ? 'ACE' : i === 11 ? 'JACK' :
                i === 12 ? 'QUEEN' : i === 13 ? 'KING' : String(i)
            suitGroup.push({
                value: value,
                suit: suit,
                code: (value === '10' ? '10' : value[0]) + suit[0]
            })
        }
        return suitGroup
    }

    findDeckById(deckId: string) {
        if (!deckId) {
            throw ('Please provide deckId')
        }
        const deckFound = findWhere(this.decks, { deckId: deckId });
        if (!deckFound) {
            throw ('Invalid deckId')
        }
        return deckFound
    }
}