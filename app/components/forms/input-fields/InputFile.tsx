import React, { FC, ReactElement } from "react"; 

import {useField } from 'formik'; 
import { launchImageLibrary } from 'react-native-image-picker';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FormLabel } from "./InputLabel";
import * as theme from '../../../constants/theme';

   
export interface FormInputFileProps {
  name: string
  label: string
  placeholder?: string
  autoFocus?:boolean
  disabled?: boolean
  isVisible?:boolean
  isRequired?: boolean;
  detailText?: string; 
}
   
export const FormInputFile: FC<FormInputFileProps> = ({
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
    <View style={styles.container} testID={name}>
      <FormLabel text={label} name={name + '-label'} isRequired={isRequired} />
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
      {detailText.length > 0 && (
        <Text style={styles.detailText}> 
          {detailText}
        </Text>
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
  detailText: {
    color: '#6c757d',  
    fontSize: theme.fonts.smallSize,
    marginTop: -10,  // Adjust spacing as needed
    marginBottom: 10,
  },
  
});