import app from '../app'
import { CardsController } from "../controllers"

const controller = new CardsController()

/**
 * @openapi
 * "/cards/create": {
       *       "post": {
       *             "tags": [
       *                   "cards-create"
       *             ],
       *             "summary": "Create a new deck",
       *             "description": "Create a deck based on user selection i.e. its type (FULL or SHORT) and option to shuffle it or not.",
       *             "consumes": [
       *                   "application/json"
       *             ],
       *             "produces": [
       *                   "application/json"
       *             ],
       *             "requestBody":
       *                   {
       *                         "description": "User selection options are required to create a deck.",
       *                         "content": {
       *                               "application/json": {
       *                                     "schema": {
       *                                           "$ref": "#/components/schemas/SelectionModel"
       *                                     }
       *                               }
       *                         }
       *                   },
       *             "responses": {
       *                   "200": {
       *                         "description": "success",
       *                         "content": {
       *                               "application/json": {
       *                                     "schema": {
       *                                           "$ref": "#/components/schemas/DeckCreatedModel"
       *                                     }
       *                               }
       *                         }
       *                   },
       *                   "400": {
       *                         "description": "failure",
       *                         "content": {
       *                               "application/json": {
       *                                     "schema": {
       *                                           "$ref": "#/components/schemas/ErrorResponseModel"
       *                                     }
       *                               }
       *                         }
       *                   }
       *             }
       *       }
       * }
 */

app.post('/cards/create', controller.createDeck)

/**
 * @openapi
 * "/cards/open/{deckId}": {
       *       "get": {
       *             "tags": [
       *                   "cards-open"
       *             ],
       *             "summary": "Fetch the deck using deckId",
       *             "description": "Provide a deckId to fetch its information plus the cards remaining inside the deck.",
       *             "consumes": [
       *                   "application/json"
       *             ],
       *             "produces": [
       *                   "application/json"
       *             ],
       *             "parameters": [
       *                   {
       *                         "name": "deckId",
       *                         "in": "path",
       *                         "description": "deckId is required for fetching deck.",
       *                         "required": true,
       *                         "type": "string"
       *                   }
       *             ],
       *             "responses": {
       *                   "200": {
       *                         "description": "success",
       *                         "content": {
       *                               "application/json": {
       *                                     "schema": {
       *                                           "$ref": "#/components/schemas/ViewDeckModel"
       *                                     }
       *                               }
       *                         }
       *                   },
       *                   "400": {
       *                         "description": "failure",
       *                         "content": {
       *                               "application/json": {
       *                                     "schema": {
       *                                           "$ref": "#/components/schemas/ErrorResponseModel"
       *                                     }
       *                               }
       *                         }
       *                   }
       *             }
       *       }
       * }
 */
app.get('/cards/open/:deckId', controller.openDeck)


/**
 * @openapi
 * "/cards/draw/{deckId}/{count}": {
       *       "put": {
       *             "tags": [
       *                   "cards-draw"
       *             ],
       *             "summary": "Draw number of cards for given deck",
       *             "description": "Draw cards from deck using provided deckId and count value which represent how many cards to be drawn",
       *             "consumes": [
       *                   "application/json"
       *             ],
       *             "produces": [
       *                   "application/json"
       *             ],
       *             "parameters": [
       *                   {
       *                         "name": "deckId",
       *                         "in": "path",
       *                         "description": "deckId is required for fetching deck.",
       *                         "required": true,
       *                         "type": "string"
       *                   },
       *                   {
       *                         "name": "count",
       *                         "in": "path",
       *                         "description": "count is required for poping number cards from deck.",
       *                         "required": true,
       *                         "type": "string"
       *                   }
       *             ],
       *             "responses": {
       *                   "200": {
       *                         "description": "success",
       *                         "content": {
       *                               "application/json": {
       *                                     "schema": {
       *                                           "$ref": "#/components/schemas/CardsViewModel"
       *                                     }
       *                               }
       *                         }
       *                   },
       *                   "400": {
       *                         "description": "failure",
       *                         "content": {
       *                               "application/json": {
       *                                     "schema": {
       *                                           "$ref": "#/components/schemas/ErrorResponseModel"
       *                                     }
       *                               }
       *                         }
       *                   }
       *             }
       *       }
       * }
 */
app.put('/cards/draw/:deckId/:count', controller.drawFromDeck)