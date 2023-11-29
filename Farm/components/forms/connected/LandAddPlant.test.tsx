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
//endset
  });

  // after cleanup when test-case execution is done
  afterEach(cleanup);

  const initTest = async () => {
  }

  it("renders correctly", async () => { 
    expect(screen.getByTestId("testForm")).toBeInTheDocument();
    expect(screen.getByTestId("headerErrors")).toBeInTheDocument();
 
    expect(screen.getByTestId("requestFlavorCode")).toBeInTheDocument();
    expect(screen.getByTestId("requestOtherFlavor")).toBeInTheDocument();
    expect(screen.getByTestId("requestSomeIntVal")).toBeInTheDocument();
    expect(screen.getByTestId("requestSomeBigIntVal")).toBeInTheDocument();
    expect(screen.getByTestId("requestSomeBitVal")).toBeInTheDocument();
    expect(screen.getByTestId("requestIsEditAllowed")).toBeInTheDocument();
    expect(screen.getByTestId("requestIsDeleteAllowed")).toBeInTheDocument();
    expect(screen.getByTestId("requestSomeFloatVal")).toBeInTheDocument();
    expect(screen.getByTestId("requestSomeDecimalVal")).toBeInTheDocument();
    expect(screen.getByTestId("requestSomeUTCDateTimeVal")).toBeInTheDocument();
    expect(screen.getByTestId("requestSomeDateVal")).toBeInTheDocument();
    expect(screen.getByTestId("requestSomeMoneyVal")).toBeInTheDocument();
    expect(screen.getByTestId("requestSomeNVarCharVal")).toBeInTheDocument();
    expect(screen.getByTestId("requestSomeVarCharVal")).toBeInTheDocument();
    expect(screen.getByTestId("requestSomeTextVal")).toBeInTheDocument();
    expect(screen.getByTestId("requestSomePhoneNumber")).toBeInTheDocument();
    expect(screen.getByTestId("requestSomeEmailAddress")).toBeInTheDocument();
    expect(screen.getByTestId("requestSampleImageUploadFile")).toBeInTheDocument();

    
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    expect(screen.getByTestId("cancel-button")).toBeInTheDocument();
    expect(screen.getByTestId("other-button")).toBeInTheDocument();
     
    if("Add plant intro text.".length > 0){ 
      expect(screen.getByTestId("page-intro-text")).toBeInTheDocument();
      expect(screen.getByTestId("page-intro-text"))
        .toHaveTextContent("Add plant intro text.");
    }
    if("Add plant form footer text".length > 0){ 
      expect(screen.getByTestId("page-footer-text")).toBeInTheDocument();
      expect(screen.getByTestId("page-footer-text"))
        .toHaveTextContent("Add plant form footer text");
    }
    
    await waitFor(() => expect(mockFormInitService).toHaveBeenCalled()); 
  });


  it("when user enter requestFlavorCode, it set accordingly", async () => {   

    const input = screen.getByTestId("requestFlavorCode");
    expect(screen.getByTestId("testForm")).toBeInTheDocument();
    expect(screen.getByTestId("requestFlavorCode")).toHaveTextContent("Please Select One"); 
    //await act(async () => {
      await fireEvent.change(input, { target: { value: "00000000-0000-0000-0000-000000000000" } }); 
    // }); 
    expect(screen.getByTestId("requestFlavorCode")).toHaveValue("00000000-0000-0000-0000-000000000000");
  });


  it("when user enter requestOtherFlavor, it set accordingly", async () => {   

    const input = screen.getByTestId("requestOtherFlavor");
    expect(screen.getByTestId("testForm")).toBeInTheDocument();
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  });

  it("when user enter requestSomeIntVal, it set accordingly", async () => { 
    const input = screen.getByTestId("requestSomeIntVal");
    fireEvent.changeText(input, '99');

    expect(input.props.value).toBe('99');
  });

  it("when user enter requestSomeBigIntVal, it set accordingly", async () => { 
    const input = screen.getByTestId("requestSomeBigIntVal");
    fireEvent.changeText(input, '99');

    expect(input.props.value).toBe('99');
  });

  it("when user enter requestSomeBitVal, it set accordingly", async () => {
    const input = screen.getByTestId("requestSomeBitVal"); 
    fireEvent.press(input);
    expect(input).toBeChecked();
  });

  it("when user enter requestIsEditAllowed, it set accordingly", async () => {
    const input = screen.getByTestId("requestIsEditAllowed"); 
    expect(input.props.value).toBe(false);
    // fireEvent.press(input);
    // expect(input).toBeChecked();

    fireEvent(input, 'onValueChange');
 
    await waitFor(() => { 
      expect(input.props.value).toBe(true);
    });
  });

  it("when user enter requestIsDeleteAllowed, it set accordingly", async () => {
    const input = screen.getByTestId("requestIsDeleteAllowed"); 
    fireEvent.click(screen.getByTestId("requestIsDeleteAllowed"));
    expect(screen.getByTestId("requestIsDeleteAllowed")).toBeChecked();
  });

  it("when user enter requestSomeFloatVal, it set accordingly", async () => {
    const input = screen.getByTestId("requestSomeFloatVal");
    //await act(async () => {
      // await fireEvent.change(input, { target: { value: "1" } });
      fireEvent(input, "onChangeText", "1");
    // });  
    // expect(screen.getByTestId("requestSomeFloatVal")).toHaveValue(1);
    await waitFor(() => { 
      expect(input.props.value).toBe('1');
    });
  });

  it("when user enter requestSomeDecimalVal, it set accordingly", async () => {
    const input = screen.getByTestId("requestSomeDecimalVal");
    //await act(async () => {
      // await fireEvent.change(input, { target: { value: "1" } });
    fireEvent(input, "onChangeText", "1");
    // }); 
    // expect(screen.getByTestId("requestSomeDecimalVal")).toHaveValue(1);
    await waitFor(() => { 
      expect(input.props.value).toBe('1');
    });
  });

  it("when user enter requestSomeUTCDateTimeVal, it set accordingly", async () => {
    const input = screen.getByTestId("requestSomeUTCDateTimeVal");
    //await act(async () => {
      // await fireEvent.change(input, { target: { value: "1/1/2000" } });
    fireEvent(input, "onChangeText", "1/1/2000");
    // }); 
    // expect(screen.getByTestId("requestSomeUTCDateTimeVal")).toHaveValue("1/1/2000");
    await waitFor(() => { 
      expect(input.props.value).toBe('1/1/2000');
    });
  });

  it("when user enter requestSomeDateVal, it set accordingly", async () => {
    const input = screen.getByTestId("requestSomeDateVal");
    //await act(async () => {
      // await fireEvent.change(input, { target: { value: "1/1/2000" } });
    fireEvent(input, "onChangeText", "1/1/2000");
    // }); 
    // expect(screen.getByTestId("requestSomeDateVal")).toHaveValue("1/1/2000");
    await waitFor(() => { 
      expect(input.props.value).toBe('1/1/2000');
    });
  });

  it("when user enter requestSomeMoneyVal, it set accordingly", async () => {
    const input = screen.getByTestId("requestSomeMoneyVal");
    //await act(async () => {
      // await fireEvent.change(input, { target: { value: "1" } });
      fireEvent(input, "onChangeText", "1");
    // }); 
    // expect(input).toHaveValue(1);
    await waitFor(() => { 
      expect(input.props.value).toBe('1');
    });
  });

  it("when user enter requestSomeNVarCharVal, it set accordingly", async () => {
    const input = screen.getByTestId("requestSomeNVarCharVal");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  });

  it("when user enter requestSomeVarCharVal, it set accordingly", async () => {
    const input = screen.getByTestId("requestSomeVarCharVal");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  });

  it("when user enter requestSomeTextVal, it set accordingly", async () => {
    const input = screen.getByTestId("requestSomeTextVal");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  });

  it("when user enter requestSomePhoneNumber, it set accordingly", async () => {
    const input = screen.getByTestId("requestSomePhoneNumber");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  });

  it("when user enter requestSomeEmailAddress, it set accordingly", async () => {
    const input = screen.getByTestId("requestSomeEmailAddress");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  });

  it("when user enter requestSampleImageUploadFile, it set accordingly", async () => {
    const input = screen.getByTestId("requestSampleImageUploadFile");
    //await act(async () => {
     // await fireEvent.change(input, { target: { value: "1" } });
    // }); 
  //  expect(screen.getByTestId("requestSampleImageUploadFile")).toHaveValue(1);
  });



  it("when user entered LandAddPlant details and clicks on register button, LandAddPlantUser api should be called", async () => {
    mockFormSubmitService.mockResolvedValue({
      data: formSubmitResponse,
    }); 
   
    const requestFlavorCodeInput = screen.getByTestId("requestFlavorCode");
    //await act(async () => {
        // await fireEvent.change(requestFlavorCodeInput, { target: { value: "Test@123" } });
        fireEvent(requestFlavorCodeInput, "onChangeText", "Test@123");
    // }); 
 
   
    const requestOtherFlavorInput = screen.getByTestId("requestOtherFlavor");
    //await act(async () => {
      // await fireEvent.change(requestOtherFlavorInput, { target: { value: "Test@123" } });
      fireEvent(requestOtherFlavorInput, "onChangeText", "xyz");
    // });
 
    const requestSomeIntValInput = screen.getByTestId("requestSomeIntVal");
    //await act(async () => {
      // await fireEvent.change(requestSomeIntValInput, { target: { value: "99" } });
      fireEvent(requestSomeIntValInput, "onChangeText", "99");
    // });
 
    const requestSomeBigIntValInput = screen.getByTestId("requestSomeBigIntVal");
    //await act(async () => {
      // await fireEvent.change(requestSomeBigIntValInput, { target: { value: "99" } });
      fireEvent(requestSomeBigIntValInput, "onChangeText", "99");
    // });
 
    const requestSomeBitValInput = screen.getByTestId("requestSomeBitVal");
    fireEvent.click(screen.getByTestId("requestSomeBitVal"));
 
    const requestIsEditAllowedInput = screen.getByTestId("requestIsEditAllowed"); 
    fireEvent.click(screen.getByTestId("requestIsEditAllowed"));
 
    const requestIsDeleteAllowedInput = screen.getByTestId("requestIsDeleteAllowed"); 
    fireEvent.click(screen.getByTestId("requestIsDeleteAllowed"));
 
    const requestSomeFloatValInput = screen.getByTestId("requestSomeFloatVal");
    //await act(async () => {
      // await fireEvent.change(requestSomeFloatValInput, { target: { value: "99" } });
      fireEvent(requestSomeFloatValInput, "onChangeText", "99");
    // });
 
    const requestSomeDecimalValInput = screen.getByTestId("requestSomeDecimalVal");
    //await act(async () => {
      // await fireEvent.change(requestSomeDecimalValInput, { target: { value: "99" } });
      fireEvent(requestSomeDecimalValInput, "onChangeText", "99");
    // });
 
    const requestSomeUTCDateTimeValInput = screen.getByTestId("requestSomeUTCDateTimeVal");
    //await act(async () => {
      // await fireEvent.change(requestSomeUTCDateTimeValInput, { target: { value: "1/1/2000" } });
      fireEvent(requestSomeUTCDateTimeValInput, "onChangeText", "1/1/2000");
    // });
 
    const requestSomeDateValInput = screen.getByTestId("requestSomeDateVal");
    //await act(async () => {
      // await fireEvent.change(requestSomeDateValInput, { target: { value: "1/1/2000" } });
      fireEvent(requestSomeDateValInput, "onChangeText", "1/1/2000");
    // });
 
    const requestSomeMoneyValInput = screen.getByTestId("requestSomeMoneyVal");
    //await act(async () => {
      // await fireEvent.change(requestSomeMoneyValInput, { target: { value: "99" } });
      fireEvent(requestSomeMoneyValInput, "onChangeText", "99");
    // });
 
    const requestSomeNVarCharValInput = screen.getByTestId("requestSomeNVarCharVal");
    //await act(async () => {
      // await fireEvent.change(requestSomeNVarCharValInput, { target: { value: "Sample Data" } });
      fireEvent(requestSomeNVarCharValInput, "onChangeText", "Sample Data");
    // });
 
    const requestSomeVarCharValInput = screen.getByTestId("requestSomeVarCharVal");
    //await act(async () => {
      // await fireEvent.change(requestSomeVarCharValInput, { target: { value: "Sample Data" } });
      fireEvent(requestSomeVarCharValInput, "onChangeText", "Sample Data");
    // });
 
    const requestSomeTextValInput = screen.getByTestId("requestSomeTextVal");
    //await act(async () => {
      // await fireEvent.change(requestSomeTextValInput, { target: { value: "Sample Data" } });
      fireEvent(requestSomeTextValInput, "onChangeText", "Sample Data");
    // });
 
    const requestSomePhoneNumberInput = screen.getByTestId("requestSomePhoneNumber");
    //await act(async () => {
      // await fireEvent.change(requestSomePhoneNumberInput, { target: { value: "Sample Data" } });
      fireEvent(requestSomePhoneNumberInput, "onChangeText", "123-123-1234");
    // });
 
    const requestSomeEmailAddressInput = screen.getByTestId("requestSomeEmailAddress");
    //await act(async () => {
      // await fireEvent.change(requestSomeEmailAddressInput, { target: { value: "Sample Data" } });
      fireEvent(requestSomeEmailAddressInput, "onChangeText", "test@test.com");
    // });
 
    const requestSampleImageUploadFileInput = screen.getByTestId("requestSampleImageUploadFile");
    //await act(async () => {
    //  await fireEvent.change(requestSampleImageUploadFileInput, { target: { value: "Sample Data" } });
    // });

    //await act(async () => {
      await fireEvent.click(screen.getByTestId("submit-button"));
    // });

    await waitFor(() => expect(mockFormSubmitService).toHaveBeenCalled());
  });
});
