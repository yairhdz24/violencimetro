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
  Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onLogin();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
        <Image
            source={require("../../../assets/Leon.png")}
            style={styles.mascotImage}
          />
          <Text style={styles.title}>Vimo</Text>
          <Text style={styles.subText}>Ayuda para Todos</Text>
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.welcomeText}>Iniciar Sesión</Text>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={24} color="#7B8D93" style={styles.inputIcon} />
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
              <MaterialIcons name="lock" size={24} color="#7B8D93" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => console.log("Registrarse") }>
            <Text style={styles.registerText}>¿No tienes una cuenta? <Text style={styles.registerLink}>Regístrate</Text></Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F2" },
  headerContainer: {
    backgroundColor: "white",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    paddingVertical: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f4035",
    marginTop: 10,
  },
  subText: {
    fontSize: 16,
    color: "#4d7366",
    marginBottom: 10,
  },
  loginContainer: {
    flex: 1,
    padding: 30,
    marginTop: 40,
    justifyContent: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 30,
    paddingBottom: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f4035",
    textAlign: "center",
    marginBottom: 20,
  },
  formContainer: { width: "100%" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: "#454F63" },
  forgotPassword: { alignItems: "center", marginBottom: 16 },
  forgotPasswordText: { color: "#7B8D93", fontSize: 14 },
  primaryButton: {
    backgroundColor: "#1f4035",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1f4035",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  mascotImage: {
    width: 145,
    height: 150,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  registerText: { textAlign: "center", marginTop: 16, color: "#454F63" },
  registerLink: { color: "#1f4035", fontWeight: "bold" },
});

export default LoginScreen;