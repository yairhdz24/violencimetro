// src/screens/HelpScreen.js
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

const faqItems = [
  {
    question: "¿Cómo funciona el Test de Autoconocimiento?",
    answer:
      "El test consta de 5 preguntas que evalúan aspectos de tu bienestar emocional y organización personal.",
  },
  {
    question: "¿Puedo cambiar mi contraseña?",
    answer: "Sí, puedes cambiarla en la sección 'Ajustes'.",
  },
  // Agrega más preguntas frecuentes si lo deseas
];

const HelpScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ayuda</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView contentContainerStyle={styles.helpContainer}>
        <Text style={styles.helpTitle}>Preguntas Frecuentes</Text>
        {faqItems.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>{item.question}</Text>
            <Text style={styles.faqAnswer}>{item.answer}</Text>
          </View>
        ))}
        <View style={styles.resourcesSection}>
          <Text style={styles.resourcesTitle}>Recursos adicionales</Text>
          <TouchableOpacity style={styles.resourceItem}>
            <MaterialIcons name="phone" size={24} color="#1f4035" />
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceName}>Línea de Ayuda</Text>
              <Text style={styles.resourceDescription}>
                Soporte 24/7 para emergencias
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>Acerca de la App</Text>
          <Text style={styles.aboutText}>Versión 1.0.0</Text>
          <Text style={styles.aboutDescription}>
            Aplicación diseñada para ayudarte en tu desarrollo personal y
            bienestar emocional.
          </Text>
        </View>
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
    backgroundColor: "#1f4035",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#FFFFFF" },
  helpContainer: { padding: 16 },
  helpTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f4035",
    marginBottom: 24,
  },
  faqItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f4035",
    marginBottom: 8,
  },
  faqAnswer: { fontSize: 14, color: "#7B8D93", lineHeight: 20 },
  resourcesSection: { marginTop: 24, marginBottom: 24 },
  resourcesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f4035",
    marginBottom: 16,
  },
  resourceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resourceInfo: { marginLeft: 16 },
  resourceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f4035",
    marginBottom: 4,
  },
  resourceDescription: { fontSize: 14, color: "#7B8D93" },
  aboutSection: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f4035",
    marginBottom: 8,
  },
  aboutText: { fontSize: 14, color: "#1f4035", marginBottom: 8 },
  aboutDescription: {
    fontSize: 14,
    color: "#7B8D93",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default HelpScreen;
