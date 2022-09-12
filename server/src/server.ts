import express, { Request, Response } from 'express';

const app = express();

app.get('/ads', (request: Request, response: Response) => {
    return response.json('Acessou Ads!');
});

app.listen(3333, () => {
    console.log('HTTP: Server Running!');
});