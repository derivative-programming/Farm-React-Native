import React, { FC, ReactElement, useState } from "react"; 

import {useField } from 'formik';
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import {FormInputErrorDisplay } from './InputErrorDisplay';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FormLabel } from "./InputLabel";
import * as theme from '../../../constants/theme';
   
export interface FormInputDateProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
  isRequired?: boolean;
  detailText?: string; 
}
   
export const FormInputDate: FC<FormInputDateProps> = ({
  name,
  label,
  placeholder,
  autoFocus = false,
  disabled = false,
  isVisible = true,
  isRequired = false,
  detailText = '', 
}): ReactElement | null => {
  const [field, meta, helpers] = useField(name); 
  const [show, setShow] = useState(false);

  const getDisplayDateTime = () => {
    const dt:moment.Moment = moment.utc(
        field.value,
        moment.ISO_8601
      );
    if(dt.isValid()){
      return dt.local();
    } else {
      return moment();
    } 
  }

  const selectedDateTimeLocal:moment.Moment = getDisplayDateTime();

  const errorDisplayControlName = name + "ErrorDisplay";
  
  const isInvalid:boolean = (meta.error && meta.touched) ? true : false;
  
  if (!isVisible) return null;

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || selectedDateTimeLocal.toDate();
    setShow(false);
    helpers.setValue(moment(currentDate).utc().format("YYYY-MM-DD"));
  };

  return ( 
  <View style={styles.container}> 
    <FormLabel text={label} name={name + '-label'} isRequired={isRequired} />
    <TouchableOpacity 
      onPress={() => setShow(true)} 
      style={[styles.button, disabled && styles.disabledButton]}
      disabled={disabled}
    >
      <Text testID={name}>
        {selectedDateTimeLocal.format("YYYY-MM-DD") || placeholder}
      </Text>
    </TouchableOpacity>

    {show && (
      <DateTimePicker
        value={new Date(selectedDateTimeLocal.toDate())}
        mode="date"
        display="default"
        onChange={onChange}
        disabled={disabled}
        testID={name + '-dateTimePicker'}
      />
    )}

    {meta.touched && meta.error && (
      <Text style={styles.errorText}>{meta.error}</Text>
    )}
    {detailText.length > 0 && (
      <Text style={styles.detailText}> 
        {detailText}
      </Text>
    )}
  </View>
  );
};
   
const styles = StyleSheet.create({
  container: {
    width: '100%',
    
  }, 
  button: {
    
    marginBottom: 8,    
  },
  disabledButton: {
    
    opacity: 0.5,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,    
    
  },
  detailText: {
    color: '#6c757d',  
    fontSize: theme.fonts.smallSize,
    marginTop: -10,  // Adjust spacing as needed
    marginBottom: 10,
  },
  
});
