import { Text, TouchableOpacity, View } from 'react-native';
import { GameController } from 'phosphor-react-native';
import { DuoInfo } from '../duoInfo';
import { THEME } from '../../theme';
import { styles } from './styles';

export interface DuoCardProps {
    id: string;
    hoursStart: string;
    hoursEnd: string;
    name: string;
    useVoiceChannel: boolean;
    weekDays: string[];
    yearsPlaying: number;
};

interface Props {
    data: DuoCardProps;
    onConnect: () => void;
};

export function DuoCard({ data, onConnect }: Props) {
    return (
        <View style={styles.container}>
            <DuoInfo
                label='Nome'
                value={data.name}
            />

            <DuoInfo
                label='Tempo de jogo'
                value={`${data.yearsPlaying} ano(s)`}
            />

            {/* \u2022 - codigo da tabela ascc para gerar a bolinha  */}
            <DuoInfo
                label='Disponibilidade'
                value={`${data.weekDays.length} dia(s) \u2022 ${data.hoursStart} - ${data.hoursEnd}`}
            />

            <DuoInfo
                label='Chamada de áudio?'
                value={data.useVoiceChannel ? "Sim" : "Não"}
                colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
            />

            <TouchableOpacity style={styles.button} onPress={onConnect}>
                <GameController color={THEME.COLORS.TEXT} size={20} />
                <Text style={styles.buttonTitle}>
                    Conectar
                </Text>
            </TouchableOpacity>
        </View>
    );
};