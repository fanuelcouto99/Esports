import { ImageBackground } from 'react-native';
import { styles } from './styles';
import backgroundImg from '../../assets/background-galaxy.png';

interface Props {
    children: React.ReactNode;
};

// Pegando tudo que for dentro do componente para repassar para o background
export function Background({ children }: Props) {
    return (
        <ImageBackground source={backgroundImg} style={styles.container} defaultSource={backgroundImg}>
            {children}
        </ImageBackground>
    );
};