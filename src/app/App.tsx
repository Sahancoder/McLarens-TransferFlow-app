import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation/RootNavigator';
import { AuthProvider } from './providers/AuthProvider';
import { TransferProvider } from '../features/transfers/context/TransferContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <TransferProvider>
          <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <RootNavigator />
          </NavigationContainer>
        </TransferProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
