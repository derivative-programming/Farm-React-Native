import React, { FC, ReactElement } from "react"; 
import * as ReportService from "../../services/TacFarmDashboard";   
import { View } from 'react-native';
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB"; 

export interface ReportDetailTwoColTacFarmDashboardProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
}
export const ReportDetailTwoColTacFarmDashboard: FC<ReportDetailTwoColTacFarmDashboardProps> = ({
    name,
    item,
    onNavigateTo,
    onRefreshRequest,
}): ReactElement => {
    const { logClick } = useAnalyticsDB();
    const componentName = "ReportDetailTwoColTacFarmDashboard";
  
    const fieldOnePlantListLinkLandCodeIsVisible = true;
    const conditionalBtnExampleLinkLandCodeIsVisible = true;
    const IsConditionalBtnAvailableIsVisible = true; 
    const testFileDownloadLinkPacCodeIsVisible = true;
    const testConditionalFileDownloadLinkPacCodeIsVisible = true;
    const testAsyncFlowReqLinkPacCodeIsVisible = true;
    const testConditionalAsyncFlowReqLinkPacCodeIsVisible = true;

    return ( 
        <View testID={name}> 
            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="fieldOnePlantListLinkLandCode" 
                value={item.fieldOnePlantListLinkLandCode}
                buttonText=" Field One-Plants"
                isButtonCallToAction={true} 
                isVisible={true}
                isEnabled={true}
                onPress={() =>{
                    logClick("ReportDetailTwoColTacFarmDashboard","fieldOnePlantListLinkLandCode","");
                    onNavigateTo("LandPlantList",item.fieldOnePlantListLinkLandCode)
                }} 
            />  
            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="conditionalBtnExampleLinkLandCode" 
                value={item.conditionalBtnExampleLinkLandCode}
                buttonText="Conditional Btn Example"
                isButtonCallToAction={true} 
                isVisible={true}
                isEnabled={true}
                conditionallyVisible={item.isConditionalBtnAvailable}
                onPress={() =>{
                    logClick("ReportDetailTwoColTacFarmDashboard","conditionalBtnExampleLinkLandCode","");
                    onNavigateTo("LandPlantList", item.conditionalBtnExampleLinkLandCode)
                }} 
            /> 
             
            <ReportColumnDisplay.ReportColumnDisplayButton 
                forColumn="testFileDownloadLinkPacCode" 
                value={item.testFileDownloadLinkPacCode}
                buttonText="Test File Download"
                isButtonCallToAction={true} 
                isVisible={true}
                isEnabled={true}
                onPress={() =>{
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
                    })
                    .then(() => onRefreshRequest())
                }} 
            /> 
            <ReportColumnDisplay.ReportColumnDisplayButton 
                forColumn="testConditionalFileDownloadLinkPacCode" 
                value={item.testConditionalFileDownloadLinkPacCode}
                buttonText="Test Conditional File Download"
                isButtonCallToAction={true} 
                isVisible={true}
                isEnabled={true}
                conditionallyVisible={item.isConditionalBtnAvailable}
                onPress={() =>{
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
            <ReportColumnDisplay.ReportColumnDisplayButton 
                forColumn="testAsyncFlowReqLinkPacCode" 
                value={item.testAsyncFlowReqLinkPacCode}
                buttonText="Test Async Flow Req"
                isButtonCallToAction={true} 
                isVisible={true}
                isEnabled={true}
                onPress={() =>{
                    logClick(componentName,"testAsyncFlowReqLinkPacCode","");
                    const data: AsyncServices.PacUserTestAsyncFlowReqRequest = {};
                    AsyncServices.PacUserTestAsyncFlowReqSubmitRequest(data, item.testAsyncFlowReqLinkPacCode).then(() =>
                    onRefreshRequest())
                }} 
            /> 
            <ReportColumnDisplay.ReportColumnDisplayButton 
                forColumn="testConditionalAsyncFlowReqLinkPacCode" 
                value={item.testConditionalAsyncFlowReqLinkPacCode}
                buttonText="Test Conditional Async Flow Req"
                isButtonCallToAction={true} 
                isVisible={true}
                isEnabled={true}
                conditionallyVisible={item.isConditionalBtnAvailable}
                onPress={() =>{
                    logClick(componentName,"testConditionalAsyncFlowReqLinkPacCode","");
                    const data: AsyncServices.PacUserTestAsyncFlowReqRequest = {};
                    AsyncServices.PacUserTestAsyncFlowReqSubmitRequest(data, item.testConditionalAsyncFlowReqLinkPacCode).then(() =>
                    onRefreshRequest())
                }} 
            /> 
        </View>
    );
}; 
