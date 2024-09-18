import React, { FC, ReactElement, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importing Ionicons

import * as ReportService from '../services/PacUserLandList';
import { AuthContext } from '../../../context/authContext';
import * as ReportInput from '../input-fields';
import * as Lookups from '../lookups';
import useAnalyticsDB from '../../../hooks/useAnalyticsDB';

export interface ReportFilterPacUserLandListProps {
  name: string;
  initialQuery: ReportService.QueryRequest;
  onSubmit(request: ReportService.QueryRequest): void;
  hidden?: boolean;
  isCollapsible?: boolean;
}

const ReportFilterPacUserLandList: FC<ReportFilterPacUserLandListProps> = ({
  name,
  initialQuery,
  onSubmit,
  hidden = false,
  isCollapsible = true,
}): ReactElement => {
  const [initialValues, setInitialValues] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { logClick } = useAnalyticsDB();

  const validationSchema = ReportService.buildValidationSchema();

  const authContext = useContext(AuthContext);

  const submitButtonPress = async (
    values: ReportService.QueryRequest,
    actions: FormikHelpers<ReportService.QueryRequest>
  ) => {
    try {
      setLoading(true);
      logClick('ReportFilterPacUserLandList', 'submit', '');
      onSubmit(values);
      setModalVisible(false); // Close modal after submitting
    } finally {
      actions.setSubmitting(false);
      setLoading(false);
    }
  };

  const resetButtonPress = () => {
    logClick('ReportFilterPacUserLandList', 'refresh', '');
    setInitialValues({ ...initialQuery });
  };

  const onFilterIconPress = () => {
    setModalVisible(true);
    logClick('ReportFilterPacUserLandList', 'filterIconClick', '');
  };

  if (hidden) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Filter Icon */}
      <TouchableOpacity onPress={onFilterIconPress} style={styles.filterIcon}>
        <Ionicons name="filter" size={24} color="black" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Formik Form */}
          <Formik
            enableReinitialize={true}
            initialValues={initialQuery}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              await submitButtonPress(values, actions);
            }}
          >
            {(props) => (
              <View style={styles.formContainer}>
                <ScrollView>
                  <View style={styles.formRow}>

                  </View>
                  {/* Include other form fields here */}
                </ScrollView>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={props.handleSubmit as any}
                    testID="submit-button"
                  >
                    {loading && (
                      <ActivityIndicator
                        size="small"
                        style={styles.activityIndicator}
                      />
                    )}
                    <Text style={styles.buttonText}>Search</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.resetButton]}
                    onPress={() => props.resetForm()}
                    testID="reset"
                  >
                    <Text style={styles.buttonText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    // width: '100%',
  },
  filterIcon: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginBottom: 10,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  formCol: {
    width: '50%', // Adjust as needed
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
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
  activityIndicator: {
    marginRight: 5,
  },
});

export default ReportFilterPacUserLandList;

