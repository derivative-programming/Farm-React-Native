import React, { FC, ReactElement } from "react";
import { ActivityIndicator,  View, StyleSheet } from 'react-native';
import * as ReportService from "../../services/PlantUserDetails"; 
import * as AsyncServices from "../../../services";
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";  
import uuid  from 'react-native-uuid';

export interface ReportDetailThreeColPlantUserDetailsProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
    showProcessing?: boolean;
}
export const ReportDetailThreeColPlantUserDetails: FC<ReportDetailThreeColPlantUserDetailsProps> = ({
    name,
    item,
    onNavigateTo,
    onRefreshRequest,
    showProcessing = false,
}): ReactElement => { 
    const { logClick } = useAnalyticsDB();
    const componentName = "ReportDetailThreeColPlantUserDetails";
    
    return (
        <View testID={name} style={styles.container}> 
        { showProcessing ? 
            
            <ActivityIndicator />
            : <View style={styles.container}>
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorName"
                    label="Flavor Name"
                    value={item.flavorName}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="otherFlavor"
                    label="Other Flavor"
                    value={item.otherFlavor}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isDeleteAllowed"
                    label="Is Delete Allowed"
                    isChecked={item.isDeleteAllowed}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isEditAllowed"
                    label="Is Edit Allowed"
                    isChecked={item.isEditAllowed}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someBigIntVal"
                    label="Some Big Int Val"
                    value={item.someBigIntVal}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="someBitVal"
                    label="Some Bit Val"
                    isChecked={item.someBitVal}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayDate forColumn="someDateVal"
                    label="Some Date Val"
                    value={item.someDateVal}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayDateTime forColumn="someUTCDateTimeVal"
                    label="Some UTC Date Time Val"
                    value={item.someUTCDateTimeVal}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someDecimalVal"
                    label="Some Decimal Val"
                    value={item.someDecimalVal}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayEmail forColumn="someEmailAddress"
                    label="Some Email Address"
                    value={item.someEmailAddress}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayPhoneNumber forColumn="somePhoneNumber"
                    label="Some Phone Number"
                    value={item.somePhoneNumber}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someFloatVal"
                    label="Some Float Val"
                    value={item.someFloatVal}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someIntVal"
                    label="Some Int Val"
                    value={item.someIntVal}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayMoney forColumn="someMoneyVal"
                    label="Some Money Val"
                    value={item.someMoneyVal}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayText forColumn="someTextVal"
                    label="Some Text Val"
                    value={item.someTextVal}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayText forColumn="someVarCharVal"
                    label="Some Var Char Val"
                    value={item.someVarCharVal}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayText forColumn="someNVarCharVal"
                    label="Some N Var Char Val"
                    value={item.someNVarCharVal}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayText forColumn="someUniqueidentifierVal"
                    label="Some Uniqueidentifier Val"
                    value={item.someUniqueidentifierVal}
                    isVisible={true}
                />

                <ReportColumnDisplay.ReportColumnDisplayPhoneNumber forColumn="phoneNumConditionalOnIsEditable"
                    label="Conditional Column"
                    value={item.phoneNumConditionalOnIsEditable}
                    conditionallyVisible={item.isEditAllowed}
                    isVisible={true}
                />
                
                <ReportColumnDisplay.ReportColumnDisplayUrl forColumn="nVarCharAsUrl"
                    label="N Var Char As Url"
                    value={item.nVarCharAsUrl}
                    linkText="Click Here"
                    isVisible={true}
                />

 
                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isImageUrlAvailable"
                    label="N Var Char As Url"
                    isChecked={item.isImageUrlAvailable}
                    isVisible={false}
                />
      
                <ReportColumnDisplay.ReportColumnDisplayImageUrl forColumn="someImageUrlVal"
                    label="Some Image Url Val"
                    value={item.someImageUrlVal}
                    isVisible={true} 
                />
      
                <ReportColumnDisplay.ReportColumnDisplayImageUrl forColumn="someConditionalImageUrlVal"
                    label="Some Conditional Image Url Val"
                    value={item.someConditionalImageUrlVal}
                    isVisible={true}
                    conditionallyVisible={item.isImageUrlAvailable}  
                />

                <ReportColumnDisplay.ReportColumnDisplayButton forColumn="updateButtonTextLinkPlantCode"
                    buttonText="Update Button Text"
                    value={item.updateButtonTextLinkPlantCode}
                    isButtonCallToAction={true}
                    isVisible={false}
                    onPress={() => {
                        logClick("ReportDetailThreeColPlantUserDetails","updateButtonTextLinkPlantCode","");
                        onNavigateTo("PlantUserDetails",item.updateButtonTextLinkPlantCode);
                    }}
                />

                <ReportColumnDisplay.ReportColumnDisplayButton forColumn="backToDashboardLinkTacCode"
                    buttonText="Back To Dashboard"
                    value={item.backToDashboardLinkTacCode}
                    isButtonCallToAction={true}
                    isVisible={true}
                    onPress={() => {
                        logClick("ReportDetailThreeColPlantUserDetails","backToDashboardLinkTacCode","");
                        onNavigateTo("TacFarmDashboard",item.backToDashboardLinkTacCode)
                    }}
                />



                <ReportColumnDisplay.ReportColumnDisplayButton forColumn="randomPropertyUpdatesLinkPlantCode"
                    buttonText="Random Property Updates"
                    value={item.randomPropertyUpdatesLinkPlantCode}
                    isButtonCallToAction={false}
                    isVisible={true}
                    onPress={() =>{
                        logClick("ReportDetailThreeColPlantUserDetails","randomPropertyUpdatesLinkPlantCode","");
                        const data: any = {};
                        AsyncServices.PlantUserPropertyRandomUpdateSubmitRequest(data, item.randomPropertyUpdatesLinkPlantCode)
                            .then((response) => onRefreshRequest())
                    } }
                /> 
                
                <ReportColumnDisplay.ReportColumnDisplayButton forColumn="testFileDownloadLinkPacCode"
                    buttonText="Test File Download"
                    isButtonCallToAction={false}
                    value={item.testFileDownloadLinkPacCode}
                    isVisible={true}
                    onPress={() =>{
                        logClick("ReportDetailThreeColPlantUserDetails","testFileDownloadLinkPacCode","");
                        const data: AsyncServices.PacUserTestAsyncFileDownloadRequest = {};
                        AsyncServices.PacUserTestAsyncFileDownloadSubmitRequest(data, item.testFileDownloadLinkPacCode)
                            .then((response) => {
                                //handleExportQueryResults(response);  //NOSONAR
                                const blob = new Blob([response.data], { type: "text/csv" });
                                const url = URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = url;
                                link.setAttribute('download', 'ReportDetailThreeColPlantUserDetails-' + uuid.v4() + '.csv');
                                document.body.appendChild(link);
                                link.click();
                            })
                            .then(() => onRefreshRequest())
                    } }
                />
                
                <ReportColumnDisplay.ReportColumnDisplayButton forColumn="testConditionalAsyncFileDownloadLinkPacCode"
                    buttonText="Test Conditional Async File Download"
                    isButtonCallToAction={false}
                    isVisible={true}
                    conditionallyVisible={item.isEditAllowed}
                    value={item.testConditionalAsyncFileDownloadLinkPacCode}
                    onPress={() =>{
                        logClick("ReportDetailThreeColPlantUserDetails","testConditionalAsyncFileDownloadLinkPacCode","");
                        const data: AsyncServices.PacUserTestAsyncFileDownloadRequest = {};
                        AsyncServices.PacUserTestAsyncFileDownloadSubmitRequest(data, item.testConditionalAsyncFileDownloadLinkPacCode)
                            .then((response) => {
                                //handleExportQueryResults(response);  //NOSONAR
                                const blob = new Blob([response.data], { type: "text/csv" });
                                const url = URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = url;
                                link.setAttribute('download', 'ReportDetailThreeColPlantUserDetails-' + uuid.v4() + '.csv');
                                document.body.appendChild(link);
                                link.click();
                            })
                            .then(() => onRefreshRequest())
                    } }
                />
                
                <ReportColumnDisplay.ReportColumnDisplayButton forColumn="testAsyncFlowReqLinkPacCode"
                    buttonText="Test Async Flow Req"
                    isButtonCallToAction={false}
                    isVisible={true}
                    value={item.testAsyncFlowReqLinkPacCode}
                    onPress={() =>{
                        logClick("ReportDetailThreeColPlantUserDetails","testAsyncFlowReqLinkPacCode","");
                        const data: AsyncServices.PacUserTestAsyncFlowReqRequest = {};
                        AsyncServices.PacUserTestAsyncFlowReqSubmitRequest(data, item.testAsyncFlowReqLinkPacCode)
                            .then(() => onRefreshRequest())
                    } }
                />
                
                <ReportColumnDisplay.ReportColumnDisplayButton forColumn="testConditionalAsyncFlowReqLinkPacCode"
                    buttonText="Test Conditional Async Flow Req"
                    isButtonCallToAction={false}
                    isVisible={true}
                    conditionallyVisible={item.isEditAllowed}
                    value={item.testConditionalAsyncFlowReqLinkPacCode}
                    onPress={() =>{
                        logClick("ReportDetailThreeColPlantUserDetails","testConditionalAsyncFlowReqLinkPacCode","");
                        const data: AsyncServices.PacUserTestAsyncFlowReqRequest = {};
                        AsyncServices.PacUserTestAsyncFlowReqSubmitRequest(data, item.testConditionalAsyncFlowReqLinkPacCode)
                            .then(() => onRefreshRequest())
                    } }
                />

                <ReportColumnDisplay.ReportColumnDisplayButton forColumn="conditionalBtnExampleLinkTacCode"
                    buttonText="Conditional Btn Example"
                    isButtonCallToAction={true}
                    isVisible={true}
                    conditionallyVisible={item.isEditAllowed}
                    value={item.conditionalBtnExampleLinkTacCode}
                    onPress={() => {
                        logClick("ReportDetailThreeColPlantUserDetails","conditionalBtnExampleLinkTacCode","");
                        onNavigateTo("TacFarmDashboard",item.conditionalBtnExampleLinkTacCode)
                    }}
                />
            </View>
        }
        </View>
    );
}; 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // paddingVertical: 20, // equivalent to py="5"
      // alignItems: 'center'
    },
  });