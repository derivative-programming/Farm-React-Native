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
import * as TacLoginFormService from "../services/TacLogin";
import * as TacLoginFormValidation from "../validation/TacLogin";
import * as InitFormService from "../services/init/TacLoginInitObjWF";
import HeaderTacLogin from "../headers/TacLoginInitObjWF";
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
  tacCode:string;
  name?: string;
  showProcessingAnimationOnInit?: boolean;
}

interface FormErrors {
  [key: string]: string;
}

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const FormConnectedTacLogin: FC<FormProps> = ({
  tacCode = "00000000-0000-0000-0000-000000000000",
  name = "formConnectedTacLogin",
  showProcessingAnimationOnInit = true,
}): ReactElement => {
  const [initPageResponse, setInitPageResponse] = useState<InitFormService.InitResult | null>(null);
  const [initialValues, setInitialValues] = useState<TacLoginFormService.SubmitRequest | null>(null);

  const [loading, setLoading] = useState(false);
  const [initForm, setInitForm] = useState(showProcessingAnimationOnInit);
  const initHeaderErrors: string[] = [];
  const [headerErrors, setHeaderErrors] = useState(initHeaderErrors);
  const { logClick } = useAnalyticsDB();

  const navigation = useNavigation<ScreenNavigationProp>();

  let lastApiSubmissionRequest = new TacLoginFormService.SubmitRequestInstance();
  let lastApiSubmissionResponse = new TacLoginFormService.SubmitResultInstance();
  const isInitializedRef = useRef(false);

  const contextCode: string = tacCode ?? "00000000-0000-0000-0000-000000000000";
  const contextObjectName = "tac";

  const isAutoSubmit = false;

  const validationSchema = TacLoginFormValidation.buildValidationSchema();

  const authContext = useContext(AuthContext);  // NOSONAR

  const handleInit = (responseFull: InitFormService.ResponseFull) => {
    const response: InitFormService.InitResult = responseFull.data;

    if (!response.success) {
      setHeaderErrors(["An unexpected error occurred."]);
      return;
    }

    setInitPageResponse({ ...response });
  };

  const handleValidate = async (values: TacLoginFormService.SubmitRequest) => {
    const errors: FormErrors  = {};
    if (!lastApiSubmissionResponse.success) {
      setHeaderErrors(TacLoginFormService.getValidationErrors(
        "",
        lastApiSubmissionResponse
      ));
      Object.entries(values).forEach(([key, value]) => {
        const fieldErrors: string = TacLoginFormService.getValidationErrors(
          key,
          lastApiSubmissionResponse
        ).join(",");
        const requestKey = key as unknown as keyof TacLoginFormService.SubmitRequest;
        if (fieldErrors.length > 0 && value === lastApiSubmissionRequest[requestKey]) {
          errors[key] = fieldErrors;
        }
      });
    }
    return errors;
  };

  const submitClick = async (
    values: TacLoginFormService.SubmitRequest,
    actions: FormikHelpers<TacLoginFormService.SubmitRequest>
  ) => {
    try {
      setLoading(true);
      logClick("FormConnectedTacLogin","submit","");
      const responseFull: TacLoginFormService.ResponseFull = await TacLoginFormService.submitForm(
        values,
        contextCode
      );
      const response: TacLoginFormService.SubmitResult = responseFull.data;
      lastApiSubmissionRequest = { ...values };
      lastApiSubmissionResponse = { ...response };
      if (!response.success) {
        setHeaderErrors(TacLoginFormService.getValidationErrors("", response));
        Object.entries(new TacLoginFormService.SubmitRequestInstance()).forEach(
          ([key]) => {
            const fieldErrors: string = TacLoginFormService.getValidationErrors(
              key,
              response
            ).join(",");
            actions.setFieldError(key, fieldErrors);
          }
        );
        return;
      }
      {/*//GENTrainingBlock[caseGetApiKey]Start*/}
      {/*//GENLearn[isLoginPage=true]Start*/}
      authContext.startSession(response);
      AnalyticsService.start();
      {/*//GENLearn[isLoginPage=true]End*/}
      {/*//GENTrainingBlock[caseGetApiKey]End*/} 
      actions.setSubmitting(false);
      actions.resetForm();
      submitNavigateTo("TacFarmDashboard","tacCode"); //submitButton
    } catch (error) {
      console.error("Error submitting form", error);
      actions.setSubmitting(false);
    }
    finally {
      setLoading(false);
    }
  };

  const autoSubmit = async (
    values: TacLoginFormService.SubmitRequest
  ) => {
    try {
      const responseFull: TacLoginFormService.ResponseFull = await TacLoginFormService.submitForm(
        values,
        contextCode
      );
      const response: TacLoginFormService.SubmitResult = responseFull.data;
      lastApiSubmissionRequest = { ...values };
      lastApiSubmissionResponse = { ...response };
      if (!response.success) {
        //click cancel
      } else {
        //possible relogin

        authContext.startSession(response);
        AnalyticsService.start();

      }
    } catch (error) {
      //click cancel
    }

    submitNavigateTo("tac-farm-dashboard","tacCode");

  };

  useEffect(() => {
    if (isInitializedRef.current) {
      return;
    }
    isInitializedRef.current = true;
    TacLoginFormService.initForm(contextCode)
      .then((response) => handleInit(response))
      .finally(() => {setInitForm(false)});
  }, []);

  useEffect(() => {
    if(initPageResponse === null){
      return;
    }
    const newInitalValues = TacLoginFormService.buildSubmitRequest(initPageResponse);

    setInitialValues({ ...newInitalValues });

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
        <Text style={styles.titleText} testID="page-title-text">Log In</Text>
        <Text style={styles.introText} testID="page-intro-text">Please enter your email and password.</Text>

        {initPageResponse && (
          <HeaderTacLogin
            name="headerTacLogin"
            initData={initPageResponse}
            isHeaderVisible={false}
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
                        <InputFields.FormInputEmail name="email"
                          label="Email"
                          isVisible={true}
                          isRequired={true}
                          detailText=""
                        />
                        <InputFields.FormInputPassword name="password"
                          label="Password"
                          isVisible={true}
                          isRequired={true}
                          detailText=""
                        />
                    </>
                  }
                  <InputFields.FormInputButton name="submit-button"
                    buttonText="Log In"
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
                      navigateTo("TacRegister", "tacCode");
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

export default FormConnectedTacLogin;

