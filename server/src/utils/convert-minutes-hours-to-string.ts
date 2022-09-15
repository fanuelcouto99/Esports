/**
    Função que recebe as horas no forma de string (1080) e converte para hora "18:00"
    A constante hours recebe os minutos dividindo pora 60 e arredonda para baixo
    A const minutes receber o resto da divisão da hours por 60 para saber quantos minutos tem
    A função padStart adiciona um '0' na frente da hora caso a hora não tenha 2 digitos: 08:00, 09:32
 */

    export function convertMinutesHoursToString(minutesAmount: number) {
        const hours = Math.floor(minutesAmount / 60);
        const minutes = minutesAmount % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }