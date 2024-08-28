import React, { FC, ReactElement, useState } from "react";  
import * as ReportService from "../../services/LandPlantList";

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
            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someIntVal"
              rowIndex={item.rowNumber}
              value={item.someIntVal}
              label="Int Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someBigIntVal"
              rowIndex={item.rowNumber}
              value={item.someBigIntVal}
              label="Big Int Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="someBitVal"
              rowIndex={item.rowNumber}
              isChecked={item.someBitVal}
              label="Bit Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isEditAllowed"
              rowIndex={item.rowNumber}
              isChecked={item.isEditAllowed}
              label="Edit Allowed"
              isVisible={true}
            />

            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isDeleteAllowed"
              rowIndex={item.rowNumber}
              isChecked={item.isDeleteAllowed}
              label="Delete Allowed"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someFloatVal"
              rowIndex={item.rowNumber}
              value={item.someFloatVal}
              label="Float Val"
              isVisible={true}
            />

            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someDecimalVal"
              rowIndex={item.rowNumber}
              value={item.someDecimalVal}
              label="Decimal Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayDateTime forColumn="someUTCDateTimeVal"
              rowIndex={item.rowNumber}
              value={item.someUTCDateTimeVal}
              label="Date Time Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayDate forColumn="someDateVal"
              rowIndex={item.rowNumber}
              value={item.someDateVal}
              label="Date Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayMoney forColumn="someMoneyVal"
              rowIndex={item.rowNumber}
              value={item.someMoneyVal}
              label="Money Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someNVarCharVal"
              rowIndex={item.rowNumber}
              value={item.someNVarCharVal}
              label="N Var Char Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someVarCharVal"
              rowIndex={item.rowNumber}
              value={item.someVarCharVal}
              label="Var Char Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="someTextVal"
              rowIndex={item.rowNumber}
              value={item.someTextVal}
              label="Text Val"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayPhoneNumber forColumn="somePhoneNumber"
              rowIndex={item.rowNumber}
              value={item.somePhoneNumber}
              label="Phone Number"
              isVisible={true}
            />

            <ReportColumnDisplay.ReportColumnDisplayEmail forColumn="someEmailAddress"
              rowIndex={item.rowNumber}
              value={item.someEmailAddress}
              label="Email Address"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorName"
              rowIndex={item.rowNumber}
              value={item.flavorName}
              label="Flavor Name"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorCode"
              rowIndex={item.rowNumber}
              value={item.flavorCode}
              label="flavor Code"
              isVisible={false}
            />
            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="SomeIntConditionalOnDeletable"
              rowIndex={item.rowNumber}
              value={item.someIntConditionalOnDeletable}
              label="Int Conditional"
              conditionallyVisible={item.isDeleteAllowed} 
            />
            <ReportColumnDisplay.ReportColumnDisplayUrl forColumn="NVarCharAsUrl"
              rowIndex={item.rowNumber}
              value={item.nVarCharAsUrl}
              label="N Var Char As Url"
              linkText="Click Here"
              isVisible={true}
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="updateLinkPlantCode"
              rowIndex={item.rowNumber}
              value={item.updateLinkPlantCode}
              buttonText="Update"
              isButtonCallToAction={false}
              onPress={() => {
                logClick("ReportGridLandPlantList","updateLinkPlantCode","");
                onNavigateTo("PlantUserDetails", item.updateLinkPlantCode)
              }}
              isVisible={false}
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="deleteAsyncButtonLinkPlantCode"
              rowIndex={item.rowNumber}
              value={item.deleteAsyncButtonLinkPlantCode}
              buttonText="Delete"
              isButtonCallToAction={false}
              isVisible={true}
              onPress={() =>
                {
                  logClick("ReportGridLandPlantList","deleteAsyncButtonLinkPlantCode","");
                  const data: any = {};
                  AsyncServices.PlantUserDeleteSubmitRequest(data, item.deleteAsyncButtonLinkPlantCode).then((response) =>
                  onRefreshRequest()
                )
              }}
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="detailsLinkPlantCode"
              rowIndex={item.rowNumber}
              value={item.detailsLinkPlantCode}
              buttonText="Details"
              isButtonCallToAction={true}
              isVisible={true}
              onPress={() => {
                logClick("ReportGridLandPlantList","detailsLinkPlantCode","");
                onNavigateTo("PlantUserDetails", item.detailsLinkPlantCode);
              }}
            />
 
            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="testFileDownloadLinkPacCode"
              rowIndex={index}
              buttonText="Test File Download"
              value={item.testFileDownloadLinkPacCode}
              isButtonCallToAction={false}
              isVisible={true}
              onPress={() =>
                {
                  logClick(componentName,"testFileDownloadLinkPacCode","");
                  const data: AsyncServices.PacUserTestAsyncFileDownloadRequest = {};
                  AsyncServices.PacUserTestAsyncFileDownloadSubmitRequest(data, item.testFileDownloadLinkPacCode)
                  .then((response) => {
                      //handleExportQueryResults(response);  //NOSONAR
                      const blob = new Blob([response.data], { type: "text/csv" });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', componentName + '-' + uuidv4() + '.csv');
                      document.body.appendChild(link);
                      link.click();
                  }).then(() => onRefreshRequest())
                }}
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="testConditionalFileDownloadLinkPacCode"
              rowIndex={index}
              buttonText="Test Conditional File Download"
              isButtonCallToAction={false}
              isVisible={true}
              conditionallyVisible={item.isEditAllowed} 
              value={item.testConditionalFileDownloadLinkPacCode}
              onPress={() =>
                {
                  logClick(componentName,"testConditionalFileDownloadLinkPacCode","");
                  const data: AsyncServices.PacUserTestAsyncFileDownloadRequest = {};
                  AsyncServices.PacUserTestAsyncFileDownloadSubmitRequest(data, item.testConditionalFileDownloadLinkPacCode)
                  .then((response) => {
                      //handleExportQueryResults(response);  //NOSONAR
                      const blob = new Blob([response.data], { type: "text/csv" });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', componentName + '-' + uuidv4() + '.csv');
                      document.body.appendChild(link);
                      link.click();
                  }).then(() => onRefreshRequest())
                }}
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="testAsyncFlowReqLinkPacCode"
              rowIndex={index}
              buttonText="Test Async Flow Req"
              isButtonCallToAction={false}
              isVisible={true}
              value={item.testAsyncFlowReqLinkPacCode}
              onPress={() =>
                {
                  logClick(componentName,"testAsyncFlowReqLinkPacCode","");
                  const data: AsyncServices.PacUserTestAsyncFlowReqRequest = {};
                  AsyncServices.PacUserTestAsyncFlowReqSubmitRequest(data, item.testAsyncFlowReqLinkPacCode).then(() =>
                  onRefreshRequest())
                }}
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="testConditionalAsyncFlowReqLinkPacCode"
              rowIndex={index}
              buttonText="Test Conditional Async Flow Req"
              isButtonCallToAction={false}
              isVisible={true}
              conditionallyVisible={item.isEditAllowed} 
              value={item.testConditionalAsyncFlowReqLinkPacCode}
              onPress={() =>
                {
                  logClick(componentName,"testConditionalAsyncFlowReqLinkPacCode","");
                  const data: AsyncServices.PacUserTestAsyncFlowReqRequest = {};
                  AsyncServices.PacUserTestAsyncFlowReqSubmitRequest(data, item.testConditionalAsyncFlowReqLinkPacCode).then(() =>
                  onRefreshRequest())
                }}
            />

            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="conditionalBtnExampleLinkPlantCode"
              rowIndex={index}
              buttonText="Conditional Btn Example"
              isButtonCallToAction={true}
              isVisible={true}
              conditionallyVisible={item.isEditAllowed} 
              value={item.conditionalBtnExampleLinkPlantCode}
              onPress={() => {
                logClick(componentName,"conditionalBtnExampleLinkPlantCode",""); 
                onNavigateTo("PlantUserDetails", item.conditionalBtnExampleLinkPlantCode)
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