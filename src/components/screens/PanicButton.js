import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';
import * as AudioRecord from 'expo-av';

const PanicButton = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);

  const activatePanicMode = async () => {
    try {
      // 1. Activar ubicación en tiempo real
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se puede acceder a la ubicación');
        return;
      }
      
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
        (location) => {
          sendLocationToContacts(location.coords);
        }
      );

      // 2. Compartir ubicación con contactos de confianza
      const { status: contactsStatus } = await Contacts.requestPermissionsAsync();
      if (contactsStatus === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const trustedContacts = data.filter(contact => contact.isTrusted); // Asumiendo que hay una propiedad 'isTrusted'
          sendSMSToContacts(trustedContacts);
        }
      }

      // 3. Activar micrófono para grabar
      const { status: audioStatus } = await AudioRecord.requestPermissionsAsync();
      if (audioStatus === 'granted') {
        setIsRecording(true);
        const recording = new AudioRecord.Recording();
        await recording.prepareToRecordAsync(AudioRecord.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recording.startAsync();
        setRecording(recording);
      }

      // 4. Notificar a las autoridades (simulado)
      Alert.alert('Alerta enviada', 'Se ha notificado a las autoridades más cercanas.');

    } catch (error) {
      console.error('Error al activar el modo pánico:', error);
      Alert.alert('Error', 'No se pudo activar el modo pánico. Por favor, intente de nuevo.');
    }
  };

  const sendLocationToContacts = async (coords) => {
    // Implementar lógica para enviar ubicación a contactos
    console.log('Enviando ubicación:', coords);
  };

  const sendSMSToContacts = async (contacts) => {
    const message = 'Estoy en peligro. Esta es mi ubicación actual:';
    for (const contact of contacts) {
      if (contact.phoneNumbers && contact.phoneNumbers[0]) {
        await SMS.sendSMSAsync(contact.phoneNumbers[0].number, message);
      }
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={activatePanicMode}
      activeOpacity={0.7}
    >
      <MaterialIcons name="security" size={24} color="#1f4035" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PanicButton;