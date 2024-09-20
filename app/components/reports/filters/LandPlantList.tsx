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

import * as ReportService from '../services/LandPlantList';
import { AuthContext } from '../../../context/authContext';
import * as ReportInput from '../input-fields';
import * as Lookups from '../lookups';
import useAnalyticsDB from '../../../hooks/useAnalyticsDB';

export interface ReportFilterLandPlantListProps {
  name: string;
  initialQuery: ReportService.QueryRequest;
  onSubmit(request: ReportService.QueryRequest): void;
  hidden?: boolean;
  isCollapsible?: boolean;
}

const ReportFilterLandPlantList: FC<ReportFilterLandPlantListProps> = ({
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
      logClick('ReportFilterLandPlantList', 'submit', '');
      onSubmit(values);
      setModalVisible(false); // Close modal after submitting
    } finally {
      actions.setSubmitting(false);
      setLoading(false);
    }
  };

  const resetButtonPress = () => {
    logClick('ReportFilterLandPlantList', 'refresh', '');
    setInitialValues({ ...initialQuery });
  };

  const onFilterIconPress = () => {
    setModalVisible(true);
    logClick('ReportFilterLandPlantList', 'filterIconClick', '');
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
                    <View style={styles.formCol} id="flavorFilterCode">
                      <Lookups.ReportSelectFlavor
                        name="flavorFilterCode"
                        label="Select A Flavor"
                        // isFKListInactiveIncluded={false}
                        // isFKListSearchable={true}
                      />
                    </View>
                    <View style={styles.formCol} id="someFilterIntVal">
                      <ReportInput.ReportInputNumber
                        name="someFilterIntVal"
                        label="Some Int Val"
                      />
                    </View>
                    <View style={styles.formCol} id="someFilterBigIntVal">
                      <ReportInput.ReportInputNumber
                        name="someFilterBigIntVal"
                        label="Some Big Int Val"
                      />
                    </View>
                    <View style={styles.formCol} id="someFilterFloatVal">
                      <ReportInput.ReportInputNumber
                        name="someFilterFloatVal"
                        label="Some Float Val"
                      />
                    </View>
                    <View style={styles.formCol} id="someFilterBitVal">
                      <ReportInput.ReportInputCheckbox
                        name="someFilterBitVal"
                        label="Some Bit Val"
                      />
                    </View>
                    <View style={styles.formCol} id="isFilterEditAllowed">
                      <ReportInput.ReportInputCheckbox
                        name="isFilterEditAllowed"
                        label="Some Bit Val"
                      />
                    </View>
                    <View style={styles.formCol} id="isFilterDeleteAllowed">
                      <ReportInput.ReportInputCheckbox
                        name="isFilterDeleteAllowed"
                        label="Is Delete Allowed"
                      />
                    </View>
                    <View style={styles.formCol} id="someFilterDecimalVal">
                      <ReportInput.ReportInputNumber
                        name="someFilterDecimalVal"
                        label="Some Decimal Val"
                      />
                    </View>
                    <View style={styles.formCol} id="someMinUTCDateTimeVal">
                      <ReportInput.ReportInputDateTime
                        name="someMinUTCDateTimeVal"
                        label="Some Min UTC Date Time Val"
                      />
                    </View>
                    <View style={styles.formCol} id="someMinDateVal">
                      <ReportInput.ReportInputDate
                        name="someMinDateVal"
                        label="Some Min Date Val"
                      />
                    </View>
                    <View style={styles.formCol} id="someFilterMoneyVal">
                      <ReportInput.ReportInputMoney
                        name="someFilterMoneyVal"
                        label="Some Money Val"
                      />
                    </View>
                    <View style={styles.formCol} id="someFilterNVarCharVal">
                      <ReportInput.ReportInputText
                        name="someFilterNVarCharVal"
                        label="Some N Var Char Val"
                      />
                    </View>
                    <View style={styles.formCol} id="someFilterVarCharVal">
                      <ReportInput.ReportInputText
                        name="someFilterVarCharVal"
                        label="Some Var Char Val"
                      />
                    </View>
                    <View style={styles.formCol} id="someFilterTextVal">
                      <ReportInput.ReportInputText
                        name="someFilterTextVal"
                        label="Some Text Val"
                      />
                    </View>
                    <View style={styles.formCol} id="someFilterPhoneNumber">
                      <ReportInput.ReportInputText
                        name="someFilterPhoneNumber"
                        label="Some Phone Number"
                      />
                    </View>
                    <View style={styles.formCol} id="someFilterEmailAddress">
                      <ReportInput.ReportInputEmail
                        name="someFilterEmailAddress"
                        label="Some Email Address"
                      />
                    </View>
                    <View style={styles.formCol} id="someFilterUniqueIdentifier">
                      <ReportInput.ReportInputText
                        name="someFilterUniqueIdentifier"
                        label="Some Filter Unique Identifier"
                      />
                    </View> 
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
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  formCol: {
    width: '100%', // Adjust as needed
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

export default ReportFilterLandPlantList;
