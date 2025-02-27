// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Switch,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const handleLogin = () => {
    // Validación simplificada
    onLogin();
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
    onLogin();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.loginContainer}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons
              name="flower-tulip"
              size={60}
              color="#5D9CEC"
            />
          </View>
          <Text style={styles.welcomeText}>
            Bienvenido a tu App de Organización
          </Text>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="email"
                size={24}
                color="#7B8D93"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={username}
                onChangeText={setUsername}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="lock"
                size={24}
                color="#7B8D93"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            {isRegister && (
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="lock"
                  size={24}
                  color="#7B8D93"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            )}
            <View style={styles.biometricContainer}>
              <Text style={styles.biometricText}>Autenticación biométrica</Text>
              <Switch
                trackColor={{ false: "#e0e0e0", true: "#bbd6f7" }}
                thumbColor={biometricEnabled ? "#5D9CEC" : "#f4f3f4"}
                onValueChange={setBiometricEnabled}
                value={biometricEnabled}
              />
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={isRegister ? handleRegister : handleLogin}>
              <Text style={styles.buttonText}>
                {isRegister ? "Registrarse" : "Iniciar Sesión"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setIsRegister(!isRegister)}>
              <Text style={styles.secondaryButtonText}>
                {isRegister ? "Ya tengo una cuenta" : "Crear cuenta nueva"}
              </Text>
            </TouchableOpacity>
            {!isRegister && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  loginContainer: { flex: 1, padding: 24, justifyContent: "center" },
  logoContainer: { alignItems: "center", marginBottom: 24 },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#454F63",
    textAlign: "center",
    marginVertical: 24,
  },
  formContainer: { width: "100%" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: "#454F63" },
  biometricContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  biometricText: { fontSize: 16, color: "#454F63" },
  primaryButton: {
    backgroundColor: "#5D9CEC",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#5D9CEC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  secondaryButton: {
    backgroundColor: "transparent",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  secondaryButtonText: { color: "#5D9CEC", fontSize: 16 },
  forgotPassword: { alignItems: "center" },
  forgotPasswordText: { color: "#7B8D93", fontSize: 14 },
});

export default LoginScreen;
