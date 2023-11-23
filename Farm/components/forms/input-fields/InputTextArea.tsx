import React, { FC, ReactElement } from "react"; 

import {useField } from 'formik';
import {FormInputErrorDisplay } from './InputErrorDisplay';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FormLabel } from "./InputLabel";
import * as theme from '../../../constants/theme'
   
export interface FormInputTextAreaProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
}
   
export const FormInputTextArea: FC<FormInputTextAreaProps> = ({
  name,
  label,
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
      // <Form.Group controlId={name} className="mb-2 text-start">
      //     <Form.Label data-testid={name + '-label'}
      //       size="sm">{label}</Form.Label>
      //     <Form.Control
      //       // ref={inputRef}
      //       as="textarea"
      //       data-testid={name}
      //       type="text"
      //       rows={3}
      //       placeholder={placeholder}
      //       {...field} 
      //       disabled={disabled}
      //       autoFocus={autoFocus}
      //       isInvalid={isInvalid}
      //       size="sm"
      //     />
      //     <Form.Control.Feedback className="text-start" type="invalid">{meta.error}</Form.Control.Feedback>
      // </Form.Group>  
  
    // <FormControl isInvalid={isInvalid} isDisabled={disabled} mb="2">
    //   <FormControl.Label _text={{bold: true}}>{label}</FormControl.Label>
    //   <TextArea
    //     autoCompleteType={undefined} 
    //     testID={name}
    //     numberOfLines={3} 
    //     placeholder={placeholder}
    //     {...field}
    //     isDisabled={disabled}
    //     autoFocus={autoFocus}  
    //   />
    //   {isInvalid && (
    //     <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
    //       {meta.error}
    //     </FormControl.ErrorMessage>
    //   )}
    // </FormControl>

    <View style={styles.container}>
      <FormLabel text={label} name={name + '-label'}/>
      <TextInput
        style={[styles.textArea, disabled && styles.disabledTextArea]}
        multiline={true}
        numberOfLines={3}
        placeholder={placeholder}
        editable={!disabled}
        {...field}
        testID={name}
        autoFocus={autoFocus}
        // Additional props for TextInput as needed
      />
      {isInvalid && (
        <Text style={styles.errorText}>{meta.error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8, // mb="2" equivalent, assuming 1 unit = 4
    // Additional container styling
  }, 
  textArea: {
    // Styling for the TextInput as a TextArea
    textAlignVertical: 'top', // Important for multiline
    // Add other styling as required
    width: '100%',
    fontSize: theme.fonts.mediumSize,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    color: '#333',
    backgroundColor: '#fff',
    marginBottom: 15, // Space below the input for spacing in forms
  },
  disabledTextArea: {
    // Styling for the disabled TextArea
    // backgroundColor: '#f7f7f7',
    // color: '#c7c7c7',
    // borderColor: '#e7e7e7',
    opacity: 0.5,
  },
  errorText: {
    color: 'red',
    // Additional styling for the error message text
  },
  // Add any other styles as needed
});
   