// src/screens/HomeScreen.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
// import DrawerContent from "../CustomDrawer";
import CustomDrawer from "../CustomDrawer";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [riskLevel, setRiskLevel] = useState(5);
  const [sosActive, setSosActive] = useState(false);
  const [showPanicButton, setShowPanicButton] = useState(false);

  const lionAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(lionAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(lionAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [lionAnimation]);

  const translateY = lionAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const handleSosPress = () => setSosActive(!sosActive);
  const deactivateSOS = () => setSosActive(false);
  const startTest = () => navigation.navigate("Test");
  const handlePanicAction = () => navigation.navigate("Calculator");

  const getRiskColor = (level) => {
    if (level <= 3) return "#4CAF50";
    if (level <= 7) return "#FFC107";
    return "#FF5252";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer}>
          <MaterialIcons name="menu" size={28} color="#5D9CEC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bienestar Personal</Text>
        <TouchableOpacity onPress={handleSosPress}>
          <MaterialIcons name="settings" size={28} color="#5D9CEC" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.homeContent}>
        <Animated.View
          style={[styles.lionContainer, { transform: [{ translateY }] }]}>
          <Image
            source={{
              uri: "https://api.a0.dev/assets/image?text=a%20cute%20cartoon%20lion%20mascot%20with%20friendly%20expression&aspect=1:1",
            }}
            style={styles.lionImage}
          />
          <View style={styles.chatBubble}>
            <Text style={styles.chatText}>
              ¡Hola! Soy Leo, tu asistente personal.{"\n"}¿Te gustaría realizar
              un test rápido de auto-conocimiento?
            </Text>
          </View>
        </Animated.View>
        <View style={styles.riskMeterContainer}>
          <Text style={styles.riskMeterTitle}>Nivel de Autoconocimiento</Text>
          <View style={styles.riskMeterBar}>
            <View
              style={[
                styles.riskMeterFill,
                {
                  width: `${(riskLevel / 10) * 100}%`,
                  backgroundColor: getRiskColor(riskLevel),
                },
              ]}
            />
          </View>
          <View style={styles.riskLabels}>
            <Text style={styles.riskLabelLow}>Básico</Text>
            <Text style={styles.riskLabelMedium}>Intermedio</Text>
            <Text style={styles.riskLabelHigh}>Avanzado</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.startTestButton} onPress={startTest}>
          <Text style={styles.startTestButtonText}>Iniciar Test</Text>
        </TouchableOpacity>
        <View style={styles.quickAccessContainer}>
          <TouchableOpacity
            style={styles.quickAccessButton}
            onPress={() => navigation.navigate("Forum")}>
            <MaterialIcons name="forum" size={24} color="#5D9CEC" />
            <Text style={styles.quickAccessText}>Foro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAccessButton}
            onPress={() => navigation.navigate("Directory")}>
            <MaterialIcons name="library-books" size={24} color="#5D9CEC" />
            <Text style={styles.quickAccessText}>Directorio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAccessButton}
            onPress={() => navigation.navigate("Contacts")}>
            <MaterialIcons name="contacts" size={24} color="#5D9CEC" />
            <Text style={styles.quickAccessText}>Contactos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {sosActive && (
        <View style={styles.sosActiveIndicator}>
          <Text style={styles.sosActiveText}>Asistencia activa</Text>
          <TouchableOpacity
            style={styles.sosDeactivateButton}
            onPress={deactivateSOS}>
            <Text style={styles.sosDeactivateText}>Desactivar</Text>
          </TouchableOpacity>
        </View>
      )}
      {showPanicButton && (
        <TouchableOpacity
          style={styles.panicButton}
          onPress={handlePanicAction}>
          <MaterialIcons name="clear" size={24} color="#FFF" />
        </TouchableOpacity>
      )}
      {drawerOpen && (
        <CustomDrawer closeDrawer={toggleDrawer} navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#454F63" },
  homeContent: { padding: 16, alignItems: "center" },
  lionContainer: { alignItems: "center", marginVertical: 20 },
  lionImage: { width: 200, height: 200, borderRadius: 100 },
  chatBubble: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    maxWidth: width * 0.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chatText: { fontSize: 16, color: "#454F63", lineHeight: 22 },
  riskMeterContainer: { width: "100%", marginTop: 20, marginBottom: 30 },
  riskMeterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 8,
  },
  riskMeterBar: {
    height: 16,
    backgroundColor: "#E0E7FF",
    borderRadius: 8,
    overflow: "hidden",
  },
  riskMeterFill: { height: "100%", borderRadius: 8 },
  riskLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  riskLabelLow: { fontSize: 12, color: "#4CAF50" },
  riskLabelMedium: { fontSize: 12, color: "#FFC107" },
  riskLabelHigh: { fontSize: 12, color: "#FF5252" },
  startTestButton: {
    backgroundColor: "#5D9CEC",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: "#5D9CEC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startTestButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  quickAccessContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
  },
  quickAccessButton: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickAccessText: { marginTop: 8, fontSize: 14, color: "#454F63" },
  sosActiveIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FF5252",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  sosActiveText: { color: "white", fontSize: 16, fontWeight: "bold" },
  sosDeactivateButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  sosDeactivateText: { color: "#FF5252", fontWeight: "bold" },
  panicButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#FF5252",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF5252",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default HomeScreen;
