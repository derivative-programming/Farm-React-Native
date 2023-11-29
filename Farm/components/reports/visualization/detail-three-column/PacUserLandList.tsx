import React, { FC, ReactElement } from "react";
import { ActivityIndicator,  View } from 'react-native';
import * as ReportService from "../../services/PacUserLandList";
import * as AsyncServices from "../../../services";
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
export interface ReportDetailThreeColPacUserLandListProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
    showProcessing?: boolean;
}
export const ReportDetailThreeColPacUserLandList: FC<ReportDetailThreeColPacUserLandListProps> = ({
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
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="landCode"
                    label=""
                    value={item.landCode}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="landDescription"
                    label="Land Description"
                    value={item.landDescription}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="landDisplayOrder"
                    label="Display Order"
                    value={item.landDisplayOrder}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="landIsActive"
                    label="Is Active"
                    isChecked={item.landIsActive}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="landLookupEnumName"
                    label="Land Lookup Enum Name"
                    value={item.landLookupEnumName}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="landName"
                    label="Land Name"
                    value={item.landName}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="pacName"
                    label="Pac Name"
                    value={item.pacName}
                    isVisible={true}
                />
            </View>
        }
        </View>
    );
};

