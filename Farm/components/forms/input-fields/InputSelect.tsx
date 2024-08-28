import React, { FC, ReactElement } from "react"; 

import {useField } from 'formik'; 
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';  
import { FormLabel } from "./InputLabel";
import * as theme from '../../../constants/theme'

   
export interface FormInputSelectProps {
  name: string
  label: string
  options:FormInputSelectOption[]
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
}

export interface FormInputSelectOption {
  label: string
  value: string
}
   
export const FormInputSelect: FC<FormInputSelectProps> = ({
  name,
  label,
  options,
  placeholder,
  autoFocus = false,
  disabled = false,
  isVisible = true,
}): ReactElement | null => {
  const [field, meta, helpers] = useField(name); 

  const errorDisplayControlName = name + "ErrorDisplay";
  
  const isInvalid:boolean = (meta.error && meta.touched) ? true : false;
      
  if (!isVisible) return null;

  return ( 
    <View style={styles.container}>
      <FormLabel text={label} name={name + '-label'}/>
      <Picker
        selectedValue={field.value}
        onValueChange={(itemValue) => field.onChange(name)(itemValue)}
        enabled={!disabled}
        testID={name}
        accessibilityLabel={name}
        style={styles.picker}  
      >
        <Picker.Item label="Please Select One" value="" />
        {options.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
      {isInvalid && (
        <Text style={styles.errorText}>{meta.error}</Text>
      )}
    </View>
  );
};
   

const styles = StyleSheet.create({
  container: {
    width: '100%',
    
  }, 
  picker: {
    // Styling for the Picker 
    width: '100%',
    fontSize: theme.fonts.mediumSize,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    color: '#333',
    backgroundColor: '#fff',
    marginBottom: 15, // Space below the input for spacing in form
  },
  errorText: {
    color: 'red',
    marginBottom: 8,    
    
  },
  
});