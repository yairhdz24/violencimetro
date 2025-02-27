"use client";

import React, { useRef, useEffect } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  Home,
  HelpCircle,
  MessageCircle,
  BookOpen,
  MapPin,
  Phone,
  Clock,
  Settings,
  Info,
  X,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

const menuItems = [
  { icon: Home, name: "Inicio", screen: "Home" },
  { icon: HelpCircle, name: "Test de Riesgo", screen: "Test" },
  { icon: MessageCircle, name: "Foro de Ayuda", screen: "Forum" },
  { icon: BookOpen, name: "Directorio", screen: "Directory" },
  { icon: MapPin, name: "Ubicación", screen: "Location" },
  { icon: Phone, name: "Contactos", screen: "Contacts" },
  { icon: Clock, name: "Historial", screen: "History" },
  { icon: Settings, name: "Ajustes", screen: "Settings" },
  { icon: Info, name: "Ayuda", screen: "Help" },
];

const CustomDrawer = ({ isOpen, onClose, navigation, currentScreen }) => {
  const insets = useSafeAreaInsets();
  const translateX = useRef(new Animated.Value(-width * 0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: isOpen ? 0 : -width * 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen, translateX, fadeAnim]);

  if (!isOpen) return null;

  const navigateToScreen = (screenName) => {
    onClose();
    navigation.navigate(screenName);
  };

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
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
            paddingTop: insets.top || 20,
          },
        ]}>
        <LinearGradient
          colors={["#8A2387", "#E94057", "#F27121"]}
          style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Violentómetro</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>
        <ScrollView contentContainerStyle={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  currentScreen === item.screen && styles.activeMenuItem,
                ]}
                onPress={() => navigateToScreen(item.screen)}>
                <Icon
                  size={24}
                  color={currentScreen === item.screen ? "#E94057" : "#7B8D93"}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    currentScreen === item.screen && styles.activeMenuItemText,
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    flexDirection: "row",
  },
  overlayTouchable: {
    flex: 1,
  },
  drawer: {
    width: width * 0.8,
    backgroundColor: "white",
    zIndex: 1001,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomColor: "rgba(255,255,255,0.3)",
    borderBottomWidth: 1,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  closeButton: {
    padding: 8,
  },
  menuContainer: {
    paddingVertical: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: "#F0F0F0",
    borderBottomWidth: 1,
  },
  activeMenuItem: {
    backgroundColor: "#F5F7FA",
  },
  menuItemText: {
    fontSize: 16,
    color: "#7B8D93",
    marginLeft: 16,
    flex: 1,
  },
  activeMenuItemText: {
    color: "#E94057",
    fontWeight: "bold",
  },
});

export default CustomDrawer;
