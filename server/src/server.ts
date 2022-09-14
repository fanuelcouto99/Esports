import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();

const prisma = new PrismaClient({
    log: ['query']
});

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany();
    return response.json(games);
});

app.post('/ads', (request, response) => {
    return response.status(201).json([]);
});

// Rota para pegar os ads de um game específico
app.get('/games/:id/ads', (request, response) => {
    return response.json('Acessou Ads!');
});

// Rota para pegar o discord de um anuncio específico
app.get('/ads/:id/discord', (request, response) => {
    return response.json('Acessou Ads!');
});

app.listen(3333, () => {
    console.log('HTTP: Server Running!');
});