import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../components/Header';

const getRiskColor = (level) => {
  if (level <= 3) return "#4CAF50";
  if (level <= 7) return "#FFC107";
  return "#FF5252";
};

const getRiskMessage = (level) => {
  if (level <= 3) {
    return {
      title: "Nivel Básico",
      message:
        "Tu nivel de autoconocimiento es básico. Tienes un buen punto de partida, pero hay oportunidades para profundizar en tu desarrollo personal.",
    };
  }
  if (level <= 7) {
    return {
      title: "Nivel Intermedio",
      message:
        "Has desarrollado un nivel intermedio de autoconocimiento. Estás en el camino correcto, pero podrías beneficiarte de más herramientas y recursos.",
    };
  }
  return {
    title: "Nivel Avanzado",
    message:
      "Tu nivel de autoconocimiento es avanzado. Recomendamos que consultes recursos adicionales y consideres profundizar en aspectos específicos para seguir creciendo.",
  };
};

const ResultsScreen = ({ navigation, riskLevel, startTest }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Resultados" leftIcon="arrow-back" onLeftPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Tu nivel de autoconocimiento</Text>

        <View style={styles.resultsMeterContainer}>
          <View style={styles.resultsMeterBar}>
            <View
              style={[
                styles.resultsMeterFill,
                { width: `${(riskLevel / 10) * 100}%`, backgroundColor: getRiskColor(riskLevel) },
              ]}
            />
            <View style={[styles.resultsMeterIndicator, { left: `${(riskLevel / 10) * 100}%` }]} />
          </View>
          <View style={styles.resultsLabels}>
            <Text style={styles.resultLabelLow}>Básico</Text>
            <Text style={styles.resultLabelMedium}>Intermedio</Text>
            <Text style={styles.resultLabelHigh}>Avanzado</Text>
          </View>
        </View>

        <View style={styles.resultMessageContainer}>
          <Text style={styles.resultMessageTitle}>{getRiskMessage(riskLevel).title}</Text>
          <Text style={styles.resultMessageText}>{getRiskMessage(riskLevel).message}</Text>
        </View>

        <View style={styles.suggestedActionsContainer}>
          <Text style={styles.suggestedActionsTitle}>Acciones sugeridas</Text>

          <TouchableOpacity style={styles.suggestedActionButton} onPress={() => navigation.navigate('Forum')}>
            <MaterialIcons name="forum" size={24} color="#5D9CEC" />
            <Text style={styles.suggestedActionText}>Visitar el Foro de Ayuda</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.suggestedActionButton} onPress={() => navigation.navigate('Directory')}>
            <MaterialIcons name="library-books" size={24} color="#5D9CEC" />
            <Text style={styles.suggestedActionText}>Consultar el Directorio</Text>
          </TouchableOpacity>

          {riskLevel > 7 && (
            <TouchableOpacity
              style={[styles.suggestedActionButton, styles.suggestedActionUrgent]}
              onPress={() => navigation.navigate('Contacts')}
            >
              <MaterialIcons name="contacts" size={24} color="#FF5252" />
              <Text style={[styles.suggestedActionText, styles.suggestedActionTextUrgent]}>Ver Contactos de Ayuda</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.retakeTestButton} onPress={startTest}>
            <Text style={styles.retakeTestButtonText}>Realizar test de nuevo</Text>
          </TouchableOpacity>
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
  resultsContainer: {
    padding: 16,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 24,
  },
  resultsMeterContainer: {
    marginBottom: 24,
  },
  resultsMeterBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  resultsMeterFill: {
    height: '100%',
  },
  resultsMeterIndicator: {
    position: 'absolute',
    top: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#5D9CEC',
    marginLeft: -8,
  },
  resultsLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  resultLabelLow: {
    fontSize: 12,
    color: '#4CAF50',
  },
  resultLabelMedium: {
    fontSize: 12,
    color: '#FFC107',
  },
  resultLabelHigh: {
    fontSize: 12,
    color: '#FF5252',
  },
  resultMessageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  resultMessageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  resultMessageText: {
    fontSize: 14,
    color: '#666666',
  },
  suggestedActionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  suggestedActionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  suggestedActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  suggestedActionText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333333',
  },
  suggestedActionUrgent: {
    backgroundColor: '#FFEBEE',
  },
  suggestedActionTextUrgent: {
    color: '#FF5252',
  },
  retakeTestButton: {
    backgroundColor: '#5D9CEC',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  retakeTestButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResultsScreen;