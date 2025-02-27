// src/screens/LocationScreen.js
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const LocationScreen = ({ navigation }) => {
  const sosActive = false; // Puedes conectar este estado con tu contexto

  const activateSOS = () => {
    // Lógica para iniciar rastreo
  };
  const deactivateSOS = () => {
    // Lógica para detener rastreo
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ubicación</Text>
        <View style={{ width: 28 }} />
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.mapContainer}>
          <Image
            source={{
              uri: "https://api.a0.dev/assets/image?text=map%20with%20location%20marker%20city%20streets&aspect=16:9",
            }}
            style={styles.mapImage}
          />
          <View style={styles.mapPin}>
            <MaterialIcons name="location-pin" size={36} color="#FF5252" />
          </View>
        </View>
        <View style={styles.locationActions}>
          <TouchableOpacity
            style={[
              styles.locationActionButton,
              sosActive && styles.locationActionButtonActive,
            ]}
            onPress={sosActive ? deactivateSOS : activateSOS}>
            <MaterialIcons
              name={sosActive ? "location-off" : "location-on"}
              size={24}
              color={sosActive ? "#FF5252" : "#5D9CEC"}
            />
            <Text
              style={[
                styles.locationActionText,
                sosActive && styles.locationActionTextActive,
              ]}>
              {sosActive ? "Detener rastreo" : "Iniciar rastreo"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationActionButton}>
            <MaterialIcons name="share" size={24} color="#5D9CEC" />
            <Text style={styles.locationActionText}>Compartir ubicación</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationActionButton}>
            <MaterialIcons name="report" size={24} color="#5D9CEC" />
            <Text style={styles.locationActionText}>Denunciar incidente</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  locationContainer: { flex: 1, padding: 16 },
  mapContainer: {
    width: "100%",
    height: 240,
    backgroundColor: "#F5F7FA",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    position: "relative",
  },
  mapImage: { width: "100%", height: "100%" },
  mapPin: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -18,
    marginTop: -36,
  },
  locationActions: { marginBottom: 24 },
  locationActionButton: {
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
  locationActionButtonActive: { backgroundColor: "#FFE5E5" },
  locationActionText: { fontSize: 16, color: "#454F63", marginLeft: 16 },
  locationActionTextActive: { color: "#FF5252" },
});

export default LocationScreen;
