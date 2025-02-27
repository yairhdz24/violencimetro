import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '..//Header';

const ContactsScreen = ({ navigation, route }) => {
  const { emergencyContacts } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Contactos"
        leftIcon="arrow-back"
        rightIcon="add"
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => {/* Add new contact logic */}}
      />
      
      <ScrollView contentContainerStyle={styles.contactsContainer}>
        <Text style={styles.contactsTitle}>Contactos de Confianza</Text>
        <Text style={styles.contactsDescription}>
          Estos contactos recibirán notificaciones cuando actives la asistencia de emergencia
        </Text>
        
        {emergencyContacts.map(contact => (
          <View key={contact.id} style={styles.contactCard}>
            <View style={styles.contactAvatar}>
              <MaterialIcons name="person" size={28} color="#5D9CEC" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
            </View>
            <TouchableOpacity style={styles.contactEdit}>
              <MaterialIcons name="edit" size={24} color="#7B8D93" />
            </TouchableOpacity>
          </View>
        ))}
        
        <TouchableOpacity style={styles.addContactButton}>
          <MaterialIcons name="add" size={24} color="#5D9CEC" />
          <Text style={styles.addContactText}>Agregar contacto</Text>
        </TouchableOpacity>
        
        <View style={styles.contactsSettings}>
          <Text style={styles.contactsSettingsTitle}>Configuración de mensajes</Text>
          <View style={styles.contactsSettingItem}>
            <Text style={styles.contactsSettingLabel}>Mensaje predeterminado</Text>
            <Text style={styles.contactsSettingValue}>
              "Necesito ayuda. Este es un mensaje automático con mi ubicación actual."
            </Text>
            <TouchableOpacity style={styles.contactsSettingEdit}>
              <MaterialIcons name="edit" size={20} color="#5D9CEC" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  contactsContainer: {
    padding: 16,
  },
  contactsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  contactsDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 24,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  contactPhone: {
    fontSize: 14,
    color: '#666666',
  },
  contactEdit: {
    padding: 8,
  },
  addContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  addContactText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#5D9CEC',
    fontWeight: 'bold',
  },
  contactsSettings: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  contactsSettingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  contactsSettingItem: {
    marginBottom: 8,
  },
  contactsSettingLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  contactsSettingValue: {
    fontSize: 14,
    color: '#333333',
  },
  contactsSettingEdit: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 8,
  },
});

export default ContactsScreen;