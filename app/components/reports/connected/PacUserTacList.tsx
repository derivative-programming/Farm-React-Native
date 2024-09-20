import React, {
  FC,
  ReactElement,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Button, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as PacUserTacListReportService from "../services/PacUserTacList";
import * as InitReportService from "../services/init/PacUserTacListInitReport";
import HeaderPacUserTacList from "../headers/PacUserTacListInitReport";
import * as ReportInput from "../input-fields";
import useAnalyticsDB from "../../../hooks/useAnalyticsDB";
import uuid from 'react-native-uuid';
import { StackNavigationProp } from "@react-navigation/stack";

import RootStackParamList from "../../../screens/rootStackParamList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as theme from '../../../constants/theme'

import Icon from 'react-native-vector-icons/Ionicons';
import CustomMenuOption from "../../CustomMenuOption";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import SortControl from '../input-fields/SortControl';
import { ColumnSettingsPacUserTacList } from "../visualization/settings";
import TextCollapsible from "../../TextCollapsible";

import ReportFilterPacUserTacList from "../filters/PacUserTacList";
import { ReportGridPacUserTacList } from "../visualization/grid/PacUserTacList";

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export interface ReportProps {
  pacCode:string;
}

export const ReportConnectedPacUserTacList: FC<ReportProps> = ({
  pacCode = "00000000-0000-0000-0000-000000000000"
}): ReactElement => {
  const isFilterPersistant  = false;

  const [items, setItems] = useState<PacUserTacListReportService.EnhancedQueryResultItem[]>([]);
  const [columns, setColumns] = useState(ColumnSettingsPacUserTacList);
  const [isProcessing, setIsProcessing] = useState(false);
  const [initPageResponse, setInitPageResponse] = useState<InitReportService.InitResult | null>(null);

  const [queryResult, setQueryResult] = useState<PacUserTacListReportService.QueryResult | null>(null);

  const [query, setQuery] = useState<PacUserTacListReportService.QueryRequest | null>(null);

  const [initialQuery, setInitialQuery] = useState<PacUserTacListReportService.QueryRequest | null>(null);

  const [displayItem, setDisplayItem] = useState<PacUserTacListReportService.QueryResultItem | null>(null);

  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isInitializedRef = useRef(false);
  const { logClick } = useAnalyticsDB();

    const [exportQuery, setExportQuery] = useState(new PacUserTacListReportService.QueryRequestInstance());

  const navigation = useNavigation<ScreenNavigationProp>();
  const contextCode: string = pacCode ?? "00000000-0000-0000-0000-000000000000";

  const handleInit = (responseFull: InitReportService.ResponseFull) => {
    const response: InitReportService.InitResult = responseFull.data;

    if (!response.success) {
      return;
    }
    setInitPageResponse({ ...response });
  };

  const handleQueryResults = (responseFull: PacUserTacListReportService.ResponseFull) => {
    const queryResult: PacUserTacListReportService.QueryResult = responseFull.data;
    if (!queryResult.success) {
      return;
    }
    setQueryResult({ ...queryResult });
    const currentItemCount = items.length
    const enhancedItems = queryResult.items.map((item,index) => ({
      ...item,
      rowKey: uuid.v4().toString(), // Add a UUID to each item
      rowNumber: currentItemCount + index
    }));

    if(queryResult.pageNumber == 1) {
      setItems([...enhancedItems]);
    }
    else{
      setItems([...items, ...enhancedItems]);
    }
  };

  const onNavigateTo = (page: string,targetContextCode:string) => {
    navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
  };

  const onRefreshRequest = () => {
    logClick("ReportConnectedPacUserTacList","refresh","");

    const cleanQueryRequest = new PacUserTacListReportService.QueryRequestInstance();
    cleanQueryRequest.ItemCountPerPage = query?.ItemCountPerPage ?? 10;
    cleanQueryRequest.OrderByColumnName = query?.OrderByColumnName ?? "";
    cleanQueryRequest.OrderByDescending = query?.OrderByDescending ?? false;
    setQuery({...cleanQueryRequest});
  };

  useEffect(() => {

    const loadReportData = async () => {
      const storedData = await AsyncStorage.getItem('pacUserTacListHiddenColumns');
      if(storedData){
        const storedHiddenColumns: Array<keyof typeof columns> = JSON.parse(storedData) || [];
        setColumns(prevColumns => {
          const updatedColumns = { ...prevColumns };

          // Reset isPreferenceVisible to true for all columns
          (Object.keys(updatedColumns) as Array<keyof typeof columns>).forEach(colKey => {
            updatedColumns[colKey].isPreferenceVisible = true;
          });

          if (storedData) {
            const storedHiddenColumns: Array<keyof typeof columns> = JSON.parse(storedData) || [];

            storedHiddenColumns.forEach(colKey => {
              if (updatedColumns[colKey]) {
                updatedColumns[colKey].isPreferenceVisible = false;
              }
            });
          }

          return updatedColumns;
        });
      }
    };

    loadReportData();
  }, []);

  useFocusEffect(
    useCallback(() => {

      const loadReportData = async () => {
        const storedData = await AsyncStorage.getItem('pacUserTacListHiddenColumns');
        if(storedData){
          const storedHiddenColumns: Array<keyof typeof columns> = JSON.parse(storedData) || [];
          setColumns(prevColumns => {
            const updatedColumns = { ...prevColumns };

            // Reset isPreferenceVisible to true for all columns
          (Object.keys(updatedColumns) as Array<keyof typeof columns>).forEach(colKey => {
            updatedColumns[colKey].isPreferenceVisible = true;
          });

            if (storedData) {
              const storedHiddenColumns: Array<keyof typeof columns> = JSON.parse(storedData) || [];

              storedHiddenColumns.forEach(colKey => {
                if (updatedColumns[colKey]) {
                  updatedColumns[colKey].isPreferenceVisible = false;
                }
              });
            }

            return updatedColumns;
          });
        }
      };

      loadReportData();

      PacUserTacListReportService.initPage(contextCode).then((response) =>
        handleInit(response)
      );

    }, [])
  );

  useEffect(() => {

    const saveReportData = async () => {
      const hiddenColumns =  (Object.keys(columns) as Array<keyof typeof columns>).filter(
        colKey => !columns[colKey].isPreferenceVisible
      );
      await AsyncStorage.setItem('pacUserTacListHiddenColumns', JSON.stringify(hiddenColumns));
    };

    saveReportData();
  }, [columns]);

  useEffect(() => {
    if(initPageResponse === null){
      return;
    }
    const loadAsyncData = async () => {
      let queryRequest = PacUserTacListReportService.buildQueryRequest(initPageResponse);

      const savedSortColumnName = await AsyncStorage.getItem("PacUserTacListSortColumnName");
      const savedSortDirection = await AsyncStorage.getItem("PacUserTacListSortDirection");

      // Check if persistence is enabled and if there is a saved filter
      if (isFilterPersistant) {
        const savedFilter = await AsyncStorage.getItem("PacUserTacListFilter");

        if (savedFilter) {
          const parsedFilter = JSON.parse(savedFilter);

          queryRequest = { ...queryRequest, ...parsedFilter };
        }
      }

      queryRequest.OrderByColumnName = savedSortColumnName ?? "";

      queryRequest.OrderByDescending = true;
      if(savedSortDirection === "asc"){
        queryRequest.OrderByDescending = false;
      }

      setInitialQuery({ ...queryRequest });
    };

    loadAsyncData();

  }, [initPageResponse]);

  useEffect(() => {
    if(initialQuery === null){
      return;
    }

    const loadAsyncData = async () => {
      const pageSize = await AsyncStorage.getItem("pageSize");
      if(pageSize !== null)
      {
        initialQuery.ItemCountPerPage = parseInt(pageSize);
      }
      setQuery({ ...initialQuery });
    };

    loadAsyncData();

  }, [initialQuery]);

  useEffect(() => {
    if(query === null){
      return;
    }

    if(query.pageNumber == 1) {
      setRefreshing(true);
      setLoadingMore(false);
    } else {
      setRefreshing(false);
      setLoadingMore(true);
    }

    setIsProcessing(true);
    PacUserTacListReportService.submitRequest(query, contextCode).then((response) =>
      handleQueryResults(response)
    )
    .finally(() => {
      setIsProcessing(false);
      setRefreshing(false);
      setLoadingMore(false);
    });
  }, [query]);

  useEffect(() => {
    if(queryResult === null){
      return;
    }
    if(queryResult.items === null){
      return;
    }

    const item = queryResult.items.length > 0 ?  queryResult.items[0] : new PacUserTacListReportService.QueryResultItemInstance();

    setDisplayItem({...item})
  }, [queryResult]);

  const navigateTo = (page: string, codeName: string) => {
    let targetContextCode = contextCode;
    if(initPageResponse === null){
      return;
    }
    Object.entries(initPageResponse).forEach(([key, value]) => {
      if (key === codeName) {
        if (value !== "" && value !== "00000000-0000-0000-0000-000000000000") {
          targetContextCode = value;
        } else {
          return;
        }
      }
    });
    navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
  };

  const handleColumnVisibility = (colName: keyof typeof columns) => {
    logClick("ReportConnectedPacUserTacList","handleColumnVisibility",colName);

    setColumns(prevColumns => ({
      ...prevColumns,
      [colName]: {
        ...prevColumns[colName],
        isPreferenceVisible: !prevColumns[colName].isPreferenceVisible
      }
    }));
  };

  const handleSetAllColumnsVisibility = (visibility: boolean) => {
    logClick("ReportConnectedPacUserTacList","handleSetAllColumnsVisibility",visibility.toString());
    const updatedColumns = { ...columns };
    (Object.keys(updatedColumns) as Array<keyof typeof updatedColumns>).forEach(colKey => {
      if (updatedColumns[colKey].isVisible) {
        updatedColumns[colKey].isPreferenceVisible = visibility;
      }
    });
    setColumns(updatedColumns);
  };

  const isBreadcrumbSectionHidden = false;
  const calculatedIsOtherButtonAvailable = false;

  const calculatedIsMultiSelectProcessingButtonAvailable = false;
  const calculatedIsBreadcrumbButtonAvailable = false;

  const isRefreshButtonHidden = false;
  const isPagingAvailable = true;
  const isExportButtonsHidden = false;
  const isFilterSectionHidden = false;
  const isFilterSectionCollapsable = true;

  const onSubmit = async (queryRequest: PacUserTacListReportService.QueryRequest) => {
    logClick("ReportConnectedPacUserTacList","search","");

    if(isFilterPersistant ){
      await AsyncStorage.setItem("PacUserTacListFilter",JSON.stringify(queryRequest));
    }

    queryRequest.ItemCountPerPage = query?.ItemCountPerPage ?? 10;
    queryRequest.OrderByColumnName = query?.OrderByColumnName ?? "";
    queryRequest.OrderByDescending = query?.OrderByDescending ?? false;
    setQuery({ ...queryRequest });
  };

  const onFilterReset = async () => {
    logClick("ReportConnectedPacUserTacList","reset filter","");
    const clearQuery = new PacUserTacListReportService.QueryRequestInstance();
    if(isFilterPersistant ){
      await AsyncStorage.setItem("PacUserTacListFilter",JSON.stringify(clearQuery));
    }
    setInitialQuery({...clearQuery});
  };

  const onPageSelection = (pageNumber: number) => {
    logClick("ReportConnectedPacUserTacList","selectPage",pageNumber.toString());
    if(query === null){
      return;
    }
    setQuery({ ...query, pageNumber: pageNumber });
  };

  const onPageSizeChange = async (pageSize: number) => {
    logClick("ReportConnectedPacUserTacList","pageSizeChange",pageSize.toString());
    if(query === null){
      return;
    }
    await AsyncStorage.setItem("pageSize",pageSize.toString());
    setQuery({ ...query, ItemCountPerPage: pageSize, pageNumber: 1 });
  };

  const onSortChange = async (columnName: string, sortDirection: 'asc' | 'desc') => {
    logClick("ReportConnectedPacUserTacList","sort",columnName);
    if(query === null){
      return;
    }
    let orderByDescending = false;
    if (sortDirection === "desc") {
      orderByDescending = true;
    }

    await AsyncStorage.setItem("PacUserTacListSortColumnName", columnName);
    if(orderByDescending){
      await AsyncStorage.setItem("PacUserTacListSortDirection", "desc");
    }
    else
    {
      await AsyncStorage.setItem("PacUserTacListSortDirection", "asc");
    }

    setQuery({
      ...query,
      OrderByColumnName: columnName,
      OrderByDescending: orderByDescending,
    });
  };
  const onSort = (columnName: string) => {
    logClick("ReportConnectedPacUserTacList","sort",columnName);
    if(query === null){
      return;
    }
    let orderByDescending = false;
    if (query.OrderByColumnName === columnName) {
      orderByDescending = !query.OrderByDescending;
    }
    setQuery({
      ...query,
      OrderByColumnName: columnName,
      OrderByDescending: orderByDescending,
    });
  };

  const onExport = () => {
    logClick("ReportConnectedPacUserTacList","export","");
    if(query === null){
      return;
    }
    if(isProcessing){
      return;
    }
    setExportQuery({ ...query });
  };

  const handleExportQueryResults = (responseFull: PacUserTacListReportService.ResponseFull) => { // NOSONAR
    const queryResult: PacUserTacListReportService.QueryResult = responseFull.data;

    if (!queryResult.success) {
      return;
    }
  };

  useEffect(() => {
    // if (!isInitializedRef.current) {
    //   return;
    // }
    if(query === null){
      return;
    }
    if(queryResult === null){
      return;
    }
    if(!queryResult.success){
      return;
    }
    setIsProcessing(true);
    PacUserTacListReportService.submitCSVRequest(query, contextCode).then((response) => {
      //handleExportQueryResults(response);  //NOSONAR
      // const blob = new Blob([response.data], { type: "text/csv" });
      // const url = URL.createObjectURL(blob);
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'PacUserTacList-' + uuid.v4() + '.csv');
      // document.body.appendChild(link);
      // link.click();
    })
    .finally(() => {setIsProcessing(false);});
  }, [exportQuery]);

  const onRefresh = () => {
    onPageSelection(1);
  };

  const onEndReached = () => {
    if (queryResult && !loadingMore) {
      onPageSelection(queryResult.pageNumber + 1);
    }
  };
  const availableColumns = [
    { label: 'Description', value: 'tacDescription', isVisible: true },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <View style={styles.titleContainer}>
              <Text style={styles.titleText} testID="page-title-text">Pac User Tac List Report</Text>
          </View>
      </View>
      <View style={styles.header}>

          {!isBreadcrumbSectionHidden && calculatedIsBreadcrumbButtonAvailable && (
            <Menu>
              <MenuTrigger>
                <Icon
                  name={Platform.OS === 'ios' ? 'ellipsis-horizontal' : 'ellipsis-vertical'}
                  size={24}
                  color="#000"
                />
              </MenuTrigger>
              <MenuOptions customStyles={styles.menuOptions}>

              </MenuOptions>
            </Menu>
          )}

          <View style={styles.titleContainer}>
              <Text style={styles.titleText}></Text>
          </View>

          <ReportInput.TableSettings<typeof ColumnSettingsPacUserTacList>
            name="TableSettingsPacUserTacList"
            columns={columns}
            onToggleColumn={handleColumnVisibility}
            onSetAllColumnsVisibility={handleSetAllColumnsVisibility}
          />

          {queryResult && (
            <SortControl
              onSortChange={onSortChange}
              availableColumns={availableColumns.filter(col => col.isVisible && col.label !== '')}
              initialSortColumn={queryResult.orderByColumnName}
              initialSortDirection={queryResult.orderByDescending ? "desc" : "asc"}
            />
          )}
          {initialQuery && (
            <ReportFilterPacUserTacList
              name="reportConnectedPacUserTacList-filter"
              initialQuery={initialQuery}
              onSubmit={onSubmit}
              // onReset={onFilterReset}
              // isCollapsible={isFilterSectionCollapsable}
              hidden={isFilterSectionHidden}
            />
          )}

          {calculatedIsOtherButtonAvailable && (
          <Menu>
            <MenuTrigger>
              <Icon
                name={Platform.OS === 'ios' ? 'ellipsis-horizontal' : 'ellipsis-vertical'}
                size={24}
                color="#000"
                style={styles.dropdownButton}
              />
            </MenuTrigger>
            <MenuOptions customStyles={styles.menuOptions}>

            </MenuOptions>
          </Menu>
          )}
      </View>
      <View style={styles.formContainer}>

        <TextCollapsible text=""  name="page-intro-text" />

        {initPageResponse && (
          <HeaderPacUserTacList
            name="headerPacUserTacList"
            initData={initPageResponse}
            isHeaderVisible={false}
          />
        )}

        {queryResult && (
          <ReportGridPacUserTacList
            isSortDescending={queryResult.orderByDescending}
            items={items}
            name="reportConnectedPacUserTacList-table"
            contextCode={contextCode}
            onSort={onSort}
            onExport={onExport}
            onNavigateTo={onNavigateTo}
            onRefreshRequest={onRefreshRequest}
            sortedColumnName={queryResult.orderByColumnName}
            currentPage={queryResult.pageNumber}
            pageSize={queryResult.itemCountPerPage}
            totalItemCount={queryResult.recordsTotal}
            onRefresh={onRefresh}
            refreshing={refreshing}
            onEndReached={onEndReached}
            columns={columns}
          />
        )}
        {!queryResult && (
          <ReportGridPacUserTacList
            isSortDescending={false}
            items={[]}
            name="reportConnectedPacUserTacList-table"
            contextCode={contextCode}
            onSort={onSort}
            onExport={onExport}
            onNavigateTo={onNavigateTo}
            onRefreshRequest={onRefreshRequest}
            sortedColumnName={""}
            currentPage={1}
            pageSize={10}
            totalItemCount={0}
            onRefresh={onRefresh}
            refreshing={refreshing}
            onEndReached={onEndReached}
          />
        )}

        </View>
    </View>
  );
};

const optionStyles = {
  optionWrapper: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  optionText: {
    color: 'blue',
  },
  // Add more styles as needed
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5, // equivalent to py="5"
    alignItems: 'center'
  },
  safeArea: {

  },
  header: {
      flexDirection: 'row', // Arrange items in a row
      alignItems: 'center', // Align items vertically in the center
      // Add padding, margin, or any other styling as needed
  },

  titleContainer: {
      flex: 1, // Take the remaining space in the row
      justifyContent: 'center', // Center the title horizontally in the remaining space
  },
  placeholder: {
      width: 35, // Adjust to match the width of your back button
      // Height, padding, or any other styling to match the back button
  },
  formContainer: {
    width: '90%',
    flex: 1,

  },
  titleText: {
    fontSize: theme.fonts.largeSize,
    marginBottom: 8,
    color: theme.Colors.text,
    textAlign: 'center',

  },
  dropdownButton: {
    paddingVertical: 5,
    paddingRight: 10,
  },
  menuOptions: {
    // padding: 10,
    // backgroundColor: 'white',
  },
});

export default ReportConnectedPacUserTacList;

