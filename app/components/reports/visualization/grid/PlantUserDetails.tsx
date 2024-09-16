import React, { FC, ReactElement, useState } from "react";
import * as ReportService from "../../services/PlantUserDetails";
import * as ReportColumnDisplay from "./columns";
import * as AsyncServices from "../../../services";
import * as ReportInput from "../../input-fields";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from "react-native";
export interface ReportGridPlantUserDetailsProps {
  name: string;
  contextCode: string;
  sortedColumnName: string;
  isSortDescending: boolean;
  items: ReportService.EnhancedQueryResultItem[];
  onSort(columnName: string): void;
  onExport(): void;
  onNavigateTo(page: string, targetContextCode:string): void
  onRefreshRequest(): void;
  currentPage: number;
  totalItemCount: number;
  pageSize?: number;
  onRefresh(): void;
  onEndReached(): void;
  refreshing?: boolean;
}
export const ReportGridPlantUserDetails: FC<ReportGridPlantUserDetailsProps> = ({
  name,
  contextCode,
  sortedColumnName,
  isSortDescending,
  items,
  onSort,
  onExport,
  onNavigateTo,
  onRefreshRequest,
  currentPage,
  totalItemCount,
  pageSize = 5,
  onRefresh,
  onEndReached,
  refreshing = true,
}): ReactElement => {
  const initialCheckedIndexes: string[] = [];
  const [checkedIndexes, setCheckedIndexes] = useState(initialCheckedIndexes);
  const { logClick } = useAnalyticsDB();
  const handleRowSelectCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    rowCode: string
  ) => {
    if (e.target.checked) {
      checkedIndexes.push(index.toString());
      const newList = checkedIndexes.filter((item) => item);
      setCheckedIndexes(newList);
    } else {
      const newList = checkedIndexes.filter(
        (item) => item !== index.toString()
      );
      setCheckedIndexes(newList);
    }
  };
  const onSelectAllRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      logClick("ReportGridPlantUserDetails","selectAllRows","");
      setCheckedIndexes(
        items.map((item: ReportService.EnhancedQueryResultItem, index) =>
          index.toString()
        )
      );
    } else {
      logClick("ReportGridPlantUserDetails","uncheckSelectAllRows","");
      setCheckedIndexes(initialCheckedIndexes);
    }
  };

  console.log("items count...");
  console.log(items.length);
  return (
    <View testID={name}>
      {!false ? (
      <FlatList
        data={items}
        renderItem={({ item }) =>
          <View style={styles.card}>
{/* ENDSET */}
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorName"
              rowIndex={item.rowNumber}
              value={item.flavorName}
              label="Name"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isDeleteAllowed"
              rowIndex={item.rowNumber}
              isChecked={item.isDeleteAllowed}
              label="Is Delete Allowed"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isEditAllowed"
              rowIndex={item.rowNumber}
              isChecked={item.isEditAllowed}
              label="Is Edit Allowed"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="otherFlavor"
              rowIndex={item.rowNumber}
              value={item.otherFlavor}
              label="Other Flavor"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someBigIntVal"
              rowIndex={item.rowNumber}
              value={item.someBigIntVal}
              label="Some Big Int Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="someBitVal"
              rowIndex={item.rowNumber}
              isChecked={item.someBitVal}
              label="Some Bit Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayDate forColumn="someDateVal"
              rowIndex={item.rowNumber}
              value={item.someDateVal}
              label="Some Date Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someDecimalVal"
              rowIndex={item.rowNumber}
              value={item.someDecimalVal}
              label="Some Decimal Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayEmail forColumn="someEmailAddress"
              rowIndex={item.rowNumber}
              value={item.someEmailAddress}
              label="Some Email Address"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someFloatVal"
              rowIndex={item.rowNumber}
              value={item.someFloatVal}
              label="Some Float Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someIntVal"
              rowIndex={item.rowNumber}
              value={item.someIntVal}
              label="Some Int Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayMoney forColumn="someMoneyVal"
              rowIndex={item.rowNumber}
              value={item.someMoneyVal}
              label="Some Money Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someNVarCharVal"
              rowIndex={item.rowNumber}
              value={item.someNVarCharVal}
              label="Some N Var Char Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayPhoneNumber forColumn="somePhoneNumber"
              rowIndex={item.rowNumber}
              value={item.somePhoneNumber}
              label="Some Phone Number"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someTextVal"
              rowIndex={item.rowNumber}
              value={item.someTextVal}
              label="Some Text Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayDateTime forColumn="someUTCDateTimeVal"
              rowIndex={item.rowNumber}
              value={item.someUTCDateTimeVal}
              label="Some UTC Date Time Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someVarCharVal"
              rowIndex={item.rowNumber}
              value={item.someVarCharVal}
              label="Some Var Char Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayUrl forColumn="NVarCharAsUrl"
              rowIndex={item.rowNumber}
              value={item.nVarCharAsUrl}
              label="N Var Char As Url"
              linkText="Click Here"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="updateButtonTextLinkPlantCode"
              rowIndex={item.rowNumber}
              value={item.updateButtonTextLinkPlantCode}
              buttonText="Update Button Text"
              isButtonCallToAction={true}
              onPress={() => {
                logClick("ReportGridPlantPlantList","updateButtonTextLinkPlantCode","");
                onNavigateTo("PlantUserDetails", item.updateButtonTextLinkPlantCode)
              }}
              isVisible={false}
            />
            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="randomPropertyUpdatesLinkPlantCode"
              rowIndex={item.rowNumber}
              value={item.randomPropertyUpdatesLinkPlantCode}
              buttonText="Random Property Updates"
              isButtonCallToAction={false}
              isVisible={true}
              onPress={() =>
                {
                  logClick("ReportGridPlantPlantList","randomPropertyUpdatesLinkPlantCode","");
                  const data: any = {};
                  AsyncServices.PlantUserPropertyRandomUpdateSubmitRequest(data, item.randomPropertyUpdatesLinkPlantCode).then((response) =>
                  onRefreshRequest()
                )
              }}
            />
            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="backToDashboardLinkTacCode"
              rowIndex={item.rowNumber}
              value={item.backToDashboardLinkTacCode}
              buttonText="Back To Dashboard"
              isButtonCallToAction={false}
              onPress={() => {
                logClick("ReportGridPlantTacList","backToDashboardLinkTacCode","");
                onNavigateTo("TacFarmDashboard", item.backToDashboardLinkTacCode)
              }}
              isVisible={true}
            />
{/* ENDSET */}
          </View>}
        keyExtractor={item => item.rowKey}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.25} // Adjust as needed
      />
      ) : (
        <ActivityIndicator />
      )}
    </View> 
  );
};
const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

