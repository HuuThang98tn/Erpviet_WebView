import React from 'react';
import {
    useWindowDimensions,
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import colors from '../../styles/colors';

type Props = {};

const ModalLoading = ({ visible = false }: any) => {
    const { width, height } = useWindowDimensions();
    return (
        visible && (
            <View style={[styles.container, { height, width }]}>
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={colors.BLUE} />
                    <Text style={{ marginLeft: 10, fontSize: 16, color: colors.VIOLETS }}>Loading...</Text>
                </View>
            </View>
        )
    );
};

export default ModalLoading;

const styles = StyleSheet.create({
    loader: {
        height: 70,
        backgroundColor: colors.WHITE,
        marginHorizontal: 50,
        borderRadius: 5,
        flexDirection: 'row', 
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
});