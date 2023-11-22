import React, {
  FC,
  ReactElement,
  useContext,
  useState,
} from "react";
import { HStack, View, Text } from "native-base";
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
      {landNameHeaderIsVisible && ( //landName 
        <HStack> 
          <Text>Land Name</Text>
          <Text>{initData.landName}</Text>
        </HStack>
      )}
    </View>
  );
};

export default HeaderLandAddPlant;
