import { expect } from 'chai'
import request from 'supertest';
import { cards } from '../mocks/unshafffledFullCards'
import { cardsShort } from '../mocks/unshaffledShortCards'

describe("Cards APIs", () => {
    let server;
    let shuffledDeckId: string;
    let unshuffledDeckId: string;
    let shuffledShortDeckId: string;
    let unshuffledShortDeckId: string;
    before(async () => {
        const mod = await import('../../index');
        server = (mod as any).default;
    });
    after((done) => {
        if (server) {
            server.close(done);
        }
    });

    it('POST /cards/create - Create a deck with full 52 cards (unshuffled)', async () => {
        const res = await request(server)
            .post('/cards/create')
            .set('Accept', 'application/json')
            .send({
                "type": "FULL",
                "shuffled": false
            });
        unshuffledDeckId = res.body.deckId;
        expect(res.status).to.equal(200);
        expect(res.body.deckId).to.be.a("string");
        expect(res.body.shuffled).to.equal(false);
        expect(res.body.type).to.equal("FULL");
        expect(res.body.remaining).to.equal(52);
    })

    it('get /cards/open/:deckId - Get a deck with full 52 cards (unshuffled)', async () => {
        const res = await request(server)
            .get('/cards/open/' + unshuffledDeckId)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.deckId).to.be.a("string");
        expect(res.body.shuffled).to.equal(false);
        expect(res.body.cards).to.deep.equal(cards);
        expect(res.body.type).to.equal("FULL");
        expect(res.body.remaining).to.equal(52);
    })

    it('POST /cards/create - Create a deck with full 52 cards (shuffled)', async () => {
        const res = await request(server)
            .post('/cards/create')
            .set('Accept', 'application/json')
            .send({
                "type": "FULL",
                "shuffled": true
            });
        shuffledDeckId = res.body.deckId;
        expect(res.status).to.equal(200);
        expect(res.body.deckId).to.be.a("string");
        expect(res.body.type).to.equal("FULL");
        expect(res.body.shuffled).to.equal(true);
        expect(res.body.remaining).to.equal(52);
    })

    it('get /cards/open/:deckId - Get a deck with full 52 cards (shuffled)', async () => {
        const res = await request(server)
            .get('/cards/open/' + shuffledDeckId)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.deckId).to.be.a("string");
        expect(res.body.shuffled).to.equal(true);
        expect(res.body.cards).to.not.equal(cards);
        expect(res.body.type).to.equal("FULL");
        expect(res.body.remaining).to.equal(52);
    })

    it('POST /cards/create - Create a deck with short 36 cards (unshuffled)', async () => {
        const res = await request(server)
            .post('/cards/create')
            .set('Accept', 'application/json')
            .send({
                "type": "SHORT",
                "shuffled": false
            });
        unshuffledShortDeckId = res.body.deckId;
        expect(res.status).to.equal(200);
        expect(res.body.deckId).to.be.a("string");
        expect(res.body.type).to.equal("SHORT");
        expect(res.body.shuffled).to.equal(false);
        expect(res.body.remaining).to.equal(36);
    })

    it('get /cards/open/:deckId - Get a deck with short 36 cards (unshuffled)', async () => {
        const res = await request(server)
            .get('/cards/open/' + unshuffledShortDeckId)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.deckId).to.be.a("string");
        expect(res.body.shuffled).to.equal(false);
        expect(res.body.cards).to.deep.equal(cardsShort);
        expect(res.body.type).to.equal("SHORT");
        expect(res.body.remaining).to.equal(36);
    })

    it('POST /cards/create - Create a deck with short 36 cards (shuffled)', async () => {
        const res = await request(server)
            .post('/cards/create')
            .set('Accept', 'application/json')
            .send({
                "type": "SHORT",
                "shuffled": true
            });
        shuffledShortDeckId = res.body.deckId;
        expect(res.status).to.equal(200);
        expect(res.body.deckId).to.be.a("string");
        expect(res.body.type).to.equal("SHORT");
        expect(res.body.shuffled).to.equal(true);
        expect(res.body.remaining).to.equal(36);
    })

    it('get /cards/open/:deckId - Get a deck with short 36 cards (shuffled)', async () => {
        const res = await request(server)
            .get('/cards/open/' + shuffledShortDeckId)
            .set('Accept', 'application/json')
            .send();
        expect(res.status).to.equal(200);
        expect(res.body.deckId).to.be.a("string");
        expect(res.body.shuffled).to.equal(true);
        expect(res.body.cards).to.not.equal(cardsShort);
        expect(res.body.type).to.equal("SHORT");
        expect(res.body.remaining).to.equal(36);
    })

    it('POST /cards/create - If type is undefined throw error.', async () => {
        const res = await request(server)
            .post('/cards/create')
            .set('Accept', 'application/json')
            .send({});
        expect(res.status).to.equal(400);
    })
})