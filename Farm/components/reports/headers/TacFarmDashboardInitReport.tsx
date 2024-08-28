import React, {
  FC,
  ReactElement,
  useContext,
  useState,
} from "react";
import { Text, View, StyleSheet } from 'react-native';
import * as InitReportService from "../services/init/TacFarmDashboardInitReport";

export interface HeaderTacFarmDashboardProps {
  name: string;
  isHeaderVisible: boolean;
  initData: InitReportService.InitResultInstance
}

const HeaderTacFarmDashboard: FC<HeaderTacFarmDashboardProps> = ({
  name,
  isHeaderVisible=false,
  initData,
}): ReactElement | null => {

  if(!isHeaderVisible) return null;

  return (
    <View testID={name}>

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

export default HeaderTacFarmDashboard;

