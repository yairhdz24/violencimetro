import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen = ({
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isRegister,
  setIsRegister,
  biometricEnabled,
  setBiometricEnabled,
  handleLogin,
  handleRegister,
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="flower-tulip" size={60} color="#5D9CEC" />
          </View>
          <Text style={styles.welcomeText}>Bienvenido a tu App de Organización</Text>

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

            {isRegister && (
              <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={24} color="#7B8D93" style={styles.inputIcon} />
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

            <TouchableOpacity style={styles.primaryButton} onPress={isRegister ? handleRegister : handleLogin}>
              <Text style={styles.buttonText}>{isRegister ? "Registrarse" : "Iniciar Sesión"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={() => setIsRegister(!isRegister)}>
              <Text style={styles.secondaryButtonText}>
                {isRegister ? "Ya tengo una cuenta" : "Crear cuenta nueva"}
              </Text>
            </TouchableOpacity>

            {!isRegister && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 24,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333333',
  },
  biometricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  biometricText: {
    fontSize: 16,
    color: '#333333',
  },
  primaryButton: {
    backgroundColor: '#5D9CEC',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#5D9CEC',
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    color: '#7B8D93',
    fontSize: 14,
  },
});

export default LoginScreen;