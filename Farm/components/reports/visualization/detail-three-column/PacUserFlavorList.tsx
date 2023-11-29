import React, { FC, ReactElement } from "react";
import { ActivityIndicator,  View } from 'react-native';
import * as ReportService from "../../services/PacUserFlavorList";
import * as AsyncServices from "../../../services";
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
export interface ReportDetailThreeColPacUserFlavorListProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
    showProcessing?: boolean;
}
export const ReportDetailThreeColPacUserFlavorList: FC<ReportDetailThreeColPacUserFlavorListProps> = ({
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
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorCode"
                    label=""
                    value={item.flavorCode}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorDescription"
                    label="Flavor Description"
                    value={item.flavorDescription}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="flavorDisplayOrder"
                    label="Display Order"
                    value={item.flavorDisplayOrder}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="flavorIsActive"
                    label="Is Active"
                    isChecked={item.flavorIsActive}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorLookupEnumName"
                    label="Flavor Lookup Enum Name"
                    value={item.flavorLookupEnumName}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorName"
                    label="Flavor Name"
                    value={item.flavorName}
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

