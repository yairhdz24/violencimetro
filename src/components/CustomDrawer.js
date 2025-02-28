"use client"

import { useRef, useEffect } from "react"
import {
  Animated,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native"
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons"
// import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"

const { width } = Dimensions.get("window")
const DRAWER_WIDTH = width * 0.85

// Menú actualizado con nuevos iconos
const menuItems = [
  { icon: "home", type: "MaterialIcons", name: "Inicio", screen: "Home" },
  
  { icon: "people", type: "MaterialIcons", name: "Foro de Ayuda", screen: "Forum" },
  { icon: "book-open", type: "FontAwesome5", name: "Directorio", screen: "Directory" },
  { icon: "location", type: "Ionicons", name: "Ubicación", screen: "Location" },
  { icon: "phone", type: "FontAwesome5", name: "Contactos", screen: "Contacts" },
  { icon: "history", type: "MaterialIcons", name: "Historial", screen: "History" },
  { icon: "shield-alt", type: "FontAwesome5", name: "Seguridad", screen: "Security" },
  { icon: "information-circle", type: "Ionicons", name: "Ayuda", screen: "Help" },
]

const CustomDrawer = ({ isOpen, onClose, navigation, currentScreen }) => {
  // const insets = useSafeAreaInsets()
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          tension: 65,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -DRAWER_WIDTH,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isOpen, translateX, fadeAnim])

  const renderIcon = (item) => {
    const size = 24
    const color = currentScreen === item.screen ? "#4CAF50" : "#666"

    switch (item.type) {
      case "FontAwesome5":
        return <FontAwesome5 name={item.icon} size={size} color={color} />
      case "Ionicons":
        return <Ionicons name={item.icon} size={size} color={color} />
      default:
        return <MaterialIcons name={item.icon} size={size} color={color} />
    }
  }

  if (!isOpen && fadeAnim._value === 0) return null

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      <TouchableOpacity style={styles.overlayTouchable} activeOpacity={1} onPress={onClose} />
      <Animated.View
        style={[
          styles.drawer,
        ]}
      >
        <LinearGradient
          colors={["#4CAF50", "#388E3C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <FontAwesome5 name="shield-alt" size={30} color="#FFF" />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Violentómetro</Text>
              <Text style={styles.subtitle}>Protección y Ayuda</Text>
            </View>
          </View>
        </LinearGradient>

        <ScrollView style={styles.menuScroll}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, currentScreen === item.screen && styles.activeMenuItem]}
              onPress={() => {
                onClose()
                navigation.navigate(item.screen)
              }}
            >
              <View style={styles.iconContainer}>{renderIcon(item)}</View>
              <Text style={[styles.menuItemText, currentScreen === item.screen && styles.activeMenuItemText]}>
                {item.name}
              </Text>
              {currentScreen === item.screen && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton}>
            <FontAwesome5 name="headset" size={20} color="#666" />
            <Text style={styles.footerButtonText}>Línea de Ayuda 24/7</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  overlayTouchable: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 15,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginLeft: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  menuScroll: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  activeMenuItem: {
    backgroundColor: "#E8F5E9",
  },
  activeMenuItemText: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  activeIndicator: {
    width: 4,
    height: 24,
    backgroundColor: "#4CAF50",
    borderRadius: 2,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? + 16 : 16,
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  footerButtonText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
})

export default CustomDrawer

