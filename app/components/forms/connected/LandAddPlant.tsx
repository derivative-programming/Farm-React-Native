import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";  
import { Formik, FormikHelpers } from "formik";
import { useNavigation } from '@react-navigation/native';
import * as LandAddPlantFormService from "../services/LandAddPlant";
import * as LandAddPlantFormValidation from "../validation/LandAddPlant";
import * as InitFormService from "../services/init/LandAddPlantInitObjWF";
import HeaderLandAddPlant from "../headers/LandAddPlantInitObjWF";
import { AuthContext } from "../../../context/authContext"; 
import * as InputFields from "../input-fields";
import * as Lookups from "../lookups";
import useAnalyticsDB from "../../../hooks/useAnalyticsDB"; 
import * as AnalyticsService from "../../services/analyticsService";
import { Text,  StyleSheet, View, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamList from "../../../screens/rootStackParamList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as theme from '../../../constants/theme'
import SpinnerComponent from "../../SpinnerComponent";

export interface FormProps {
  landCode:string;
  name?: string;
  showProcessingAnimationOnInit?: boolean;
} 

interface FormErrors {
  [key: string]: string;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const FormConnectedLandAddPlant: FC<FormProps> = ({
  landCode = "00000000-0000-0000-0000-000000000000",
  name = "formConnectedLandAddPlant",
  showProcessingAnimationOnInit = true,
}): ReactElement => {
  const [initPageResponse, setInitPageResponse] = useState<InitFormService.InitResult | null>(null);
  const [initialValues, setInitialValues] = useState<LandAddPlantFormService.SubmitRequest | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [initForm, setInitForm] = useState(showProcessingAnimationOnInit);
  const initHeaderErrors: string[] = [];
  const [headerErrors, setHeaderErrors] = useState(initHeaderErrors);
  const { logClick } = useAnalyticsDB();

  const navigation = useNavigation<ScreenNavigationProp>();

  let lastApiSubmissionRequest = new LandAddPlantFormService.SubmitRequestInstance();
  let lastApiSubmissionResponse = new LandAddPlantFormService.SubmitResultInstance(); 
  const isInitializedRef = useRef(false);
 
  const contextCode: string = landCode ?? "00000000-0000-0000-0000-000000000000";
  const contextObjectName = "land";

  const isAutoSubmit = false;

  const validationSchema = LandAddPlantFormValidation.buildValidationSchema();

  const authContext = useContext(AuthContext);  // NOSONAR

  const handleInit = (responseFull: InitFormService.ResponseFull) => {
    const response: InitFormService.InitResult = responseFull.data;

    if (!response.success) {
      setHeaderErrors(["An unexpected error occurred."]);
      return;
    }

    setInitPageResponse({ ...response }); 
  };

  const handleValidate = async (values: LandAddPlantFormService.SubmitRequest) => {
    const errors: FormErrors  = {};
    if (!lastApiSubmissionResponse.success) {
      setHeaderErrors(LandAddPlantFormService.getValidationErrors(
        "",
        lastApiSubmissionResponse
      ));
      Object.entries(values).forEach(([key, value]) => {
        const fieldErrors: string = LandAddPlantFormService.getValidationErrors(
          key,
          lastApiSubmissionResponse
        ).join(",");
        const requestKey = key as unknown as keyof LandAddPlantFormService.SubmitRequest;
        if (fieldErrors.length > 0 && value === lastApiSubmissionRequest[requestKey]) {
          errors[key] = fieldErrors;
        }
      });
    }
    return errors;
  };

  const submitClick = async (
    values: LandAddPlantFormService.SubmitRequest,
    actions: FormikHelpers<LandAddPlantFormService.SubmitRequest>
  ) => {
    try {
      setLoading(true);
      logClick("FormConnectedLandAddPlant","submit","");
      const responseFull: LandAddPlantFormService.ResponseFull = await LandAddPlantFormService.submitForm(
        values,
        contextCode
      );
      const response: LandAddPlantFormService.SubmitResult = responseFull.data;
      lastApiSubmissionRequest = { ...values };
      lastApiSubmissionResponse = { ...response };
      if (!response.success) {
        setHeaderErrors(LandAddPlantFormService.getValidationErrors("", response));
        Object.entries(new LandAddPlantFormService.SubmitRequestInstance()).forEach(
          ([key]) => {
            const fieldErrors: string = LandAddPlantFormService.getValidationErrors(
              key,
              response
            ).join(",");
            actions.setFieldError(key, fieldErrors);
          }
        );
        return;
      }
      {/*//GENTrainingBlock[caseGetApiKey]Start*/}
      {/*//GENLearn[isLoginPage=false]Start*/}
      {/*//GENLearn[isLoginPage=false]End*/}
      {/*//GENTrainingBlock[caseGetApiKey]End*/} 
      actions.setSubmitting(false);
      actions.resetForm();
      submitNavigateTo("LandPlantList","landCode"); //submitButton 
    } catch (error) {
      actions.setSubmitting(false);
    }
    finally {
      setLoading(false);
    }
  };
   
  const autoSubmit = async (
    values: LandAddPlantFormService.SubmitRequest
  ) => {
    try {  
      const responseFull: LandAddPlantFormService.ResponseFull = await LandAddPlantFormService.submitForm(
        values,
        contextCode
      );
      const response: LandAddPlantFormService.SubmitResult = responseFull.data;
      lastApiSubmissionRequest = { ...values };
      lastApiSubmissionResponse = { ...response };
      if (!response.success) {
        //click cancel
      } else {
        //possible relogin
        //GENIF[isLoginPage=true]Start
        authContext.startSession(response); 
        AnalyticsService.start();
        //GENIF[isLoginPage=true]End
      }
    } catch (error) {
      //click cancel
    }  
    
    //GENINCLUDEFILE[GENVALPascalName.autosubmit.include.*]
  };


  useEffect(() => {
    if (isInitializedRef.current) {
      return;
    }
    isInitializedRef.current = true;
    LandAddPlantFormService.initForm(contextCode)
      .then((response) => handleInit(response)) 
      .finally(() => {setInitForm(false)});
  }, []);

  useEffect(() => {
    if(initPageResponse === null){
      return;
    }
    const newInitalValues = LandAddPlantFormService.buildSubmitRequest(initPageResponse);
    //GENIF[isAutoSubmit=true]Start
    if(isAutoSubmit){
      autoSubmit(newInitalValues);
    }
    //GENIF[isAutoSubmit=true]End
    //GENIF[isAutoSubmit=false]Start
    setInitialValues({ ...newInitalValues });
    //GENIF[isAutoSubmit=false]End
  }, [initPageResponse]);
  
  useEffect(() => {
    
  }, [initForm]);
  
  useEffect(() => {
  }, [initialValues]);

  const submitNavigateTo = (page:string, codeName:string) => { 
    console.log('submitNavigateTo...');
    console.log('page...' + page);
    console.log('codeName...' + codeName);
    let targetContextCode = "00000000-0000-0000-0000-000000000000";
    if(codeName == contextObjectName + "Code")
    {
      targetContextCode = contextCode;
    }
    if(initPageResponse !== null){
      Object.entries(initPageResponse).forEach(([key, value]) => {
        if (key === codeName) {
          if (value !== "" && value !== "00000000-0000-0000-0000-000000000000") {
            targetContextCode = value;
          }
        }
      });
    }
    Object.entries(lastApiSubmissionResponse).forEach(([key, value]) => {
      if (key === codeName) {
        if (value !== "" && value !== "00000000-0000-0000-0000-000000000000") {
          targetContextCode = value;
        }
      }
    });
    console.log('targetContextCode...' + targetContextCode);
    navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
  };
  const navigateTo = (page: string, codeName: string) => {
    console.log('navigateTo...');
    console.log('page...' + page);
    console.log('codeName...' + codeName);
    let targetContextCode = contextCode;
    if(initPageResponse !== null){
      Object.entries(initPageResponse).forEach(([key, value]) => {
        if (key === codeName) {
          if (value !== "" && value !== "00000000-0000-0000-0000-000000000000") {
            targetContextCode = value;
          } else {
            return;
          }
        }
      });
    }
    console.log('targetContextCode...' + targetContextCode);
    navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
  };
  
  return ( 
    
    <View style={styles.container} testID={name}>
      <View style={styles.formContainer}>
        <Text style={styles.titleText} testID="page-title-text">Add Plant Add plant form title text</Text>
        <Text style={styles.introText} testID="page-intro-text">Add plant intro text.Add plant form intro text</Text>

        {initPageResponse && (
          <HeaderLandAddPlant
            name="headerLandAddPlant"
            initData={initPageResponse}
            isHeaderVisible={true}
          />
        )}
        
        {!initialValues && (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
        <ScrollView>
          {initialValues && (
            <Formik  
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                await submitClick(values, actions);
                actions.setSubmitting(false); // Turn off submitting state
              }}
            >
              {({ handleSubmit, handleReset, isSubmitting }) => (
                <View>
                  {initForm && showProcessingAnimationOnInit ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    <>
                      <InputFields.ErrorDisplay
                          name="headerErrors"
                          errorArray={headerErrors}
                        />
                        <Lookups.FormSelectFlavor name="requestFlavorCode"
                          label="Select A Flavor"
                          isVisible={true}
                          isRequired={true}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputText name="requestOtherFlavor"
                          label="Other Flavor"
                          isVisible={true}
                          isRequired={false}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputNumber name="requestSomeIntVal"
                          label="Some Int Val"
                          isVisible={true}
                          isRequired={true}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputNumber name="requestSomeBigIntVal"
                          label="Some Big Int Val"
                          isVisible={true}
                          isRequired={true}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputCheckbox name="requestSomeBitVal"
                          label="Some Bit Val"
                          isVisible={true}
                          isRequired={true}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputCheckbox name="requestIsEditAllowed"
                          label="Is Edit Allowed"
                          isVisible={true}
                          isRequired={false}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputCheckbox name="requestIsDeleteAllowed"
                          label="Is Delete Allowed"
                          isVisible={true}
                          isRequired={false}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputNumber name="requestSomeFloatVal"
                          label="Some Float Val"
                          isVisible={true}
                          isRequired={true}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputNumber name="requestSomeDecimalVal"
                          label="Some Decimal Val"
                          isVisible={true}
                          isRequired={true}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputDateTime name="requestSomeUTCDateTimeVal"
                          label="Some UTC Date Time Val"
                          isVisible={true}
                          isRequired={true}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputDate name="requestSomeDateVal"
                          label="Some Date Val"
                          isVisible={true}
                          isRequired={true}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputMoney name="requestSomeMoneyVal"
                          label="Some Money Val"
                          isVisible={true}
                          isRequired={true}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputText name="requestSomeNVarCharVal"
                          label="Some N Var Char Val"
                          isVisible={true}
                          isRequired={true}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputPassword name="requestSomeVarCharVal"
                          label="Some Secure Var Char Val"
                          isVisible={true}
                          isRequired={true}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputTextArea name="requestSomeLongVarCharVal"
                          label="Some Long Var Char Val"
                          isVisible={true}
                          isRequired={false}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputTextArea name="requestSomeLongNVarCharVal"
                          label="Some Long N Var Char Val"
                          isVisible={true}
                          isRequired={false}
                          detailText="Sample Details Text"
                        /> 
                        <InputFields.FormInputTextArea name="requestSomeTextVal"
                          label="Some Text Val"
                          isVisible={true}
                          isRequired={true}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputText name="requestSomePhoneNumber"
                          label="Some Phone Number" 
                          isVisible={true}
                          isRequired={true}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputEmail name="requestSomeEmailAddress"
                          label="Some Email Address"
                          isVisible={true}
                          isRequired={true}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputFile name="requestSampleImageUploadFile"
                          label="Sample Image Upload"
                          isVisible={true}
                          isRequired={false}
                          detailText="Sample Details Text"
                        />
                        <InputFields.FormInputText name="someImageUrlVal"
                          label="Some Image Url" 
                          isVisible={true}
                          isRequired={false}
                          detailText=""
                        />
                    </>
                  }  
                  <InputFields.FormInputButton name="submit-button"
                    buttonText="OK Button Text"
                    onPress={() => handleSubmit()}
                    isButtonCallToAction={true}
                    isVisible={true}
                    isEnabled={!isSubmitting}
                    isProcessing={isSubmitting}
                  />
                  <InputFields.FormInputButton name="cancel-button"
                        buttonText="Cancel Button Text" 
                        onPress={async () => {
                          await logClick("FormConnectedLandAddPlant","cancel","");
                          navigateTo("LandPlantList", "landCode");
                        }}
                        isButtonCallToAction={false}
                        isVisible={true} 
                      />
                  <InputFields.FormInputButton name="other-button"
                    buttonText="Go To Dashboard" 
                    onPress={async () => {
                      await logClick("FormConnectedLandAddPlant","otherButton","");
                      navigateTo("TacFarmDashboard", "tacCode");
                    }}
                    isButtonCallToAction={false}
                    isVisible={true} 
                  />
                </View>
              )}
            </Formik>
          )}
        </ScrollView>
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
});

export default FormConnectedLandAddPlant;
