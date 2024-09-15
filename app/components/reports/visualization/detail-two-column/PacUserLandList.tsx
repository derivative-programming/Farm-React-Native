import React, { FC, ReactElement } from "react";
import * as ReportService from "../../services/PacUserLandList";
import { View } from 'react-native';
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
export interface ReportDetailTwoColPacUserLandListProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
}
export const ReportDetailTwoColPacUserLandList: FC<ReportDetailTwoColPacUserLandListProps> = ({
    name,
    item,
    onNavigateTo,
    onRefreshRequest,
}): ReactElement => {
    const { logClick } = useAnalyticsDB();
    return (
        <View testID={name}>

        </View>
    );
};

