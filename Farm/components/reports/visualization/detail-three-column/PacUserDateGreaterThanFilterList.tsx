import React, { FC, ReactElement } from "react";
import { ActivityIndicator, Row, Spinner, View } from 'react-native';
import * as ReportService from "../../services/PacUserDateGreaterThanFilterList";
import * as AsyncServices from "../../../services";
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
export interface ReportDetailThreeColPacUserDateGreaterThanFilterListProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
    showProcessing?: boolean;
}
export const ReportDetailThreeColPacUserDateGreaterThanFilterList: FC<ReportDetailThreeColPacUserDateGreaterThanFilterListProps> = ({
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
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="dateGreaterThanFilterCode"
                    label=""
                    value={item.dateGreaterThanFilterCode}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="dateGreaterThanFilterDayCount"
                    label="Day Count"
                    value={item.dateGreaterThanFilterDayCount}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="dateGreaterThanFilterDescription"
                    label="Date Greater Than Filter Description"
                    value={item.dateGreaterThanFilterDescription}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="dateGreaterThanFilterDisplayOrder"
                    label="Display Order"
                    value={item.dateGreaterThanFilterDisplayOrder}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="dateGreaterThanFilterIsActive"
                    label="Is Active"
                    isChecked={item.dateGreaterThanFilterIsActive}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="dateGreaterThanFilterLookupEnumName"
                    label="Date Greater Than Filter Lookup Enum Name"
                    value={item.dateGreaterThanFilterLookupEnumName}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="dateGreaterThanFilterName"
                    label="Date Greater Than Filter Name"
                    value={item.dateGreaterThanFilterName}
                    isVisible={true}
                />
            </View>
        }
        </View>
    );
};

