import React, { FC, ReactElement, useState, useEffect, useRef } from "react";
import { Card, Breadcrumb, Container, View } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import * as ReportService from "../services/PlantUserDetails";
import * as ReportInput from "../input-fields";
import * as InitReportService from "../services/init/PlantUserDetailsInitReport"; 
import { ReportDetailThreeColPlantUserDetails } from "../visualization/detail-three-column/PlantUserDetails";
import useAnalyticsDB from "../../../hooks/useAnalyticsDB"; 
import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamList from "../../../screens/rootStackParamList";
import * as theme from '../../../constants/theme'

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export interface ReportProps {
    plantCode:string; 
}

export const ReportConnectedPlantUserDetails: FC<ReportProps> = ({
    plantCode = "00000000-0000-0000-0000-000000000000" 
  }): ReactElement => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [initPageResponse, setInitPageResponse] = useState(new InitReportService.InitResultInstance());
    const [queryResult, setQueryResult] = useState(new ReportService.QueryResultInstance()); 
    const [query, setQuery] = useState(new ReportService.QueryRequestInstance());
    const [initialValues, setInitialValues] = useState(new ReportService.QueryRequestInstance());
    const isInitializedRef = useRef(false);
    const { logClick } = useAnalyticsDB();

    const navigation = useNavigation<ScreenNavigationProp>();
     
    const contextCode: string = plantCode ?? "00000000-0000-0000-0000-000000000000";

    const displayItem:ReportService.QueryResultItem = queryResult.items.length > 0 ?  queryResult.items[0] : new ReportService.QueryResultItemInstance();

    console.log('report ctrl plantCode...' + plantCode);

    console.log('report ctrl initial values...');
    console.log(initialValues);

    const handleInit = (responseFull: any) => {
        
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
        setQuery({ ...query});
    }

    useEffect(() => {
        if (isInitializedRef.current) {
            return;
        }
        isInitializedRef.current = true;
        ReportService.initPage(contextCode)
            .then(response => handleInit(response));
    },[]);

    useEffect(() => {
        const newInitalValues = ReportService.buildQueryRequest(initPageResponse);   
        setInitialValues({ ...newInitalValues });
    }, [initPageResponse]); 
    

    useEffect(() => { 
        if(JSON.stringify(initialValues) !== JSON.stringify(query)){ 
            setQuery({ ...initialValues });
        }
    }, [initialValues]); 

    useEffect(() => { 

        console.log('report ctrl query...');
        console.log(query);
    
        setIsProcessing(true);
        ReportService.submitRequest(query, contextCode)
            .then(response => handleQueryResults(response))
            .finally(() => {setIsProcessing(false);});
    }, [query]); 

    return (

        <View style={styles.container}>
        <View style={styles.formContainer}>
                    <Container>  
                        <View className="d-flex w-100 justify-content-center justify-content-md-start">
                            <ReportInput.ReportInputButton
                                name="back-button"
                                onPress={async () => {
                                    await logClick("ReportConnectedPlantUserDetails","back","");
                                    navigateTo("LandPlantList","landCode")
                                }}
                                buttonText={<><ArrowLeft className="mb-1"/> Plant List</>} 
                                isButtonCallToAction={false}
                                isVisible={true}
                                isEnabled={true}
                            />
                        </View>  
                    </Container>  
                    {/*//GENTrainingBlock[visualizationType]Start*/}
                    {/*//GENLearn[visualizationType=DetailThreeColumn]Start*/}
                    {/* <ReportDetailThreeColPlantUserDetails 
                        item= {displayItem}
                        name="reportConnectedPlantUserDetails-table" 
                        onNavigateTo={onNavigateTo} 
                        onRefreshRequest={onRefreshRequest}
                        showProcessing={isProcessing}
                    />  */}
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
