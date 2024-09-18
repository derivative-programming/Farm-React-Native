import React, { FC, ReactElement } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from "react-native";

export interface ReportColumnDisplayImageUrlProps {
  forColumn: string;
  rowIndex: number;
  label:string
  value: string | null;
  isVisible?: boolean;
  conditionallyVisible?: boolean;
  isJoinedToLeftColumn?: boolean;
  isJoinedToRightColumn?: boolean;
  isPreferenceVisible?: boolean;
}

export const ReportColumnDisplayImageUrl: FC<ReportColumnDisplayImageUrlProps> = ({
  forColumn,
  rowIndex,
  label,
  value,
  isVisible = true,
  conditionallyVisible = true,
  isJoinedToLeftColumn = false,
  isJoinedToRightColumn = false,
  isPreferenceVisible = true,
}): ReactElement | null => {

  const groupName = forColumn + '-column-' + rowIndex.toString();
  const displayValue = (isVisible && conditionallyVisible);
  const isComponentVisible = isVisible && isPreferenceVisible;

  if (!isComponentVisible) return null;

  const handleOpenInBrowser = () => {
    if (value) {
      Linking.openURL(value).catch(err =>
        console.error("Failed to open URL:", err)
      );
    }
  };

  return (
    <View style={styles.container} testID={groupName}>
      <TouchableOpacity onPress={handleOpenInBrowser}>
        {value ? (
          <Image
            source={{ uri: value }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Text>No Image Available</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  image: {
    maxHeight: 200,
    maxWidth: 400,
    minWidth: 200,
    minHeight: 200,
    backgroundColor: '#f0f0f0', // Placeholder background color
  },
});
