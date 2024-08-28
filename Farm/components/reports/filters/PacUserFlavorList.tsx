import React, {
  FC,
  ReactElement,
  useContext,
  useState,
} from "react";
import { Button, Accordion,  View } from 'react-native';

import { Formik, FormikHelpers } from "formik";
import * as ReportService from "../services/PacUserFlavorList";
import { AuthContext } from "../../../context/authContext";
import * as ReportInput from "../input-fields";
import * as Lookups from "../lookups";
import useAnalyticsDB from "../../../hooks/useAnalyticsDB";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ReportFilterPacUserFlavorListProps {
  name: string;
  initialQuery: ReportService.QueryRequest;
  onSubmit(request: ReportService.QueryRequest): void;
  hidden?: boolean;
  isCollapsible?: boolean;
}

const ReportFilterPacUserFlavorList: FC<ReportFilterPacUserFlavorListProps> = ({
  name,
  initialQuery,
  onSubmit,
  hidden = false,
  isCollapsible = true,
}): ReactElement => {
  const [initialValues, setInitialValues] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const { logClick } = useAnalyticsDB();

  // console.log('filter ctrl initialQuery...');
  // console.log(initialQuery);
  // console.log('filter ctrl initialValues...');
  // console.log(initialValues);

  const validationSchema = ReportService.buildValidationSchema();

  const isFiltersVisibleDefault = false;// await AsyncStorage.getItem("isFiltersVisible");
  const defaultAccordianKey = (isFiltersVisibleDefault === "true" ? "0" : "-1");

  const authContext = useContext(AuthContext);

  let headerErrors: string[] = [];

  const submitButtonPress = async (
    values: ReportService.QueryRequest,
    actions: FormikHelpers<ReportService.QueryRequest>
  ) => {
    try {
      setLoading(true);
      logClick("ReportFilterPacUserFlavorList","submit","");
      onSubmit(values);
    }
    finally {
      actions.setSubmitting(false);
      setLoading(false);
    }
  };

  const resetButtonPress = () => {
    logClick("ReportFilterPacUserFlavorList","refresh","");
    setInitialValues({ ...initialQuery });
  };

  const onAccordianHeaderClick = async () => {
    logClick("ReportFilterPacUserFlavorList","accordianClick","");
    const isFiltersVisible = await AsyncStorage.getItem("isFiltersVisible");
    if(isFiltersVisible === null)
    {
      await AsyncStorage.setItem("isFiltersVisible","true")
    }
    if(isFiltersVisible === "true")
    {
      await AsyncStorage.setItem("isFiltersVisible","false")
    }
    if(isFiltersVisible === "false")
    {
      await AsyncStorage.setItem("isFiltersVisible","true")
    }
  }

  return (
    <View className="mt-3 w-100" hidden={hidden}>
      <Accordion defaultActiveKey={defaultAccordianKey} alwaysOpen={!isCollapsible}>
        <Accordion.Item eventKey="0">
          <Accordion.Header onPress={onAccordianHeaderClick}
            testID={name + '-header'}>Filters</Accordion.Header>
          <Accordion.Body>
            <Formik
              enableReinitialize={true}
              initialValues={initialQuery}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                await submitButtonPress(values, actions);
              }}
            >
              {(props) => (
                <Form
                  name={name}
                  testID={name}
                  onReset={props.handleReset}
                  onSubmit={props.handleSubmit}
                >
                  <Row>

                  </Row>
                  <Row>
                    <Col xl="12" >
                      <View className="d-flex h-100 align-items-end justify-content-end">
                        <Button
                          type="submit"
                          className="ms-2 mt-3"
                          testID="submit-button"
                        >
                          {loading && (
                            <Spinner
                              as="span"
                              animation="border"

                              role="status"
                              aria-hidden="true"
                              className="spinner-button"
                            />)
                          }
                          <span className="sr-only">Search</span>

                        </Button>
                        <Button
                          className="ms-2 mt-3"
                          type="reset"
                          onPress={() => props.resetForm() as any}
                          variant="outline"
                          testID="reset"
                        >
                          Reset
                        </Button>
                      </View>
                    </Col>
                  </Row>
                </ Form>
              )}
            </Formik>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </View>
  );
};

export default ReportFilterPacUserFlavorList;

