import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from 'react-native';
 
import { useNavigation } from '@react-navigation/native';
import * as ReportService from "../services/TacFarmDashboard";
import * as InitReportService from "../services/init/TacFarmDashboardInitReport";
import { ReportDetailTwoColTacFarmDashboard } from "../visualization/detail-two-column/TacFarmDashboard";
import RootStackParamList from '../../../screens/rootStackParamList';
import { StackNavigationProp } from "@react-navigation/stack"; 
import * as theme from '../../../constants/theme'

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export interface ReportProps {
    tacCode:string; 
}

export const ReportConnectedTacFarmDashboard: FC<ReportProps> = ({
    tacCode = "00000000-0000-0000-0000-000000000000" 
  }): ReactElement => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [initPageResponse, setInitPageResponse] = useState(new InitReportService.InitResultInstance());
    const [queryResult, setQueryResult] = useState(new ReportService.QueryResultInstance()); 
    const [query, setQuery] = useState(new ReportService.QueryRequestInstance());
    const [initialValues, setInitialValues] = useState(new ReportService.QueryRequestInstance());
    const isInitializedRef = useRef(false);

    const navigation = useNavigation<ScreenNavigationProp>(); 
    const contextCode: string = tacCode ?? "00000000-0000-0000-0000-000000000000";

    const displayItem:ReportService.QueryResultItem = queryResult.items.length > 0 ?  queryResult.items[0] : new ReportService.QueryResultItemInstance();

    console.log('report ctrl tacCode...' + tacCode);

    console.log('report ctrl initial values...');
    console.log(initialValues);

    const handleInit = (responseFull: any) => {
        console.log('report ctrl handleInit...');
        
        const response: InitReportService.InitResult = responseFull.data;

        if (!response.success) {
            return;
        }
        setInitPageResponse({...response})
    }

    const handleQueryResults = (responseFull: any) => {
        const queryResult: ReportService.QueryResult = responseFull.data;
    
        console.log('report ctrl query results...');
        console.log(responseFull); 

        if (!queryResult.success) {
            return;
        }

        setQueryResult({ ...queryResult });
    }

    const onSubmit = (queryRequest: ReportService.QueryRequest) => { 
        console.log('report ctrl onSubmit...');
        setQuery({ ...queryRequest });
    }

    const onPageSelection = (pageNumber: number) => { 
        setQuery({ ...query, pageNumber: pageNumber });
    }


    const onPageSizeChange = (pageSize: number) => { 
        setQuery({ ...query, ItemCountPerPage: pageSize, pageNumber: 1 });
    }

    const onRowSelect = (index: number) => {
    }

    const onRowUnselect = (index: number) => {
    }

    const onSelectAll = () => {
    }

    const onUnselectAll = () => {
    }

    const onNavigateTo = (page: string,targetContextCode:string) => { 
        console.log('onNavigateTo...');
        console.log('page...' + page);
        console.log('targetContextCode...' + targetContextCode);
        navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
    };
    
    const navigateTo = (page: string, codeName:string) => { 
        console.log('navigateTo...');
        console.log('page...' + page);
        console.log('codeName...' + codeName);
        let targetContextCode = contextCode; 
        Object.entries(initPageResponse)
        .forEach(([key, value]) => { 
            if(key === codeName)
            {
                if(value !== ''
                    && value !== '00000000-0000-0000-0000-000000000000') {
                    targetContextCode = value;
                } else {
                    return;
                }
            }
        })
        console.log('targetContextCode...' + targetContextCode);
        navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
    }

    const onSort = (columnName: string) => {
        let orderByDescending = false;
        if (query.OrderByColumnName === columnName) {
            orderByDescending = !query.OrderByDescending;
        } 
        setQuery({ ...query, OrderByColumnName: columnName, OrderByDescending: orderByDescending })
    }

    const onRefreshRequest =() => { 
        console.log('report ctrl onRefreshRequest...');
        setQuery({ ...query});
    }

    useEffect(() => {
        console.log('report ctrl initial effect...');
        if (isInitializedRef.current) {
            return;
        }
        isInitializedRef.current = true;
        ReportService.initPage(contextCode)
            .then(response => handleInit(response));
    },[]);

    useEffect(() => {
        console.log('report ctrl init request...');
        const newInitalValues = ReportService.buildQueryRequest(initPageResponse);   
        setInitialValues({ ...newInitalValues });
    }, [initPageResponse]); 
    

    useEffect(() => { 
        console.log('report ctrl initialvalues effect...');
        if(JSON.stringify(initialValues) !== JSON.stringify(query)){ 
            setQuery({ ...initialValues });
        }
    }, [initialValues]); 

    useEffect(() => { 

        console.log('report ctrl query...');
        console.log(query);
    
        ReportService.submitRequest(query, contextCode)
            .then(response => handleQueryResults(response));
    }, [query]); 

    return ( 
        <View style={styles.container}testID="reportConnectedTacFarmDashboard">
            <View style={styles.formContainer}> 
                <Text style={styles.titleText} testID="page-title-text">Farm Dashboard</Text>
                <Text style={styles.introText} testID="page-intro-text">Farm Dashboard page intro text</Text>  
                {/*//GENTrainingBlock[visualizationType]Start*/}
                {/*//GENLearn[visualizationType=DetailTwoColumn]Start*/}
                <ReportDetailTwoColTacFarmDashboard 
                    item= {displayItem}
                    name="reportConnectedTacFarmDashboard-table" 
                    onNavigateTo={onNavigateTo} 
                    onRefreshRequest={onRefreshRequest}
                /> 
                {/*//GENLearn[visualizationType=DetailTwoColumn]End*/}
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
    formContainer: {
      width: '90%',
      // Add other styles as needed
    },
    titleText: {
      fontSize: theme.fonts.largeSize, 
      marginBottom: 8,    
      color: theme.Colors.text,
      textAlign: 'center', // Center the text
      // Add other styles as needed
    },
    introText: {
      fontSize: theme.fonts.mediumSize, 
      marginBottom: 8,    
      color: theme.Colors.text,
      // Add other styles as needed
    }, 
  });
  
export default ReportConnectedTacFarmDashboard;
