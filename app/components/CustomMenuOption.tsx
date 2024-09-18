// CustomMenuOption.tsx
import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';

interface CustomMenuOptionProps {
  value: string;
  text: string;
  onSelect: () => void;
  isButtonCallToAction?: boolean;
  isVisible?: boolean;
  isEnabled?: boolean;
  isButtonBadgeVisible?: boolean;
  buttonBadgeValue?: number;
}

const CustomMenuOption: FC<CustomMenuOptionProps> = ({
  value,
  text,
  onSelect,
  isButtonCallToAction = false,
  isVisible = true,
  isEnabled = true,
  isButtonBadgeVisible = false,
  buttonBadgeValue = 0,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <MenuOption
      value={value}
      onSelect={onSelect}
      disabled={!isEnabled}
      customStyles={{
        optionWrapper: [
          styles.optionWrapper,
          isButtonCallToAction && styles.callToAction,
          !isEnabled && styles.disabledOption,
        ],
        optionText: [
          styles.optionText,
          isButtonCallToAction && styles.callToActionText,
          !isEnabled && styles.disabledOptionText,
        ],
      }}
    >
      <View style={styles.optionContent}>
        <Text style={styles.optionText}>{text}</Text>
        {isButtonBadgeVisible && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{buttonBadgeValue}</Text>
          </View>
        )}
      </View>
    </MenuOption>
  );
};

const styles = StyleSheet.create({
  optionWrapper: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  optionText: {
    color: 'black',
  },
  callToAction: {
    backgroundColor: 'blue',
  },
  callToActionText: {
    color: 'white',
  },
  disabledOption: {
    backgroundColor: '#e0e0e0',
  },
  disabledOptionText: {
    color: '#a0a0a0',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});

export default CustomMenuOption;
