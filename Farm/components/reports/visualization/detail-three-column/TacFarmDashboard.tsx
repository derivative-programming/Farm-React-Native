import React, { FC, ReactElement } from "react";
import { ActivityIndicator,  View } from 'react-native';
import * as ReportService from "../../services/TacFarmDashboard";
import * as AsyncServices from "../../../services";
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
export interface ReportDetailThreeColTacFarmDashboardProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
    showProcessing?: boolean;
}
export const ReportDetailThreeColTacFarmDashboard: FC<ReportDetailThreeColTacFarmDashboardProps> = ({
    name,
    item,
    onNavigateTo,
    onRefreshRequest,
    showProcessing = false,
}): ReactElement => {
    const { logClick } = useAnalyticsDB();
    return (
        <View testID={name} >
        { showProcessing ?
            <ActivityIndicator />
            : <View>
                <ReportColumnDisplay.ReportColumnDisplayButton forColumn="fieldOnePlantListLinkLandCode"
                    buttonText="Field One-Plants"
                    value={item.fieldOnePlantListLinkLandCode}
                    isButtonCallToAction={false}
                    isVisible={true}
                    onPress={() => {
                        logClick("ReportDetailThreeColLandPlantList","fieldOnePlantListLinkLandCode","");
                        onNavigateTo("LandPlantList",item.fieldOnePlantListLinkLandCode);
                    }}
                />
            </View>
        }
        </View>
    );
};

