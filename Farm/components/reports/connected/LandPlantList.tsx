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
import * as LandPlantListReportService from "../services/LandPlantList";
import * as InitReportService from "../services/init/LandPlantListInitReport";
import HeaderLandPlantList from "../headers/LandPlantListInitReport";
import * as ReportInput from "../input-fields"; 
import useAnalyticsDB from "../../../hooks/useAnalyticsDB"; 
import uuid from 'react-native-uuid';
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenBackButton } from "../../ScreenBackButton";
import RootStackParamList from "../../../screens/rootStackParamList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as theme from '../../../constants/theme'
import { ScreenAddButton } from "../../ScreenAddButton";  
import Icon from 'react-native-vector-icons/Ionicons'; 
//GENTrainingBlock[visualizationTypeImports]Start
//GENLearn[visualizationType=Grid]Start
import ReportFilterLandPlantList from "../filters/LandPlantList";
import { ReportGridLandPlantList } from "../visualization/grid/LandPlantList";
import { v4 as uuidv4 } from "uuid";
//GENLearn[visualizationType=Grid]End
//GENTrainingBlock[visualizationTypeImports]End

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
 
export interface ReportProps {
  landCode:string; 
}

export const ReportConnectedLandPlantList: FC<ReportProps> = ({
  landCode = "00000000-0000-0000-0000-000000000000" 
}): ReactElement => {
  const isFilterPersistant  = false;

  const [items, setItems] = useState<LandPlantListReportService.EnhancedQueryResultItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false); 
  const [initPageResponse, setInitPageResponse] = useState<InitReportService.InitResult | null>(null);
 
  
  const [queryResult, setQueryResult] = useState<LandPlantListReportService.QueryResult | null>(null);
 
  const [query, setQuery] = useState<LandPlantListReportService.QueryRequest | null>(null);
 
  const [initialQuery, setInitialQuery] = useState<LandPlantListReportService.QueryRequest | null>(null);

  const [displayItem, setDisplayItem] = useState<LandPlantListReportService.QueryResultItem | null>(null);
  
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isInitializedRef = useRef(false);
  const { logClick } = useAnalyticsDB();
  //GENTrainingBlock[visualizationTypeInit]Start
  //GENLearn[visualizationType=Grid]Start
    const [exportQuery, setExportQuery] = useState(new LandPlantListReportService.QueryRequestInstance());
  //GENLearn[visualizationType=Grid]End
  //GENTrainingBlock[visualizationTypeInit]End

  const navigation = useNavigation<ScreenNavigationProp>(); 
  const contextCode: string = landCode ?? "00000000-0000-0000-0000-000000000000";

 

  const handleInit = (responseFull: InitReportService.ResponseFull) => {
    const response: InitReportService.InitResult = responseFull.data;

    if (!response.success) {
      return;
    }
    setInitPageResponse({ ...response });
  };

  const handleQueryResults = (responseFull: LandPlantListReportService.ResponseFull) => {
    const queryResult: LandPlantListReportService.QueryResult = responseFull.data;

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

  const onNavigateTo = (page: string,targetContextCode:string) => { 
    console.log('onNavigateTo...');
    console.log('page...' + page);
    console.log('targetContextCode...' + targetContextCode);
    navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
  };

  const onRefreshRequest = () => {
    logClick("ReportConnectedLandPlantList","refresh","");

    const cleanrQueryRequest = new LandPlantListReportService.QueryRequestInstance();
    cleanrQueryRequest.ItemCountPerPage = query?.ItemCountPerPage ?? 10;
    cleanrQueryRequest.OrderByColumnName = query?.OrderByColumnName ?? "";
    cleanrQueryRequest.OrderByDescending = query?.OrderByDescending ?? false;
    setQuery(cleanrQueryRequest);
  };


  useEffect(() => { 
    if (isInitializedRef.current) { 
      return;
    } 
    isInitializedRef.current = true;
    LandPlantListReportService.initPage(contextCode).then((response) =>
      handleInit(response)
    );
  }, []);

  useEffect(() => { 
    if(initPageResponse === null){
      return;
    }
    
    const loadAsyncData = async () => {
      let queryRequest = LandPlantListReportService.buildQueryRequest(initPageResponse);  
  
      // Check if persistence is enabled and if there is a saved filter
      if (isFilterPersistant) {
        const savedFilter = await AsyncStorage.getItem("LandPlantListFilter"); 
  
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
    const loadAsyncData = async () => {
      if (JSON.stringify(initialQuery) !== JSON.stringify(query)) { 
        const pageSize = await AsyncStorage.getItem("pageSize");
        if(pageSize !== null)
        { 
          initialQuery.ItemCountPerPage = parseInt(pageSize);
        } 
        setQuery({ ...initialQuery });
      }
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
    LandPlantListReportService.submitRequest(query, contextCode).then((response) =>
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
 
    const item = queryResult.items.length > 0 ?  queryResult.items[0] : new LandPlantListReportService.QueryResultItemInstance();
    
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
  //GENTrainingBlock[visualizationTypeFuncs]Start
  //GENLearn[visualizationType=Grid]Start
  const isRefreshButtonHidden = false;
  const isPagingAvailable = true;
  const isExportButtonsHidden = false;
  const isFilterSectionHidden = false;
  const isFilterSectionCollapsable = true;
   

  const onSubmit = async (queryRequest: LandPlantListReportService.QueryRequest) => {
    logClick("ReportConnectedLandPlantList","search","");
    
    if(isFilterPersistant ){
      await AsyncStorage.setItem("LandPlantListFilter",JSON.stringify(queryRequest)); 
    }
     
    queryRequest.ItemCountPerPage = query?.ItemCountPerPage ?? 10;
    queryRequest.OrderByColumnName = query?.OrderByColumnName ?? "";
    queryRequest.OrderByDescending = query?.OrderByDescending ?? false;
    setQuery({ ...queryRequest });
  };

  const onFilterReset = async () => {
    logClick("ReportConnectedLandPlantList","reset filter","");
    const clearQuery = new LandPlantListReportService.QueryRequestInstance();
    if(isFilterPersistant ){
      await AsyncStorage.setItem("LandPlantListFilter",JSON.stringify(clearQuery));
    }
    setInitialQuery({...clearQuery});
  };

  const onPageSelection = (pageNumber: number) => {
    logClick("ReportConnectedLandPlantList","selectPage",pageNumber.toString());
    if(query === null){
      return;
    }
    setQuery({ ...query, pageNumber: pageNumber });
  };

  const onPageSizeChange = async (pageSize: number) => {
    logClick("ReportConnectedLandPlantList","pageSizeChange",pageSize.toString());  
    if(query === null){
      return;
    }
    await AsyncStorage.setItem("pageSize",pageSize.toString());
    setQuery({ ...query, ItemCountPerPage: pageSize, pageNumber: 1 });
  };

  const onSort = (columnName: string) => { 
    logClick("ReportConnectedLandPlantList","sort",columnName);
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
    logClick("ReportConnectedLandPlantList","export","");
    if(query === null){
      return;
    }
    if(isProcessing){
      return;
    } 
    setExportQuery({ ...query });
  };
  
  const handleExportQueryResults = (responseFull: LandPlantListReportService.ResponseFull) => { // NOSONAR
    const queryResult: LandPlantListReportService.QueryResult = responseFull.data;

    if (!queryResult.success) {
      return;
    } 
  };
  
  useEffect(() => {   
    if (!isInitializedRef.current) {
      return;
    } 
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
    LandPlantListReportService.submitCSVRequest(query, contextCode).then((response) => { 
      //handleExportQueryResults(response);  //NOSONAR
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = URL.createObjectURL(blob);  
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'LandPlantList-' + uuidv4() + '.csv');
      document.body.appendChild(link);
      link.click();
    })
    .finally(() => {setIsProcessing(false);});
  }, [exportQuery]);

  //GENLearn[visualizationType=Grid]End
  //GENTrainingBlock[visualizationTypeFuncs]End

  
  const onRefresh = () => {
    onPageSelection(1);
  };

  const onEndReached = () => {
    if (queryResult && !loadingMore) {
      onPageSelection(queryResult.pageNumber + 1);
    }
  };

  return (
    <View style={styles.container}> 
      <View style={styles.header}>
          <ScreenBackButton name="back-button"
            onPress={async () => {
              await logClick("ReportConnectedLandPlantList","back","");
              navigateTo("TacFarmDashboard", "tacCode");
            }}
            buttonText="Farm Dashboard" 
            isVisible={true}
            isEnabled={true} 
          /> 

          <View style={styles.titleContainer}>
              <Text style={styles.titleText} testID="page-title-text">Plant List</Text>
          </View>
          
          <ScreenAddButton name="add-button"
            onPress={async () => {
              await logClick("ReportConnectedLandPlantList","add","");
              navigateTo("LandAddPlant", "landCode");
            }}
            buttonText="Add A Plant" 
            isVisible={true}
            isEnabled={true}
          /> 
      </View>
      <View style={styles.formContainer}>
       
        <Text style={styles.introText} testID="page-intro-text">A list of plants on the land</Text> 
        

        {initPageResponse && (
          <HeaderLandPlantList  
            name="headerLandPlantList"
            initData={initPageResponse}
            isHeaderVisible={true}
          />
        )}

{/* 
          
        <View className="col-12 d-flex flex-column flex-md-row justify-content-between"> 
          <View className="d-flex flex-column flex-md-row">
            <View className="mb-2 mb-md-0">
              <ReportInput.ReportInputButton name="otherAddButton"
                onPress={async () => {
                  await logClick("ReportConnectedLandPlantList","otherAddButton","");
                  navigateTo("LandAddPlant", "landCode");
                }}
                buttonText="Other Add Button"
                isButtonCallToAction={false}
                isVisible={true}
                isEnabled={true}
              />
            </View> 
          </View>
        </View> 
         */}
        
        {/* <ReportFilterLandPlantList
          name="reportConnectedLandPlantList-filter"
          initialQuery={initialValues}
          onSubmit={onSubmit}
          isCollapsible={isFilterSectionCollapsable}
          hidden={isFilterSectionHidden} 
        /> 
        */} 

        {/*//GENTrainingBlock[visualizationType]Start*/}
        {/*//GENLearn[visualizationType=Grid]Start*/}
        {queryResult && (
          <ReportGridLandPlantList
            isSortDescending={queryResult.orderByDescending}
            items={items}
            name="reportConnectedLandPlantList-table"
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
          <ReportGridLandPlantList
            isSortDescending={false}
            items={[]}
            name="reportConnectedLandPlantList-table"
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
        {/*//GENLearn[visualizationType=Grid]End*/}
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


export default ReportConnectedLandPlantList;
