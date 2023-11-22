import React, { FC, ReactElement } from "react"; 

import {useField } from 'formik'; 
import { CheckIcon, FormControl, Select, VStack, WarningOutlineIcon } from "native-base";
   
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
    // <div className="" hidden={!isVisible}>
    //   <Form.Group controlId={name} className="mb-2 text-start">
    //       <Form.Label data-testid={name + '-label'}
    //         size="sm">{label}</Form.Label>
    //       <Form.Select
    //           data-testid={name}
    //           aria-label={name}  
    //           {...field} 
    //           disabled={disabled}
    //           autoFocus={autoFocus}
    //           isInvalid={isInvalid}
    //           size="sm"
    //       >
    //           <option>Please Select One</option>
    //           {options.map((item, index) => {
    //               return (
    //               <option
    //                   data-test-option-id="select-option"
    //                   key={index}
    //                   value={item.value}
    //               >
    //                 {item.label}
    //               </option>
    //               );
    //           })}
    //       </Form.Select>
    //       <Form.Control.Feedback className="text-start" type="invalid">{meta.error}</Form.Control.Feedback>
    //   </Form.Group>  
    // </div>

    <VStack space={2} width="100%">
      <FormControl isInvalid={isInvalid} isDisabled={disabled}>
        <FormControl.Label>{label}</FormControl.Label>
        <Select
          selectedValue={field.value}
          onValueChange={(itemValue) => field.onChange(name)(itemValue)}
          testID={name}
          accessibilityLabel={name}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          placeholder="Please Select One"
          isDisabled={disabled}
        >
          {options.map((item, index) => (
            <Select.Item key={index} label={item.label} value={item.value} />
          ))}
        </Select>
        {isInvalid && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {meta.error}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
};
   