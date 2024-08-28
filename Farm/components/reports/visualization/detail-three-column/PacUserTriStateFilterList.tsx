import React, { FC, ReactElement } from "react";
import { ActivityIndicator, Row, Spinner, View } from 'react-native';
import * as ReportService from "../../services/PacUserTriStateFilterList";
import * as AsyncServices from "../../../services";
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
export interface ReportDetailThreeColPacUserTriStateFilterListProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
    showProcessing?: boolean;
}
export const ReportDetailThreeColPacUserTriStateFilterList: FC<ReportDetailThreeColPacUserTriStateFilterListProps> = ({
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
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="triStateFilterCode"
                    label=""
                    value={item.triStateFilterCode}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="triStateFilterDescription"
                    label="Tri State Filter Description"
                    value={item.triStateFilterDescription}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="triStateFilterDisplayOrder"
                    label="Display Order"
                    value={item.triStateFilterDisplayOrder}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="triStateFilterIsActive"
                    label="Is Active"
                    isChecked={item.triStateFilterIsActive}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="triStateFilterLookupEnumName"
                    label="Tri State Filter Lookup Enum Name"
                    value={item.triStateFilterLookupEnumName}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="triStateFilterName"
                    label="Tri State Filter Name"
                    value={item.triStateFilterName}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="triStateFilterStateIntValue"
                    label="State Int Value"
                    value={item.triStateFilterStateIntValue}
                    isVisible={true}
                />
            </View>
        }
        </View>
    );
};

