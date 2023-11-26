import React, { FC, ReactElement } from "react"; 
import * as ReportService from "../../services/TacFarmDashboard";   
import { Row, View } from 'react-native';
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
  
    return ( 
        <View testID={name}> 
                <ReportColumnDisplay.ReportColumnDisplayButton 
                    forColumn="fieldOnePlantListLinkLandCode" 
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
                <ReportColumnDisplay.ReportColumnDisplayButton 
                    forColumn="conditionalBtnExampleLinkLandCode" 
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
        </View>
    );
}; 
