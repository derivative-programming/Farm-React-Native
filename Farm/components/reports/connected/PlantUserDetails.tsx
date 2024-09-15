import React, {
    FC,
    ReactElement,
    useContext,
    useState,
    useEffect,
    useRef,
  } from "react";
  import { Button, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import ReportFilterPlantUserDetails from "../filters/PlantUserDetails";
  import { ReportGridPlantUserDetails } from "../visualization/grid/PlantUserDetails";
  import { ReportDetailThreeColPlantUserDetails } from "../visualization/detail-three-column/PlantUserDetails";
  import { ReportDetailTwoColPlantUserDetails } from "../visualization/detail-two-column/PlantUserDetails";
  import * as ReportService from "../services/PlantUserDetails";
  import * as InitReportService from "../services/init/PlantUserDetailsInitReport";
  import HeaderPlantUserDetails from "../headers/PlantUserDetailsInitReport";
  import * as ReportInput from "../input-fields";
  import useAnalyticsDB from "../../../hooks/useAnalyticsDB";
  import uuid from 'react-native-uuid';
  import { StackNavigationProp } from "@react-navigation/stack";
  import RootStackParamList from "../../../screens/rootStackParamList";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import * as theme from '../../../constants/theme'
  import Icon from 'react-native-vector-icons/Ionicons';
  import { ScreenBackButton } from "../../ScreenBackButton";
  import { ScreenAddButton } from "../../ScreenAddButton";  
  //GENTrainingBlock[visualizationTypeImports]Start
  //GENLearn[visualizationType=DetailThreeColumn]Start 
  //GENLearn[visualizationType=DetailThreeColumn]End
  //GENTrainingBlock[visualizationTypeImports]End
  
  
  type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
  export interface ReportProps {
    plantCode:string;
  }
  export const ReportConnectedPlantUserDetails: FC<ReportProps> = ({
    plantCode = "00000000-0000-0000-0000-000000000000"
  }): ReactElement => {
    const [items, setItems] = useState<ReportService.EnhancedQueryResultItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [isProcessing, setIsProcessing] = useState(false);
    const [initPageResponse, setInitPageResponse] = useState(
      new InitReportService.InitResultInstance()
    );
    const [queryResult, setQueryResult] = useState(
      new ReportService.QueryResultInstance()
    );
    const [query, setQuery] = useState(new ReportService.QueryRequestInstance());
    const [exportQuery, setExportQuery] = useState(new ReportService.QueryRequestInstance());
    const [initialValues, setInitialValues] = useState(
      new ReportService.QueryRequestInstance()
    );
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const isInitializedRef = useRef(false);
    const { logClick } = useAnalyticsDB();
      
    //GENTrainingBlock[visualizationTypeInit]Start
    //GENLearn[visualizationType=DetailThreeColumn]Start
    //GENLearn[visualizationType=DetailThreeColumn]End
    //GENTrainingBlock[visualizationTypeInit]End


    //GENTrainingBlock[visualizationTypeFuncs]Start
    //GENLearn[visualizationType=DetailThreeColumn]Start
    //GENLearn[visualizationType=DetailThreeColumn]End
    //GENTrainingBlock[visualizationTypeFuncs]End

    const isRefreshButtonHidden = true;
    const isPagingAvailable = false;
    const isExportButtonsHidden = true;
    const isFilterSectionHidden = true;
    const isFilterSectionCollapsable = false;
    const isBreadcrumbSectionHidden = false;
    const isButtonDropDownAllowed = true;
    const navigation = useNavigation<ScreenNavigationProp>();
    const contextCode: string = plantCode ?? "00000000-0000-0000-0000-000000000000";
    const displayItem:ReportService.QueryResultItem = queryResult.items.length > 0 ?  queryResult.items[0] : new ReportService.QueryResultItemInstance();
    // console.log('report ctrl plantCode...' + plantCode);
    // console.log('report ctrl initial values...');
    // console.log(initialValues);
    const handleInit = (responseFull: any) => {
      const response: InitReportService.InitResult = responseFull.data;
      if (!response.success) {
        return;
      }
      setInitPageResponse({ ...response });
    };
    const handleQueryResults = (responseFull: any) => {
      const queryResult: ReportService.QueryResult = responseFull.data;
      console.log('report ctrl query results...');
      console.log('success:' + queryResult.success);
      console.log('pageNumber:' + queryResult.pageNumber);
      console.log('itemCountPerPage:' + queryResult.itemCountPerPage);
      console.log('total count:' + queryResult.recordsTotal);
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
        setItems(enhancedItems);
      }
      else{
        console.log('set items page ' + queryResult.pageNumber);
        setItems([...items, ...enhancedItems]);
      }
    };
    const handleExportQueryResults = (responseFull: any) => {
      const queryResult: ReportService.QueryResult = responseFull.data;
      if (!queryResult.success) {
        return;
      }
    };
    const onSubmit = async (queryRequest: ReportService.QueryRequest) => {
      await logClick("ReportConnectedPlantUserDetails","search","");
      setQuery({ ...queryRequest });
    };
    const onPageSelection = async (pageNumber: number) => {
      await logClick("ReportConnectedPlantUserDetails","selectPage",pageNumber.toString());
      setQuery({ ...query, pageNumber: pageNumber });
    };
    const onPageSizeChange = async (pageSize: number) => {
      await logClick("ReportConnectedPlantUserDetails","pageSizeChange",pageSize.toString());
      await AsyncStorage.setItem("pageSize",pageSize.toString());
      setQuery({ ...query, ItemCountPerPage: pageSize, pageNumber: 1 });
    };
    const onNavigateTo = (page: string,targetContextCode:string) => {
      console.log('onNavigateTo...');
      console.log('page...' + page);
      console.log('targetContextCode...' + targetContextCode);
      navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
    };
    const navigateTo = (page: string, codeName: string) => {
      console.log('navigateTo...');
      console.log('page...' + page);
      console.log('codeName...' + codeName);
      let targetContextCode = contextCode;
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
    const onRefreshRequest = async () => {
      await logClick("ReportConnectedPlantUserDetails","refresh","");
      setQuery({ ...query });
    };
    const onSort = async (columnName: string) => {
      await logClick("ReportConnectedPlantUserDetails","sort",columnName);
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
    const onExport = async () => {
      await logClick("ReportConnectedPlantUserDetails","export","");
      if(isProcessing){
        return;
      }
      setExportQuery({ ...query });
    };
    useEffect(() => {
      if (isInitializedRef.current) {
        return;
      }
      isInitializedRef.current = true;
      ReportService.initPage(contextCode).then((response) =>
        handleInit(response)
      );
    }, []);
    useEffect(() => {
      const newInitalValues = ReportService.buildQueryRequest(initPageResponse);
      setInitialValues({ ...newInitalValues, ItemCountPerPage: pageSize });
    }, [initPageResponse]);
    useEffect(() => {
      const fetchData = async () => {
        if (JSON.stringify(initialValues) !== JSON.stringify(query)) {
            // Use await for AsyncStorage
            let pageSize = await AsyncStorage.getItem("pageSize");
            if (pageSize !== null) {
                initialValues.ItemCountPerPage = parseInt(pageSize);
            }
            setQuery({ ...initialValues });
        }
      };
      fetchData();
    }, [initialValues]);
    useEffect(() => {
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
      ReportService.submitRequest(query, contextCode).then((response) =>
        handleQueryResults(response)
      )
      .finally(() => {
        setIsProcessing(false);
        setRefreshing(false);
        setLoadingMore(false);
      });
    }, [query]);
    useEffect(() => {
      if (!isInitializedRef.current) {
        return;
      }
      if(!queryResult.success){
        return;
      }
      setIsProcessing(true);
      ReportService.submitCSVRequest(query, contextCode).then((response) => {
        //handleExportQueryResults(response);
        const blob = new Blob([response.data], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        // link.href = url;
        link.setAttribute('download', 'PlantUserDetails-' + uuid.v4() + '.csv');
        document.body.appendChild(link);
        link.click();
      })
      .finally(() => {setIsProcessing(false);});
    }, [exportQuery]);
    const onRefresh = () => {
      onPageSelection(1);
    };
    const onEndReached = () => {
      if (!loadingMore) {
        onPageSelection(queryResult.pageNumber + 1);
      }
    };
    return (
      
      <View style={styles.container}>
        <View style={styles.header}>
            <ScreenBackButton name="back-button"
              onPress={async () => {
                await logClick("ReportConnectedPlantUserDetails","back","");
                navigateTo("LandPlantList", "landCode");
              }}
              buttonText="Plant List"
              isVisible={true}
              isEnabled={true}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.titleText} testID="page-title-text">Plant Details</Text>
            </View>
  
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.introText} testID="page-intro-text">Plant Details page intro text</Text>
          <HeaderPlantUserDetails
            name="headerPlantUserDetails"
            initData={initPageResponse}
            isHeaderVisible={false}
          />
          {/*//GENTrainingBlock[visualizationType]Start*/}
          {/*//GENLearn[visualizationType=DetailThreeColumn]Start*/}
          <ScrollView>
            <ReportDetailThreeColPlantUserDetails 
                item= {displayItem}
                name="reportConnectedPlantUserDetails-table" 
                onNavigateTo={onNavigateTo} 
                onRefreshRequest={onRefreshRequest}
                showProcessing={isProcessing}
            /> 
          </ScrollView>
          {/*//GENLearn[visualizationType=DetailThreeColumn]End*/}
          {/*//GENTrainingBlock[visualizationType]End*/}
      
        </View>
    </View>
  );
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
  backButton: {
      paddingLeft: 10,
      // alignSelf: 'flex-start', // Align button to the left
      // flexDirection: 'row',
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
});
export default ReportConnectedPlantUserDetails;

