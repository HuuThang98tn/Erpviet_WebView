import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NavigationContainerStack from './Navigation';
import { AuthProvider } from './context/AuthProvider';

type Props = {};

const App = (props: Props) => {
    return (
        <AuthProvider>
            <NavigationContainerStack />
        </AuthProvider>

    );
};

export default App;

const styles = StyleSheet.create({});