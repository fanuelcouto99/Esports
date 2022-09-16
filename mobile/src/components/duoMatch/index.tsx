import { Modal, ModalProps, Text, View } from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';

interface Props extends ModalProps {
    discord: string;
}

export function DuoMatch({ discord, ...rest }: Props) {
    return (
        <Modal {...rest} transparent statusBarTranslucent>
            <View style={styles.container}>
                <Text style={styles.discord}>
                    {discord}
                </Text>
            </View>
        </Modal>
    );
};