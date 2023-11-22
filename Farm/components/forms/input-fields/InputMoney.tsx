import React, { FC, ReactElement } from "react"; 

import {useField } from 'formik';
import { onKeyDown } from "../../../common/utilities"; 
import { FormControl, HStack, Input, VStack, WarningOutlineIcon, Text } from "native-base";
   
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
  <VStack space={2} width="100%">
      <FormControl isInvalid={isInvalid} isDisabled={disabled}>
        <FormControl.Label>{label}</FormControl.Label>
        <HStack alignItems="center" space={2}>
          <Text>$</Text> {/* Prefix */}
          <Input
            testID={name}
            keyboardType="numeric" // For number input
            placeholder="Amount"
            {...field}
            isDisabled={disabled}
            // React Native does not directly support onKeyDown in the same way as web
            // Implement any specific logic needed for React Native here
          />
        </HStack>
        {isInvalid && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {meta.error}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
};
   