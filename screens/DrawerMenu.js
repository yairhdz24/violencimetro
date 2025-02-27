import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const DrawerMenu = ({
  drawerAnimation,
  menuItems,
  currentScreen,
  setCurrentScreen,
  toggleDrawer,
  handleHomeIconPress,
}) => {
  return (
    <Animated.View
      style={[
        styles.drawer,
        {
          transform: [{ translateX: drawerAnimation }],
        },
      ]}
    >
      <View style={styles.drawerHeader}>
        <View style={styles.drawerLogo}>
          <MaterialCommunityIcons name="flower-tulip" size={40} color="#5D9CEC" />
        </View>
        <Text style={styles.drawerTitle}>Bienestar Personal</Text>
        <TouchableOpacity onPress={toggleDrawer} style={styles.drawerClose}>
          <MaterialIcons name="close" size={24} color="#7B8D93" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.drawerContent}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.drawerItem, currentScreen === item.screen ? styles.drawerItemActive : {}]}
            onPress={() => {
              setCurrentScreen(item.screen);
              toggleDrawer();
            }}
          >
            <MaterialIcons name={item.icon} size={24} color={currentScreen === item.screen ? "#5D9CEC" : "#7B8D93"} />
            <Text style={[styles.drawerItemText, currentScreen === item.screen ? styles.drawerItemTextActive : {}]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.drawerFooterButton}
        onPress={() => {
          toggleDrawer();
          handleHomeIconPress(5);
        }}
      >
        <MaterialIcons name="home" size={24} color="#5D9CEC" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  drawerLogo: {
    marginRight: 16,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  drawerClose: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  drawerContent: {
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  drawerItemActive: {
    backgroundColor: '#E3F2FD',
  },
  drawerItemText: {
    marginLeft: 32,
    fontSize: 16,
    color: '#333333',
  },
  drawerItemTextActive: {
    color: '#5D9CEC',
    fontWeight: 'bold',
  },
  drawerFooterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});

export default DrawerMenu;