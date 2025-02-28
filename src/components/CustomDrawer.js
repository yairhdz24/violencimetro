"use client"

import React, { useRef, useEffect } from "react"
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
  Image,
} from "react-native"
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"

const { width, height } = Dimensions.get("window")
const DRAWER_WIDTH = width * 0.65

// Menú items
const menuItems = [
  { icon: "home", type: "MaterialIcons", name: "Inicio", screen: "Home" },
  { icon: "people", type: "MaterialIcons", name: "Foro de Ayuda", screen: "Forum" },
  { icon: "book-open", type: "FontAwesome5", name: "Directorio", screen: "Directory" },
  { icon: "location", type: "Ionicons", name: "Ubicación", screen: "Location" },
  { icon: "phone", type: "FontAwesome5", name: "Contactos", screen: "Contacts" },
  { icon: "history", type: "MaterialIcons", name: "Historial", screen: "History" },
  { icon: "information-circle", type: "Ionicons", name: "Ayuda", screen: "Help" },
]

const CustomDrawer = ({ isOpen, onClose, navigation, currentScreen }) => {
  const insets = useSafeAreaInsets()
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  // Calcular la altura segura (altura total menos insets superior e inferior)
  // const safeHeight = height - insets.top - insets.bottom

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
    const color = currentScreen === item.screen ? "#1f4035" : "#666"
    switch (item.type) {
      case "FontAwesome5":
        return <FontAwesome5 name={item.icon} size={size} color={color} />
      case "Ionicons":
        return <Ionicons name={item.icon} size={size} color={color} />
      default:
        return <MaterialIcons name={item.icon} size={size} color={color} />
    }
  }

  // Se valida si el overlay está cerrado para no renderizarlo
  if (!isOpen && fadeAnim._value === 0) return null

  return (
    <Animated.View 
      style={[
        styles.overlay, 
        { 
          opacity: fadeAnim,
          paddingTop: insets.top,
          height: height,
        }
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />
      <TouchableOpacity 
        style={styles.overlayTouchable} 
        activeOpacity={1} 
        onPress={onClose} 
      />
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX }],
            // height: safeHeight,
            paddingBottom: insets.bottom,
          }
        ]}
      >
        <LinearGradient
          colors={["#1f4035", "#1f4035"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + 16 }]}
        >
          <View style={styles.headerContent}>
            <Image
              source={require("../../assets/Leon.png")}
              style={styles.mascotImage}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Menu</Text>
              <Text style={styles.subtitle}>Estamos para ayudarte</Text>
            </View>
          </View>
        </LinearGradient>

        <ScrollView 
          style={styles.menuScroll}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
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
              <Text style={[
                styles.menuItemText, 
                currentScreen === item.screen && styles.activeMenuItemText
              ]}>
                {item.name}
              </Text>
              {currentScreen === item.screen && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <TouchableOpacity 
            style={styles.footerButton}
            onPress={() => {
              onClose()
              // Aquí puedes agregar la navegación a la línea de ayuda
            }}
          >
            <FontAwesome5 name="headset" size={20} color="#FFFFFF" />
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
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    // elevation: 15,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: "row",
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
    backgroundColor: "#1f4035",
  },
  activeMenuItemText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  activeIndicator: {
    width: 4,
    height: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 20,
    padding: 16,
    marginBottom: 106,
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#1f4035",
    borderRadius: 8,
  },
  footerButtonText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  mascotImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
})

export default CustomDrawer
