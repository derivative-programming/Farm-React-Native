import React, { FC, ReactElement } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from "react-native";

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

  if (!displayValue) return null;

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

  const handleOpenInBrowser = () => {
    if (formattedUrl) {
      Linking.openURL(formattedUrl).catch(err => 
        console.error("Failed to open URL:", err)
      );
    }
  };

  return (
    <View style={styles.container} testID={forColumn}>
      <View style={styles.content}>
        <Text style={styles.label} testID={forColumn + '-header'}>{label}</Text>


        
        {formattedUrl ? (
          <TouchableOpacity onPress={handleOpenInBrowser}>
            <Image
              source={{uri: formattedUrl  }}
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
    flex: 1
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1
  },
  label: {
    // fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  image: {
    maxHeight: 200,
    maxWidth: 400, 
    resizeMode: 'contain', 
    minWidth: 200,        
    minHeight: 200,       
  },
});
