import React, { FC, ReactElement } from "react";
import * as ReportService from "../../services/PacUserTriStateFilterList";
import { View } from 'react-native';
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
export interface ReportDetailTwoColPacUserTriStateFilterListProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
}
export const ReportDetailTwoColPacUserTriStateFilterList: FC<ReportDetailTwoColPacUserTriStateFilterListProps> = ({
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

