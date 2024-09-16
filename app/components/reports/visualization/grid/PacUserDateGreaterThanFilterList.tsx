import React, { FC, ReactElement, useState } from "react";
import * as ReportService from "../../services/PacUserDateGreaterThanFilterList";
import uuid  from 'react-native-uuid';
//import RNFS from 'react-native-fs';

import * as ReportColumnDisplay from "./columns";
import * as AsyncServices from "../../../services";

import * as ReportInput from "../../input-fields";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from "react-native";

export interface ReportGridPacUserDateGreaterThanFilterListProps {
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
export const ReportGridPacUserDateGreaterThanFilterList: FC<ReportGridPacUserDateGreaterThanFilterListProps> = ({
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
  const componentName = "ReportGridPacUserDateGreaterThanFilterList";
  const contextValueName = "pacCode";
  const contextValue = contextCode;

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
      logClick("ReportGridPacUserDateGreaterThanFilterList","selectAllRows","");
      setCheckedIndexes(
        items.map((item: ReportService.EnhancedQueryResultItem, index) =>
          index.toString()
        )
      );
    } else {
      logClick("ReportGridPacUserDateGreaterThanFilterList","uncheckSelectAllRows","");
      setCheckedIndexes(initialCheckedIndexes);
    }
  };

  const viewFileDownload = async (response: any) => {
    const contentDisposition = response.headers['content-disposition'];
    let filename = uuid.v4() + '.csv';

    if (contentDisposition) {
      // Attempt to extract the filename*= value first, then fallback to filename=
      const filenameMatch = contentDisposition.match(/filename\*?=['"]?([^;'"]+)/);
      if (filenameMatch && filenameMatch[1]) {
        filename = decodeURIComponent(filenameMatch[1].replace(/UTF-8''/, ''));
      }
    }

    // Get the content type or default to "text/csv"
    const contentType = response.headers['content-type'] || 'text/csv';

    // Define the file path for saving
    const path = "";//"";//`${RNFS.DocumentDirectoryPath}/${filename}`;

    try {
      // Write the response data to the file
      //await RNFS.writeFile(path, response.data, 'utf8');
      console.log(`File downloaded to: ${path}`);

      // Optionally open the file using FileViewer or any other viewer.
      // FileViewer.open(path); // Uncomment this line if you want to open the file immediately
    } catch (err) {
      console.error('File download error:', err);
    }
  };

  console.log("items count...");
  console.log(items.length);

  return (
    <View testID={name} style={styles.view}>
      {!false ? (
      <FlatList
        data={items}
        style={styles.flatlist}
        renderItem={({ item }) =>
          <View style={styles.card}>
{/* ENDSET */}
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="dateGreaterThanFilterCode"
              rowIndex={item.rowNumber}
              value={item.dateGreaterThanFilterCode}
              isVisible={true}
              label="dateGreaterThanFilter Code"
            />
            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="dateGreaterThanFilterDayCount"
              rowIndex={item.rowNumber}
              value={item.dateGreaterThanFilterDayCount}
              isVisible={true}
              label="Day Count"
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="dateGreaterThanFilterDescription"
              rowIndex={item.rowNumber}
              value={item.dateGreaterThanFilterDescription}
              isVisible={true}
              label="Description"
            />
            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="dateGreaterThanFilterDisplayOrder"
              rowIndex={item.rowNumber}
              value={item.dateGreaterThanFilterDisplayOrder}
              isVisible={true}
              label="Display Order"
            />
            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="dateGreaterThanFilterIsActive"
              rowIndex={item.rowNumber}
              isChecked={item.dateGreaterThanFilterIsActive}
              isVisible={true}
              label="Is Active"
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="dateGreaterThanFilterLookupEnumName"
              rowIndex={item.rowNumber}
              value={item.dateGreaterThanFilterLookupEnumName}
              isVisible={true}
              label="Lookup Enum Name"
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="dateGreaterThanFilterName"
              rowIndex={item.rowNumber}
              value={item.dateGreaterThanFilterName}
              isVisible={true}
              label="Name"
            />
{/* ENDSET */}
          </View>}
        keyExtractor={item => item.rowKey}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.25} // Adjust as needed
        contentContainerStyle={{ flexGrow: 1 }}
      />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  flatlist: {
    flexGrow: 1,
  },
  card: {
    flex: 1,
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

