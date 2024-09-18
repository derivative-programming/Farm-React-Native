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
import CustomMenuOption from "../../CustomMenuOption";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';  
import SortControl from '../input-fields/SortControl';
//GENTrainingBlock[visualizationTypeImports]Start
//GENLearn[visualizationType=Grid]Start
import ReportFilterLandPlantList from "../filters/LandPlantList";
import { ReportGridLandPlantList } from "../visualization/grid/LandPlantList"; 
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
    logClick("ReportConnectedLandPlantList","refresh","");

    const cleanQueryRequest = new LandPlantListReportService.QueryRequestInstance();
    cleanQueryRequest.ItemCountPerPage = query?.ItemCountPerPage ?? 10;
    cleanQueryRequest.OrderByColumnName = query?.OrderByColumnName ?? "";
    cleanQueryRequest.OrderByDescending = query?.OrderByDescending ?? false;
    setQuery({...cleanQueryRequest});
  };


  useEffect(() => {  
  }, []); 

  useFocusEffect(
    useCallback(() => { 
      LandPlantListReportService.initPage(contextCode).then((response) =>
        handleInit(response)
      );
    }, [])
  );

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

  const isBreadcrumbSectionHidden = false;
  const calculatedIsOtherButtonAvailable = true;
  const calculatedIsBackButtonAvailable = true; 
  const calculatedIsMultiSelectProcessingButtonAvailable = true; 
  const calculatedIsBreadcrumbButtonAvailable = true;
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

  const onSortChange = (columnName: string, sortDirection: 'asc' | 'desc') => { 
    logClick("ReportConnectedLandPlantList","sort",columnName);
    if(query === null){
      return;
    }
    let orderByDescending = false;
    if (sortDirection === "desc") {
      orderByDescending = true;
    }
    setQuery({
      ...query,
      OrderByColumnName: columnName,
      OrderByDescending: orderByDescending,
    });
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
    LandPlantListReportService.submitCSVRequest(query, contextCode).then((response) => { 
      //handleExportQueryResults(response);  //NOSONAR
      // const blob = new Blob([response.data], { type: "text/csv" });
      // const url = URL.createObjectURL(blob);  
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'LandPlantList-' + uuid.v4() + '.csv');
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
    { label: '', value: 'plantCode', isVisible: true },
    { label: 'Edit Allowed', value: 'isEditAllowed', isVisible: true },
    { label: 'Int Val', value: 'someIntVal', isVisible: true },
    { label: 'Conditional Int Val', value: 'someConditionalIntVal', isVisible: true },
    { label: 'Big Int Val', value: 'someBigIntVal', isVisible: true },
    { label: 'Conditional Big Int Val', value: 'someConditionalBigIntVal', isVisible: true },
    { label: 'Bit Val', value: 'someBitVal', isVisible: true },
    { label: 'Conditional Bit Val', value: 'someConditionalBitVal', isVisible: true },
    { label: 'Delete Allowed', value: 'isDeleteAllowed', isVisible: true },
    { label: 'Float Val', value: 'someFloatVal', isVisible: true },
    { label: 'Conditional Float Val', value: 'someConditionalFloatVal', isVisible: true },
    { label: 'Decimal Val', value: 'someDecimalVal', isVisible: true },
    { label: 'Conditional Decimal Val', value: 'someConditionalDecimalVal', isVisible: true },
    { label: 'Date Time Val', value: 'someUTCDateTimeVal', isVisible: true },
    { label: 'Conditional Date Time Val', value: 'someConditionalUTCDateTimeVal', isVisible: true },
    { label: 'Date Val', value: 'someDateVal', isVisible: true },
    { label: 'Conditional Date Val', value: 'someConditionalDateVal', isVisible: true },
    { label: 'Money Val', value: 'someMoneyVal', isVisible: true },
    { label: 'Conditional Money Val', value: 'someConditionalMoneyVal', isVisible: true },
    { label: 'N Var Char Val', value: 'someNVarCharVal', isVisible: true },
    { label: 'Conditional N Var Char Val', value: 'someConditionalNVarCharVal', isVisible: true },
    { label: 'Var Char Val', value: 'someVarCharVal', isVisible: true },
    { label: 'Conditional Var Char Val', value: 'someConditionalVarCharVal', isVisible: true },
    { label: 'Text Val', value: 'someTextVal', isVisible: true },
    { label: 'Conditional Text Val', value: 'someConditionalTextVal', isVisible: true },
    { label: 'Phone Number', value: 'somePhoneNumber', isVisible: true },
    { label: 'Conditional Phone Number', value: 'someConditionalPhoneNumber', isVisible: true },
    { label: 'Email Address', value: 'someEmailAddress', isVisible: true },
    { label: 'Conditional Email Address', value: 'someConditionalEmailAddress', isVisible: true },
    { label: 'Is Image Url Available', value: 'isImageUrlAvailable', isVisible: false },
    { label: 'Image Url', value: 'someImageUrlVal', isVisible: true },
    { label: 'Conditional Image Url', value: 'someConditionalImageUrl', isVisible: true },
    { label: 'Flavor Name', value: 'flavorName', isVisible: true },
    { label: 'Flavor Code', value: 'flavorCode', isVisible: false },
    { label: 'Int Conditional', value: 'someIntConditionalOnDeletable', isVisible: true },
    { label: 'N Var Char As Url', value: 'nVarCharAsUrl', isVisible: true },
    { label: 'Conditional N Var Char As Url', value: 'nVarCharConditionalAsUrl', isVisible: true },
    { label: '', value: 'updateLinkPlantCode', isVisible: false },
    { label: '', value: 'deleteAsyncButtonLinkPlantCode', isVisible: true },
    { label: '', value: 'detailsLinkPlantCode', isVisible: true },
    { label: '', value: 'testFileDownloadLinkPacCode', isVisible: true },
    { label: '', value: 'testConditionalFileDownloadLinkPacCode', isVisible: true },
    { label: '', value: 'testAsyncFlowReqLinkPacCode', isVisible: true },
    { label: '', value: 'testConditionalAsyncFlowReqLinkPacCode', isVisible: true },
    { label: '', value: 'conditionalBtnExampleLinkPlantCode', isVisible: true },
  ];

  //GENLearn[visualizationType=Grid]End
  //GENTrainingBlock[visualizationTypeFuncs]End 


  return (
    <View style={styles.container}> 
      <View style={styles.header}> 
          <View style={styles.titleContainer}>
              <Text style={styles.titleText} testID="page-title-text">Plant List</Text>
          </View> 
      </View>
      <View style={styles.header}>
          <ScreenBackButton name="back-button"
            onPress={ () => {
              logClick("ReportConnectedLandPlantList","back","");
              navigateTo("TacFarmDashboard", "tacCode");
            }}
            buttonText="Farm Dashboard" 
            isVisible={true}
            isEnabled={true} 
          /> 
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
                <CustomMenuOption value="tacFarmDashboardBreadcrumb"
                  onSelect={async () => {
                    logClick("ReportConnectedLandPlantList","tacFarmDashboardBreadcrumb","");
                    navigateTo("TacFarmDashboard", "tacCode");
                  }} 
                  text="Farm Dashboard" 
                  isButtonCallToAction={false}
                  isVisible={true}
                  isEnabled={true}
                  isButtonBadgeVisible={false} 
                />  
              </MenuOptions>
            </Menu> 
          )}

          <View style={styles.titleContainer}>
              <Text style={styles.titleText}></Text>
          </View>


          {/*//GENIF[visualizationType=Grid]Start*/} 
          {queryResult && ( 
            <SortControl
              onSortChange={onSortChange}
              availableColumns={availableColumns.filter(col => col.isVisible && col.label !== '')}
              initialSortColumn={queryResult.orderByColumnName}
              initialSortDirection={queryResult.orderByDescending ? "desc" : "asc"}
            />  
          )}
          {initialQuery && ( 
            <ReportFilterLandPlantList
              name="reportConnectedLandPlantList-filter"
              initialQuery={initialQuery}
              onSubmit={onSubmit}
              // onReset={onFilterReset}
              // isCollapsible={isFilterSectionCollapsable}
              hidden={isFilterSectionHidden} 
            /> 
          )}
          {/*//GENIF[visualizationType=Grid]End*/}
 
          <ScreenAddButton name="add-button"
            onPress={ () => {
              logClick("ReportConnectedLandPlantList","add","");
              navigateTo("LandAddPlant", "landCode");
            }}
            buttonText="Add A Plant" 
            isVisible={true}
            isEnabled={true}
          />

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
              <CustomMenuOption value="otherAddButton"
                onSelect={async () => {
                  logClick("ReportConnectedLandPlantList","otherAddButton","");
                  navigateTo("LandAddPlant", "landCode");
                }} 
                text="Other Add Button"  
                isButtonCallToAction={false}
                isVisible={true}
                isEnabled={true}
                isButtonBadgeVisible={false} 
                //GENIF[calculatedIsButtonBadgePropertyAvailable=true]Start
                buttonBadgeValue={initPageResponse?.someFilterIntVal}
                //GENIF[calculatedIsButtonBadgePropertyAvailable=true]End
              />  
              
            </MenuOptions>
          </Menu>
          )} 
          
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


export default ReportConnectedLandPlantList;
