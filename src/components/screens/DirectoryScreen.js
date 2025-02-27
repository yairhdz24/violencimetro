// src/screens/DirectoryScreen.js
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

const directoryItems = [
  {
    category: "Nivel Básico",
    color: "#4CAF50",
    items: [
      {
        term: "Control sutil",
        description:
          "Peticiones aparentemente inocentes que limitan la libertad personal.",
      },
      {
        term: "Aislamiento inicial",
        description: "Primeros indicios de separación de amigos y familiares.",
      },
      {
        term: "Comunicación pasivo-agresiva",
        description:
          "Comunicación que parece neutral pero contiene hostilidad encubierta.",
      },
    ],
  },
  // Agrega más categorías si lo deseas
];

const DirectoryScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Biblioteca de Términos</Text>
        <TouchableOpacity>
          <MaterialIcons name="search" size={28} color="#5D9CEC" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.directoryContainer}>
        {directoryItems.map((category, index) => (
          <View key={index} style={styles.directoryCategory}>
            <View
              style={[
                styles.categorylabel,
                { backgroundColor: category.color },
              ]}>
              <Text style={styles.categoryLabelText}>{category.category}</Text>
            </View>
            {category.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.directoryItem}>
                <Text style={styles.directoryItemTerm}>{item.term}</Text>
                <Text style={styles.directoryItemDescription}>
                  {item.description}
                </Text>
              </View>
            ))}
          </View>
        ))}
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
  directoryContainer: { padding: 16 },
  directoryCategory: { marginBottom: 24 },
  categorylabel: { padding: 8, borderRadius: 8, marginBottom: 12 },
  categoryLabelText: { color: "white", fontWeight: "bold", fontSize: 14 },
  directoryItem: {
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
  directoryItemTerm: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 8,
  },
  directoryItemDescription: { fontSize: 14, color: "#7B8D93", lineHeight: 20 },
});

export default DirectoryScreen;
