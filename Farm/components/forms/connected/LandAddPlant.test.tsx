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
import FormConnectedLandAddPlant from "./LandAddPlant"; 

import * as FormService from "../services/LandAddPlant";
import * as InitFormService from "../services/init/LandAddPlantInitObjWF";
import * as requestFlavorCodeService from "../../lookups/services/Flavor"
import '@testing-library/jest-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
 

const mockedUsedNavigate = jest.fn();
const mockUserParams = jest.fn();

// mock the useNavigate method
// jest.mock("react-router-dom", () => ({
//   ...(jest.requireActual("react-router-dom") as any),
//   useNavigate: () => mockedUsedNavigate,
//   useParams: () => mockUserParams.mockReturnValue({ id: "00000000-0000-0000-0000-000000000000",}),
// }));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const mockFormInitService = jest.spyOn(FormService, "initForm");
const mockFormSubmitService =  jest.spyOn(FormService, "submitForm");
const mockRequestFlavorCodeService =  jest.spyOn(requestFlavorCodeService, "submitRequest");

let formSubmitResponse = new FormService.SubmitResultInstance();
const formInitResponse = new InitFormService.InitResultInstance();


describe("LandAddPlant Component", () => {

  beforeEach(async () => { 
    await AsyncStorage.setItem("@token", "sampleToken");
      mockFormInitService.mockResolvedValue({
        data: new InitFormService.InitResultInstance(),
      });
      
      mockRequestFlavorCodeService.mockResolvedValue({
        data: new requestFlavorCodeService.QueryResultTestInstance(),
      }); 
//endset
      
 
      render(
        
          <FormConnectedLandAddPlant name="testForm" 
            showProcessingAnimationOnInit={false} 
            landCode = "00000000-0000-0000-0000-000000000000"/>
        
      );  

      await waitFor(() => expect(mockRequestFlavorCodeService).toHaveBeenCalled());
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
 
    expect(screen.getByTestId("requestFlavorCode")).toBeTruthy();
    expect(screen.getByTestId("requestOtherFlavor")).toBeTruthy();
    expect(screen.getByTestId("requestSomeIntVal")).toBeTruthy();
    expect(screen.getByTestId("requestSomeBigIntVal")).toBeTruthy();
    expect(screen.getByTestId("requestSomeBitVal")).toBeTruthy();
    expect(screen.getByTestId("requestIsEditAllowed")).toBeTruthy();
    expect(screen.getByTestId("requestIsDeleteAllowed")).toBeTruthy();
    expect(screen.getByTestId("requestSomeFloatVal")).toBeTruthy();
    expect(screen.getByTestId("requestSomeDecimalVal")).toBeTruthy();
    expect(screen.getByTestId("requestSomeUTCDateTimeVal")).toBeTruthy();
    expect(screen.getByTestId("requestSomeDateVal")).toBeTruthy();
    expect(screen.getByTestId("requestSomeMoneyVal")).toBeTruthy();
    expect(screen.getByTestId("requestSomeNVarCharVal")).toBeTruthy();
    expect(screen.getByTestId("requestSomeVarCharVal")).toBeTruthy();
    expect(screen.getByTestId("requestSomeTextVal")).toBeTruthy();
    expect(screen.getByTestId("requestSomePhoneNumber")).toBeTruthy();
    expect(screen.getByTestId("requestSomeEmailAddress")).toBeTruthy();
    expect(screen.getByTestId("requestSampleImageUploadFile")).toBeTruthy();

    
    expect(screen.getByTestId("submit-button")).toBeTruthy();
    expect(screen.getByTestId("cancel-button")).toBeTruthy();
    expect(screen.getByTestId("other-button")).toBeTruthy();
     
    if("Add Plant".length > 0){ 
      expect(screen.getByTestId("page-title-text")).toBeTruthy();
      expect(screen.getByTestId("page-title-text").props.children)
      .toBe("Add Plant");
    }

    if("Add plant intro text.".length > 0){ 
      expect(screen.getByTestId("page-intro-text")).toBeTruthy();
      expect(screen.getByTestId("page-intro-text").props.children)
      .toBe("Add plant intro text.");
    }
    // if("Add plant form footer text".length > 0){ 
    //   expect(screen.getByTestId("page-footer-text")).toBeTruthy();
    //   expect(screen.getByTestId("page-footer-text"))
    //     .toHaveTextContent("Add plant form footer text");
    // }
     

     
  });

 

  it("when user entered LandAddPlant details and clicks on register button, LandAddPlantUser api should be called", async () => {
    mockFormSubmitService.mockResolvedValue({
      data: formSubmitResponse,
    }); 
     
    fireEvent.press(screen.getByTestId("submit-button")); 

    await waitFor(() => expect(mockFormSubmitService).toHaveBeenCalled());
  });
});
