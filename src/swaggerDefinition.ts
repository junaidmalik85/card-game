const url = 'http://localhost:' + process.env.PORT
const desp = 'Card game server'

const deckObject = {
    type: 'object',
    properties: {
        deckId: {
            type: 'string'
        },
        type: {
            type: 'string',
            enum: ['FULL', 'SHORT']
        },
        shuffled: {
            type: 'boolean'
        },
        remaining: {
            type: 'number'
        }
    }
}

const cards = {
    type: "array",
    items: {
        properties: {
            value: {
                type: 'string'
            },
            suit: {
                type: 'string',
                enum: ['CLUBS', 'DIAMONDS', 'HEARTS', 'SPADES']
            },
            code: {
                type: 'string'
            }
        }
    }
}

const deckViewObject = {
    type: 'object',
    properties: {
        deckId: {
            type: 'string'
        },
        type: {
            type: 'string',
            enum: ['FULL', 'SHORT']
        },
        shuffled: {
            type: 'boolean'
        },
        remaining: {
            type: 'number'
        },
        cards: cards
    }
}

export default {
    openapi: '3.0.0',
    info: {
        title: 'Card Game APIs',
        version: '1.0.0'
    },
    servers: [
        {
            url: url,
            description: desp
        }],
    securitySchemes: {},
    components: {
        schemas: {
            DeckCreatedModel: deckObject,
            ViewDeckModel: deckViewObject,
            CardsViewModel: {
                type: 'object',
                properties: {
                    cards: cards
                }
            },
            SelectionModel: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        enum: ['FULL', 'SHORT']
                    },
                    shuffled: {
                        type: 'boolean'
                    }
                }
            },
            ErrorResponseModel: {
                type: 'object',
                properties: {
                    error: {
                        type: 'string'
                    }
                }
            }
        }
    }
}