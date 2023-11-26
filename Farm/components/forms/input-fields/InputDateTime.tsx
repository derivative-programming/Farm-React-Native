import React, { FC, ReactElement, useState } from "react"; 

import {useField } from 'formik';
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker'; 
import {FormInputErrorDisplay } from './InputErrorDisplay';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FormLabel } from "./InputLabel";
   
export interface FormInputDateTimeProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
}
   
export const FormInputDateTime: FC<FormInputDateTimeProps> = ({
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
  //   <div className="" hidden={!isVisible}>
  //     <Form.Group controlId={name} className="mb-2 text-start">
  //         <Form.Label data-testid={name + '-label'}>{label}</Form.Label>
  //         <DatePicker
  //           // ref={inputRef}
  //           size="small"
  //           showTime={true}
  //           format="M/D/YYYY h:mm A"
  //           data-testid={name} 
  //           aria-label={name} 
  //           placeholder={placeholder}
  //           name={field.name}
  //           defaultValue={selectedDateTimeLocal}
  //           value={selectedDateTimeLocal}
  //           onChange={(e) => helpers.setValue(moment(e).utc().format("YYYY-MM-DDTHH:mm"))}
  //           onBlur={field.onBlur} 
  //           disabled={disabled}
  //           autoFocus={autoFocus}
  //         /> 
  //     </Form.Group>
  //     <FormInputErrorDisplay name={errorDisplayControlName} forInputName={name} /> 
  // </div>
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
    // Add other styling as required
  }, 
  button: {
    // Add button styling here
    marginBottom: 8,    
  },
  disabledButton: {
    // Add disabled button styling here
    opacity: 0.5,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,    
    // Add other styling for error text
  },
  // Additional styles can be added as needed
});