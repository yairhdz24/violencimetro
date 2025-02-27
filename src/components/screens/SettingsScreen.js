// src/screens/SettingsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = ({ navigation }) => {
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons name="arrow-back" size={28} color="#5D9CEC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajustes</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView contentContainerStyle={styles.settingsContainer}>
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <MaterialIcons name="person" size={40} color="#5D9CEC" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Usuario</Text>
            <Text style={styles.profileEmail}>usuario@email.com</Text>
          </View>
          <TouchableOpacity style={styles.profileEdit}>
            <MaterialIcons name="edit" size={24} color="#7B8D93" />
          </TouchableOpacity>
        </View>
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Configuración general</Text>
          <View style={styles.settingItem}>
            <MaterialIcons name="notifications" size={24} color="#5D9CEC" />
            <Text style={styles.settingLabel}>Notificaciones</Text>
            <Switch
              trackColor={{ false: "#e0e0e0", true: "#bbd6f7" }}
              thumbColor={"#5D9CEC"}
              value={true}
            />
          </View>
          <View style={styles.settingItem}>
            <MaterialIcons name="vibration" size={24} color="#5D9CEC" />
            <Text style={styles.settingLabel}>Vibración</Text>
            <Switch
              trackColor={{ false: "#e0e0e0", true: "#bbd6f7" }}
              thumbColor={"#5D9CEC"}
              value={true}
            />
          </View>
          <View style={styles.settingItem}>
            <MaterialIcons name="fingerprint" size={24} color="#5D9CEC" />
            <Text style={styles.settingLabel}>Autenticación biométrica</Text>
            <Switch
              trackColor={{ false: "#e0e0e0", true: "#bbd6f7" }}
              thumbColor={biometricEnabled ? "#5D9CEC" : "#f4f3f4"}
              onValueChange={setBiometricEnabled}
              value={biometricEnabled}
            />
          </View>
        </View>
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>
            Privacidad y seguridad
          </Text>
          <TouchableOpacity style={styles.settingItemButton}>
            <MaterialIcons name="lock" size={24} color="#5D9CEC" />
            <Text style={styles.settingLabel}>Cambiar contraseña</Text>
            <MaterialIcons name="chevron-right" size={24} color="#7B8D93" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItemButton}>
            <MaterialIcons name="security" size={24} color="#5D9CEC" />
            <Text style={styles.settingLabel}>Configurar PIN de seguridad</Text>
            <MaterialIcons name="chevron-right" size={24} color="#7B8D93" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItemButton}>
            <MaterialIcons name="color-lens" size={24} color="#5D9CEC" />
            <Text style={styles.settingLabel}>Apariencia de la aplicación</Text>
            <MaterialIcons name="chevron-right" size={24} color="#7B8D93" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Login")}>
          <MaterialIcons name="exit-to-app" size={24} color="#FF5252" />
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
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
  settingsContainer: { padding: 16 },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: { flex: 1, marginLeft: 16 },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 4,
  },
  profileEmail: { fontSize: 14, color: "#7B8D93" },
  profileEdit: { padding: 8 },
  settingsSection: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 16,
  },
  settingItem: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  settingItemButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 16,
  },
  settingLabel: { flex: 1, fontSize: 16, color: "#454F63", marginLeft: 16 },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFE5E5",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#FF5252",
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default SettingsScreen;
