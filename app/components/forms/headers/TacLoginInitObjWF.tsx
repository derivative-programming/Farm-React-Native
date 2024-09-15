import React, {
  FC,
  ReactElement,
  useContext,
  useState,
} from "react";
import { View } from 'react-native';
import * as InitFormService from "../services/init/TacLoginInitObjWF";
export interface HeaderTacLoginProps {
  name: string;
  isHeaderVisible: boolean;
  initData: InitFormService.InitResultInstance
}
const HeaderTacLogin: FC<HeaderTacLoginProps> = ({
  name,
  isHeaderVisible = false,
  initData,
}): ReactElement => {

  return (
    <View testID={name}  >

    </View>
  );
};
export default HeaderTacLogin;

