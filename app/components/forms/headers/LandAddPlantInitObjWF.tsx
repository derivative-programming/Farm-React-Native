import React, {
  FC,
  ReactElement,
  useContext,
  useState,
} from "react";
import { StyleSheet, View, Text } from 'react-native';
import * as InitFormService from "../services/init/LandAddPlantInitObjWF";

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

  if(!isHeaderVisible) return null;

  return ( 
    <View testID={name}>
      {landNameHeaderIsVisible && (
        <View style={styles.horizontalStack}>
          <Text>Land Name: </Text> 
          <Text>{initData.landName}</Text>
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
