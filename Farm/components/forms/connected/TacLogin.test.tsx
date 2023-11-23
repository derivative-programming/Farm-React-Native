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
import FormConnectedTacLogin from "./TacLogin";
import * as FormService from "../services/TacLogin";
import * as InitFormService from "../services/init/TacLoginInitObjWF";

import "fake-indexeddb/auto";
import '@testing-library/jest-dom';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
const mockedUsedNavigate = jest.fn();
const mockParams = jest.fn();
// mock the useNavigate method
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => mockParams.mockReturnValue({ id: "00000000-0000-0000-0000-000000000000",}),
}));
const mockFormInitService = jest.spyOn(FormService, "initForm");
const mockFormSubmitService =  jest.spyOn(FormService, "submitForm");

let formSubmitResponse = new FormService.SubmitResultInstance();
const formInitResponse = new InitFormService.InitResultInstance();
describe("TacLogin Component", () => {
  beforeEach(async () => {
    await AsyncStorage.setItem("@token", "sampleToken");  
      mockFormInitService.mockResolvedValue({
        data: new InitFormService.InitResultInstance(),
      });

      await act(async () => {
        render(
            <FormConnectedTacLogin name="testForm" showProcessingAnimationOnInit={false} />
        );
      })

  });
  // after cleanup when test-case execution is done
  afterEach(cleanup);
  const initTest = async () => {
  }
  it("renders correctly", async () => {
    expect(screen.getByTestId("testForm")).toBeInTheDocument();
    expect(screen.getByTestId("headerErrors")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    expect(screen.getByTestId("other-button")).toBeInTheDocument();
    if("Please enter your email and password.".length > 0){
      expect(screen.getByTestId("page-intro-text")).toBeInTheDocument();
      expect(screen.getByTestId("page-intro-text"))
        .toHaveTextContent("Please enter your email and password.");
    }
    if("".length > 0){
      expect(screen.getByTestId("page-footer-text")).toBeInTheDocument();
      expect(screen.getByTestId("page-footer-text"))
        .toHaveTextContent("");
    }
    await waitFor(() => expect(mockFormInitService).toHaveBeenCalled());
  });
  it("when user enter email, it set accordingly", async () => {
    const input = screen.getByTestId("email");
    fireEvent.changeText(input, 'sample data');
    expect(input.props.value).toBe('sample data');
  });
  it("when user enter password, it set accordingly", async () => {
    const input = screen.getByTestId("password");
    fireEvent.changeText(input, 'sample data');
    expect(input.props.value).toBe('sample data');
  });
  it("when user entered TacLogin details and clicks on register button, TacLogin api should be called", async () => {
    mockFormSubmitService.mockResolvedValue({
      data: formSubmitResponse,
    });
    const emailInput = screen.getByTestId("email");
    await act(async () => {
      await fireEvent.change(emailInput, { target: { value: "Sample Data" } });
    });
    const passwordInput = screen.getByTestId("password");
    await act(async () => {
      await fireEvent.change(passwordInput, { target: { value: "Sample Data" } });
    });
    await act(async () => {
      await fireEvent.click(screen.getByTestId("submit-button"));
    });
    await waitFor(() => expect(mockFormSubmitService).toHaveBeenCalled());
  });
});

