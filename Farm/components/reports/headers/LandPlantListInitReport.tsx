import React, {
  FC,
  ReactElement,
  useContext,
  useState,
} from "react";
import { Text, View, StyleSheet } from 'react-native';
import * as InitReportService from "../services/init/LandPlantListInitReport";
 
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

  if(!isHeaderVisible) return null;

  return (  
    <View testID={name}>  
      {landNameHeaderIsVisible && ( //landName  
        <View style={styles.horizontalStack}>
          <Text>Land Name:</Text>
          <Text style={{ marginLeft: 10 }}>{initData.landName}</Text> 
        </View>
      )}
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
