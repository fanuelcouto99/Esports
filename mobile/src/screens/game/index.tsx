import { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { GameParams } from '../../@types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/background';
import { Heading } from '../../components/heading';
import { DuoCard, DuoCardProps } from '../../components/duoCard';
import { DuoMatch } from '../../components/duoMatch';
import { styles } from './styles';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Entypo } from '@expo/vector-icons';

export function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([]);
    const [discorDuoSelected, setDiscordDuoSelected] = useState('');

    const route = useRoute();
    const navigation = useNavigation();
    const game = route.params as GameParams;

    function handleGoBack() {
        navigation.goBack();
    };

    async function getDiscordUser(adsId: string) {
        fetch(`http://192.168.0.35:3333/ads/${adsId}/discord`)
            .then(response => response.json())
            .then(data => setDiscordDuoSelected(data.discord));
    };

    useEffect(() => {
        fetch(`http://192.168.0.35:3333/games/${game.id}/ads`)
            .then(response => response.json())
            .then(data => setDuos(data));
    }, []);

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={20} />
                    </TouchableOpacity>

                    <Image source={logoImg} style={styles.logo} />

                    {/* hack para centralizar imagem usando justify space-between */}
                    <View style={styles.right} />
                </View>

                <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover" />

                <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />
                <FlatList
                    data={duos} keyExtractor={item => item.id} renderItem={({ item }) => (
                        <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
                    )}
                    horizontal
                    contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
                    showsHorizontalScrollIndicator={false}
                    style={styles.containerList}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyListText}>
                            Não há anúncios publicados ainda!
                        </Text>
                    )}
                />

                <DuoMatch
                    visible={discorDuoSelected.length > 0}
                    discord="fanuel"
                    onClose={() => setDiscordDuoSelected('')}
                />
            </SafeAreaView>
        </Background>
    );
};