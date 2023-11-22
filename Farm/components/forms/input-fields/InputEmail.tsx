import React, { FC, ReactElement } from "react"; 
import "../../../App.scss";
import {useField } from 'formik'; 
import { FormControl, Input, VStack, WarningOutlineIcon } from "native-base";
   
export interface FormInputEmailProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
}
   
export const FormInputEmail: FC<FormInputEmailProps> = ({
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
  //     <Form.Group controlId={name} className="mb-2 text-start" data-testid={name + '-group'}>
  //         <Form.Label data-testid={name + '-label'}
  //           size="sm">{label}</Form.Label>
  //         <Form.Control
  //           // ref={inputRef}
  //           data-testid={name}
  //           type="email"
  //           placeholder={placeholder}
  //           {...field} 
  //           disabled={disabled}
  //           autoFocus={autoFocus}
  //           isInvalid={isInvalid}
  //           size="sm"
  //         />
  //         <Form.Control.Feedback  className="text-start" type="invalid">{meta.error}</Form.Control.Feedback>
  //     </Form.Group> 
  // </div>
  <VStack space={2} width="100%">
    <FormControl isInvalid={isInvalid} isDisabled={disabled} testID={name + '-group'}>
      <FormControl.Label testID={name + '-label'}>{label}</FormControl.Label>
      <Input
        testID={name}
        keyboardType="email-address" 
        placeholder={placeholder}
        {...field}
        isDisabled={disabled}
        // React Native does not directly support autoFocus in the same way as web
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
   