import React, { useRef, useEffect } from "react"
import { Animated, View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

const menuItems = [
  { icon: "home", name: "Inicio", screen: "Home" },
  { icon: "help-outline", name: "Test de Riesgo", screen: "Test" },
  { icon: "forum", name: "Foro de Ayuda", screen: "Forum" },
  { icon: "library-books", name: "Directorio", screen: "Directory" },
  { icon: "location-on", name: "Ubicación", screen: "Location" },
  { icon: "contacts", name: "Contactos", screen: "Contacts" },
  { icon: "history", name: "Historial", screen: "History" },
  { icon: "settings", name: "Ajustes", screen: "Settings" },
  { icon: "info-outline", name: "Ayuda", screen: "Help" }
]

const CustomDrawer = ({ isOpen, toggleDrawer, navigation }) => {
  // Valor animado que controla el desplazamiento horizontal
  const drawerAnimation = useRef(new Animated.Value(isOpen ? 0 : -width * 0.7)).current

  useEffect(() => {
    Animated.timing(drawerAnimation, {
      toValue: isOpen ? 0 : -width * 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [isOpen, drawerAnimation])

  return (
    <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerAnimation }] }]}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="flower-tulip" size={40} color="#5D9CEC" />
        </View>
        <Text style={styles.title}>Bienestar Personal</Text>
        <TouchableOpacity onPress={toggleDrawer} style={styles.closeButton}>
          <MaterialIcons name="close" size={24} color="#7B8D93" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate(item.screen)
              toggleDrawer()
            }}
          >
            <MaterialIcons name={item.icon} size={24} color="#7B8D93" />
            <Text style={styles.menuItemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "70%",
    backgroundColor: "white",
    zIndex: 1000,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F7FA",
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#454F63",
    marginLeft: 16,
  },
  closeButton: {
    padding: 8,
  },
  menu: {
    paddingVertical: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: "#7B8D93",
    marginLeft: 16,
  },
})

export default CustomDrawer
