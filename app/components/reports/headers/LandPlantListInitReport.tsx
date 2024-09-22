import React, {
  FC,
  ReactElement,
  useContext,
  useState,
} from "react";
import { Text, View, StyleSheet } from 'react-native';
import * as InitReportService from "../services/init/LandPlantListInitReport";
import {formatDate, formatDateTime} from "../../../common/utilities";
 
export interface HeaderLandPlantListProps {
  name: string;
  isHeaderVisible: boolean;
  initData: InitReportService.InitResultInstance
}

const HeaderLandPlantList: FC<HeaderLandPlantListProps> = ({
  name,
  isHeaderVisible=false,
  initData,
}): ReactElement | null => {

  const landNameHeaderIsVisible = true; 
  const currentDateHeaderValHeaderIsVisible = true; 
  const currentDateTimeHeaderValHeaderIsVisible = true; 

  if(!isHeaderVisible) return null;

  return (  
    <View testID={name}>  
      {landNameHeaderIsVisible && ( //landName  
        <View style={styles.horizontalStack}>
          <Text>Land Name:</Text>
          <Text style={{ marginLeft: 10 }}>{initData.landName}</Text> 
        </View>)}
      {currentDateHeaderValHeaderIsVisible && (
        <View style={styles.horizontalStack}>
          <Text>Current Date: </Text> 
          <Text>{formatDate(initData.currentDateHeaderVal)}</Text>
        </View>)}
      {currentDateTimeHeaderValHeaderIsVisible && (
        <View style={styles.horizontalStack}>
          <Text>Current Date Time: </Text> 
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

export default HeaderLandPlantList;
