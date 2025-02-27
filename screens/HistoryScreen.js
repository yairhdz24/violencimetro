import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '..//Header';

const getRiskColor = (level) => {
  if (level <= 3) return "#4CAF50";
  if (level <= 7) return "#FFC107";
  return "#FF5252";
};

const HistoryScreen = ({ navigation, route }) => {
  const { incidents } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Mis Apuntes"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView contentContainerStyle={styles.historyContainer}>
        {incidents.map(incident => (
          <View 
            key={incident.id} 
            style={[
              styles.historyItem,
              { borderLeftColor: getRiskColor(incident.riskLevel) }
            ]}
          >
            <View style={styles.historyItemHeader}>
              <Text style={styles.historyItemType}>{incident.type}</Text>
              <View style={styles.historyItemTime}>
                <MaterialIcons name="access-time" size={14} color="#7B8D93" />
                <Text style={styles.historyItemTimeText}>
                  {incident.date} - {incident.time}
                </Text>
              </View>
            </View>
            
            <View style={styles.historyItemContent}>
              {incident.type === 'Test completado' ? (
                <View style={styles.historyItemTest}>
                  <Text style={styles.historyItemTestLabel}>Nivel:</Text>
                  <View style={styles.historyItemRiskIndicator}>
                    <View 
                      style={[
                        styles.historyItemRiskLevel,
                        { backgroundColor: getRiskColor(incident.riskLevel), width: `${(incident.riskLevel/10) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.historyItemTestValue}>{incident.riskLevel}/10</Text>
                </View>
              ) : (
                <View style={styles.historyItemSos}>
                  <Text style={styles.historyItemSosLabel}>Duración:</Text>
                  <Text style={styles.historyItemSosValue}>15 minutos</Text>
                  <TouchableOpacity style={styles.historyItemSosPlay}>
                    <MaterialIcons name="play-arrow" size={18} color="#5D9CEC" />
                    <Text style={styles.historyItemSosPlayText}>Reproducir audio</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            
            <TouchableOpacity style={styles.historyItemActions}>
              <MaterialIcons name="more-horiz" size={24} color="#7B8D93" />
            </TouchableOpacity>
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
  historyContainer: {
    padding: 16,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
  },
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyItemType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  historyItemTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyItemTimeText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#7B8D93',
  },
  historyItemContent: {
    marginBottom: 12,
  },
  historyItemTest: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyItemTestLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  historyItemRiskIndicator: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  historyItemRiskLevel: {
    height: '100%',
  },
  historyItemTestValue: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  historyItemSos: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyItemSosLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  historyItemSosValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 16,
  },
  historyItemSosPlay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyItemSosPlayText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#5D9CEC',
  },
  historyItemActions: {
    alignSelf: 'flex-end',
  },
});

export default HistoryScreen;