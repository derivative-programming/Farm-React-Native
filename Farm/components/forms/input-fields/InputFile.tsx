import React, { FC, ReactElement } from "react"; 

import {useField } from 'formik'; 
import { launchImageLibrary } from 'react-native-image-picker';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FormLabel } from "./InputLabel";

   
export interface FormInputFileProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
}
   
export const FormInputFile: FC<FormInputFileProps> = ({
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

  const convertBase64 = (file:any) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => { 
            let result = fileReader.result;
            if(result?.toString().includes(","))
            {
              result = result.toString().split(",")[1];
            }
            helpers.setValue(result)
        };
 
    });
  };
    
  const uploadImage = async (event: any) => {
    const files =  Array.from(event.target.files ?? []); 
    
    Array.from(files).forEach(file => {
      const base64 = convertBase64(file); 
    });  
  };

  
  const handleFileSelection = () => {
    const options = {}; // Specify any options you need
    // launchImageLibrary(options, (response) => {
    //   // Handling the image selection
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else {
    //     // You can call `uploadImage` here with the selected file
    //     uploadImage(response);
    //   }
    // });
  };
      
  return (
  //   <div className="" hidden={!isVisible}>
  //     <Form.Group controlId={name} className="mb-2 text-start">
  //         <Form.Label data-testid={name + '-label'}
  //           size="sm">{label}</Form.Label>
  //         <Form.Control
  //           // ref={inputRef}
  //           data-testid={name}
  //           type="file" 
  //          // placeholder={placeholder}
  //           name={field.name}
  //           //value={field.value}
  //           onBlur={field.onBlur} 
  //           onChange={(e) => uploadImage(e)}
  //           disabled={disabled}
  //           autoFocus={autoFocus}
  //           isInvalid={isInvalid} 
  //           size="sm"
  //         />
  //         <Form.Control.Feedback className="text-start" type="invalid">{meta.error}</Form.Control.Feedback>
  //     </Form.Group> 
  // </div>
    // <VStack space={2} width="100%">
    //   <FormControl isInvalid={isInvalid} isDisabled={disabled}>
    //     <FormControl.Label>{label}</FormControl.Label>
    //     <Button onPress={handleFileSelection} isDisabled={disabled}>
    //       Upload File
    //     </Button>
    //     {isInvalid && (
    //       <Text color="red.500">{meta.error}</Text>
    //     )}
    //   </FormControl>
    // </VStack>
    <View style={styles.container}>
      <FormLabel text={label} name={name + '-label'}/>
      <TouchableOpacity 
        onPress={handleFileSelection} 
        style={[styles.button, disabled && styles.disabledButton]}
        disabled={disabled}
      >
        <Text>Upload File</Text>
      </TouchableOpacity>
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