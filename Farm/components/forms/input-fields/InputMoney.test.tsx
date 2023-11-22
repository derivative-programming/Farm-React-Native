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
import {FormInputMoney} from "./InputMoney";   
import { Formik } from "formik";

import '@testing-library/jest-dom';

const initialValues = { testName:"" } 
 
describe("InputMoney Component", () => {
  // render the InputMoney component
  beforeEach(() => {
    render(
      <Formik
          initialValues={initialValues} 
          onSubmit={async (values,actions) => {}}>
          {(props) => (
               
      <FormInputMoney label="Test Label" name="testName"/> 
        
  )}
</Formik>
    );
  });

  // after cleanup when test-case execution is done
  afterEach(cleanup); 

  it("renders correctly", async () => {
    expect(screen.getByTestId("testName")).toBeInTheDocument();
    expect(screen.getByTestId("testName")).not.toHaveFocus();
    expect(screen.getByTestId("testName")).toBeEnabled();
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("when user enter value, it set accordingly in control", async () => {
    const input = screen.getByTestId("testName");

    await act(async () => {
      await fireEvent.change(input, { target: { value: "123" } });
    });

    expect(screen.getByTestId("testName")).toHaveValue(123);
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
               
      <FormInputMoney label="Test Label" name="testName2" autoFocus={true}/> 
        
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
