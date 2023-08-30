import { StyleSheet, Text, TextInput, View, } from 'react-native';
import React, { useState } from 'react';
import colors from '../../styles/colors';
import { IconMaterialCommunityIcons } from '../../styles/IconHelper';

type Props = {
    label?: string | any | null;
    iconName?: string;
    error?: string;
    password?: boolean;
    onFocus?: () => void | undefined | null;
    multiline?: string;
    valueText?: string;
    onChangeText?: (valueText: any) => void | undefined | null;
    placeholder?: string;
};

const InputCustom = (props: Props) => {
    const { label, iconName, error, password, onFocus, multiline, valueText, onChangeText, placeholder }: any = props;

    const [hidePassword, setHidePassword] = useState(password);
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={{ marginBottom: 3 }}>
            <Text style={styles.label}>{label}</Text>
            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor: error
                            ? colors.VIOLET
                            : isFocused
                                ? colors.VIOLET
                                : colors.NEVADA,
                        alignItems: multiline ? "flex-start" : "center",
                    },
                ]}>
                <IconMaterialCommunityIcons
                    name={iconName}
                    style={{ color: colors.VIOLET, fontSize: 22, marginRight: 10, marginTop: multiline && 6 }}
                />
                <TextInput
                    textAlignVertical={multiline && "top"}
                    multiline={multiline ? true : false}
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={hidePassword}
                    style={{ color: colors.BLACK, flex: 1 }}
                    placeholderTextColor="#BABBC3"
                    value={valueText}
                    onChangeText={(valueText) => onChangeText(valueText)}
                    placeholder={placeholder}

                />
                {password && (
                    <IconMaterialCommunityIcons
                        onPress={() => setHidePassword(!hidePassword)}
                        name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                        style={{ color: colors.VIOLET, fontSize: 22 }}
                    />
                )}
            </View>
            {error && (
                <Text style={{ paddingHorizontal: 6, marginTop: 6, color: colors.WHITE, fontSize: 12 }}>
                    {error}
                </Text>
            )}
        </View>
    );
};

export default InputCustom;

const styles = StyleSheet.create({
    label: {
        marginVertical: 0,
        fontSize: 12,
        color: colors.NEVADA,
    },
    inputContainer: {
        height: 46,
        backgroundColor: colors.WHITE,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderRadius: 6
    }
});