import React, { FC, ReactElement, useState } from "react";
import * as ReportService from "../../services/PacUserLandList";
import uuid  from 'react-native-uuid';
//import RNFS from 'react-native-fs';

import * as ReportColumnDisplay from "./columns";
import * as AsyncServices from "../../../services";

import * as ReportInput from "../../input-fields";
import useAnalyticsDB from "../../../../hooks/useAnalyticsDB";
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from "react-native";
import { ColumnSettingsPacUserLandList } from "../settings";
export interface TableColumn {
  header: string;
  isVisible: boolean;
  isPreferenceVisible: boolean;
}
export interface ReportGridPacUserLandListProps {
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
  columns?: Record<string, TableColumn>;
}
export const ReportGridPacUserLandList: FC<ReportGridPacUserLandListProps> = ({
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
  columns = ColumnSettingsPacUserLandList
}): ReactElement => {
  const initialCheckedIndexes: string[] = [];
  const [checkedIndexes, setCheckedIndexes] = useState(initialCheckedIndexes);
  const { logClick } = useAnalyticsDB();
  const componentName = "ReportGridPacUserLandList";
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
      logClick("ReportGridPacUserLandList","selectAllRows","");
      setCheckedIndexes(
        items.map((item: ReportService.EnhancedQueryResultItem, index) =>
          index.toString()
        )
      );
    } else {
      logClick("ReportGridPacUserLandList","uncheckSelectAllRows","");
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

  return (
    <View testID={name} style={styles.view}>
      {!refreshing ? (
      <FlatList
        data={items}
        style={styles.flatlist}
        renderItem={({ item }) =>
          <View style={styles.card}>
{/* ENDSET */}
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="landCode"
              rowIndex={item.rowNumber}
              value={item.landCode}
              isVisible={true}
              label="land Code"
              isPreferenceVisible={columns["landCode"]?.isPreferenceVisible}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="landDescription"
              rowIndex={item.rowNumber}
              value={item.landDescription}
              isVisible={true}
              label="Description"
              isPreferenceVisible={columns["landDescription"]?.isPreferenceVisible}
            />
            <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="landDisplayOrder"
              rowIndex={item.rowNumber}
              value={item.landDisplayOrder}
              isVisible={true}
              label="Display Order"
              isPreferenceVisible={columns["landDisplayOrder"]?.isPreferenceVisible}
            />
            <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="landIsActive"
              rowIndex={item.rowNumber}
              isChecked={item.landIsActive}
              isVisible={true}
              label="Is Active"
              isPreferenceVisible={columns["landIsActive"]?.isPreferenceVisible}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="landLookupEnumName"
              rowIndex={item.rowNumber}
              value={item.landLookupEnumName}
              isVisible={true}
              label="Lookup Enum Name"
              isPreferenceVisible={columns["landLookupEnumName"]?.isPreferenceVisible}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="landName"
              rowIndex={item.rowNumber}
              value={item.landName}
              isVisible={true}
              label="Name"
              isPreferenceVisible={columns["landName"]?.isPreferenceVisible}
            />
            <ReportColumnDisplay.ReportColumnDisplayText forColumn="pacName"
              rowIndex={item.rowNumber}
              value={item.pacName}
              isVisible={true}
              label="Pac Name"
              isPreferenceVisible={columns["pacName"]?.isPreferenceVisible}
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
        <ActivityIndicator  size="large" color="#0000ff" />
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

