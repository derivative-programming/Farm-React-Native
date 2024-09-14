import React, { FC, ReactElement } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export interface ReportColumnDisplayImageUrlProps {
  forColumn: string;
  value: string | null;
  label: string;
  isVisible?: boolean;
  conditionallyVisible?: boolean;
}

export const ReportColumnDisplayImageUrl: FC<ReportColumnDisplayImageUrlProps> = ({
  forColumn,
  value,
  label,
  isVisible = true,
  conditionallyVisible = true,
}): ReactElement | null => {

  const displayValue = (isVisible && conditionallyVisible);
  const isComponentVisible = isVisible ;

  if (!isComponentVisible) return null;

  const formatImageUrl = () => {
    let result = "";

    try {
      if (value === null || value === "" || !displayValue) {
        return result;
      }
    } catch (error) {
      console.log(`Error(${error}) with value(${value}) typeof(${typeof value}) in ReportColumnDisplayImageUrl`);
    }

    return value;
  };

  const formattedUrl = formatImageUrl();

  return (
    <View style={styles.container} testID={forColumn}>
      <View style={styles.content}>
        <Text style={styles.label} testID={forColumn + '-header'}>{label}</Text>
        {formattedUrl ? (
          <TouchableOpacity onPress={() => { /* Handle linking if necessary */ }}>
            <Image
              source={{ uri: formattedUrl }}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <Text>No Image Available</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  label: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  image: {
    maxHeight: 100,
    maxWidth: 200,
    backgroundColor: '#f0f0f0', // Placeholder background if the image doesn't load
  },
});
