import express, { Request, Response } from 'express';

const app = express();

app.get('/games', (request: Request, response: Response) => {
    return response.json([]);
});

app.post('/ads', (request: Request, response: Response) => {
    return response.status(201).json([]);
});

// Rota para pegar os ads de um game específico
app.get('/games/:id/ads', (request: Request, response: Response) => {
    return response.json('Acessou Ads!');
});

// Rota para pegar o discord de um anuncio específico
app.get('/ads/:id/discord', (request: Request, response: Response) => {
    return response.json('Acessou Ads!');
});

app.listen(3333, () => {
    console.log('HTTP: Server Running!');
});