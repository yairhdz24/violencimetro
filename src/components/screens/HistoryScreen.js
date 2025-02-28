import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

// Colores principales
const COLORS = {
  primary: "#1f4035",
  primaryLight: "#2c6d4d",
  white: "#FFFFFF",
  background: "#F5F7FA",
  text: "#2D3748",
  textLight: "#718096",
  success: "#4CAF50",
  warning: "#FFC107",
  danger: "#FF5252",
  border: "rgba(31, 64, 53, 0.1)",
};

// Arreglo con más eventos de ejemplo
const incidents = [
  {
    id: 1,
    type: "Test completado",
    date: "25/02/2025",
    time: "14:32",
    riskLevel: 3,
  },
  {
    id: 2,
    type: "Alerta SOS",
    date: "20/02/2025",
    time: "22:15",
    riskLevel: 8,
    audioUrl: "https://example.com/audio.mp3", // URL de audio (simulada)
    duration: "15 minutos",
  },
  {
    id: 3,
    type: "Test completado",
    date: "24/02/2025",
    time: "10:05",
    riskLevel: 2,
  },
  {
    id: 4,
    type: "Alerta SOS",
    date: "23/02/2025",
    time: "18:47",
    riskLevel: 9,
    audioUrl: "https://example.com/audio2.mp3",
    duration: "20 minutos",
  },
  {
    id: 5,
    type: "Notificación de seguridad",
    date: "22/02/2025",
    time: "08:30",
    riskLevel: 5,
  },
  {
    id: 6,
    type: "Alerta SOS",
    date: "21/02/2025",
    time: "23:00",
    riskLevel: 10,
    audioUrl: "https://example.com/audio3.mp3",
    duration: "10 minutos",
  },
];

const getRiskColor = (level) => {
  if (level <= 3) return COLORS.success;
  if (level <= 7) return COLORS.warning;
  return COLORS.danger;
};

const HistoryScreen = ({ navigation }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  // Limpiar el audio cuando se desmonta el componente
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playPauseSound = async (incidentId) => {
    try {
      // Si ya hay un sonido cargado y es el mismo, pausarlo o reanudarlo
      if (sound && currentlyPlayingId === incidentId) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          if (status.isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
          } else {
            await sound.playAsync();
            setIsPlaying(true);
          }
        }
        return;
      }

      // Si hay un sonido previo, descargarlo antes de cargar uno nuevo
      if (sound) {
        await sound.unloadAsync();
      }

      // Cargar el nuevo sonido (usamos un asset local; podrías usar incident.audioUrl)
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../../../assets/alert.mp3"),
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      setCurrentlyPlayingId(incidentId);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setAudioProgress(status.positionMillis);
          setAudioDuration(status.durationMillis || 0);
          if (status.didJustFinish) {
            setIsPlaying(false);
            setCurrentlyPlayingId(null);
          }
        }
      });
    } catch (error) {
      console.log("Error al cargar el sonido:", error);
    }
  };

  // Calcula el porcentaje de progreso para la barra
  const getProgressPercentage = () => {
    if (audioDuration === 0) return 0;
    return (audioProgress / audioDuration) * 100;
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryLight]}
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.headerButton}
        >
          <MaterialIcons name="arrow-back" size={28} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Apuntes</Text>
        <View style={{ width: 28 }} />
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.historyContainer}
        showsVerticalScrollIndicator={false}
      >
        {incidents.map((incident) => (
          <View
            key={incident.id}
            style={[
              styles.historyItem,
              { borderLeftColor: getRiskColor(incident.riskLevel) },
            ]}
          >
            <View style={styles.historyItemHeader}>
              <MaterialIcons name="event" size={20} color={COLORS.textLight} />
              <Text style={styles.historyItemType}>{incident.type}</Text>
            </View>
            <View style={styles.historyItemTime}>
              <Ionicons name="time-outline" size={16} color={COLORS.textLight} />
              <Text style={styles.historyItemTimeText}>
                {incident.date} - {incident.time}
              </Text>
            </View>

            {incident.type === "Alerta SOS" && (
              <View style={styles.historyItemSos}>
                <View style={styles.sosInfo}>
                  <Text style={styles.sosLabel}>Duración:</Text>
                  <Text style={styles.sosValue}>{incident.duration}</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.audioButton,
                    currentlyPlayingId === incident.id && isPlaying && styles.audioButtonActive,
                  ]}
                  onPress={() => playPauseSound(incident.id)}
                >
                  <MaterialIcons
                    name={
                      currentlyPlayingId === incident.id && isPlaying ? "pause" : "play-arrow"
                    }
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.audioButtonText}>
                    {currentlyPlayingId === incident.id && isPlaying ? "Pausar" : "Reproducir"}
                  </Text>
                </TouchableOpacity>
                {/* Reproductor de audio simulado */}
                {currentlyPlayingId === incident.id && (
                  <View style={styles.audioPlayer}>
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          { width: `${getProgressPercentage()}%` },
                        ]}
                      />
                    </View>
                    <View style={styles.audioTimeContainer}>
                      <Text style={styles.audioTimeText}>
                        {Math.floor(audioProgress / 1000)}s
                      </Text>
                      <Text style={styles.audioTimeText}>
                        {Math.floor(audioDuration / 1000)}s
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.white,
  },
  historyContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  historyItem: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 5,
  },
  historyItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  historyItemType: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginLeft: 8,
  },
  historyItemTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  historyItemTimeText: {
    fontSize: 13,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  historyItemSos: {
    marginTop: 8,
  },
  sosInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sosLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginRight: 4,
  },
  sosValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "bold",
  },
  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `${COLORS.primary}20`,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  audioButtonActive: {
    backgroundColor: `${COLORS.primary}40`,
  },
  audioButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 6,
    fontWeight: "600",
  },
  audioPlayer: {
    marginTop: 10,
  },
  progressBarBackground: {
    height: 6,
    width: "100%",
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 6,
    backgroundColor: COLORS.primary,
  },
  audioTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  audioTimeText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
});

export default HistoryScreen;
