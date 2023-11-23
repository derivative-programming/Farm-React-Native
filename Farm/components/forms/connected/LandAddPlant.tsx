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
import { Text,  StyleSheet, View, ActivityIndicator, TouchableOpacity } from 'react-native';
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
 
  
  const contextCode: string = landCode ?? "00000000-0000-0000-0000-000000000000";

  const validationSchema = FormValidation.buildValidationSchema();

  const authContext = useContext(AuthContext); 

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
      logClick("FormConnectedLandAddPlant","submit","");
      const responseFull: any = await FormService.submitForm(
        values,
        contextCode
      );
      const response: FormService.SubmitResult = responseFull.data;
      lastApiSubmission = {
        request: { ...values },
        response: { ...response },
      };
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
    const newInitalValues = FormService.buildSubmitRequest(initPageResponse);
    setInitialValues({ ...newInitalValues });
  }, [initPageResponse]);

  const navigateTo = (page: string, codeName: string) => {
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
    navigation.navigate(page as keyof RootStackParamList, { code: targetContextCode });
  };
 
  const handleSubmit = async (
    values: any,//InitialValues,
    actions: any//FormikHelpers<InitialValues>
  ) => {
    // Adapt submission logic
  };
  
  return ( 
    
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.titleText}>Add Plant</Text>
        <Text style={styles.introText}>Add plant intro text.</Text>

        <HeaderLandAddPlant
          name="headerLandAddPlant"
          initData={initPageResponse}
          isHeaderVisible={true}
        />

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
                    />
                    <InputFields.FormInputText name="requestOtherFlavor"
                      label="Other Flavor"
                      isVisible={true}
                    />
                    <InputFields.FormInputNumber name="requestSomeIntVal"
                      label="Some Int Val"
                      isVisible={true}
                    />
                    <InputFields.FormInputNumber name="requestSomeBigIntVal"
                      label="Some Big Int Val"
                      isVisible={true}
                    />
                    <InputFields.FormInputCheckbox name="requestSomeBitVal"
                      label="Some Bit Val"
                      isVisible={true}
                    />
                    <InputFields.FormInputCheckbox name="requestIsEditAllowed"
                      label="Is Edit Allowed"
                      isVisible={true}
                    />
                    <InputFields.FormInputCheckbox name="requestIsDeleteAllowed"
                      label="Is Delete Allowed"
                      isVisible={true}
                    />
                    <InputFields.FormInputNumber name="requestSomeFloatVal"
                      label="Some Float Val"
                      isVisible={true}
                    />
                    <InputFields.FormInputNumber name="requestSomeDecimalVal"
                      label="Some Decimal Val"
                      isVisible={true}
                    />
                    <InputFields.FormInputDateTime name="requestSomeUTCDateTimeVal"
                      label="Some UTC Date Time Val"
                      isVisible={true}
                    />
                    <InputFields.FormInputDate name="requestSomeDateVal"
                      label="Some Date Val"
                      isVisible={true}
                    />
                    <InputFields.FormInputMoney name="requestSomeMoneyVal"
                      label="Some Money Val"
                      isVisible={true}
                    />
                    <InputFields.FormInputText name="requestSomeNVarCharVal"
                      label="Some N Var Char Val"
                      isVisible={true}
                    />
                    <InputFields.FormInputPassword name="requestSomeVarCharVal"
                      label="Some Secure Var Char Val"
                      isVisible={true}
                    />
                    <InputFields.FormInputTextArea name="requestSomeTextVal"
                      label="Some Text Val"
                      isVisible={true}
                    />
                    <InputFields.FormInputText name="requestSomePhoneNumber"
                      label="Some Phone Number" 
                      isVisible={true}
                    />
                    <InputFields.FormInputEmail name="requestSomeEmailAddress"
                      label="Some Email Address"
                      isVisible={true}
                    />
                    <InputFields.FormInputFile name="requestSampleImageUploadFile"
                      label="Sample Image Upload"
                      isVisible={true}
                    />
                </>
              } 
              <TouchableOpacity 
                onPress={() => handleSubmit()} 
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                disabled={isSubmitting}
                testID="submit-button"
              >
                {
                  isSubmitting ? 
                    <ActivityIndicator color="#fff" /> :
                    <Text style={styles.buttonText}>OK Button Text</Text>
                }
              </TouchableOpacity>
              <InputFields.FormInputButton name="cancel-button"
                    buttonText="Cancel Button Text" 
                    onPress={() => {
                      logClick("FormConnectedLandAddPlant","cancel","");
                      navigateTo("LandPlantList", "landCode");
                    }}
                    isButtonCallToAction={false}
                    isVisible={true} 
                  />
              <InputFields.FormInputButton name="other-button"
                buttonText="Go To Dashboard" 
                onPress={() => {
                  logClick("FormConnectedLandAddPlant","otherButton","");
                  navigateTo("TacFarmDashboard", "tacCode");
                }}
                isButtonCallToAction={false}
                isVisible={true} 
              />
            </View>
          )}
        </Formik>
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
    // Add other styles as needed
  },
  introText: {
    fontSize: theme.fonts.mediumSize, 
    // Add other styles as needed
  },
  button: {
    marginTop: 12, // equivalent to mt="3"
    padding: 12,
    borderRadius: 6,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    backgroundColor: theme.bootstrapColors.primary,
    borderWidth: 1,
    borderColor: theme.bootstrapColors.primary, // You can use your theme's primary color 
    // Add other button styling here
  },
  buttonText: {
    fontSize: theme.fonts.mediumSize,
    fontWeight: 'bold',
    color: 'white',  
    // Add text styling here
  },
  buttonDisabled: {
    // Add disabled button styling here
    opacity: 0.5,
  }
});

export default FormConnectedLandAddPlant;
