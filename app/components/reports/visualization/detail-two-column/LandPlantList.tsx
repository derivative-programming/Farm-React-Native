import React, { FC, ReactElement } from "react";
import * as ReportService from "../../services/LandPlantList";
import { View } from 'react-native';
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
export interface ReportDetailTwoColLandPlantListProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
}
export const ReportDetailTwoColLandPlantList: FC<ReportDetailTwoColLandPlantListProps> = ({
    name,
    item,
    onNavigateTo,
    onRefreshRequest,
}): ReactElement => {
    const { logClick } = useAnalyticsDB();
    return (
        <View testID={name}>
            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="flavorCode"
                value={item.flavorCode}
                buttonText=" "
                isButtonCallToAction={false}
                isVisible={false}
                isEnabled={true}
                onPress={() =>{
                    logClick("ReportDetailTwoColLandPlantList","flavorCode","");
                    onNavigateTo("",item.flavorCode)
                }}
            />
            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="updateLinkPlantCode"
                value={item.updateLinkPlantCode}
                buttonText=" Update"
                isButtonCallToAction={true}
                isVisible={false}
                isEnabled={true}
                onPress={() =>{
                    logClick("ReportDetailTwoColLandPlantList","updateLinkPlantCode","");
                    onNavigateTo("PlantUserDetails",item.updateLinkPlantCode)
                }}
            />
            <ReportColumnDisplay.ReportColumnDisplayButton forColumn="detailsLinkPlantCode"
                value={item.detailsLinkPlantCode}
                buttonText=" Details"
                isButtonCallToAction={true}
                isVisible={true}
                isEnabled={true}
                onPress={() =>{
                    logClick("ReportDetailTwoColLandPlantList","detailsLinkPlantCode","");
                    onNavigateTo("PlantUserDetails",item.detailsLinkPlantCode)
                }}
            />
        </View>
    );
};

