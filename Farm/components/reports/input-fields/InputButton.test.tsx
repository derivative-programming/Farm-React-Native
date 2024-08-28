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
import {ReportInputButton} from "./InputButton";   
import { Formik } from "formik";

import '@testing-library/jest-dom';

const initialValues = { testName:"" } 

const mockedonPress = jest.fn();
 
describe("InputButton Component", () => {
  // render the InputButton component
  beforeEach(() => {
    render(
      <Formik
          initialValues={initialValues} 
          onSubmit={async (values,actions) => {}}>
          {(props) => (
               
                <ReportInputButton buttonText="Test Label" name="testName" onPress={mockedonPress}/> 
                
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
  }); 
  
  // it("when user sets prop disable to true, control is disabled", async () => {
  //   const input = screen.getByTestId("testName");

  //   await act(async () => {
  //     await fireEvent.change(input, { target: { isEnabled: false } });
  //   });

  //   expect(screen.getByTestId("testName")).toBeDisabled();
  // }); 

  // it("when user sets prop disable to false, control is not disabled", async () => {
  //   const input = screen.getByTestId("testName");

  //   await act(async () => {
  //     await fireEvent.change(input, { target: { isEnabled: true } });
  //   });

  //   expect(screen.getByTestId("testName")).not.toBeDisabled();
  // }); 
  
  it("when user sets prop autoFocus to true, control is autoFocused", async () => {
    render( 
      <Formik
          initialValues={initialValues} 
          onSubmit={async (values,actions) => {}}>
          {(props) => (
               
                <ReportInputButton buttonText="Test Label" name="testName2" autoFocus={true}  onPress={mockedonPress}/> 
                
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
