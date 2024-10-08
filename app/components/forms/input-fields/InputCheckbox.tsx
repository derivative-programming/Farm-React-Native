import React, { FC, ReactElement } from "react"; 
import {useField } from 'formik'; 
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { FormLabel } from "./InputLabel"; 
import { DetailsText } from "./DetailText";
   
export interface FormInputCheckboxProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
  isRequired?: boolean;
  detailText?: string; 
}
   
export const FormInputCheckbox: FC<FormInputCheckboxProps> = ({
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

  const errorDisplayControlName = name + "ErrorDisplay";
  
  const isInvalid:boolean = (meta.error && meta.touched) ? true : false;
      
  if (!isVisible) return null;

  return ( 
  <View style={styles.container}>
    <View style={styles.switchContainer}>
      <FormLabel text={label} name={name + '-label'}/> 
      <Switch 
        value={field.value}
        disabled={disabled}
        testID={name} 
        onValueChange={(value) => {
          helpers.setValue(value);
        }}
        // onChangeText={field.onChange(name)}
        // onBlur={field.onBlur(name)} 
      /> 
    </View>
    {meta.touched && meta.error && (
      <Text style={styles.errorText}>{meta.error}</Text>
    )}
    {detailText.length > 0 && (
      <DetailsText content={detailText} /> 
    )}
  </View>
  );
};
   

const styles = StyleSheet.create({
  container: {
    
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0, // Add space between the switch and the label 
  }, 
  errorText: {
    color: 'red',
    marginBottom: 8,     
  }, 
  
});