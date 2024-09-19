import React, { FC, ReactElement, useState } from 'react';
import { useField } from 'formik';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FormLabel } from './InputLabel';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DetailsText } from './DetailText';

export interface FormInputDateTimeProps {
  name: string;
  label: string;
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  isVisible?: boolean;
  isRequired?: boolean;
  detailText?: string;
}

export const FormInputDateTime: FC<FormInputDateTimeProps> = ({
  name,
  label,
  placeholder = 'Select Date & Time',
  autoFocus = false,
  disabled = false,
  isVisible = true,
  isRequired = false,
  detailText = '',
}): ReactElement | null => {
  const [field, meta, helpers] = useField(name);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const selectedDateTime = field.value ? moment(field.value) : null;

  const isInvalid = meta.error && meta.touched;

  if (!isVisible) return null;

  const showDatePicker = () => {
    if (!disabled) {
      setDatePickerVisibility(true);
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    helpers.setValue(moment(date).toISOString());
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <FormLabel text={label} name={`${name}-label`} isRequired={isRequired} />
      <TouchableOpacity
        onPress={showDatePicker}
        style={[styles.button, disabled && styles.disabledButton]}
        accessibilityLabel={label}
        testID={`${name}-button`}
      >
        <Text testID={name}>
          {selectedDateTime
            ? selectedDateTime.format('M/D/YYYY h:mm A')
            : placeholder}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        date={selectedDateTime?.toDate() || new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        isDarkModeEnabled={false}
        // headerTextIOS={label}
        testID={`${name}-picker`}
      />

      {isInvalid && (
        <Text style={styles.errorText} testID={`${name}-error`}>
          {meta.error}
        </Text>
      )}
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
