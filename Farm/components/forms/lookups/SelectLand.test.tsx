/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  cleanup,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import FormSelectLand from "./SelectLand";  
import { Formik } from "formik";

import '@testing-library/jest-dom';

const initialValues = { testName:"" }
const validationSchema  = {}

describe("FormSelectLand Component", () => {
  // render the FormSelectLand component
  beforeEach(() => {
    render(
      <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values,actions) => {}}>
          {(props) => (
               
                <FormSelectLand label="Test Label" name="testName" />
                
          )}
      </Formik>
    );
  });

  // after cleanup when test-case execution is done
  afterEach(cleanup);

  it("renders correctly", async () => {
    expect(screen.getByTestId("testName")).toBeInTheDocument();
  });
 
});
