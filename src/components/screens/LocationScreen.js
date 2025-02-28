import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform, 
  Modal,
  Dimensions,
  Animated,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get('window');

const LocationScreen = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [location, setLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("info");
  const watchIdRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showModal("Permiso de ubicación denegado", "error");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;
      setLocation({ latitude, longitude });
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const showModal = (message, type = "info") => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const startTracking = async () => {
    setTracking(true);
    showModal("Rastreo de ubicación iniciado", "success");
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (loc) => {
        const { latitude, longitude } = loc.coords;
        setLocation({ latitude, longitude });
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    );
    watchIdRef.current = subscription;
  };

  const stopTracking = () => {
    setTracking(false);
    showModal("Rastreo de ubicación detenido", "info");
    if (watchIdRef.current) {
      watchIdRef.current.remove();
      watchIdRef.current = null;
    }
  };

  const shareLocation = async () => {
    if (!location) {
      showModal("Ubicación no disponible", "error");
      return;
    }
    showModal(`Ubicación compartida:\nLat: ${location.latitude.toFixed(6)}\nLon: ${location.longitude.toFixed(6)}`, "success");
  };

  const sendEmergencyAlert = () => {
    showModal("Alerta de emergencia enviada a tus contactos", "warning");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1f4035', '#1f4035']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ubicación en Tiempo Real</Text>
        <View style={{ width: 28 }} />
      </LinearGradient>
      {region ? (
        <MapView style={styles.map} region={region} showsUserLocation={true}>
          {location && (
            <Marker coordinate={location} title="Tu Ubicación" pinColor="#1f4035" />
          )}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Obteniendo ubicación...</Text>
        </View>
      )}
      <View style={styles.bottomSheet}>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, tracking && styles.actionButtonActive]}
            onPress={tracking ? stopTracking : startTracking}
          >
            <LinearGradient
              colors={tracking ? ['#FF6B6B', '#FF8E8E'] : ['#4CAF50', '#45a049']}
              style={styles.buttonGradient}
            >
              <MaterialIcons
                name={tracking ? "gps-off" : "gps-fixed"}
                size={30}
                color="#FFF"
              />
            </LinearGradient>
            <Text style={styles.actionButtonText}>
              {tracking ? "Detener" : "Rastrear"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={shareLocation}>
            <LinearGradient
              colors={['#3498db', '#2980b9']}
              style={styles.buttonGradient}
            >
              <MaterialIcons name="share-location" size={30} color="#FFF" />
            </LinearGradient>
            <Text style={styles.actionButtonText}>Compartir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={sendEmergencyAlert}>
            <LinearGradient
              colors={['#e74c3c', '#c0392b']}
              style={styles.buttonGradient}
            >
              <MaterialIcons name="warning" size={30} color="#FFF" />
            </LinearGradient>
            <Text style={styles.actionButtonText}>Emergencia</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={hideModal}
        >
          <Animated.View 
            style={[
              styles.modalContent,
              { opacity: fadeAnim },
              modalType === "error" && styles.modalError,
              modalType === "success" && styles.modalSuccess,
              modalType === "warning" && styles.modalWarning,
            ]}
          >
            <MaterialIcons 
              name={
                modalType === "error" ? "error" : 
                modalType === "success" ? "check-circle" : 
                modalType === "warning" ? "warning" : "info"
              } 
              size={40} 
              color="#FFF" 
              style={styles.modalIcon}
            />
            <Text style={styles.modalText}>{modalMessage}</Text>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F5F7FA" 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#FFF" 
  },
  map: { 
    flex: 1 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  loadingText: { 
    fontSize: 16, 
    color: "#888" 
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonActive: {
    transform: [{ scale: 1.1 }],
  },
  buttonGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: { 
    color: "#1f4035", 
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: width * 0.8,
  },
  modalError: {
    backgroundColor: '#e74c3c',
  },
  modalSuccess: {
    backgroundColor: '#2ecc71',
  },
  modalWarning: {
    backgroundColor: '#f39c12',
  },
  modalIcon: {
    marginBottom: 10,
  },
  modalText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LocationScreen;