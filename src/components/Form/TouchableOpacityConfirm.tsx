import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '../../styles/colors';

type Props = {
    onPress?: () => void | any | undefined | null;
    textInput?: string;
    disabled?: boolean;

};

const TouchableOpacityConfirm = (props: Props) => {
    const { onPress, textInput, disabled } = props;
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}>
            <View
                style={styles.styleButtonConfirm}>
                <Text style={styles.stylesText}>{textInput}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default TouchableOpacityConfirm;

const styles = StyleSheet.create({
    styleButtonConfirm: {
        backgroundColor: colors.MANTIS,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center"
    },
    stylesText: {
        paddingVertical: 16,
        fontSize: 15,
        color: colors.WHITE,
        fontWeight: "700"
    }
});