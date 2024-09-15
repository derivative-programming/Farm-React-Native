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
import FormSelectTriStateFilter from "./SelectTriStateFilter";
import { Formik } from "formik";

import '@testing-library/jest-dom';

const initialValues = { testName:"" }
const validationSchema  = {}

describe("FormSelectTriStateFilter Component", () => {
  // render the FormSelectTriStateFilter component
  beforeEach(() => {
    render(
      <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values,actions) => {}}>
          {(props) => (

                <FormSelectTriStateFilter label="Test Label" name="testName" />

          )}
      </Formik>
    );
  });

  // after cleanup when test-case execution is done
  afterEach(cleanup);

  it("renders correctly", async () => {
    expect(screen.getByTestId("testName")).toBeTruthy();
  });

});

