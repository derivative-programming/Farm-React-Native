import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, Button, Card, Spinner, VStack, View, Text, FormControl } from "native-base"; 
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

  // let headerErrors: string[] = [];

  const handleInit = (responseFull: any) => {
    const initFormResponse: InitFormService.InitResult = responseFull.data;

    if (!initFormResponse.success) {
      return;
    }

    setInitialValues({ ...FormService.buildSubmitRequest(initFormResponse) }); 
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
      logClick("FormConnectedTacLogin","submit","");
      const responseFull: any = await FormService.submitForm(values,contextCode);
      const response: FormService.SubmitResult = responseFull.data;
      lastApiSubmission = {
        request: { ...values },
        response: { ...response },
      };
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
      AsyncStorage.setItem("@token", response.apiKey);
      AsyncStorage.setItem("customerCode", response.customerCode);
      AsyncStorage.setItem("email", response.email);
      AnalyticsService.start();
      {/*//GENLearn[isLoginPage=true]End*/}
      {/*//GENTrainingBlock[caseGetApiKey]End*/} 
      actions.setSubmitting(false);
      actions.resetForm();
    } catch (error) {
      actions.setSubmitting(false);
    }
    finally {
      setLoading(false);
    }
  };

  const registerButtonPress = () => {
    logClick("FormConnectedTacLogin","otherButton",""); 
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
    <Box flex={1} py="5" alignItems="center">
    <VStack space={4} width="90%">
        <Text fontSize="xl" testID="page-title-text">Log In</Text>
        <Text fontSize="md" testID="page-intro-text">Please enter your email and password.</Text>
         
      <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitButtonPress}
        >
          {({ handleSubmit, handleReset, isSubmitting }) => (
            <FormControl>
              {initForm && showProcessingAnimationOnInit ?
                <Spinner size="lg" />
                :
                <VStack space={4}>
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
                </VStack>
              }
              <Button
                // onPress={handleSubmit}
                mt="3" isLoading={isSubmitting} testID="submit-button">
                OK Button Text
              </Button>
              <InputFields.FormInputButton name="other-button"
                buttonText="Register"
                onPress={() => {
                  logClick("FormConnectedTacLogin","otherButton","");
                  registerButtonPress();
                }}
                isButtonCallToAction={false}
                isVisible={true} 
              />
            </FormControl>
          )}
        </Formik>
    </VStack>
    </Box>
  );
};

export default FormConnectedTacLogin;
