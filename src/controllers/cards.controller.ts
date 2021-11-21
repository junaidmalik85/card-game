import { CardsService } from "../services"
import { Request, Response } from "express";
import { Selection } from "../models"

const service = new CardsService()

export class CardsController {

    createDeck = (req: Request, res: Response) => {
        try {
            const userSelection: Selection = req.body
            res.send(service.createDeck(userSelection))
        } catch (error) {
            res.status(400)
            res.send({ error })
        }
    }

    openDeck = (req: Request, res: Response) => {
        try {
            res.send(service.openDeck(req.params.deckId))
        } catch (error) {
            res.status(400)
            res.send({ error })
        }
    }

    drawFromDeck = (req: Request, res: Response) => {
        try {
            res.send(service.drawFromDeck(req.params.deckId, Number(req.params.count)))
        } catch (error) {
            res.status(400)
            res.send({ error })
        }
    }
}
