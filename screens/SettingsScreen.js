import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../common/Header';

const SettingsScreen = ({ navigation, route }) => {
  const { biometricEnabled, setBiometricEnabled } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Ajustes"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView contentContainerStyle={styles.settingsContainer}>
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <MaterialIcons name="person" size={40} color="#5D9CEC" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Usuario</Text>
            <Text style={styles.profileEmail}>usuario@email.com</Text>
          </View>
          <TouchableOpacity style={styles.profileEdit}>
            <MaterialIcons name="edit" size={24} color="#7B8D93" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Configuración general</Text>
          
          <View style={styles.settingItem}>
            <MaterialIcons name="notifications" size={24} color="#5D9CEC" />
            <Text style={styles.settingLabel}>Notificaciones</Text>
            <Switch
              trackColor={{ false: "#e0e0e0", true: "#bbd6f7" }}
              thumbColor={true ? "#5D9CEC" : "#f4f3f4"}
              value={true}
            />
          </View>
          
          <View style={styles.settingItem}>
            <MaterialIcons name="vibration" size={24} color="#5D9CEC" />
            <Text style={styles.settingLabel}>Vibración</Text>
            <Switch
              trackColor={{ false: "#e0e0e0", true: "#bbd6f7" }}
              thumbColor={true ? "#5D9CEC" : "#f4f3f4"}
              value={true}
            />
          </View>
          
          <View style={styles.settingItem}>
            <MaterialIcons name="fingerprint" size={24} color="#5D9CEC" />
            <Text style={styles.settingLabel}>Autenticación biométrica</Text>
            <Switch
              trackColor={{ false: "#e0e0e0", true: "#bbd6f7" }}
              thumbColor={biometricEnabled ? "#5D9CEC" : "#f4f3f4"}
              onValueChange={setBiometricEnabled}
              value={biometricEnabled}
            />
          </View>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Privacidad y seguridad</Text>
          
          <TouchableOpacity style={styles.settingItemButton}>
            <MaterialIcons name="lock" size={24} color="#5D9CEC" />
            <Text style={styles.settingLabel}>Cambiar contraseña</Text>
            <MaterialIcons name="chevron-right" size={24} color="#7B8D93" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItemButton}>
            <MaterialIcons name="security" size={24} color="#5D9CEC" />
            <Text style={styles.settingLabel}>Configurar PIN de seguridad</Text>
            <MaterialIcons name="chevron-right" size={24} color="#7B8D93" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItemButton}>
            <MaterialIcons name="color-lens" size={24} color="#5D9CEC" />
            <Text style={styles.settingLabel}>Apariencia de la aplicación</Text>
            <MaterialIcons name="chevron-right" size={24} color="#7B8D93" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}
        >
          <MaterialIcons name="exit-to-app" size={24} color="#FF5252" />
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  settingsContainer: {
    padding: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666666',
  },
  profileEdit: {
    padding: 8,
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  settingsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  settingLabel: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#333333',
  },
  settingItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  logoutButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FF5252',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;