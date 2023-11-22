import React, { FC, ReactElement } from "react"; 

import {useField } from 'formik'; 
import { FormControl, Input, VStack, WarningOutlineIcon } from "native-base";
   
export interface FormInputTextProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
}
    
export const FormInputText: FC<FormInputTextProps> = ({
  name,
  label,
  placeholder,
  autoFocus = false,
  disabled = false,
  isVisible = true,
}): ReactElement | null => {
  const [field, meta] = useField(name);  
  
  const isInvalid:boolean = (meta.error && meta.touched) ? true : false;
  
  if (!isVisible) return null;
      
  return (
  //   <div hidden={!isVisible}>
  //     <Form.Group controlId={name} className="mb-2 text-start" >
  //         <Form.Label data-testid={name + '-label'}
  //           size="sm">{label}</Form.Label>
  //         <Form.Control
  //           // ref={inputRef}
  //           data-testid={name}
  //           type="text"
  //           placeholder={placeholder}
  //           {...field} 
  //           disabled={disabled}
  //           autoFocus={autoFocus}  
  //           isInvalid={isInvalid}
  //           size="sm"
  //         />
  //         <Form.Control.Feedback className="text-start" type="invalid">{meta.error}</Form.Control.Feedback>
  //     </Form.Group> 
  // </div>
  <VStack space={2} width="100%">
      <FormControl isInvalid={isInvalid} isDisabled={disabled}>
        <FormControl.Label>{label}</FormControl.Label>
        <Input
          testID={name}
          placeholder={placeholder}
          {...field}
          isDisabled={disabled}
          // No direct equivalent in NativeBase for autoFocus, handled differently in React Native
        />
        {isInvalid && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {meta.error}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
};
   