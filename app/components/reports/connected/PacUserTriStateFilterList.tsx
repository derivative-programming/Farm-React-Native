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
import * as PacUserTriStateFilterListReportService from "../services/PacUserTriStateFilterList";
import * as InitReportService from "../services/init/PacUserTriStateFilterListInitReport";
import HeaderPacUserTriStateFilterList from "../headers/PacUserTriStateFilterListInitReport";
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

import ReportFilterPacUserTriStateFilterList from "../filters/PacUserTriStateFilterList";
import { ReportGridPacUserTriStateFilterList } from "../visualization/grid/PacUserTriStateFilterList";

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export interface ReportProps {
  pacCode:string;
}

export const ReportConnectedPacUserTriStateFilterList: FC<ReportProps> = ({
  pacCode = "00000000-0000-0000-0000-000000000000"
}): ReactElement => {
  const isFilterPersistant  = false;

  const [items, setItems] = useState<PacUserTriStateFilterListReportService.EnhancedQueryResultItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [initPageResponse, setInitPageResponse] = useState<InitReportService.InitResult | null>(null);

  const [queryResult, setQueryResult] = useState<PacUserTriStateFilterListReportService.QueryResult | null>(null);

  const [query, setQuery] = useState<PacUserTriStateFilterListReportService.QueryRequest | null>(null);

  const [initialQuery, setInitialQuery] = useState<PacUserTriStateFilterListReportService.QueryRequest | null>(null);

  const [displayItem, setDisplayItem] = useState<PacUserTriStateFilterListReportService.QueryResultItem | null>(null);

  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isInitializedRef = useRef(false);
  const { logClick } = useAnalyticsDB();

    const [exportQuery, setExportQuery] = useState(new PacUserTriStateFilterListReportService.QueryRequestInstance());

  const navigation = useNavigation<ScreenNavigationProp>();
  const contextCode: string = pacCode ?? "00000000-0000-0000-0000-000000000000";

  const handleInit = (responseFull: InitReportService.ResponseFull) => {
    const response: InitReportService.InitResult = responseFull.data;

    if (!response.success) {
      return;
    }
    console.log('initPageResponse...',response);
    setInitPageResponse({ ...response });
  };

  const handleQueryResults = (responseFull: PacUserTriStateFilterListReportService.ResponseFull) => {
    const queryResult: PacUserTriStateFilterListReportService.QueryResult = responseFull.data;
    console.log('handleQueryResults...');
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
    console.log('currentPage:' + queryResult.pageNumber);
    if(queryResult.pageNumber == 1) {
      console.log('set items page 1');
      setItems([...enhancedItems]);
    }
    else{
      console.log('set items page ' + queryResult.pageNumber);
      setItems([...items, ...enhancedItems]);
    }
  };

  const onNavigateTo = (page: string,targetContextCode:string) => {
    console.log('onNavigateTo...');
    console.log('page...' + page);
    console.log('targetContextCode...' + targetContextCode);
    navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
  };

  const onRefreshRequest = () => {
    console.log('onRefreshRequest...');
    logClick("ReportConnectedPacUserTriStateFilterList","refresh","");

    const cleanQueryRequest = new PacUserTriStateFilterListReportService.QueryRequestInstance();
    cleanQueryRequest.ItemCountPerPage = query?.ItemCountPerPage ?? 10;
    cleanQueryRequest.OrderByColumnName = query?.OrderByColumnName ?? "";
    cleanQueryRequest.OrderByDescending = query?.OrderByDescending ?? false;
    setQuery({...cleanQueryRequest});
  };

  useEffect(() => {
    console.log('useEffect []...');
    // if (isInitializedRef.current) {
    //   return;
    // }
    // console.log('useEffect []...');
    // isInitializedRef.current = true;
    // PacUserTriStateFilterListReportService.initPage(contextCode).then((response) =>
    //   handleInit(response)
    // );
  }, []);

  useFocusEffect(
    useCallback(() => {
      // if (!isInitializedRef.current) {
      //   return;
      // }
      console.log('useFocusEffect...');
      PacUserTriStateFilterListReportService.initPage(contextCode).then((response) =>
        handleInit(response)
      );
    }, [])
  );

  useEffect(() => {
    if(initPageResponse === null){
      return;
    }
    console.log('useEffect initPageResponse...');
    const loadAsyncData = async () => {
      let queryRequest = PacUserTriStateFilterListReportService.buildQueryRequest(initPageResponse);

      // Check if persistence is enabled and if there is a saved filter
      if (isFilterPersistant) {
        const savedFilter = await AsyncStorage.getItem("PacUserTriStateFilterListFilter");

        if (savedFilter) {
          const parsedFilter = JSON.parse(savedFilter);

          queryRequest = { ...queryRequest, ...parsedFilter };
        }
      }
      setInitialQuery({ ...queryRequest });
    };

    loadAsyncData();

  }, [initPageResponse]);

  useEffect(() => {
    if(initialQuery === null){
      return;
    }

    console.log('useEffect initialQuery...');
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

    console.log('report ctrl query...');
    console.log(query);

    if(query.pageNumber == 1) {
      setRefreshing(true);
      setLoadingMore(false);
    } else {
      setRefreshing(false);
      setLoadingMore(true);
    }

    setIsProcessing(true);
    PacUserTriStateFilterListReportService.submitRequest(query, contextCode).then((response) =>
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
    console.log('useEffect queryResult...');

    const item = queryResult.items.length > 0 ?  queryResult.items[0] : new PacUserTriStateFilterListReportService.QueryResultItemInstance();

    setDisplayItem({...item})
  }, [queryResult]);

  const navigateTo = (page: string, codeName: string) => {
    console.log('navigateTo...');
    console.log('page...' + page);
    console.log('codeName...' + codeName);
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
    console.log('targetContextCode...' + targetContextCode);
    navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
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

  const onSubmit = async (queryRequest: PacUserTriStateFilterListReportService.QueryRequest) => {
    logClick("ReportConnectedPacUserTriStateFilterList","search","");

    if(isFilterPersistant ){
      await AsyncStorage.setItem("PacUserTriStateFilterListFilter",JSON.stringify(queryRequest));
    }

    queryRequest.ItemCountPerPage = query?.ItemCountPerPage ?? 10;
    queryRequest.OrderByColumnName = query?.OrderByColumnName ?? "";
    queryRequest.OrderByDescending = query?.OrderByDescending ?? false;
    setQuery({ ...queryRequest });
  };

  const onFilterReset = async () => {
    logClick("ReportConnectedPacUserTriStateFilterList","reset filter","");
    const clearQuery = new PacUserTriStateFilterListReportService.QueryRequestInstance();
    if(isFilterPersistant ){
      await AsyncStorage.setItem("PacUserTriStateFilterListFilter",JSON.stringify(clearQuery));
    }
    setInitialQuery({...clearQuery});
  };

  const onPageSelection = (pageNumber: number) => {
    logClick("ReportConnectedPacUserTriStateFilterList","selectPage",pageNumber.toString());
    if(query === null){
      return;
    }
    setQuery({ ...query, pageNumber: pageNumber });
  };

  const onPageSizeChange = async (pageSize: number) => {
    logClick("ReportConnectedPacUserTriStateFilterList","pageSizeChange",pageSize.toString());
    if(query === null){
      return;
    }
    await AsyncStorage.setItem("pageSize",pageSize.toString());
    setQuery({ ...query, ItemCountPerPage: pageSize, pageNumber: 1 });
  };

  const onSort = (columnName: string) => {
    logClick("ReportConnectedPacUserTriStateFilterList","sort",columnName);
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
    logClick("ReportConnectedPacUserTriStateFilterList","export","");
    if(query === null){
      return;
    }
    if(isProcessing){
      return;
    }
    setExportQuery({ ...query });
  };

  const handleExportQueryResults = (responseFull: PacUserTriStateFilterListReportService.ResponseFull) => { // NOSONAR
    const queryResult: PacUserTriStateFilterListReportService.QueryResult = responseFull.data;

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
    PacUserTriStateFilterListReportService.submitCSVRequest(query, contextCode).then((response) => {
      //handleExportQueryResults(response);  //NOSONAR
      // const blob = new Blob([response.data], { type: "text/csv" });
      // const url = URL.createObjectURL(blob);
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'PacUserTriStateFilterList-' + uuid.v4() + '.csv');
      // document.body.appendChild(link);
      // link.click();
    })
    .finally(() => {setIsProcessing(false);});
  }, [exportQuery]);

  const onRefresh = () => {
    console.log('onRefresh...');
    onPageSelection(1);
  };

  const onEndReached = () => {
    if (queryResult && !loadingMore) {
      console.log('onEndReached...');
      onPageSelection(queryResult.pageNumber + 1);
    }
  };

  const onBreadcrumbDropdownPress = () => {

  };

  return (
    <View style={styles.container}>
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
              <Text style={styles.titleText} testID="page-title-text">Pac User Tri State Filter List Report</Text>
          </View>

          {initialQuery && (
            <ReportFilterPacUserTriStateFilterList
              name="reportConnectedPacUserTriStateFilterList-filter"
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
              />
            </MenuTrigger>
            <MenuOptions customStyles={styles.menuOptions}>

            </MenuOptions>
          </Menu>
          )}

      </View>
      <View style={styles.formContainer}>

        <Text style={styles.introText} testID="page-intro-text"></Text>

        {initPageResponse && (
          <HeaderPacUserTriStateFilterList
            name="headerPacUserTriStateFilterList"
            initData={initPageResponse}
            isHeaderVisible={false}
          />
        )}

        {queryResult && (
          <ReportGridPacUserTriStateFilterList
            isSortDescending={queryResult.orderByDescending}
            items={items}
            name="reportConnectedPacUserTriStateFilterList-table"
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
          />
        )}
        {!queryResult && (
          <ReportGridPacUserTriStateFilterList
            isSortDescending={false}
            items={[]}
            name="reportConnectedPacUserTriStateFilterList-table"
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
    paddingVertical: 20, // equivalent to py="5"
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
    textAlign: 'center', // Center the text

  },
  introText: {
    fontSize: theme.fonts.mediumSize,
    marginBottom: 8,
    color: theme.Colors.text,

  },
  dropdownButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  menuOptions: {
    // padding: 10,
    // backgroundColor: 'white',
  },
});

export default ReportConnectedPacUserTriStateFilterList;

