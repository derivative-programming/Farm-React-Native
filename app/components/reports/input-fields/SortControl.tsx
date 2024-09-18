// SortControl.tsx or SortControl.jsx

import React, { FC, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

interface SortControlProps {
  onSortChange: (sortColumn: string, sortDirection: 'asc' | 'desc') => void;
  availableColumns: { label: string; value: string }[];
  initialSortColumn?: string;
  initialSortDirection?: 'asc' | 'desc';
}

export const SortControl: FC<SortControlProps> = ({
  onSortChange,
  availableColumns,
  initialSortColumn = '',
  initialSortDirection = 'asc',
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sortColumn, setSortColumn] = useState(initialSortColumn);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(initialSortDirection);

  // Update state when initialSortColumn or initialSortDirection props change
  useEffect(() => {
    setSortColumn(initialSortColumn);
  }, [initialSortColumn]);

  useEffect(() => {
    setSortDirection(initialSortDirection);
  }, [initialSortDirection]);

  const applySort = () => {
    onSortChange(sortColumn, sortDirection);
    setModalVisible(false);
  };

  const resetSort = () => {
    setSortColumn('');
    setSortDirection('asc');
    onSortChange('', 'asc');
    setModalVisible(false);
  };

  return (
    <View>
      {/* Sort Icon */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
        <Ionicons name="swap-vertical" size={24} color="black" />
      </TouchableOpacity>

      {/* Sort Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sort Options</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Sort Form */}
          <View style={styles.formContainer}>
            {/* Sort Column Picker */}
            <View style={styles.formRow}>
              <Text style={styles.label}>Sort By</Text>
              <Picker
                selectedValue={sortColumn}
                onValueChange={(itemValue) => setSortColumn(itemValue)}
              >
                <Picker.Item label="Select Column" value="" />
                {availableColumns.map((column) => (
                  <Picker.Item key={column.value} label={column.label} value={column.value} />
                ))}
              </Picker>
            </View>

            {/* Sort Direction Picker */}
            <View style={styles.formRow}>
              <Text style={styles.label}>Sort Direction</Text>
              <Picker
                selectedValue={sortDirection}
                onValueChange={(itemValue) => setSortDirection(itemValue)}
              >
                <Picker.Item label="Ascending" value="asc" />
                <Picker.Item label="Descending" value="desc" />
              </Picker>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={applySort}>
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetSort}>
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    marginLeft: 15,
  },
  modalContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 5,
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
  },
  formRow: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    marginLeft: 5,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  resetButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
  },
});

export default SortControl;
