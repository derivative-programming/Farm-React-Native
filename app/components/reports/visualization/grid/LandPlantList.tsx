import React, { FC, ReactElement, useState } from "react";  
import * as ReportService from "../../services/LandPlantList";
import uuid  from 'react-native-uuid';
//import RNFS from 'react-native-fs';

import * as ReportColumnDisplay from "./columns";
import * as AsyncServices from "../../../services";

import * as ReportInput from "../../input-fields"; 
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB"; 
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from "react-native";
import { ColumnSettingsLandPlantList } from "../settings";
export interface TableColumn {
  header: string;
  isVisible: boolean;
  isPreferenceVisible: boolean;
}
export interface ReportGridLandPlantListProps {
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
  columns?: Record<string, TableColumn>; 
}
export const ReportGridLandPlantList: FC<ReportGridLandPlantListProps> = ({
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
  columns = ColumnSettingsLandPlantList
}): ReactElement => {
  const initialCheckedIndexes: string[] = [];
  const [checkedIndexes, setCheckedIndexes] = useState(initialCheckedIndexes); 
  const { logClick } = useAnalyticsDB();  
  const componentName = "ReportGridLandPlantList";
  const contextValueName = "landCode";
  const contextValue = contextCode;
  

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
      logClick("ReportGridLandPlantList","selectAllRows","");
      setCheckedIndexes(
        items.map((item: ReportService.EnhancedQueryResultItem, index) =>
          index.toString()
        )
      );
    } else {
      logClick("ReportGridLandPlantList","uncheckSelectAllRows","");
      setCheckedIndexes(initialCheckedIndexes);
    }
  };  

  const onMultSelectButtonToEditableClick = () => {
    logClick("ReportGridLandPlantList","multSelectButtonToEditable","");
    const selectedCodes = items.map(
      (item: ReportService.EnhancedQueryResultItem, index) => {
        if (checkedIndexes.includes(index.toString())) {
          return item.plantCode;
        }
      }
    );

    const plantCodeListCsv = selectedCodes.join(",");

    const data: any = { plantCodeListCsv };

    AsyncServices.LandUserPlantMultiSelectToEditableSubmitRequest(
      data,
      contextCode
    ).then((response) => onRefreshRequest());
  };

  const onMultSelectButtonToNotEditableClick = () => {
    logClick("ReportGridLandPlantList","multSelectButtonToNotEditable","");
    const selectedCodes = items.map(
      (item: ReportService.EnhancedQueryResultItem, index) => {
        if (checkedIndexes.includes(index.toString())) {
          return item.plantCode;
        }
      }
    );

    const plantCodeListCsv = selectedCodes.join(",");

    const data: any = { plantCodeListCsv };

    AsyncServices.LandUserPlantMultiSelectToNotEditableSubmitRequest(
      data,
      contextCode
    ).then((response) => onRefreshRequest());
  }; 


  const viewFileDownload = async (response: any) => {
    const contentDisposition = response.headers['content-disposition'];
    let filename = uuid.v4() + '.csv';

    if (contentDisposition) {
      // Attempt to extract the filename*= value first, then fallback to filename=
      const filenameMatch = contentDisposition.match(/filename\*?=['"]?([^;'"]+)/);
      if (filenameMatch && filenameMatch[1]) {
        filename = decodeURIComponent(filenameMatch[1].replace(/UTF-8''/, ''));
      }
    }

    // Get the content type or default to "text/csv"
    const contentType = response.headers['content-type'] || 'text/csv';

    // Define the file path for saving
    const path = "";//"";//`${RNFS.DocumentDirectoryPath}/${filename}`;

    try {
      // Write the response data to the file
      //await RNFS.writeFile(path, response.data, 'utf8');
      console.log(`File downloaded to: ${path}`);
      
      // Optionally open the file using FileViewer or any other viewer.
      // FileViewer.open(path); // Uncomment this line if you want to open the file immediately
    } catch (err) {
      console.error('File download error:', err);
    }
  };

  return (
    <View testID={name} style={styles.view}>
      {!refreshing ? (
      <FlatList
        data={items}
        style={styles.flatlist}
        renderItem={({ item }) => 
          <View style={styles.card}> 
{/* ENDSET */}
            {/* PlantCode */}
            
            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isEditAllowed"
              rowIndex={item.rowNumber}
              isChecked={item.isEditAllowed}
              isVisible={true} 
              label="Edit Allowed"
              isPreferenceVisible={columns["isEditAllowed"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someIntVal"
              rowIndex={item.rowNumber}
              value={item.someIntVal}
              isVisible={true} 
              label="Int Val"
              isPreferenceVisible={columns["someIntVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someConditionalIntVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalIntVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Int Val"
              isPreferenceVisible={columns["someConditionalIntVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someBigIntVal"
              rowIndex={item.rowNumber}
              value={item.someBigIntVal}
              isVisible={true} 
              label="Big Int Val"
              isPreferenceVisible={columns["someBigIntVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someConditionalBigIntVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalBigIntVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Big Int Val"
              isPreferenceVisible={columns["someConditionalBigIntVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="someBitVal"
              rowIndex={item.rowNumber}
              isChecked={item.someBitVal}
              isVisible={true} 
              label="Bit Val"
              isPreferenceVisible={columns["someBitVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="someConditionalBitVal"
              rowIndex={item.rowNumber}
              isChecked={item.someConditionalBitVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Bit Val"
              isPreferenceVisible={columns["someConditionalBitVal"].isPreferenceVisible}
            />


            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isDeleteAllowed"
              rowIndex={item.rowNumber}
              isChecked={item.isDeleteAllowed}
              isVisible={true} 
              label="Delete Allowed"
              isPreferenceVisible={columns["isDeleteAllowed"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someFloatVal"
              rowIndex={item.rowNumber}
              value={item.someFloatVal}
              isVisible={true} 
              label="Float Val"
              isPreferenceVisible={columns["someFloatVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someConditionalFloatVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalFloatVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Float Val"
              isPreferenceVisible={columns["someConditionalFloatVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someDecimalVal"
              rowIndex={item.rowNumber}
              value={item.someDecimalVal}
              isVisible={true} 
              label="Decimal Val"
              isPreferenceVisible={columns["someDecimalVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someConditionalDecimalVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalDecimalVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Decimal Val"
              isPreferenceVisible={columns["someConditionalDecimalVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayDateTime forColumn="someUTCDateTimeVal"
              rowIndex={item.rowNumber}
              value={item.someUTCDateTimeVal}
              isVisible={true} 
              label="Date Time Val"
              isPreferenceVisible={columns["someUTCDateTimeVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayDateTime forColumn="someConditionalUTCDateTimeVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalUTCDateTimeVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Date Time Val"
              isPreferenceVisible={columns["someConditionalUTCDateTimeVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayDate forColumn="someDateVal"
              rowIndex={item.rowNumber}
              value={item.someDateVal}
              isVisible={true} 
              label="Date Val"
              isPreferenceVisible={columns["someDateVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayDate forColumn="someConditionalDateVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalDateVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Date Val"
              isPreferenceVisible={columns["someConditionalDateVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayMoney forColumn="someMoneyVal"
              rowIndex={item.rowNumber}
              value={item.someMoneyVal}
              isVisible={true} 
              label="Money Val"
              isPreferenceVisible={columns["someMoneyVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayMoney forColumn="someConditionalMoneyVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalMoneyVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Money Val"
              isPreferenceVisible={columns["someConditionalMoneyVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someNVarCharVal"
              rowIndex={item.rowNumber}
              value={item.someNVarCharVal}
              isVisible={true} 
              label="N Var Char Val"
              isPreferenceVisible={columns["someNVarCharVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someConditionalNVarCharVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalNVarCharVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional N Var Char Val"
              isPreferenceVisible={columns["someConditionalNVarCharVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someVarCharVal"
              rowIndex={item.rowNumber}
              value={item.someVarCharVal}
              isVisible={true} 
              label="Var Char Val"
              isPreferenceVisible={columns["someVarCharVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someConditionalVarCharVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalVarCharVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Var Char Val"
              isPreferenceVisible={columns["someConditionalVarCharVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someTextVal"
              rowIndex={item.rowNumber}
              value={item.someTextVal}
              isVisible={true} 
              label="Text Val"
              isPreferenceVisible={columns["someTextVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someConditionalTextVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalTextVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Text Val"
              isPreferenceVisible={columns["someConditionalTextVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayPhoneNumber forColumn="somePhoneNumber"
              rowIndex={item.rowNumber}
              value={item.somePhoneNumber}
              isVisible={true} 
              label="Phone Number"
              isPreferenceVisible={columns["somePhoneNumber"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayPhoneNumber forColumn="someConditionalPhoneNumber"
              rowIndex={item.rowNumber}
              value={item.someConditionalPhoneNumber}
              isVisible={true}  
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Phone Number"
              isPreferenceVisible={columns["someConditionalPhoneNumber"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayEmail forColumn="someEmailAddress"
              rowIndex={item.rowNumber}
              value={item.someEmailAddress}
              isVisible={true} 
              label="Email Address"
              isPreferenceVisible={columns["someEmailAddress"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayEmail forColumn="someConditionalEmailAddress"
              rowIndex={item.rowNumber}
              value={item.someConditionalEmailAddress}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Email Address"
              isPreferenceVisible={columns["someConditionalEmailAddress"].isPreferenceVisible}
            />


            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isImageUrlAvailable"
              rowIndex={item.rowNumber}
              isChecked={item.isImageUrlAvailable}
              isVisible={false} 
              label="Is Image Url Available"
              isPreferenceVisible={columns["isImageUrlAvailable"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayImageUrl forColumn="someImageUrlVal"
              rowIndex={item.rowNumber}
              value={item.someImageUrlVal}
              isVisible={true} 
              label="Image Url"
              isPreferenceVisible={columns["someImageUrlVal"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayImageUrl forColumn="someConditionalImageUrl"
              rowIndex={item.rowNumber}
              value={item.someConditionalImageUrl}
              isVisible={true} 
              conditionallyVisible={item.isImageUrlAvailable}  
              label="Conditional Image Url"
              isPreferenceVisible={columns["someConditionalImageUrl"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorName"
              rowIndex={item.rowNumber}
              value={item.flavorName}
              isVisible={true} 
              label="Flavor Name"
              isPreferenceVisible={columns["flavorName"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorCode"
              rowIndex={item.rowNumber}
              value={item.flavorCode}
              isVisible={false} 
              label="flavor Code"
              isPreferenceVisible={columns["flavorCode"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someIntConditionalOnDeletable"
              rowIndex={item.rowNumber}
              value={item.someIntConditionalOnDeletable}
              isVisible={true} 
              conditionallyVisible={item.isDeleteAllowed}  
              label="Int Conditional"
              isPreferenceVisible={columns["someIntConditionalOnDeletable"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayUrl forColumn="nVarCharAsUrl"
              rowIndex={item.rowNumber}
              value={item.nVarCharAsUrl}
              linkText="Click Here"
              isVisible={true} 
              label="N Var Char As Url"
              isPreferenceVisible={columns["nVarCharAsUrl"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayUrl forColumn="nVarCharConditionalAsUrl"
              rowIndex={item.rowNumber}
              value={item.nVarCharConditionalAsUrl}
              linkText="Click Here"
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional N Var Char As Url"
              isPreferenceVisible={columns["nVarCharConditionalAsUrl"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="updateLinkPlantCode"
              rowIndex={item.rowNumber}
              buttonText="Update"
              isButtonCallToAction={false}
              value={item.updateLinkPlantCode}
              onPress={() => {
                logClick(componentName,"updateLinkPlantCode","");
                onNavigateTo("PlantUserDetails", item.updateLinkPlantCode)
              }}
              isVisible={false} 
              isPreferenceVisible={columns["updateLinkPlantCode"].isPreferenceVisible}
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="deleteAsyncButtonLinkPlantCode"
              rowIndex={item.rowNumber}
              buttonText="Delete"
              isButtonCallToAction={false}
              isVisible={true} 
              isPreferenceVisible={columns["deleteAsyncButtonLinkPlantCode"].isPreferenceVisible}
              value={item.deleteAsyncButtonLinkPlantCode}
              onPress={() =>
                {
                  logClick(componentName,"deleteAsyncButtonLinkPlantCode","");
                  const data: AsyncServices.PlantUserDeleteRequest = AsyncServices.buildPlantUserDeleteRequest();

                  if (Object.hasOwn(data, contextValueName)) {
                    (data as any)[contextValueName] = contextValue;
                  }

                  AsyncServices.PlantUserDeleteSubmitRequest(data, item.deleteAsyncButtonLinkPlantCode).then(() =>
                  onRefreshRequest()
                )
              }}
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="detailsLinkPlantCode"
              rowIndex={item.rowNumber}
              buttonText="Details"
              isButtonCallToAction={true}
              isVisible={true} 
              isPreferenceVisible={columns["detailsLinkPlantCode"].isPreferenceVisible}
              value={item.detailsLinkPlantCode}
              onPress={() => {
                logClick(componentName,"detailsLinkPlantCode","");
                onNavigateTo("PlantUserDetails", item.detailsLinkPlantCode);
              }}
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="testFileDownloadLinkPacCode"
              rowIndex={item.rowNumber}
              buttonText="Test File Download"
              isButtonCallToAction={false}
              isVisible={true} 
              isPreferenceVisible={columns["testFileDownloadLinkPacCode"].isPreferenceVisible}
              value={item.testFileDownloadLinkPacCode}
              onPress={() =>
                {
                  logClick(componentName,"testFileDownloadLinkPacCode","");
                  const data: AsyncServices.PacUserTestAsyncFileDownloadRequest = AsyncServices.buildPacUserTestAsyncFileDownloadRequest();
                  AsyncServices.PacUserTestAsyncFileDownloadSubmitRequest(data, item.testFileDownloadLinkPacCode)
                  .then((response) => {
                    viewFileDownload(response);
                  }).then(() => onRefreshRequest())
                }}
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="testConditionalFileDownloadLinkPacCode"
              rowIndex={item.rowNumber}
              buttonText="Test Conditional File Download"
              isButtonCallToAction={false}
              isVisible={true} 
              isPreferenceVisible={columns["testConditionalFileDownloadLinkPacCode"].isPreferenceVisible}
              conditionallyVisible={item.isEditAllowed}  
              value={item.testConditionalFileDownloadLinkPacCode}
              onPress={() =>
                {
                  logClick(componentName,"testConditionalFileDownloadLinkPacCode","");
                  const data: AsyncServices.PacUserTestAsyncFileDownloadRequest = AsyncServices.buildPacUserTestAsyncFileDownloadRequest();
                  AsyncServices.PacUserTestAsyncFileDownloadSubmitRequest(data, item.testConditionalFileDownloadLinkPacCode)
                  .then((response) => {
                    viewFileDownload(response);
                  }).then(() => onRefreshRequest())
                }}
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="testAsyncFlowReqLinkPacCode"
              rowIndex={item.rowNumber}
              buttonText="Test Async Flow Req"
              isButtonCallToAction={false}
              isVisible={true} 
              isPreferenceVisible={columns["testAsyncFlowReqLinkPacCode"].isPreferenceVisible}
              value={item.testAsyncFlowReqLinkPacCode}
              onPress={() =>
                {
                  logClick(componentName,"testAsyncFlowReqLinkPacCode","");
                  const data: AsyncServices.PacUserTestAsyncFlowReqRequest = AsyncServices.buildPacUserTestAsyncFlowReqRequest();
                          
                  if (Object.hasOwn(data, contextValueName)) {
                    (data as any)[contextValueName] = contextValue;
                  }

                  AsyncServices.PacUserTestAsyncFlowReqSubmitRequest(data, item.testAsyncFlowReqLinkPacCode).then(() =>
                  onRefreshRequest())
                }}
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="testConditionalAsyncFlowReqLinkPacCode"
              rowIndex={item.rowNumber}
              buttonText="Test Conditional Async Flow Req"
              isButtonCallToAction={false}
              isVisible={true} 
              isPreferenceVisible={columns["testConditionalAsyncFlowReqLinkPacCode"].isPreferenceVisible}
              conditionallyVisible={item.isEditAllowed}  
              value={item.testConditionalAsyncFlowReqLinkPacCode}
              onPress={() =>
                {
                  logClick(componentName,"testConditionalAsyncFlowReqLinkPacCode","");
                  const data: AsyncServices.PacUserTestAsyncFlowReqRequest = AsyncServices.buildPacUserTestAsyncFlowReqRequest();
                    
                  if (Object.hasOwn(data, contextValueName)) {
                    (data as any)[contextValueName] = contextValue;
                  }
                  
                  AsyncServices.PacUserTestAsyncFlowReqSubmitRequest(data, item.testConditionalAsyncFlowReqLinkPacCode).then(() =>
                  onRefreshRequest())
                }}
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="conditionalBtnExampleLinkPlantCode"
              rowIndex={item.rowNumber}
              buttonText="Conditional Btn Example"
              isButtonCallToAction={true}
              isVisible={true} 
              isPreferenceVisible={columns["conditionalBtnExampleLinkPlantCode"].isPreferenceVisible}
              conditionallyVisible={item.isEditAllowed}  
              value={item.conditionalBtnExampleLinkPlantCode}
              onPress={() => {
                logClick(componentName,"conditionalBtnExampleLinkPlantCode","");
                onNavigateTo("PlantUserDetails", item.conditionalBtnExampleLinkPlantCode);
              }}
            />
{/* ENDSET */}
          </View>}
        keyExtractor={item => item.rowKey} 
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.25} // Adjust as needed  
        contentContainerStyle={{ flexGrow: 1 }}
      />
      ) : (
        <ActivityIndicator  size="large" color="#0000ff" />
      )}
    </View> 
  );
};

const styles = StyleSheet.create({
  view: { 
    flex: 1, 
  },
  flatlist: { 
    flexGrow: 1, 
  },
  card: {
    flex: 1,
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