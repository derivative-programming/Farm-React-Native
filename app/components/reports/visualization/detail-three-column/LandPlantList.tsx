import React, { FC, ReactElement } from "react";
import { ActivityIndicator, Row, Spinner, View } from 'react-native';
import * as ReportService from "../../services/LandPlantList";
import * as AsyncServices from "../../../services";
import * as ReportColumnDisplay from "./columns";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
export interface ReportDetailThreeColLandPlantListProps {
    name: string
    item: ReportService.QueryResultItem
    onNavigateTo(page: string, targetContextCode:string): void
    onRefreshRequest(): void
    showProcessing?: boolean;
}
export const ReportDetailThreeColLandPlantList: FC<ReportDetailThreeColLandPlantListProps> = ({
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
                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someIntVal"
                    label="Int Val"
                    value={item.someIntVal}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someBigIntVal"
                    label="Big Int Val"
                    value={item.someBigIntVal}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="someBitVal"
                    label="Bit Val"
                    isChecked={item.someBitVal}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isEditAllowed"
                    label="Edit Allowed"
                    isChecked={item.isEditAllowed}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isDeleteAllowed"
                    label="Delete Allowed"
                    isChecked={item.isDeleteAllowed}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someFloatVal"
                    label="Float Val"
                    value={item.someFloatVal}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someDecimalVal"
                    label="Decimal Val"
                    value={item.someDecimalVal}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayDateTime forColumn="someUTCDateTimeVal"
                    label="Date Time Val"
                    value={item.someUTCDateTimeVal}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayDate forColumn="someDateVal"
                    label="Date Val"
                    value={item.someDateVal}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayMoney forColumn="someMoneyVal"
                    label="Money Val"
                    value={item.someMoneyVal}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="someNVarCharVal"
                    label="Some N Var Char Val"
                    value={item.someNVarCharVal}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="someVarCharVal"
                    label="Var Char Val"
                    value={item.someVarCharVal}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="someTextVal"
                    label="Text Val"
                    value={item.someTextVal}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayPhoneNumber forColumn="somePhoneNumber"
                    label="Phone Number"
                    value={item.somePhoneNumber}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayEmail forColumn="someEmailAddress"
                    label="Email Address"
                    value={item.someEmailAddress}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorName"
                    label="Flavor Name"
                    value={item.flavorName}
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayButton forColumn="flavorCode"
                    buttonText=""
                    value={item.flavorCode}
                    isButtonCallToAction={false}
                    isVisible={false}
                    onPress={() => {
                        logClick("ReportDetailThreeCol","flavorCode","");
                        onNavigateTo("",item.flavorCode);
                    }}
                />
                <ReportColumnDisplay.ReportColumnDisplayUrl forColumn="nVarCharAsUrl"
                    label="N Var Char As Url"
                    value={item.nVarCharAsUrl}
                    linkText="Click Here"
                    isVisible={true}
                />
                <ReportColumnDisplay.ReportColumnDisplayButton forColumn="updateLinkPlantCode"
                    buttonText="Update"
                    value={item.updateLinkPlantCode}
                    isButtonCallToAction={false}
                    isVisible={false}
                    onPress={() => {
                        logClick("ReportDetailThreeColPlantUserDetails","updateLinkPlantCode","");
                        onNavigateTo("PlantUserDetails",item.updateLinkPlantCode);
                    }}
                />
                <ReportColumnDisplay.ReportColumnDisplayButton forColumn="deleteAsyncButtonLinkPlantCode"
                    buttonText="Delete"
                    value={item.deleteAsyncButtonLinkPlantCode}
                    isButtonCallToAction={false}
                    isVisible={true}
                    onPress={() =>{
                        logClick("ReportDetailThreeColPlantUserDetails","deleteAsyncButtonLinkPlantCode","");
                        const data: any = {};
                        AsyncServices.PlantUserDeleteSubmitRequest(data, item.deleteAsyncButtonLinkPlantCode)
                            .then((response) => onRefreshRequest())
                    } }
                />
                <ReportColumnDisplay.ReportColumnDisplayButton forColumn="detailsLinkPlantCode"
                    buttonText="Details"
                    value={item.detailsLinkPlantCode}
                    isButtonCallToAction={true}
                    isVisible={true}
                    onPress={() => {
                        logClick("ReportDetailThreeColPlantUserDetails","detailsLinkPlantCode","");
                        onNavigateTo("PlantUserDetails",item.detailsLinkPlantCode);
                    }}
                />
            </View>
        }
        </View>
    );
};

