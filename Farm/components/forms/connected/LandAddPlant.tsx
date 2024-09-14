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
import * as FormService from "../services/LandAddPlant";
import * as FormValidation from "../validation/LandAddPlant";
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

export interface FormProps {
  landCode:string;
  name?: string;
  showProcessingAnimationOnInit?: boolean;
} 

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const FormConnectedLandAddPlant: FC<FormProps> = ({
  landCode = "00000000-0000-0000-0000-000000000000",
  name = "formConnectedLandAddPlant",
  showProcessingAnimationOnInit = true,
}): ReactElement => {
  const [initPageResponse, setInitPageResponse] = useState(
    new InitFormService.InitResultInstance()
  );
  const [initialValues, setInitialValues] = useState(
    new FormService.SubmitRequestInstance()
  );
  const [loading, setLoading] = useState(false);
  const [initForm, setInitForm] = useState(showProcessingAnimationOnInit);
  const initHeaderErrors: string[] = [];
  const [headerErrors, setHeaderErrors] = useState(initHeaderErrors);
  const { logClick } = useAnalyticsDB();
  
  const navigation = useNavigation<ScreenNavigationProp>();

  let lastApiSubmission: any = {
    request: new FormService.SubmitResultInstance(),
    response: new FormService.SubmitRequestInstance(),
  };
  const isInitializedRef = useRef(false);
 
  let lastApiSubmissionRequest = new FormService.SubmitRequestInstance();
  let lastApiSubmissionResponse = new FormService.SubmitResultInstance(); 
  
  const contextCode: string = landCode ?? "00000000-0000-0000-0000-000000000000";

  const validationSchema = FormValidation.buildValidationSchema();
  
  const isAutoSubmit = false;

  const authContext = useContext(AuthContext); 

  // console.log('form ctrl initial values...');
  // console.log(initialValues);

  const handleInit = (responseFull: any) => {
    const response: InitFormService.InitResult = responseFull.data;

    if (!response.success) {
      setHeaderErrors(["An unexpected error occurred."]);
      return;
    }

    setInitPageResponse({ ...response }); 
  };

  const handleValidate = async (values: FormService.SubmitRequest) => {
    let errors: any = {};
    if (!lastApiSubmission.response.success) {
      setHeaderErrors(FormService.getValidationErrors(
        "",
        lastApiSubmission.response
      ));
      Object.entries(values).forEach(([key, value]) => {
        const fieldErrors: string = FormService.getValidationErrors(
          key,
          lastApiSubmission.response
        ).join(",");
        if (fieldErrors.length > 0 && value === lastApiSubmission.request[key]) {
          errors[key] = fieldErrors;
        }
      });
    }
    return errors;
  };

  const submitClick = async (
    values: FormService.SubmitRequest,
    actions: FormikHelpers<FormService.SubmitRequest>
  ) => {
    try {
      setLoading(true);
      await logClick("FormConnectedLandAddPlant","submit","");
      const responseFull: any = await FormService.submitForm(
        values,
        contextCode
      );
      const response: FormService.SubmitResult = responseFull.data;
      lastApiSubmission = {
        request: { ...values },
        response: { ...response },
      };
      
      // console.log('form ctrl submit values and results...');
      // console.log(lastApiSubmission);

      if (!response.success) {
        setHeaderErrors(FormService.getValidationErrors("", response));
        Object.entries(new FormService.SubmitRequestInstance()).forEach(
          ([key, value]) => {
            const fieldErrors: string = FormService.getValidationErrors(
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
      submitButtonNavigateTo();
    } catch (error) {
      actions.setSubmitting(false);
    }
    finally {
      setLoading(false);
    }
  };

  
  const autoSubmit = async (
    values: FormService.SubmitRequest
  ) => {
    try {  
      const responseFull: FormService.ResponseFull = await FormService.submitForm(
        values,
        contextCode
      );
      const response: FormService.SubmitResult = responseFull.data;
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

  const submitButtonNavigateTo = () => {
    navigateTo("LandPlantList", "landCode");
  };

  useEffect(() => {
    if (isInitializedRef.current) {
      return;
    }
    isInitializedRef.current = true;
    FormService.initForm(contextCode)
      .then((response) => handleInit(response)) 
      .finally(() => {setInitForm(false)});
  }, []);

  useEffect(() => {
    if(initPageResponse === null){
      return;
    }
    const newInitalValues = FormService.buildSubmitRequest(initPageResponse);
    //GENIF[isAutoSubmit=true]Start
    if(isAutoSubmit){
      autoSubmit(newInitalValues);
    }
    //GENIF[isAutoSubmit=true]End
    //GENIF[isAutoSubmit=false]Start
    setInitialValues({ ...newInitalValues });
    //GENIF[isAutoSubmit=false]End
     
  }, [initPageResponse]);

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
  
  return ( 
    
    <View style={styles.container} testID={name}>
      <View style={styles.formContainer}>
        <Text style={styles.titleText} testID="page-title-text">Add Plant</Text>
        <Text style={styles.introText} testID="page-intro-text">Add plant intro text.</Text>

        <HeaderLandAddPlant
          name="headerLandAddPlant"
          initData={initPageResponse}
          isHeaderVisible={true}
        />
        <ScrollView>
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
