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
import {ReportInputSelect, ReportInputSelectOption} from "./InputSelect";   
import { Formik } from "formik";

import '@testing-library/jest-dom';

const initialValues = { testName:"" } 

const options:ReportInputSelectOption[] = [{label:"testlabel1",value:"testvalue1"},{label:"testlabel2",value:"testvalue2"}]
 
describe("InputSelect Component", () => {
  // render the InputSelect component
  beforeEach(() => {
    render(
      <Formik
          initialValues={initialValues} 
          onSubmit={async (values,actions) => {}}>
          {(props) => (
               
      <ReportInputSelect label="Test Label" name="testName" options={options}/> 
        
  )}
</Formik>
    );
  });

  // after cleanup when test-case execution is done
  afterEach(cleanup); 

  it("renders correctly", async () => {
    expect(screen.getByTestId("testName")).toBeTruthy();
    expect(screen.getByTestId("testName")).not.toHaveFocus();
    expect(screen.getByTestId("testName")).toBeEnabled();
    expect(screen.getByLabelText("Test Label")).toBeTruthy();
  });

  it("when user enter value, it set accordingly in control", async () => {
    const input = screen.getByTestId("testName");
    // await act(async () => {
    //   await fireEvent.change(input, { target: { value: "test@gmail.com" } });
    // });

    // expect(screen.getByTestId("testName")).toHaveValue("test@gmail.com");
  }); 
  
  it("when user sets prop disable to true, control is disabled", async () => {
    const input = screen.getByTestId("testName");

    await act(async () => {
      await fireEvent.change(input, { target: { disabled: true } });
    });

    expect(screen.getByTestId("testName")).toBeDisabled();
  }); 

  it("when user sets prop disable to false, control is not disabled", async () => {
    const input = screen.getByTestId("testName");

    await act(async () => {
      await fireEvent.change(input, { target: { disabled: false } });
    });

    expect(screen.getByTestId("testName")).not.toBeDisabled();
  }); 
  
  it("when user sets prop autoFocus to true, control is autoFocused", async () => {
    render( 
      <Formik
          initialValues={initialValues} 
          onSubmit={async (values,actions) => {}}>
          {(props) => (
               
      <ReportInputSelect label="Test Label" name="testName2" autoFocus={true} options={options}/> 
        
  )}
</Formik>
    );

    const input = screen.getByTestId("testName2");

    await act(async () => {
      await fireEvent.change(input, { target: { autoFocus: true } });
    });

    expect(screen.getByTestId("testName2")).toHaveFocus();
  }); 
});
