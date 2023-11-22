import React, { FC, ReactElement, useState } from "react";
import { Button, Row,  View } from "native-base";
import * as ReportService from "../../services/LandPlantList";
import { ReportColumnHeader } from "../../input-fields/ColumnHeader";
import * as AsyncServices from "../../../services";
import * as ReportColumnDisplay from "./columns";

export interface ReportDetailThreeColLandPlantListProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
} 
export const ReportDetailThreeColLandPlantList: FC<ReportDetailThreeColLandPlantListProps> = ({
    name,
    item,
    onNavigateTo,
    onRefreshRequest,
}): ReactElement => {
 

    return (
        <View testID={name} > 
        </View>
    );
}; 
