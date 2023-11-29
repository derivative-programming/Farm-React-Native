import React, { FC, ReactElement } from "react";
import * as ReportService from "../../services/PacUserDateGreaterThanFilterList";
import { View } from 'react-native';
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
export interface ReportDetailTwoColPacUserDateGreaterThanFilterListProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
}
export const ReportDetailTwoColPacUserDateGreaterThanFilterList: FC<ReportDetailTwoColPacUserDateGreaterThanFilterListProps> = ({
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

