import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {   View, Text, ActivityIndicator, TouchableOpacity,StyleSheet } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from "formik";  
import * as FormService from "../services/TacLogin";
import * as FormValidation from "../validation/TacLogin";
import * as InitFormService from "../services/init/TacLoginInitObjWF";
import { AuthContext } from "../../../context/authContext"; 
import useAnalyticsDB from "../../../hooks/useAnalyticsDB"; 
import * as AnalyticsService from "../../services/analyticsService";
import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamList from "../../../screens/rootStackParamList";
import * as RouteNames from '../../../constants/routeNames';
import * as InputFields from "../input-fields";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as theme from '../../../constants/theme'


export interface FormProps {
  tacCode: string;
  name?: string;
  showProcessingAnimationOnInit?: boolean;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const FormConnectedTacLogin: FC<FormProps> = ({
  tacCode = "00000000-0000-0000-0000-000000000000",
  name = "formConnectedTacLogin",
  showProcessingAnimationOnInit = true,
}): ReactElement => {
  const [initialValues, setInitialValues] = useState(
    new FormService.SubmitRequestInstance()
  );
  const [loading, setLoading] = useState(false);
  const [initForm, setInitForm] = useState(showProcessingAnimationOnInit);
  const initHeaderErrors: string[] = [];
  const [headerErrors, setHeaderErrors] = useState(initHeaderErrors);
  let lastApiSubmission: any = {
    request: new FormService.SubmitResultInstance(),
    response: new FormService.SubmitRequestInstance(),
  };
  const isInitializedRef = useRef(false);
  const { logClick } = useAnalyticsDB();
  

  const navigation = useNavigation<ScreenNavigationProp>();
  
  const contextCode: string = tacCode ?? "00000000-0000-0000-0000-000000000000";

  const validationSchema = FormValidation.buildValidationSchema();

  const authContext = useContext(AuthContext); 

  console.log('form ctrl initial values...');
  console.log(initialValues);


  // let headerErrors: string[] = [];

  const handleInit = (responseFull: any) => {
    const initFormResponse: InitFormService.InitResult = responseFull.data;

    if (!initFormResponse.success) {
      return;
    }

    setInitialValues({ ...FormService.buildSubmitRequest(initFormResponse) }); 
    console.log('Services.TacLogin.handleInit success');
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

  const submitButtonPress = async (
    values: FormService.SubmitRequest,
    actions: FormikHelpers<FormService.SubmitRequest>
  ) => {
    try {
      setLoading(true);
      await logClick("FormConnectedTacLogin","submit","");
      const responseFull: any = await FormService.submitForm(values,contextCode);
      const response: FormService.SubmitResult = responseFull.data;
      lastApiSubmission = {
        request: { ...values },
        response: { ...response },
      };
      
      console.log('form ctrl submit values and results...');
      console.log(lastApiSubmission);

      if (!response.success) {
        setHeaderErrors(FormService.getValidationErrors("", response));
        Object.entries(new FormService.SubmitRequestInstance()).forEach(
          ([key, value]) =>
            actions.setFieldError(
              key,
              FormService.getValidationErrors(key, response).join(",")
            )
        );
        return;
      }
      {/*//GENTrainingBlock[caseGetApiKey]Start*/}
      {/*//GENLearn[isLoginPage=true]Start*/}
      authContext.setToken(response.apiKey);
      authContext.setRoles(response.roleNameCSVList);
      await AsyncStorage.setItem("@token", response.apiKey);
      await AsyncStorage.setItem("customerCode", response.customerCode);
      await AsyncStorage.setItem("email", response.email);
      // await AnalyticsService.start();
      {/*//GENLearn[isLoginPage=true]End*/}
      {/*//GENTrainingBlock[caseGetApiKey]End*/} 
      actions.setSubmitting(false);
      actions.resetForm();
      navigation.navigate(RouteNames.TAC_FARM_DASHBOARD, { code: "00000000-0000-0000-0000-000000000000" });
    } catch (error) {
      actions.setSubmitting(false);
    }
    finally {
      setLoading(false);
    }
  };

  const registerButtonPress = async () => {
    await logClick("FormConnectedTacLogin","otherButton",""); 
    navigation.navigate(RouteNames.TAC_REGISTER, { code: "00000000-0000-0000-0000-000000000000" });
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

  return (
    
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.titleText}>Log In</Text>
        <Text style={styles.introText}>Please enter your email and password.</Text>
        
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            await submitButtonPress(values, actions);
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
                    <InputFields.FormInputEmail name="email"
                      label="Email"
                      isVisible={true}
                    />
                    <InputFields.FormInputPassword name="password"
                      label="Password"
                      isVisible={true}
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
              <InputFields.FormInputButton name="other-button"
                buttonText="Register"
                onPress={async () => {
                  await logClick("FormConnectedTacLogin","otherButton","");
                  await registerButtonPress();
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
  button: {
    marginTop: 12, // equivalent to mt="3" 
  },
  buttonText: { 
  },
  buttonDisabled: {
    
  }
});

export default FormConnectedTacLogin;
