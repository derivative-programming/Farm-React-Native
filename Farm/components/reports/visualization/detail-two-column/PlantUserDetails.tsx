import React, { FC, ReactElement } from "react";
import * as ReportService from "../../services/PlantUserDetails";
import { View } from 'react-native';
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
export interface ReportDetailTwoColPlantUserDetailsProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
}
export const ReportDetailTwoColPlantUserDetails: FC<ReportDetailTwoColPlantUserDetailsProps> = ({
    name,
    item,
    onNavigateTo,
    onRefreshRequest,
}): ReactElement => {
    const { logClick } = useAnalyticsDB();
    return (
        <View testID={name}>
            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="updateButtonTextLinkPlantCode"
                value={item.updateButtonTextLinkPlantCode}
                buttonText=" Update Button Text"
                isButtonCallToAction={true}
                isVisible={false}
                isEnabled={true}
                onPress={() =>{
                    logClick("ReportDetailTwoColPlantUserDetails","updateButtonTextLinkPlantCode","");
                    onNavigateTo("PlantUserDetails",item.updateButtonTextLinkPlantCode)
                }}
            />
            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="backToDashboardLinkTacCode"
                value={item.backToDashboardLinkTacCode}
                buttonText=" Back To Dashboard"
                isButtonCallToAction={true}
                isVisible={true}
                isEnabled={true}
                onPress={() =>{
                    logClick("ReportDetailTwoColPlantUserDetails","backToDashboardLinkTacCode","");
                    onNavigateTo("TacFarmDashboard",item.backToDashboardLinkTacCode)
                }}
            />
        </View>
    );
};

