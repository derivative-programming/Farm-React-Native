import React, {
  FC,
  ReactElement,
  useContext,
  useState,
} from "react";
import { Table, View } from "native-base";
import * as InitFormService from "../services/init/TacRegisterInitObjWF";
export interface HeaderTacRegisterProps {
  name: string;
  isHeaderVisible: boolean;
  initData: InitFormService.InitResultInstance
}
const HeaderTacRegister: FC<HeaderTacRegisterProps> = ({
  name,
  isHeaderVisible = false,
  initData,
}): ReactElement => {

  return (
    <View testID={name}  >

    </View>
  );
};
export default HeaderTacRegister;

