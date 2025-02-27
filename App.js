"use client";

import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CustomDrawer from "./src/components/CustomDrawer";
import { useAppContext } from "./src/context/AppContext";

// Importa tus pantallas
import HomeScreen from "./src/components/screens/HomeScreen";
import TestScreen from "./src/components/screens/TestScreen";
import ResultsScreen from "./src/components/screens/ResultsScreen";
import ForumScreen from "./src/components/screens/ForumScreen";
import DirectoryScreen from "./src/components/screens/DirectoryScreen";
import LocationScreen from "./src/components/screens/LocationScreen";
import ContactsScreen from "./src/components/screens/ContactsScreen";
import HistoryScreen from "./src/components/screens/HistoryScreen";
import SettingsScreen from "./src/components/screens/SettingsScreen";
import HelpScreen from "./src/components/screens/HelpScreen";
import CalculatorScreen from "./src/components/screens/CalculatorScreen";
import SplashScreen from "./src/components/screens/SplashScreen";
import LoginScreen from "./src/components/screens/LoginScreen";

const Stack = createStackNavigator();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("splash");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { sosActive } = useAppContext();

  useEffect(() => {
    if (sosActive && currentScreen !== "Location") {
      setTimeout(() => {
        setCurrentScreen("Location");
      }, 300);
    }
  }, [sosActive, currentScreen]);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleScreenChange = (screenName) => {
    setCurrentScreen(screenName);
  };

  if (currentScreen === "splash") {
    return <SplashScreen onFinish={() => setCurrentScreen("login")} />;
  }
  if (currentScreen === "login") {
    return <LoginScreen onLogin={() => setCurrentScreen("Home")} />;
  }

  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer
          onStateChange={(state) => {
            const currentRouteName = state?.routes[state.index]?.name;
            if (currentRouteName) {
              handleScreenChange(currentRouteName);
            }
          }}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: "#F5F7FA" },
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Test" component={TestScreen} />
            <Stack.Screen name="Results" component={ResultsScreen} />
            <Stack.Screen name="Forum" component={ForumScreen} />
            <Stack.Screen name="Directory" component={DirectoryScreen} />
            <Stack.Screen name="Location" component={LocationScreen} />
            <Stack.Screen name="Contacts" component={ContactsScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
            <Stack.Screen name="Calculator" component={CalculatorScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
      <CustomDrawer
        isOpen={drawerOpen}
        onClose={toggleDrawer}
        navigation={{ navigate: (screen) => setCurrentScreen(screen) }}
        currentScreen={currentScreen}
      />
    </>
  );
}
