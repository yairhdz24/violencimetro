import { registerRootComponent } from 'expo';
import React from 'react';
import App from './App';
import { AppProvider } from './src/context/AppContext';

const Root = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

registerRootComponent(Root);
