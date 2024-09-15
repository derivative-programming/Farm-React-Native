import React, { FC, ReactElement, useState } from "react";  
import * as ReportService from "../../services/LandPlantList";
import uuid  from 'react-native-uuid';
//import RNFS from 'react-native-fs';

import * as ReportColumnDisplay from "./columns";
import * as AsyncServices from "../../../services";

import * as ReportInput from "../../input-fields"; 
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB"; 
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from "react-native";

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
            {/* PlantCode */}
            
            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isEditAllowed"
              rowIndex={item.rowNumber}
              isChecked={item.isEditAllowed}
              isVisible={true} 
              label="Edit Allowed"
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someIntVal"
              rowIndex={item.rowNumber}
              value={item.someIntVal}
              isVisible={true} 
              label="Int Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someConditionalIntVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalIntVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Int Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someBigIntVal"
              rowIndex={item.rowNumber}
              value={item.someBigIntVal}
              isVisible={true} 
              label="Big Int Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someConditionalBigIntVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalBigIntVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Big Int Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="someBitVal"
              rowIndex={item.rowNumber}
              isChecked={item.someBitVal}
              isVisible={true} 
              label="Bit Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="someConditionalBitVal"
              rowIndex={item.rowNumber}
              isChecked={item.someConditionalBitVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Bit Val"
            />


            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isDeleteAllowed"
              rowIndex={item.rowNumber}
              isChecked={item.isDeleteAllowed}
              isVisible={true} 
              label="Delete Allowed"
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someFloatVal"
              rowIndex={item.rowNumber}
              value={item.someFloatVal}
              isVisible={true} 
              label="Float Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someConditionalFloatVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalFloatVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Float Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someDecimalVal"
              rowIndex={item.rowNumber}
              value={item.someDecimalVal}
              isVisible={true} 
              label="Decimal Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someConditionalDecimalVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalDecimalVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Decimal Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayDateTime forColumn="someUTCDateTimeVal"
              rowIndex={item.rowNumber}
              value={item.someUTCDateTimeVal}
              isVisible={true} 
              label="Date Time Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayDateTime forColumn="someConditionalUTCDateTimeVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalUTCDateTimeVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Date Time Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayDate forColumn="someDateVal"
              rowIndex={item.rowNumber}
              value={item.someDateVal}
              isVisible={true} 
              label="Date Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayDate forColumn="someConditionalDateVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalDateVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Date Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayMoney forColumn="someMoneyVal"
              rowIndex={item.rowNumber}
              value={item.someMoneyVal}
              isVisible={true} 
              label="Money Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayMoney forColumn="someConditionalMoneyVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalMoneyVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Money Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someNVarCharVal"
              rowIndex={item.rowNumber}
              value={item.someNVarCharVal}
              isVisible={true} 
              label="N Var Char Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someConditionalNVarCharVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalNVarCharVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional N Var Char Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someVarCharVal"
              rowIndex={item.rowNumber}
              value={item.someVarCharVal}
              isVisible={true} 
              label="Var Char Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someConditionalVarCharVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalVarCharVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Var Char Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someTextVal"
              rowIndex={item.rowNumber}
              value={item.someTextVal}
              isVisible={true} 
              label="Text Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someConditionalTextVal"
              rowIndex={item.rowNumber}
              value={item.someConditionalTextVal}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Text Val"
            />

            <ReportColumnDisplay.ReportColumnDisplayPhoneNumber forColumn="somePhoneNumber"
              rowIndex={item.rowNumber}
              value={item.somePhoneNumber}
              isVisible={true} 
              label="Phone Number"
            />

            <ReportColumnDisplay.ReportColumnDisplayPhoneNumber forColumn="someConditionalPhoneNumber"
              rowIndex={item.rowNumber}
              value={item.someConditionalPhoneNumber}
              isVisible={true}  
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Phone Number"
            />

            <ReportColumnDisplay.ReportColumnDisplayEmail forColumn="someEmailAddress"
              rowIndex={item.rowNumber}
              value={item.someEmailAddress}
              isVisible={true} 
              label="Email Address"
            />

            <ReportColumnDisplay.ReportColumnDisplayEmail forColumn="someConditionalEmailAddress"
              rowIndex={item.rowNumber}
              value={item.someConditionalEmailAddress}
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional Email Address"
            />


            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isImageUrlAvailable"
              rowIndex={item.rowNumber}
              isChecked={item.isImageUrlAvailable}
              isVisible={false} 
              label="Is Image Url Available"
            />

            <ReportColumnDisplay.ReportColumnDisplayImageUrl forColumn="someImageUrlVal"
              rowIndex={item.rowNumber}
              value={item.someImageUrlVal}
              isVisible={true} 
              label="Image Url"
            />

            <ReportColumnDisplay.ReportColumnDisplayImageUrl forColumn="someConditionalImageUrl"
              rowIndex={item.rowNumber}
              value={item.someConditionalImageUrl}
              isVisible={true} 
              conditionallyVisible={item.isImageUrlAvailable}  
              label="Conditional Image Url"
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorName"
              rowIndex={item.rowNumber}
              value={item.flavorName}
              isVisible={true} 
              label="Flavor Name"
            />

            <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorCode"
              rowIndex={item.rowNumber}
              value={item.flavorCode}
              isVisible={false} 
              label="flavor Code"
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someIntConditionalOnDeletable"
              rowIndex={item.rowNumber}
              value={item.someIntConditionalOnDeletable}
              isVisible={true} 
              conditionallyVisible={item.isDeleteAllowed}  
              label="Int Conditional"
            />

            <ReportColumnDisplay.ReportColumnDisplayUrl forColumn="nVarCharAsUrl"
              rowIndex={item.rowNumber}
              value={item.nVarCharAsUrl}
              linkText="Click Here"
              isVisible={true} 
              label="N Var Char As Url"
            />

            <ReportColumnDisplay.ReportColumnDisplayUrl forColumn="nVarCharConditionalAsUrl"
              rowIndex={item.rowNumber}
              value={item.nVarCharConditionalAsUrl}
              linkText="Click Here"
              isVisible={true} 
              conditionallyVisible={item.isEditAllowed}  
              label="Conditional N Var Char As Url"
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
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="deleteAsyncButtonLinkPlantCode"
              rowIndex={item.rowNumber}
              buttonText="Delete"
              isButtonCallToAction={false}
              isVisible={true} 
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
      />
      ) : (
        <ActivityIndicator />
      )}
    </View>
    // <div data-testid={name} className="w-100 mt-3">
    //   <div className="d-flex w-100 justify-content-left">
    //     <ReportInput.ReportInputButton name="multSelectButtonToEditable"
    //       onPress={() => onMultSelectButtonToEditableClick()}
    //       buttonText="To Editable"
    //       className="mb-3 me-2"
    //       isButtonCallToAction={false}
    //       isVisible={true}
    //       isEnabled={true}
    //     />
    //     <ReportInput.ReportInputButton name="multSelectButtonToNotEditable"
    //       onPress={() => onMultSelectButtonToNotEditableClick()}
    //       buttonText="To Not Editable"
    //       className="mb-3 me-2"
    //       isButtonCallToAction={false}
    //       isVisible={true}
    //       isEnabled={true}
    //     />
    //   </div>

    //   <Table
    //     className="report-list-table"
    //     striped
    //     //bordered 
    //     hover
    //     responsive
    //     size="sm"
    //   >
    //     <thead>
    //       <tr>
    //         <th id="plantCode-header">
    //           {" "}
    //           <Form.Check
    //             type="checkbox"
    //             id="plantCode-select-all-rows-checkbox"
    //             name="plantCode-select-all-rows-checkbox"
    //             onChange={(e) => onSelectAllRows(e)}
    //           />
    //         </th>

    
    //       </tr>
    //     </thead>
    //     <tbody> 
    //       {items && !showProcessing && items.length ? (
    //         items.map((item: ReportService.QueryResultItem, index) => {
    //           return (
    //             <tr key={index.toString()}>
    //               <td data-testid={"plantCodeColumn-" + index}>
    //                 <Form.Check
    //                   type="checkbox"
    //                   id={"row-select-" + index}
    //                   name={"row-select-" + index}
    //                   checked={checkedIndexes.includes(index.toString())}
    //                   onChange={(e) => {
    //                     handleRowSelectCheckboxChange(e, index, item.plantCode);
    //                   }}
    //                 />
    //               </td> 
    
    //             </tr>
    //           );
    //         })
    //       ) : (showProcessing ?  
    //         <tr>
    //           <td colSpan={100}>
    //             <div className="text-center  bg-secondary bg-opacity-25">
    //             <Spinner animation="border" className="mt-2 mb-2" />
    //           </div>
    //         </td>
    //         </tr>  
    //         :  
    //         <tr>
    //           <td colSpan={100}>No rows returned text</td>
    //         </tr> 
    //       )}
    //     </tbody>
    //   </Table>
 
    //   <div
    //     className="d-flex justify-content-center justify-content-md-end w-100 mb-3 mb-md-0"
    //     hidden={!showExport}
    //   >
    //     <Button data-testidid="export-button"
    //       onPress={() => onExport()}
    //       className='me-md-2'
    //       size="sm"
    //       variant="outline">
    //       Export
    //     </Button>
    //   </div>
    // </div>
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