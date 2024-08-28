import React, { FC, ReactElement, useState } from "react";
import { useField } from 'formik';
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormLabel } from "./InputLabel";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export interface FormInputDateTimeProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?: boolean
  disabled?: boolean
  isVisible?: boolean
}

export const FormInputDateTime: FC<FormInputDateTimeProps> = ({
  name,
  label,
  placeholder = 'Select Date & Time',
  autoFocus = false,
  disabled = false,
  isVisible = true,
}): ReactElement | null => {
  const [field, meta, helpers] = useField(name); 
  const [show, setShow] = useState(false);

  const getDisplayDateTime = () => {
    const dt = moment.utc(field.value, moment.ISO_8601);
    return dt.isValid() ? dt.local() : null;
  }

  const selectedDateTimeLocal = getDisplayDateTime();

  const isInvalid = meta.error && meta.touched;
  
  if (!isVisible) return null;

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      helpers.setValue(moment(selectedDate).utc().format("YYYY-MM-DDTHH:mm:ss"));
    }
  };

  return ( 
    <View style={styles.container}>
      <FormLabel text={label} name={`${name}-label`} />
      <TouchableOpacity 
        onPress={() => setShow(true)} 
        style={[styles.button, disabled && styles.disabledButton]}
        disabled={disabled}
        accessibilityLabel={label}
        testID={`${name}-button`}
      >
        <Text testID={name}>
          {selectedDateTimeLocal ? selectedDateTimeLocal.format("M/D/YYYY h:mm A") : placeholder}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={selectedDateTimeLocal?.toDate() || new Date()}
          mode="datetime"
          display="default"
          onChange={onChange}
          disabled={disabled}
          testID={`${name}-picker`}
        />
      )}

      {isInvalid && (
        <Text style={styles.errorText} testID={`${name}-error`}>{meta.error}</Text>
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