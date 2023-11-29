import React, { FC, ReactElement, useState } from "react"; 

import {useField } from 'formik';
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker'; 
import {ReportInputErrorDisplay } from './InputErrorDisplay';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FormLabel } from "./InputLabel";
   
export interface ReportInputDateTimeProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
}
   
export const ReportInputDateTime: FC<ReportInputDateTimeProps> = ({
  name,
  label,
  placeholder,
  autoFocus = false,
  disabled = false,
  isVisible = true,
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
    helpers.setValue(moment(currentDate).utc().format("YYYY-MM-DDTHH:mm"));
  };
  
  return ( 
  <View style={styles.container}>
    <FormLabel text={label} name={name + '-label'}/>
    <TouchableOpacity 
      onPress={() => setShow(true)} 
      style={[styles.button, disabled && styles.disabledButton]}
      disabled={disabled}
    >
      <Text>
        {selectedDateTimeLocal.format("M/D/YYYY h:mm A") || placeholder}
      </Text>
    </TouchableOpacity>

    {show && (
      <DateTimePicker
        value={new Date(selectedDateTimeLocal.toDate())}
        mode="datetime"
        display="default"
        onChange={onChange}
        disabled={disabled}
      />
    )}

    {meta.touched && meta.error && (
      <Text style={styles.errorText}>{meta.error}</Text>
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
  
});