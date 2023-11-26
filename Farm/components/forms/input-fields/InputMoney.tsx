import React, { FC, ReactElement } from "react"; 

import {useField } from 'formik'; 
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FormLabel } from "./InputLabel";
import * as theme from '../../../constants/theme'
   
export interface FormInputMoneyProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
}
   
export const FormInputMoney: FC<FormInputMoneyProps> = ({
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
  //   <div className="" hidden={!isVisible}>
  //     <Form.Group controlId={name} className="mb-2 text-start">
  //         <Form.Label data-testid={name + '-label'}
  //           size="sm">{label}</Form.Label>
  //         <InputGroup>
  //           <InputGroup.Text>$</InputGroup.Text>
  //           <Form.Control
  //             // className="mb-0"
  //             data-testid={name}  
  //             aria-label={name} 
  //             type="number"
  //             {...field} 
  //             disabled={disabled}
  //             autoFocus={autoFocus}
  //             onKeyDown={onKeyDown}
  //             isInvalid={isInvalid}
  //             size="sm"
  //           />
  //           <Form.Control.Feedback  className="text-start" type="invalid">{meta.error}</Form.Control.Feedback>
  //         </InputGroup>
  //     </Form.Group> 
  // </div>
  // <VStack space={2} width="100%">
  //     <FormControl isInvalid={isInvalid} isDisabled={disabled}>
  //       <FormControl.Label>{label}</FormControl.Label>
  //       <HStack alignItems="center" space={2}>
  //         <Text>$</Text> {/* Prefix */}
  //         <Input
  //           testID={name}
  //           keyboardType="numeric" // For number input
  //           placeholder="Amount"
  //           {...field}
  //           isDisabled={disabled}
  //           // React Native does not directly support onKeyDown in the same way as web
  //           // Implement any specific logic needed for React Native here
  //         />
  //       </HStack>
  //       {isInvalid && (
  //         <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
  //           {meta.error}
  //         </FormControl.ErrorMessage>
  //       )}
  //     </FormControl>
  //   </VStack>
    <View style={styles.container}>
        <FormLabel text={label} name={name + '-label'}/>
        <View style={styles.horizontalStack}>
          <Text style={styles.prefix}>$</Text> 
          <TextInput
            style={[styles.input, disabled && styles.disabledInput]}
            keyboardType="numeric"
            placeholder="Amount"
            editable={!disabled}
            id={name} 
            testID={name}
            onChangeText={field.onChange(name)}
            onBlur={field.onBlur(name)}
            value={field.value.toString()}   
            // Additional TextInput props as needed
          />
        </View>
        {isInvalid && (
          <Text style={styles.errorText}>{meta.error}</Text>
        )}
    </View>
  );
};
   

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // Additional container styling
  }, 
  horizontalStack: {
    flexDirection: 'row', // Aligns children horizontally
    alignItems: 'center', // Center items vertically in the row
    // Additional styling for the horizontal stack
  },
  prefix: {
    // Styling for the prefix text
  },
  input: {
    // Styling for the TextInput
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
  disabledInput: {
    // Styling for the disabled TextInput
    // backgroundColor: '#f7f7f7',
    // color: '#c7c7c7',
    // borderColor: '#e7e7e7',
    opacity: 0.5,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,    
    // Additional styling for error message text
  },
  // Other styles as needed
});