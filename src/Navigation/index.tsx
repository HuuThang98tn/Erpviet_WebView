import { StyleSheet, Text, View } from 'react-native';
import React, { Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/AuthenticationScreen/LoginScreen';
import WebViewErpViet from '../pages/WebView/WebViewErpViet';
import RegisterScreen from '../pages/AuthenticationScreen/RegisterScreen';

type Props = {};
const Native = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const NavigationContainerStack = (props: Props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="LoginScreen">
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="WebViewErpViet" component={WebViewErpViet} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NavigationContainerStack;

const styles = StyleSheet.create({});