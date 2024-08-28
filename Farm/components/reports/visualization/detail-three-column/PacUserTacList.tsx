import React, { FC, ReactElement } from "react";
import { ActivityIndicator, Row, Spinner, View } from 'react-native';
import * as ReportService from "../../services/PacUserTacList";
import * as AsyncServices from "../../../services";
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
export interface ReportDetailThreeColPacUserTacListProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
    showProcessing?: boolean;
}
export const ReportDetailThreeColPacUserTacList: FC<ReportDetailThreeColPacUserTacListProps> = ({
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
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="tacCode"
                    label=""
                    value={item.tacCode}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="tacDescription"
                    label="Tac Description"
                    value={item.tacDescription}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="tacDisplayOrder"
                    label="Display Order"
                    value={item.tacDisplayOrder}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="tacIsActive"
                    label="Is Active"
                    isChecked={item.tacIsActive}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="tacLookupEnumName"
                    label="Tac Lookup Enum Name"
                    value={item.tacLookupEnumName}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="tacName"
                    label="Tac Name"
                    value={item.tacName}
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

