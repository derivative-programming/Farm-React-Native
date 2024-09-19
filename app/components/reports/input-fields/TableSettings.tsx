import React, { useState } from 'react';
import { View, Text, Button, Modal, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface TableColumn {
  header: string;
  isVisible: boolean;
  isPreferenceVisible: boolean;
}

// Make TableSettingsProps generic with a constraint that ensures T has properties like TableColumn
export interface TableSettingsProps<T extends Record<string, TableColumn>> {
  columns: T; // Ensure columns follow the structure of TableColumn
  onToggleColumn: (colName: keyof T) => void;
  onSetAllColumnsVisibility: (visibility: boolean) => void;
  name: string;
}

// Generic component for table settings
export const TableSettings = <T extends Record<string, TableColumn>>({
  columns,
  onToggleColumn,
  onSetAllColumnsVisibility,
  name,
}: TableSettingsProps<T>) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const columnKeys = Object.keys(columns) as Array<keyof T>;

  return (
    <View>
      {/* Button to open modal */}
      <TouchableOpacity onPress={() => setModalVisible(true)} testID={`${name}-dropdown`} style={styles.iconButton}>
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>

      {/* Modal for column settings */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Column Visibility Settings</Text>

            {/* Check All and Uncheck All buttons */}
            <View style={styles.buttonContainer}>
              <Button title="Check All" onPress={() => onSetAllColumnsVisibility(true)} testID={`${name}-check-all`} />
              <Button title="Uncheck All" onPress={() => onSetAllColumnsVisibility(false)} testID={`${name}-uncheck-all`} />
            </View>

            {/* Scrollable column list */}
            <ScrollView style={styles.scrollView}>
              {columnKeys.map(colKey => {
                const column = columns[colKey];
                return column.isVisible ? (
                  <TouchableOpacity
                    key={String(colKey)}
                    style={styles.checkboxContainer}
                    onPress={() => onToggleColumn(colKey)}
                  >
                    <Ionicons
                      name={column.isPreferenceVisible ? 'checkbox-outline' : 'square-outline'}
                      size={24}
                      color="black"
                      style={styles.checkbox}
                    />
                    <Text>{column.header}</Text>
                  </TouchableOpacity>
                ) : null;
              })}
            </ScrollView>

            {/* Close button */}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    iconButton: {
      // marginLeft: 15,
      marginRight: 15,
    },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  scrollView: {
    maxHeight: 300,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
});
