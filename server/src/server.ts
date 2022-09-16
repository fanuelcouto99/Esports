import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinute } from './utils/convert-hours-string-to-minutes';
import { convertMinutesHoursToString } from './utils/convert-minutes-hours-to-string';

const app = express();

app.use(express.json());

app.use(cors());

const prisma = new PrismaClient({
    log: ['query']
});

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });
    return response.json(games);
});

// Criando que esteja relacionada a um jogo - Sempre que for criar um ad é preciso passar o id do game
app.post('/games/:gamesId/ads', async (request, response) => {
    const gameId = request.params.gamesId;
    const body = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hoursStart: convertHourStringToMinute(body.hourStart),
            hoursEnd: convertHourStringToMinute(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    });

    return response.status(201).json(ad);
});

// Rota para pegar os ads de um game específico
app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hoursStart: true,
            hoursEnd: true,
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return response.json(ads.map(ad => {
        // Retornando todos os ads como estão(...ad), porem os dias da semana separados por virgula e as horas para o formato de hora
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hoursStart: convertMinutesHoursToString(ad.hoursStart),
            hoursEnd: convertMinutesHoursToString(ad.hoursEnd)
        }
    }));
});

// Rota para pegar o discord de um anuncio específico
app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma .ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    });

    return response.json({
        discord: ad.discord
    });
});

app.listen(3333, () => {
    console.log('HTTP: Server Running!');
});