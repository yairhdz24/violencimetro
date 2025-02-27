import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

const DirectoryScreen = ({ navigation }) => {
  const directoryItems = [
    {
      category: 'Nivel Básico',
      color: '#4CAF50',
      items: [
        { term: 'Control sutil', description: 'Peticiones aparentemente inocentes que limitan la libertad personal.' },
        { term: 'Aislamiento inicial', description: 'Primeros indicios de separación de amigos y familiares.' },
        { term: 'Comunicación pasivo-agresiva', description: 'Comunicación que parece neutral pero contiene hostilidad encubierta.' }
      ]
    },
    {
      category: 'Nivel Intermedio',
      color: '#FFC107',
      items: [
        { term: 'Manipulación emocional', description: 'Tácticas para controlar a través de las emociones (culpa, miedo, etc.).' },
        { term: 'Limitación de autonomía', description: 'Restricción de la capacidad para tomar decisiones propias.' },
        { term: 'Gaslighting moderado', description: 'Hacer que la persona dude de su percepción de la realidad.' }
      ]
    },
    {
      category: 'Nivel Avanzado',
      color: '#FF5252',
      items: [
        { term: 'Ciclo de tensión', description: 'Patrón de acumulación de tensión que precede a incidentes graves.' },
        { term: 'Intimidación directa', description: 'Amenazas explícitas o veladas que generan miedo constante.' },
        { term: 'Aislamiento severo', description: 'Corte total de relaciones con personas de apoyo.' }
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Biblioteca de Términos"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView contentContainerStyle={styles.directoryContainer}>
        {directoryItems.map((category, index) => (
          <View key={index} style={styles.directoryCategory}>
            <View style={[styles.categoryLabel, { backgroundColor: category.color }]}>
              <Text style={styles.categoryLabelText}>{category.category}</Text>
            </View>
            
            {category.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.directoryItem}>
                <Text style={styles.directoryItemTerm}>{item.term}</Text>
                <Text style={styles.directoryItemDescription}>{item.description}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  directoryContainer: {
    padding: 16,
  },
  directoryCategory: {
    marginBottom: 24,
  },
  categoryLabel: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryLabelText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  directoryItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  directoryItemTerm: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333333',
  },
  directoryItemDescription: {
    fontSize: 14,
    color: '#666666',
  },
});

export default DirectoryScreen;