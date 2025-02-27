import { registerRootComponent } from 'expo';
import React from 'react';
import App from './App';
import { AppProvider } from './src/context/AppContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Root = () => (
  <SafeAreaProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </SafeAreaProvider>
);

registerRootComponent(Root);
