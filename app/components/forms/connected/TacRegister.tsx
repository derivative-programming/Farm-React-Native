import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback
} from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Formik, FormikHelpers } from "formik";
import { useNavigation } from '@react-navigation/native';
import * as TacRegisterFormService from "../services/TacRegister";
import * as TacRegisterFormValidation from "../validation/TacRegister";
import * as InitFormService from "../services/init/TacRegisterInitObjWF";
import HeaderTacRegister from "../headers/TacRegisterInitObjWF";
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

export const FormConnectedTacRegister: FC<FormProps> = ({
  tacCode = "00000000-0000-0000-0000-000000000000",
  name = "formConnectedTacRegister",
  showProcessingAnimationOnInit = true,
}): ReactElement => {
  const [initPageResponse, setInitPageResponse] = useState<InitFormService.InitResult | null>(null);
  const [initialValues, setInitialValues] = useState<TacRegisterFormService.SubmitRequest | null>(null);

  const [loading, setLoading] = useState(false);
  const [initForm, setInitForm] = useState(showProcessingAnimationOnInit);
  const initHeaderErrors: string[] = [];
  const [headerErrors, setHeaderErrors] = useState(initHeaderErrors);
  const { logClick } = useAnalyticsDB();

  const navigation = useNavigation<ScreenNavigationProp>();

  let lastApiSubmissionRequest = new TacRegisterFormService.SubmitRequestInstance();
  let lastApiSubmissionResponse = new TacRegisterFormService.SubmitResultInstance();
  const isInitializedRef = useRef(false);

  const contextCode: string = tacCode ?? "00000000-0000-0000-0000-000000000000";
  const contextObjectName = "tac";

  const isAutoSubmit = false;

  const validationSchema = TacRegisterFormValidation.buildValidationSchema();

  const authContext = useContext(AuthContext);  // NOSONAR

  const handleInit = (responseFull: InitFormService.ResponseFull) => {
    const response: InitFormService.InitResult = responseFull.data;

    if (!response.success) {
      setHeaderErrors(["An unexpected error occurred."]);
      return;
    }

    console.log('initPageResponse...',response);
    setInitPageResponse({ ...response });
  };

  const handleValidate = async (values: TacRegisterFormService.SubmitRequest) => {
    const errors: FormErrors  = {};
    if (!lastApiSubmissionResponse.success) {
      setHeaderErrors(TacRegisterFormService.getValidationErrors(
        "",
        lastApiSubmissionResponse
      ));
      Object.entries(values).forEach(([key, value]) => {
        const fieldErrors: string = TacRegisterFormService.getValidationErrors(
          key,
          lastApiSubmissionResponse
        ).join(",");
        const requestKey = key as unknown as keyof TacRegisterFormService.SubmitRequest;
        if (fieldErrors.length > 0 && value === lastApiSubmissionRequest[requestKey]) {
          errors[key] = fieldErrors;
        }
      });
    }
    return errors;
  };

  const submitClick = async (
    values: TacRegisterFormService.SubmitRequest,
    actions: FormikHelpers<TacRegisterFormService.SubmitRequest>
  ) => {
    try {
      setLoading(true);
      logClick("FormConnectedTacRegister","submit","");
      const responseFull: TacRegisterFormService.ResponseFull = await TacRegisterFormService.submitForm(
        values,
        contextCode
      );
      const response: TacRegisterFormService.SubmitResult = responseFull.data;
      lastApiSubmissionRequest = { ...values };
      lastApiSubmissionResponse = { ...response };
      if (!response.success) {
        setHeaderErrors(TacRegisterFormService.getValidationErrors("", response));
        Object.entries(new TacRegisterFormService.SubmitRequestInstance()).forEach(
          ([key]) => {
            const fieldErrors: string = TacRegisterFormService.getValidationErrors(
              key,
              response
            ).join(",");
            actions.setFieldError(key, fieldErrors);
          }
        );
        return;
      }

      authContext.startSession(response);

      actions.setSubmitting(false);
      actions.resetForm();
      submitNavigateTo("TacFarmDashboard","tacCode"); //submitButton
    } catch (error) {
      actions.setSubmitting(false);
    }
    finally {
      setLoading(false);
    }
  };

  const autoSubmit = async (
    values: TacRegisterFormService.SubmitRequest
  ) => {
    try {
      const responseFull: TacRegisterFormService.ResponseFull = await TacRegisterFormService.submitForm(
        values,
        contextCode
      );
      const response: TacRegisterFormService.SubmitResult = responseFull.data;
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

    submitNavigateTo("TacFarmDashboard","tacCode");

  };

  useEffect(() => {
    // if (isInitializedRef.current) {
    //   return;
    // }
    // console.log('useEffect []...');
    // isInitializedRef.current = true;
    // TacRegisterFormService.initForm(contextCode)
    //   .then((response) => handleInit(response))
    //   .finally(() => {setInitForm(false)});
  }, []);

  useFocusEffect(
    useCallback(() => {
      // if (!isInitializedRef.current) {
      //   return;
      // }
      console.log('useFocusEffect...');
      TacRegisterFormService.initForm(contextCode)
        .then((response) => handleInit(response))
        .finally(() => {setInitForm(false)});
    }, [])
  );

  useEffect(() => {
    if(initPageResponse === null){
      return;
    }
    const newInitalValues = TacRegisterFormService.buildSubmitRequest(initPageResponse);

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
        <Text style={styles.titleText} testID="page-title-text">Create your account </Text>
        <Text style={styles.introText} testID="page-intro-text">A Couple Details Then We Are Off!</Text>

        {initPageResponse && (
          <HeaderTacRegister
            name="headerTacRegister"
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
                        <InputFields.FormInputPassword name="confirmPassword"
                          label="Confirm Password"
                          isVisible={true}
                          isRequired={true}
                          detailText=""
                        />
                        <InputFields.FormInputText name="firstName"
                          label="First Name"
                          isVisible={true}
                          isRequired={true}
                          detailText=""
                        />
                        <InputFields.FormInputText name="lastName"
                          label="Last Name"
                          isVisible={true}
                          isRequired={true}
                          detailText=""
                        />
                    </>
                  }
                  <InputFields.FormInputButton name="submit-button"
                    buttonText="Register"
                    onPress={() => handleSubmit()}
                    isButtonCallToAction={true}
                    isVisible={true}
                    isEnabled={!isSubmitting}
                    isProcessing={isSubmitting}
                  />
                  <InputFields.FormInputButton name="cancel-button"
                        buttonText="Back To Log In"
                        onPress={async () => {
                          await logClick("FormConnectedTacAddCustomer","cancel","");
                          navigateTo("TacLogin", "tacCode");
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

export default FormConnectedTacRegister;

