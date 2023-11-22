import React, { FC, ReactElement } from "react"; 
import "../../../App.scss";
import {useField } from 'formik'; 
import { FormControl, Icon, IconButton, Input, VStack, WarningOutlineIcon } from "native-base";
   
export interface FormInputPasswordProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
}
   
export const FormInputPassword: FC<FormInputPasswordProps> = ({
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
  //         <Form.Control
  //           // ref={inputRef}
  //           data-testid={name}
  //           type="password"
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
          type="password"
          placeholder={placeholder}
          {...field}
          isDisabled={disabled} 
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
   