import React, {
  FC,
  ReactElement,
  useContext,
  useState,
} from "react";
import { StyleSheet, View, Text } from 'react-native';
import * as InitFormService from "../services/init/LandAddPlantInitObjWF";
import {formatDate, formatDateTime} from "../../../common/utilities";

export interface HeaderLandAddPlantProps {
  name: string;
  isHeaderVisible: boolean;
  initData: InitFormService.InitResultInstance
}

const HeaderLandAddPlant: FC<HeaderLandAddPlantProps> = ({
  name,
  isHeaderVisible = false,
  initData,
}): ReactElement | null => {

  const landNameHeaderIsVisible = true; 
  const currentDateHeaderValHeaderIsVisible = true; 
  const currentDateTimeHeaderValHeaderIsVisible = true; 

  if(!isHeaderVisible) return null;

  return ( 
    <View testID={name}>
      {landNameHeaderIsVisible && (
        <View style={styles.horizontalStack}>
          <Text>Land Name: </Text> 
          <Text>{initData.landName}</Text>
        </View>)}
      {currentDateHeaderValHeaderIsVisible && (
        <View style={styles.horizontalStack}>
          <Text>Current Date: </Text> 
          <Text>{formatDate(initData.currentDateHeaderVal)}</Text>
        </View>)}
      {currentDateTimeHeaderValHeaderIsVisible && (
        <View style={styles.horizontalStack}>
          <Text>Current Date/Time: </Text> 
          <Text>{formatDateTime(initData.currentDateTimeHeaderVal)}</Text>
        </View>)}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalStack: {
    flexDirection: 'row', // Aligns children horizontally
    alignItems: 'center', // Center items vertically in the row
    marginBottom: 8,    
    
  }
});

export default HeaderLandAddPlant;
