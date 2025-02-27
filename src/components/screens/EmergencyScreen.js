"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Animated, Vibration } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import { ChevronLeft, Phone, MessageSquare, AlertTriangle, MapPin, Shield } from "lucide-react-native"

const EmergencyScreen = ({ navigation }) => {
  const [countdown, setCountdown] = useState(5)
  const [isCountingDown, setIsCountingDown] = useState(true)
  const [pulseAnim] = useState(new Animated.Value(1))

  useEffect(() => {
    // Start pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start()

    // Vibration pattern
    const interval = setInterval(() => {
      Vibration.vibrate(500)
    }, 2000)

    // Countdown timer
    let timer
    if (isCountingDown) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsCountingDown(false)
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      clearInterval(interval)
      clearInterval(timer)
      Vibration.cancel()
    }
  }, [pulseAnim, isCountingDown])

  const cancelEmergency = () => {
    setIsCountingDown(false)
    navigation.goBack()
  }

  const callEmergency = () => {
    Linking.openURL("tel:911")
  }

  const sendSMS = () => {
    Linking.openURL("sms:911?body=Necesito ayuda urgente. Estoy en situación de violencia política de género.")
  }

  const openLocation = () => {
    Linking.openURL("https://www.google.com/maps")
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#FF3D00", "#FF7043", "#FF9800"]} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#FFF" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alerta de Emergencia</Text>
        <View style={{ width: 28 }} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {isCountingDown ? (
          <Animated.View
            style={[
              styles.countdownContainer,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <AlertTriangle color="#FF3D00" size={60} />
            <Text style={styles.countdownTitle}>Enviando Alerta</Text>
            <Text style={styles.countdownText}>Se enviará una alerta de emergencia en {countdown} segundos</Text>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelEmergency}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <View style={styles.emergencyActiveContainer}>
            <Shield color="#FF3D00" size={60} />
            <Text style={styles.emergencyActiveTitle}>Alerta Activada</Text>
            <Text style={styles.emergencyActiveText}>
              Se ha enviado una alerta a tus contactos de emergencia y a las autoridades correspondientes.
            </Text>

            <View style={styles.actionsContainer}>
              <Text style={styles.actionsTitle}>Acciones de Emergencia</Text>

              <TouchableOpacity style={styles.actionButton} onPress={callEmergency}>
                <View style={styles.actionIconContainer}>
                  <Phone color="#FFF" size={24} />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionButtonTitle}>Llamar a Emergencias</Text>
                  <Text style={styles.actionButtonDescription}>Contacta directamente al 911</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={sendSMS}>
                <View style={styles.actionIconContainer}>
                  <MessageSquare color="#FFF" size={24} />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionButtonTitle}>Enviar SMS de Emergencia</Text>
                  <Text style={styles.actionButtonDescription}>Mensaje predefinido con tu ubicación</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={openLocation}>
                <View style={styles.actionIconContainer}>
                  <MapPin color="#FFF" size={24} />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionButtonTitle}>Compartir Ubicación</Text>
                  <Text style={styles.actionButtonDescription}>Envía tu ubicación exacta</Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate("Home")}>
              <Text style={styles.returnButtonText}>Volver al Inicio</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F2",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80%",
  },
  countdownContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    width: "100%",
    shadowColor: "#FF3D00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  countdownTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF3D00",
    marginTop: 16,
    marginBottom: 8,
  },
  countdownText: {
    fontSize: 18,
    color: "#454F63",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  cancelButton: {
    backgroundColor: "#FF3D00",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  emergencyActiveContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    width: "100%",
    shadowColor: "#FF3D00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  emergencyActiveTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF3D00",
    marginTop: 16,
    marginBottom: 8,
  },
  emergencyActiveText: {
    fontSize: 16,
    color: "#454F63",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  actionsContainer: {
    width: "100%",
    marginTop: 16,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: "row",
    backgroundColor: "#FF7043",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  actionIconContainer: {
    backgroundColor: "#FF3D00",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  actionTextContainer: {
    flex: 1,
    padding: 12,
  },
  actionButtonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionButtonDescription: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  returnButton: {
    backgroundColor: "#8A2387",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 24,
  },
  returnButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default EmergencyScreen

