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
import FormConnectedTacRegister from "./TacRegister";

import * as FormService from "../services/TacRegister";
import * as InitFormService from "../services/init/TacRegisterInitObjWF";

import '@testing-library/jest-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mockedUsedNavigate = jest.fn();
const mockParams = jest.fn();

// mock the useNavigate method
// jest.mock("react-router-dom", () => ({
//   ...(jest.requireActual("react-router-dom") as any),
//   useNavigate: () => mockedUsedNavigate,
//   useParams: () => mockParams.mockReturnValue({ id: "00000000-0000-0000-0000-000000000000",}),
// }));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const mockFormInitService = jest.spyOn(FormService, "initForm");
const mockFormSubmitService =  jest.spyOn(FormService, "submitForm");

let formSubmitResponse = new FormService.SubmitResultInstance();
const formInitResponse = new InitFormService.InitResultInstance();

describe("TacRegister Component", () => {

  beforeEach(async () => {
    await AsyncStorage.setItem("@token", "sampleToken");
      mockFormInitService.mockResolvedValue({
        data: new InitFormService.InitResultInstance(),
      });

//endset

      render(

          <FormConnectedTacRegister name="testForm"
            showProcessingAnimationOnInit={false}
            tacCode = "00000000-0000-0000-0000-000000000000"/>

      );

      await waitFor(() => expect(mockFormInitService).toHaveBeenCalled());
//endset
  });

  // after cleanup when test-case execution is done
  afterEach(cleanup);

  const initTest = async () => {
  }

  it("renders correctly", async () => {
    expect(screen.getByTestId("testForm")).toBeTruthy();
    expect(screen.getByTestId("headerErrors")).toBeTruthy();
    expect(screen.getByTestId("email")).toBeTruthy();
    expect(screen.getByTestId("password")).toBeTruthy();
    expect(screen.getByTestId("confirmPassword")).toBeTruthy();
    expect(screen.getByTestId("firstName")).toBeTruthy();
    expect(screen.getByTestId("lastName")).toBeTruthy();
    expect(screen.getByTestId("submit-button")).toBeTruthy();
    expect(screen.getByTestId("cancel-button")).toBeTruthy();

    if("Create your account".length > 0){
      expect(screen.getByTestId("page-title-text")).toBeTruthy();
      expect(screen.getByTestId("page-title-text").props.children)
      .toBe("Create your account");
    }

    if("A Couple Details Then We Are Off!".length > 0){
      expect(screen.getByTestId("page-intro-text")).toBeTruthy();
      expect(screen.getByTestId("page-intro-text").props.children)
      .toBe("A Couple Details Then We Are Off!");
    }
    // if("".length > 0){
    //   expect(screen.getByTestId("page-footer-text")).toBeTruthy();
    //   expect(screen.getByTestId("page-footer-text"))
    //     .toHaveTextContent("");
    // }

  });

  it("when user entered TacRegister details and clicks on register button, TacRegister api should be called", async () => {
    mockFormSubmitService.mockResolvedValue({
      data: formSubmitResponse,
    });
    fireEvent.press(screen.getByTestId("submit-button"));
    await waitFor(() => expect(mockFormSubmitService).toHaveBeenCalled());
  });
});

