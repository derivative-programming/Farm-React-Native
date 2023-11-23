import React, {
  FC,
  ReactElement,
  useContext,
  useState,
} from "react";
import { HStack, Text, View } from 'react-native';
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
        <HStack> 
          <Text>Land Name</Text>
          <Text>{initData.landName}</Text>
        </HStack>  
      )}
    </View>
  );
};

export default HeaderLandPlantList;
