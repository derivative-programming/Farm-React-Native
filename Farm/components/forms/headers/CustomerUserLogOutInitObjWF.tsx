import React, {
  FC,
  ReactElement,
  useContext,
  useState,
} from "react";
import {  View, Text } from 'react-native';
import * as InitFormService from "../services/init/CustomerUserLogOutInitObjWF";
export interface HeaderCustomerUserLogOutProps {
  name: string;
  isHeaderVisible: boolean;
  initData: InitFormService.InitResultInstance
}
const HeaderCustomerUserLogOut: FC<HeaderCustomerUserLogOutProps> = ({
  name,
  isHeaderVisible = false,
  initData,
}): ReactElement | null => {

  if(!isHeaderVisible) return null;
  return (
    <View testID={name}>

    </View>
  );
};
export default HeaderCustomerUserLogOut;

