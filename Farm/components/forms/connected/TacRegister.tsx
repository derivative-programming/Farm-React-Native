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
import * as FormService from "../services/TacRegister";
import * as FormValidation from "../validation/TacRegister";
import * as InitFormService from "../services/init/TacRegisterInitObjWF";
import HeaderTacRegister from "../headers/TacRegisterInitObjWF";
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
  tacCode:string;
  name?: string;
  showProcessingAnimationOnInit?: boolean;
}
type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;
export const FormConnectedTacRegister: FC<FormProps> = ({
  tacCode = "00000000-0000-0000-0000-000000000000",
  name = "formConnectedTacRegister",
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
  const contextCode: string = tacCode ?? "00000000-0000-0000-0000-000000000000";
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
      logClick("FormConnectedTacRegister","submit","");
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

      authContext.setToken(response.apiKey);
      authContext.setRoles(response.roleNameCSVList);
      await AsyncStorage.setItem("@token", response.apiKey);
      await AsyncStorage.setItem("customerCode", response.customerCode);
      await AsyncStorage.setItem("email", response.email);
      AnalyticsService.start();

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
    navigateTo("TacFarmDashboard", "tacCode");
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
        <Text style={styles.titleText}>Create your account</Text>
        <Text style={styles.introText}>A Couple Details Then We're Off!</Text>
        <HeaderTacRegister
          name="headerTacRegister"
          initData={initPageResponse}
          isHeaderVisible={false}
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
                    <InputFields.FormInputEmail name="email"
                      label="Email"
                      isVisible={true}
                    />
                    <InputFields.FormInputPassword name="password"
                      label="Password"
                      isVisible={true}
                    />
                    <InputFields.FormInputPassword name="confirmPassword"
                      label="Confirm Password"
                      isVisible={true}
                    />
                    <InputFields.FormInputText name="firstName"
                      label="First Name"
                      isVisible={true}
                    />
                    <InputFields.FormInputText name="lastName"
                      label="Last Name"
                      isVisible={true}
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
                    onPress={() => {
                      logClick("FormConnectedTacAddCustomer","cancel","");
                      navigateTo("TacLogin", "tacCode");
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
    marginBottom: 8,
    color: theme.Colors.text,
    // Add other styles as needed
  },
  introText: {
    fontSize: theme.fonts.mediumSize,
    marginBottom: 8,
    color: theme.Colors.text,
    // Add other styles as needed
  },
  button: {
    marginTop: 12, // equivalent to mt="3"
    padding: 12,
    borderRadius: 6,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    backgroundColor: theme.Colors.primary,
    borderWidth: 1,
    borderColor: theme.Colors.primary, // You can use your theme's primary color
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
export default FormConnectedTacRegister;

