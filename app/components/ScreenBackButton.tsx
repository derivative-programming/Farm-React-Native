import React, { FC, ReactElement } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export interface ScreenBackButtonProps {
  name: string;
  buttonText?: string;
  onPress(): void;
  isVisible?: boolean;
  isEnabled?: boolean;
  showDropdown?: boolean;
  onDropdownPress?(): void;
}

export const ScreenBackButton: FC<ScreenBackButtonProps> = ({
  name,
  buttonText = '',
  onPress,
  isVisible = true,
  isEnabled = true,
  showDropdown = false,
  onDropdownPress,
}): ReactElement => {
  if (!isVisible) {
    return <View style={styles.placeholder} testID={name} />;
  }

  // Conditional styling for the icon
  const iconStyle = [styles.icon];
  if (buttonText) {
    iconStyle.push({ marginRight: 5 });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID={name}
        style={styles.backButton}
        onPress={onPress}
        disabled={!isEnabled}
        accessibilityLabel="Go back"
        accessibilityHint="Navigates to the previous screen"
      >
        <Icon
          name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
          size={24}
          color="#000"
          style={iconStyle}
        />
        {false && buttonText ? (
          <Text style={styles.buttonText}>{buttonText}</Text>
        ) : null}
      </TouchableOpacity>
      {showDropdown && onDropdownPress && (
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={onDropdownPress}
          accessibilityLabel="More options"
          accessibilityHint="Shows more navigation options"
        >
          <Icon
            name={Platform.OS === 'ios' ? 'ellipsis-horizontal' : 'ellipsis-vertical'}
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    // marginRight is now handled conditionally in the component
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  placeholder: {
    width: 44,
    height: 44,
  },
});
