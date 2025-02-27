// src/screens/ResultsScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const getRiskMessage = (level) => {
  if (level <= 3) {
    return {
      title: "Nivel Básico",
      message:
        "Tu nivel de autoconocimiento es básico. Tienes un buen punto de partida, pero hay oportunidades para profundizar.",
    };
  }
  if (level <= 7) {
    return {
      title: "Nivel Intermedio",
      message:
        "Has desarrollado un nivel intermedio. Estás en el camino correcto, pero puedes mejorar aún más.",
    };
  }
  return {
    title: "Nivel Avanzado",
    message:
      "Tu autoconocimiento es avanzado. Sigue creciendo y profundizando en tus áreas de oportunidad.",
  };
};

const getRiskColor = (level) => {
  if (level <= 3) return "#4CAF50";
  if (level <= 7) return "#FFC107";
  return "#FF5252";
};

const ResultsScreen = ({ navigation, route }) => {
  const { riskLevel } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resultados</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView contentContainerStyle={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Tu nivel de autoconocimiento</Text>
        <View style={styles.resultsMeterContainer}>
          <View style={styles.resultsMeterBar}>
            <View
              style={[
                styles.resultsMeterFill,
                {
                  width: `${(riskLevel / 10) * 100}%`,
                  backgroundColor: getRiskColor(riskLevel),
                },
              ]}
            />
            <View
              style={[
                styles.resultsMeterIndicator,
                { left: `${(riskLevel / 10) * 100}%` },
              ]}
            />
          </View>
          <View style={styles.resultsLabels}>
            <Text style={styles.resultLabelLow}>Básico</Text>
            <Text style={styles.resultLabelMedium}>Intermedio</Text>
            <Text style={styles.resultLabelHigh}>Avanzado</Text>
          </View>
        </View>
        <View style={styles.resultMessageContainer}>
          <Text style={styles.resultMessageTitle}>
            {getRiskMessage(riskLevel).title}
          </Text>
          <Text style={styles.resultMessageText}>
            {getRiskMessage(riskLevel).message}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.retakeTestButton}
          onPress={() => navigation.navigate("Test")}>
          <Text style={styles.retakeTestButtonText}>
            Realizar test de nuevo
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  resultsContainer: { padding: 16 },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 24,
    textAlign: "center",
  },
  resultsMeterContainer: { marginBottom: 30 },
  resultsMeterBar: {
    height: 24,
    backgroundColor: "#E0E7FF",
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  resultsMeterFill: { height: "100%", borderRadius: 12 },
  resultsMeterIndicator: {
    position: "absolute",
    top: -10,
    width: 12,
    height: 40,
    backgroundColor: "white",
    borderRadius: 6,
    marginLeft: -6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  resultLabelLow: { fontSize: 14, color: "#4CAF50", fontWeight: "bold" },
  resultLabelMedium: { fontSize: 14, color: "#FFC107", fontWeight: "bold" },
  resultLabelHigh: { fontSize: 14, color: "#FF5252", fontWeight: "bold" },
  resultMessageContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resultMessageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 8,
  },
  resultMessageText: { fontSize: 16, color: "#7B8D93", lineHeight: 24 },
  retakeTestButton: {
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  retakeTestButtonText: { fontSize: 16, color: "#5D9CEC", fontWeight: "bold" },
});

export default ResultsScreen;
