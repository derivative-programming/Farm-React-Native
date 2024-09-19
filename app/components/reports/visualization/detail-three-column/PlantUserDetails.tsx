import React, { FC, ReactElement } from "react";
import { ActivityIndicator,  View, StyleSheet } from 'react-native';
import * as ReportService from "../../services/PlantUserDetails"; 
import * as AsyncServices from "../../../services";
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";  
import uuid  from 'react-native-uuid';
import { ColumnSettingsPlantUserDetails } from "../settings";
export interface TableColumn {
  header: string;
  isVisible: boolean;
  isPreferenceVisible: boolean;
}

export interface ReportDetailThreeColPlantUserDetailsProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
    showProcessing?: boolean;
    columns?: Record<string, TableColumn>; 
}
export const ReportDetailThreeColPlantUserDetails: FC<ReportDetailThreeColPlantUserDetailsProps> = ({
    name,
    item,
    onNavigateTo,
    onRefreshRequest,
    showProcessing = false,
    columns = ColumnSettingsPlantUserDetails
}): ReactElement => { 
    const { logClick } = useAnalyticsDB();
    const componentName = "ReportDetailThreeColPlantUserDetails";
    
    return (
        <View testID={name} style={styles.container}> 
        { showProcessing ? 
            
            <ActivityIndicator />
            : <View style={styles.container}>
{/*//endset*/}
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorName"
                    label="Flavor Name"
                    value={item.flavorName}
                    isVisible={true}
                    isPreferenceVisible={columns["flavorName"].isPreferenceVisible}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="otherFlavor"
                    label="Other Flavor"
                    value={item.otherFlavor}
                    isVisible={true}
                    isPreferenceVisible={columns["otherFlavor"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isDeleteAllowed"
                    label="Is Delete Allowed"
                    isChecked={item.isDeleteAllowed}
                    isVisible={true}
                    isPreferenceVisible={columns["isDeleteAllowed"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isEditAllowed"
                    label="Is Edit Allowed"
                    isChecked={item.isEditAllowed}
                    isVisible={true}
                    isPreferenceVisible={columns["isEditAllowed"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someBigIntVal"
                    label="Some Big Int Val"
                    value={item.someBigIntVal}
                    isVisible={true}
                    isPreferenceVisible={columns["someBigIntVal"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="someBitVal"
                    label="Some Bit Val"
                    isChecked={item.someBitVal}
                    isVisible={true}
                    isPreferenceVisible={columns["someBitVal"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayDate forColumn="someDateVal"
                    label="Some Date Val"
                    value={item.someDateVal}
                    isVisible={true}
                    isPreferenceVisible={columns["someDateVal"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayDateTime forColumn="someUTCDateTimeVal"
                    label="Some UTC Date Time Val"
                    value={item.someUTCDateTimeVal}
                    isVisible={true}
                    isPreferenceVisible={columns["someUTCDateTimeVal"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someDecimalVal"
                    label="Some Decimal Val"
                    value={item.someDecimalVal}
                    isVisible={true}
                    isPreferenceVisible={columns["someDecimalVal"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayEmail forColumn="someEmailAddress"
                    label="Some Email Address"
                    value={item.someEmailAddress}
                    isVisible={true}
                    isPreferenceVisible={columns["someEmailAddress"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayPhoneNumber forColumn="somePhoneNumber"
                    label="Some Phone Number"
                    value={item.somePhoneNumber}
                    isVisible={true}
                    isPreferenceVisible={columns["somePhoneNumber"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someFloatVal"
                    label="Some Float Val"
                    value={item.someFloatVal}
                    isVisible={true}
                    isPreferenceVisible={columns["someFloatVal"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someIntVal"
                    label="Some Int Val"
                    value={item.someIntVal}
                    isVisible={true}
                    isPreferenceVisible={columns["someIntVal"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayMoney forColumn="someMoneyVal"
                    label="Some Money Val"
                    value={item.someMoneyVal}
                    isVisible={true}
                    isPreferenceVisible={columns["someMoneyVal"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayText forColumn="someTextVal"
                    label="Some Text Val"
                    value={item.someTextVal}
                    isVisible={true}
                    isPreferenceVisible={columns["someTextVal"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayText forColumn="someVarCharVal"
                    label="Some Var Char Val"
                    value={item.someVarCharVal}
                    isVisible={true}
                    isPreferenceVisible={columns["someVarCharVal"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayText forColumn="someNVarCharVal"
                    label="Some N Var Char Val"
                    value={item.someNVarCharVal}
                    isVisible={true}
                    isPreferenceVisible={columns["someNVarCharVal"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayText forColumn="someUniqueidentifierVal"
                    label="Some Uniqueidentifier Val"
                    value={item.someUniqueidentifierVal}
                    isVisible={true}
                    isPreferenceVisible={columns["someUniqueidentifierVal"].isPreferenceVisible}
                />

                <ReportColumnDisplay.ReportColumnDisplayPhoneNumber forColumn="phoneNumConditionalOnIsEditable"
                    label="Conditional Column"
                    value={item.phoneNumConditionalOnIsEditable}
                    conditionallyVisible={item.isEditAllowed}
                    isVisible={true}
                    isPreferenceVisible={columns["phoneNumConditionalOnIsEditable"].isPreferenceVisible}
                />
                
                <ReportColumnDisplay.ReportColumnDisplayUrl forColumn="nVarCharAsUrl"
                    label="N Var Char As Url"
                    value={item.nVarCharAsUrl}
                    linkText="Click Here"
                    isVisible={true}
                    isPreferenceVisible={columns["nVarCharAsUrl"].isPreferenceVisible}
                />
 
                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isImageUrlAvailable"
                    label="N Var Char As Url"
                    isChecked={item.isImageUrlAvailable}
                    isVisible={false}
                    isPreferenceVisible={columns["isImageUrlAvailable"].isPreferenceVisible}
                />
      
                <ReportColumnDisplay.ReportColumnDisplayImageUrl forColumn="someImageUrlVal"
                    label="Some Image Url Val"
                    value={item.someImageUrlVal}
                    isVisible={true} 
                    isPreferenceVisible={columns["someImageUrlVal"].isPreferenceVisible}
                />
      
                <ReportColumnDisplay.ReportColumnDisplayImageUrl forColumn="someConditionalImageUrlVal"
                    label="Some Conditional Image Url Val"
                    value={item.someConditionalImageUrlVal}
                    isVisible={true}
                    conditionallyVisible={item.isImageUrlAvailable}  
                    isPreferenceVisible={columns["someConditionalImageUrlVal"].isPreferenceVisible}
                />

{/*//endset*/}
                <ReportColumnDisplay.ReportColumnDisplayButton forColumn="updateButtonTextLinkPlantCode"
                    buttonText="Update Button Text"
                    value={item.updateButtonTextLinkPlantCode}
                    isButtonCallToAction={true}
                    isVisible={false}
                    isPreferenceVisible={columns["updateButtonTextLinkPlantCode"].isPreferenceVisible}
                    onPress={() => {
                        logClick("ReportDetailThreeColPlantUserDetails","updateButtonTextLinkPlantCode","");
                        onNavigateTo("PlantUserDetails",item.updateButtonTextLinkPlantCode);
                    }}
                />

                {/*//flavorName*/}
                {/*//isDeleteAllowed*/}
                {/*//isEditAllowed*/}
                {/*//otherFlavor*/}
                {/*//someBigIntVal*/}
                {/*//someBitVal*/}
                {/*//someDateVal*/}
                {/*//someDecimalVal*/}
                {/*//someEmailAddress*/}
                {/*//someFloatVal*/}
                {/*//someIntVal*/}
                {/*//someMoneyVal*/}
                {/*//someNVarCharVal*/}
                {/*//somePhoneNumber*/}
                {/*//someTextVal*/}
                {/*//someUniqueidentifierVal*/}
                {/*//someUTCDateTimeVal*/}
                {/*//someVarCharVal*/} 
                {/*//PhoneNumConditionalOnIsEditable*/} 
                {/*//NVarCharAsUrl*/} 
                {/*//someConditionalImageUrlVal*/} 
                {/*//someImageUrlVal*/} 
                {/*//isImageUrlAvailable*/} 
                {/*//DeleteAsyncButtonLinkPlantCode*/} 
                
                <ReportColumnDisplay.ReportColumnDisplayButton forColumn="backToDashboardLinkTacCode"
                    buttonText="Back To Dashboard"
                    value={item.backToDashboardLinkTacCode}
                    isButtonCallToAction={true}
                    isVisible={true}
                    isPreferenceVisible={columns["backToDashboardLinkTacCode"].isPreferenceVisible}
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
                    isPreferenceVisible={columns["randomPropertyUpdatesLinkPlantCode"].isPreferenceVisible}
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
                    isPreferenceVisible={columns["testFileDownloadLinkPacCode"].isPreferenceVisible}
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
                    isPreferenceVisible={columns["testConditionalAsyncFileDownloadLinkPacCode"].isPreferenceVisible}
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
                    isPreferenceVisible={columns["testAsyncFlowReqLinkPacCode"].isPreferenceVisible}
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
                    isPreferenceVisible={columns["testConditionalAsyncFlowReqLinkPacCode"].isPreferenceVisible}
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
                    isPreferenceVisible={columns["conditionalBtnExampleLinkTacCode"].isPreferenceVisible}
                    value={item.conditionalBtnExampleLinkTacCode}
                    onPress={() => {
                        logClick("ReportDetailThreeColPlantUserDetails","conditionalBtnExampleLinkTacCode","");
                        onNavigateTo("TacFarmDashboard",item.conditionalBtnExampleLinkTacCode)
                    }}
                />
{/*//endset*/}
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