import React, { FC, ReactElement } from "react";
import { ActivityIndicator, Row, Spinner, View } from 'react-native';
import * as ReportService from "../../services/PacUserRoleList";
import * as AsyncServices from "../../../services";
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
export interface ReportDetailThreeColPacUserRoleListProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
    showProcessing?: boolean;
}
export const ReportDetailThreeColPacUserRoleList: FC<ReportDetailThreeColPacUserRoleListProps> = ({
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
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="roleCode"
                    label=""
                    value={item.roleCode}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="roleDescription"
                    label="Role Description"
                    value={item.roleDescription}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="roleDisplayOrder"
                    label="Display Order"
                    value={item.roleDisplayOrder}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="roleIsActive"
                    label="Is Active"
                    isChecked={item.roleIsActive}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="roleLookupEnumName"
                    label="Role Lookup Enum Name"
                    value={item.roleLookupEnumName}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="roleName"
                    label="Role Name"
                    value={item.roleName}
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

