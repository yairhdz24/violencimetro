"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Linking,
  SafeAreaView,
  Alert,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { MaterialIcons } from "@expo/vector-icons"
import CustomDrawer from "../CustomDrawer"
import RiskMeter from "../RiskMeter"
import RiskModal from "../RiskModal"
import PanicButton from "./PanicButton"
import questionsData from "../../../data/questions.json"
import * as Location from "expo-location"
import { Audio } from "expo-av"

const { width } = Dimensions.get("window")

const HomeScreen = ({ navigation }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [currentRiskLevel, setCurrentRiskLevel] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [testCompleted, setTestCompleted] = useState(false)
  const [riskScores, setRiskScores] = useState([])
  const [showRiskModal, setShowRiskModal] = useState(false)
  const [modalRiskLevel, setModalRiskLevel] = useState("low")
  const [panicMode, setPanicMode] = useState(false)
  const [recording, setRecording] = useState()
  const [sound, setSound] = useState()

  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  const translateY = useRef(new Animated.Value(50)).current
  const lionScale = useRef(new Animated.Value(1)).current
  const questionFadeAnim = useRef(new Animated.Value(1)).current
  const borderAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(lionScale, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(lionScale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [fadeAnim, scaleAnim, translateY, lionScale])

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: panicMode ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [panicMode, borderAnim])

  const animateQuestionChange = () => {
    Animated.sequence([
      Animated.timing(questionFadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(questionFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handleRiskLevelChange = (level) => {
    const updatedScores = [...riskScores, level]
    setRiskScores(updatedScores)

    if (currentQuestionIndex < 8) {
      animateQuestionChange()
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
        setCurrentRiskLevel(0)
      }, 300)
    } else {
      setTestCompleted(true)
      const averageScore = updatedScores.reduce((a, b) => a + b, 0) / updatedScores.length
      setModalRiskLevel(averageScore <= 3 ? "low" : averageScore <= 7 ? "medium" : "high")
      setTimeout(() => {
        setShowRiskModal(true)
      }, 500)
    }
  }

  const toggleDrawer = () => setDrawerOpen(!drawerOpen)

  const handleEmergencyCall = (phoneNumber) => Linking.openURL(`tel:${phoneNumber}`)

  const handleOpenWebsite = (url) => Linking.openURL(url)

  const resetTest = () => {
    setCurrentQuestionIndex(0)
    setCurrentRiskLevel(0)
    setRiskScores([])
    setTestCompleted(false)
    animateQuestionChange()
  }

  const handleSelectLevel = (level) => {
    setCurrentRiskLevel(level)
  }

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
      const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
      setRecording(recording)
    } catch (err) {
      console.error("Failed to start recording", err)
    }
  }

  const stopRecording = async () => {
    setRecording(undefined)
    await recording.stopAndUnloadAsync()
    const uri = recording.getURI()
    console.log("Recording stopped and stored at", uri)
  }

  const playSound = async () => {
    try {
      console.log("Configurando modo de audio para reproducción por altavoz")
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false, // Desactivar la grabación para que se use el altavoz
        playsInSilentModeIOS: true,
      })
      console.log("Loading Sound")
      const { sound } = await Audio.Sound.createAsync({ uri: recording.getURI() })
      setSound(sound)
      console.log("Playing Sound")
      await sound.playAsync()
    } catch (error) {
      console.error("Error al reproducir el sonido:", error)
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound")
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  const togglePanicMode = async () => {
    if (!panicMode) {
      setPanicMode(true)
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted") {
          Alert.alert("Permiso denegado", "No se puede acceder a la ubicación")
          return
        }

        const location = await Location.getCurrentPositionAsync({})
        console.log("Enviando ubicación:", location.coords)

        Alert.alert("Modo pánico activado", "Se ha enviado tu ubicación a tus contactos de confianza")
        startRecording()
        
      } catch (error) {
        console.error("Error al activar el modo pánico:", error)
        Alert.alert("Error", "No se pudo activar el modo pánico")
      }

    } else {
      setPanicMode(false)
      stopRecording()
      Alert.alert("Modo pánico desactivado", "¿Deseas escuchar la grabación?", [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Sí", onPress: () => playSound() },
      ])
    }
  }

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255, 255, 255, 0)", "rgba(76, 175, 80, 1)"],
  })

  return (
    <Animated.View style={[styles.container, { borderColor: borderColor, borderWidth: 10 }]}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <LinearGradient colors={["#1f4035", "#1f4035"]} style={styles.header}>
          <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
            <MaterialIcons name="menu" size={28} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Violentómetro</Text>
            <Text style={styles.headerSubtitle}>Evaluación de Riesgo</Text>
          </View>
          <TouchableOpacity style={styles.helpButton}>
            <MaterialIcons name="help-outline" size={28} color="#FFF" />
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity onPress={togglePanicMode} activeOpacity={1}>
            <Animated.View
              style={[
                styles.mascotContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }, { translateY }, { scale: lionScale }],
                },
              ]}
            >
              <Image
                source={{
                  uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Leon%20magistradssss-7g3vCrp4JniaZRtgan4I4oL23AyTHV.png",
                }}
                style={styles.mascotImage}
              />
              <Animated.View style={[styles.messageContainer, { opacity: questionFadeAnim }]}>
                <Text style={styles.messageText}>
                  {testCompleted
                    ? "¡Gracias por completar el test! Revisa tus resultados a continuación."
                    : questionsData.questions[currentQuestionIndex]}
                </Text>
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>

          {!testCompleted ? (
            <View style={styles.meterContainer}>
              <RiskMeter
                currentLevel={currentRiskLevel}
                onLevelChange={currentRiskLevel > 0 ? handleRiskLevelChange : handleSelectLevel}
                questionNumber={currentQuestionIndex + 1}
              />
            </View>
          ) : (
            <View style={styles.resultsContainer}>
              <LinearGradient
                colors={
                  modalRiskLevel === "low"
                    ? ["#4CAF50", "#2E7D32"]
                    : modalRiskLevel === "medium"
                      ? ["#FFC107", "#FFA000"]
                      : ["#FF3D00", "#D32F2F"]
                }
                style={styles.resultHeader}
              >
                <MaterialIcons
                  name={
                    modalRiskLevel === "low"
                      ? "sentiment-satisfied"
                      : modalRiskLevel === "medium"
                        ? "sentiment-neutral"
                        : "sentiment-very-dissatisfied"
                  }
                  size={32}
                  color="#FFF"
                />
                <Text style={styles.resultTitle}>
                  Nivel de Riesgo {modalRiskLevel === "low" ? "Bajo" : modalRiskLevel === "medium" ? "Medio" : "Alto"}
                </Text>
              </LinearGradient>

              <View style={styles.resultContent}>
                <Text style={styles.resultText}>
                  {modalRiskLevel === "low"
                    ? "Tu situación actual presenta un nivel bajo de riesgo. Sin embargo, es importante estar alerta."
                    : modalRiskLevel === "medium"
                      ? "Tu situación actual presenta un nivel medio de riesgo. Te recomendamos buscar apoyo."
                      : "Tu situación actual presenta un nivel alto de riesgo. Es urgente que busques ayuda profesional."}
                </Text>

                <TouchableOpacity
                  style={[
                    styles.viewDetailsButton,
                    {
                      backgroundColor:
                        modalRiskLevel === "low" ? "#4CAF50" : modalRiskLevel === "medium" ? "#FFC107" : "#FF3D00",
                    },
                  ]}
                  onPress={() => setShowRiskModal(true)}
                >
                  <MaterialIcons name="info-outline" size={20} color="#FFF" />
                  <Text style={styles.viewDetailsButtonText}>Ver Detalles y Recomendaciones</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.resetButton} onPress={resetTest}>
                  <MaterialIcons name="refresh" size={20} color="#454F63" />
                  <Text style={styles.resetButtonText}>Reiniciar Test</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Información Útil</Text>
            <TouchableOpacity
              style={styles.infoCard}
              onPress={() => handleOpenWebsite("https://www.gob.mx/tramites/ficha/area-de-psicologia/Entidades8750")}
            >
              <MaterialIcons name="info" size={24} color="#1f4035" />
              <Text style={styles.infoCardText}>Conoce tus derechos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.infoCard}
              onPress={() =>
                handleOpenWebsite(
                  "https://www.asociacionproade.org/foro-de-participaci%C3%B3n/existe-alguna-relaci%C3%B3n-entre-violencia-de-g%C3%A9nero-y-clases-sociales/",
                )
              }
            >
              <MaterialIcons name="security" size={24} color="#1f4035" />
              <Text style={styles.infoCardText}>Plan de seguridad personal</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.resourcesSection}>
            <Text style={styles.sectionTitle}>Recursos de Apoyo</Text>
            <TouchableOpacity
              style={styles.resourceCard}
              onPress={() =>
                handleOpenWebsite(
                  'https://www.asociacionproade.org/foro-de-participaci%C3%B3n/existe-=>handleOpenWebsite("https://www.asociacionproade.org/foro-de-participaci%C3%B3n/existe-alguna-relaci%C3%B3n-entre-violencia-de-g%C3%A9nero-y-clases-sociales/',
                )
              }
            >
              <MaterialIcons name="group" size={24} color="#1f4035" />
              <Text style={styles.resourceCardText}>Grupos de apoyo virtuales</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.resourceCard}
              onPress={() => handleOpenWebsite("https://www.gob.mx/tramites/ficha/area-de-psicologia/Entidades8750")}
            >
              <MaterialIcons name="psychology" size={24} color="#1f4035" />
              <Text style={styles.resourceCardText}>Necesitas ayuda</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <CustomDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          navigation={navigation}
          currentScreen="Home"
        />

        <RiskModal
          visible={showRiskModal}
          onClose={() => setShowRiskModal(false)}
          riskLevel={modalRiskLevel}
          onEmergencyCall={handleEmergencyCall}
          onOpenWebsite={handleOpenWebsite}
        />
      </SafeAreaView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA", alignItems: "center" },
  safeArea: {
    flex: 1,
    width: "100%",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  menuButton: { padding: 8 },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#FFF" },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  helpButton: { padding: 8 },
  content: { flex: 1, width: "100%" },
  contentContainer: { alignItems: "center", paddingBottom: 20 },
  mascotContainer: { alignItems: "center", marginVertical: 20 },
  mascotImage: { width: 180, height: 180, marginBottom: 20 },
  messageContainer: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    maxWidth: width * 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  messageText: {
    fontSize: 18,
    color: "#454F63",
    textAlign: "center",
    lineHeight: 26,
    fontWeight: "500",
  },
  meterContainer: { marginVertical: 20, width: "100%" },
  resultsContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginVertical: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  resultHeader: { flexDirection: "row", alignItems: "center", padding: 16 },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: 12,
  },
  resultContent: { padding: 20 },
  resultText: {
    fontSize: 16,
    color: "#454F63",
    marginBottom: 20,
    lineHeight: 24,
  },
  viewDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
  },
  viewDetailsButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#F5F7FA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  resetButtonText: {
    color: "#454F63",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  infoSection: { marginVertical: 20, width: "100%" },
  resourcesSection: { marginVertical: 20, width: "100%" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#454F63",
    marginBottom: 16,
    textAlign: "center",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoCardText: { marginLeft: 12, fontSize: 16, color: "#454F63" },
  resourceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  resourceCardText: { marginLeft: 12, fontSize: 16, color: "#454F63" },
})

export default HomeScreen

