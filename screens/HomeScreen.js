import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  StyleSheet,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

// Screens
import SplashScreen from "./SplashScreen";
import LoginScreen from "./LoginScreen";
import MainHomeScreen from "./MainHomeScreen";
import TestScreen from "./TestScreen";
import ResultsScreen from "./ResultsScreen";
import ForumScreen from "./ForumScreen";
import DirectoryScreen from "./DirectoryScreen";
import LocationScreen from "./LocationScreen";
import ContactsScreen from "./ContactsScreen";
import HistoryScreen from "./HistoryScreen";
import SettingsScreen from "./SettingsScreen";
import HelpScreen from "./HelpScreen";
import CalculatorScreen from "./CalculatorScreen";

// Components
import DrawerMenu from "./DrawerMenu";



const HomeScreen = () => {
  const [currentScreen, setCurrentScreen] = useState("splash");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [riskLevel, setRiskLevel] = useState(2);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "María (Hermana)", phone: "+34 612 345 678" },
    { id: 2, name: "Centro de Ayuda", phone: "+34 900 123 456" },
    { id: 3, name: "Policía Local", phone: "112" },
  ]);
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      type: "Test completado",
      date: "25/02/2025",
      time: "14:32",
      riskLevel: 3,
    },
    {
      id: 2,
      type: "Alerta SOS",
      date: "20/02/2025",
      time: "22:15",
      riskLevel: 8,
    },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [sosActive, setSosActive] = useState(false);
  const [sosCounter, setSosCounter] = useState(0);
  const [lastSosPress, setLastSosPress] = useState(0);
  const [showPanicButton, setShowPanicButton] = useState(false);

  const drawerAnimation = useRef(new Animated.Value(-300)).current;

  // SOS handling
  useEffect(() => {
    if (sosCounter >= 3 && Date.now() - lastSosPress < 2000) {
      activateSOS();
      setSosCounter(0);
    } else if (Date.now() - lastSosPress > 2000) {
      setSosCounter(0);
    }
  }, [sosCounter, lastSosPress]);

  const handleSosPress = () => {
    setSosCounter((prev) => prev + 1);
    setLastSosPress(Date.now());
  };

  const activateSOS = () => {
    setSosActive(true);
    // In a real app this would trigger location sharing and audio recording
    setTimeout(() => {
      if (currentScreen !== "location") {
        setCurrentScreen("location");
      }
    }, 300);
  };

  const deactivateSOS = () => {
    setSosActive(false);
  };

  // Drawer animation
  const toggleDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: drawerOpen ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setDrawerOpen(!drawerOpen);
  };

  const handleLogin = () => {
    // In a real app, this would validate credentials
    setCurrentScreen("home");
  };

  const handleRegister = () => {
    // In a real app, this would create a new account
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
    setCurrentScreen("home");
  };

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < 4) {
      // 5 questions total (0-4)
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate risk level based on answers (higher index = higher risk)
      const riskSum = newAnswers.reduce((sum, answer) => sum + answer, 0);
      const calculatedRisk = Math.round((riskSum / (5 * 2)) * 10);
      setRiskLevel(calculatedRisk);
      setCurrentScreen("results");
    }
  };

  const startTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setCurrentScreen("test");
  };

  const handlePanicAction = () => {
    // Quick exit from app or switch to innocent-looking screen
    setCurrentScreen("calculator");
  };

  const handleHomeIconPress = (count = 1) => {
    // Easter egg - pressing home icon 5 times shows panic button
    if (count >= 5) {
      setShowPanicButton(true);
      setTimeout(() => setShowPanicButton(false), 5000);
    }
  };

  // Menu items for drawer
  const menuItems = [
    { icon: "home", name: "Inicio", screen: "home" },
    { icon: "help-outline", name: "Test de Riesgo", screen: "test" },
    { icon: "forum", name: "Foro de Ayuda", screen: "forum" },
    { icon: "library-books", name: "Directorio", screen: "directory" },
    { icon: "location-on", name: "Ubicación", screen: "location" },
    { icon: "contacts", name: "Contactos", screen: "contacts" },
    { icon: "history", name: "Historial", screen: "history" },
    { icon: "settings", name: "Ajustes", screen: "settings" },
    { icon: "info-outline", name: "Ayuda", screen: "help" },
  ];

  // Render the current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen onFinish={() => setCurrentScreen("login")} />;
      case "login":
        return (
          <LoginScreen
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            biometricEnabled={biometricEnabled}
            setBiometricEnabled={setBiometricEnabled}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
          />
        );
      case "home":
        return (
          <MainHomeScreen
            toggleDrawer={toggleDrawer}
            handleSosPress={handleSosPress}
            riskLevel={riskLevel}
            startTest={startTest}
            setCurrentScreen={setCurrentScreen}
            sosActive={sosActive}
            deactivateSOS={deactivateSOS}
            showPanicButton={showPanicButton}
            handlePanicAction={handlePanicAction}
          />
        );
      case "test":
        return (
          <TestScreen
            currentQuestion={currentQuestion}
            setCurrentScreen={setCurrentScreen}
            handleAnswerSelect={handleAnswerSelect}
          />
        );
      case "results":
        return (
          <ResultsScreen
            riskLevel={riskLevel}
            setCurrentScreen={setCurrentScreen}
            startTest={startTest}
          />
        );
      case "forum":
        return <ForumScreen setCurrentScreen={setCurrentScreen} />;
      case "directory":
        return <DirectoryScreen setCurrentScreen={setCurrentScreen} />;
      case "location":
        return (
          <LocationScreen
            setCurrentScreen={setCurrentScreen}
            sosActive={sosActive}
            activateSOS={activateSOS}
            deactivateSOS={deactivateSOS}
          />
        );
      case "contacts":
        return (
          <ContactsScreen
            setCurrentScreen={setCurrentScreen}
            emergencyContacts={emergencyContacts}
          />
        );
      case "history":
        return (
          <HistoryScreen
            setCurrentScreen={setCurrentScreen}
            incidents={incidents}
          />
        );
      case "settings":
        return (
          <SettingsScreen
            setCurrentScreen={setCurrentScreen}
            biometricEnabled={biometricEnabled}
            setBiometricEnabled={setBiometricEnabled}
          />
        );
      case "help":
        return <HelpScreen setCurrentScreen={setCurrentScreen} />;
      case "calculator":
        return <CalculatorScreen setCurrentScreen={setCurrentScreen} />;
      default:
        return <MainHomeScreen />;
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <TouchableWithoutFeedback onPress={() => drawerOpen && toggleDrawer()}>
          <View style={styles.container}>
            {renderScreen()}
            <DrawerMenu
              drawerAnimation={drawerAnimation}
              menuItems={menuItems}
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
              toggleDrawer={toggleDrawer}
              handleHomeIconPress={handleHomeIconPress}
            />

            {drawerOpen && (
              <TouchableWithoutFeedback onPress={toggleDrawer}>
                <View style={styles.drawerOverlay} />
              </TouchableWithoutFeedback>
            )}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  drawerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 1,
  },
});

export default HomeScreen;
