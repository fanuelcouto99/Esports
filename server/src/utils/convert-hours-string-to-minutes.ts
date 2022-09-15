/**
    Função que recebe as horas no forma de hora ('18:00") e converte para minutos 1080
    A constante separa os campos pelo ':' e o map converte para numeros ("18","00")
    A constante minutesAmount recebe a posição de hora e multipla por 60 e soma com os minutos: (18 * 60) + 00
 */

export function convertHourStringToMinute(hourString: string) {
    const [hours, minutes] = hourString.split(':').map(Number);

    const minutesAmount = (hours * 60) + minutes;

    return minutesAmount;
}