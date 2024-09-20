import React, { FC, ReactElement } from "react";
import { useField } from 'formik';
import { launchImageLibrary } from 'react-native-image-picker';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FormLabel } from "./InputLabel";
import * as theme from '../../../constants/theme';
import { DetailsText } from "./DetailText";
import { PermissionsAndroid, Platform } from 'react-native';

export interface FormInputFileProps {
  name: string;
  label: string;
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  isVisible?: boolean;
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

  const isInvalid: boolean = !!(meta.error && meta.touched);

  if (!isVisible) return null;

  const uploadImage = async (assets: any) => {
    if (assets && assets.length > 0) {
      const base64Data = assets[0].base64;
      helpers.setValue(base64Data);
    }
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to select photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };
  
  const handleFileSelection = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) return;
    
    const options = {
      mediaType: 'mixed' as const, // or 'video' or 'mixed' or 'photo'
      includeBase64: true,
    };
    try {
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        uploadImage(response.assets);
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
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
      {isInvalid && <Text style={styles.errorText}>{meta.error}</Text>}
      {detailText.length > 0 && <DetailsText content={detailText} />}
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
