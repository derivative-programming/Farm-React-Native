import React, { FC, ReactElement, useState } from "react";
import * as ReportService from "../../services/PacUserFlavorList";

import * as ReportColumnDisplay from "./columns";
import * as AsyncServices from "../../../services";

import * as ReportInput from "../../input-fields";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from "react-native";

export interface ReportGridPacUserFlavorListProps {
  name: string;
  contextCode: string;
  sortedColumnName: string;
  isSortDescending: boolean;
  items: ReportService.EnhancedQueryResultItem[];
  onSort(columnName: string): void;
  onExport(): void;
  onNavigateTo(page: string, targetContextCode:string): void
  onRefreshRequest(): void;
  currentPage: number;
  totalItemCount: number;
  pageSize?: number;
  onRefresh(): void;
  onEndReached(): void;
  refreshing?: boolean;
}
export const ReportGridPacUserFlavorList: FC<ReportGridPacUserFlavorListProps> = ({
  name,
  contextCode,
  sortedColumnName,
  isSortDescending,
  items,
  onSort,
  onExport,
  onNavigateTo,
  onRefreshRequest,
  currentPage,
  totalItemCount,
  pageSize = 5,
  onRefresh,
  onEndReached,
  refreshing = true,
}): ReactElement => {
  const initialCheckedIndexes: string[] = [];
  const [checkedIndexes, setCheckedIndexes] = useState(initialCheckedIndexes);
  const { logClick } = useAnalyticsDB();
  const componentName = "ReportGridPacUserFlavorList";

  const handleRowSelectCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    rowCode: string
  ) => {
    if (e.target.checked) {
      checkedIndexes.push(index.toString());
      const newList = checkedIndexes.filter((item) => item);
      setCheckedIndexes(newList);
    } else {
      const newList = checkedIndexes.filter(
        (item) => item !== index.toString()
      );
      setCheckedIndexes(newList);
    }
  };

  const onSelectAllRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      logClick("ReportGridPacUserFlavorList","selectAllRows","");
      setCheckedIndexes(
        items.map((item: ReportService.EnhancedQueryResultItem, index) =>
          index.toString()
        )
      );
    } else {
      logClick("ReportGridPacUserFlavorList","uncheckSelectAllRows","");
      setCheckedIndexes(initialCheckedIndexes);
    }
  };

  console.log("items count...");
  console.log(items.length);

  return (
    <View testID={name}>
      {!false ? (
      <FlatList
        data={items}
        renderItem={({ item }) =>
          <View style={styles.card}>
{/* ENDSET */}
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorDescription"
              rowIndex={item.rowNumber}
              value={item.flavorDescription}
              label="Description"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="flavorDisplayOrder"
              rowIndex={item.rowNumber}
              value={item.flavorDisplayOrder}
              label="Display Order"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="flavorIsActive"
              rowIndex={item.rowNumber}
              isChecked={item.flavorIsActive}
              label="Is Active"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorLookupEnumName"
              rowIndex={item.rowNumber}
              value={item.flavorLookupEnumName}
              label="Lookup Enum Name"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorName"
              rowIndex={item.rowNumber}
              value={item.flavorName}
              label="Name"
              isVisible={true}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="pacName"
              rowIndex={item.rowNumber}
              value={item.pacName}
              label="Pac Name"
              isVisible={true}
            />
{/* ENDSET */}
          </View>}
        keyExtractor={item => item.rowKey}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.25} // Adjust as needed
      />
      ) : (
        <ActivityIndicator />
      )}
    </View>

    //       onPress={() => onMultSelectButtonToNotEditableClick()}
    //       buttonText="To Not Editable"
    //       className="mb-3 me-2"
    //       isButtonCallToAction={false}
    //       isVisible={true}
    //       isEnabled={true}
    //     />
    //   </div>

    //   <Table
    //     className="report-list-table"
    //     striped
    //     //bordered
    //     hover
    //     responsive
    //     size="sm"
    //   >
    //     <thead>
    //       <tr>
    //         <th id="flavorCode-header">
    //           {" "}
    //           <Form.Check
    //             type="checkbox"
    //             id="flavorCode-select-all-rows-checkbox"
    //             name="flavorCode-select-all-rows-checkbox"
    //             onChange={(e) => onSelectAllRows(e)}
    //           />
    //         </th>

    //       </tr>
    //     </thead>
    //     <tbody>
    //       {items && !showProcessing && items.length ? (
    //         items.map((item: ReportService.QueryResultItem, index) => {
    //           return (
    //             <tr key={index.toString()}>
    //               <td data-testid={"flavorCodeColumn-" + index}>
    //                 <Form.Check
    //                   type="checkbox"
    //                   id={"row-select-" + index}
    //                   name={"row-select-" + index}
    //                   checked={checkedIndexes.includes(index.toString())}
    //                   onChange={(e) => {
    //                     handleRowSelectCheckboxChange(e, index, item.flavorCode);
    //                   }}
    //                 />
    //               </td>

    //             </tr>
    //           );
    //         })
    //       ) : (showProcessing ?
    //         <tr>
    //           <td colSpan={100}>
    //             <div className="text-center  bg-secondary bg-opacity-25">
    //             <Spinner animation="border" className="mt-2 mb-2" />
    //           </div>
    //         </td>
    //         </tr>
    //         :
    //         <tr>
    //           <td colSpan={100}></td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </Table>

    //   <div
    //     className="d-flex justify-content-center justify-content-md-end w-100 mb-3 mb-md-0"
    //     hidden={!showExport}
    //   >
    //     <Button data-testidid="export-button"
    //       onPress={() => onExport()}
    //       className='me-md-2'
    //       size="sm"
    //       variant="outline">
    //       Export
    //     </Button>
    //   </div>
    // </div>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

