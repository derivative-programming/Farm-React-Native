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
import ReportFilterLandPlantList from "./LandPlantList";  
import * as flavorCodeService from "../../lookups/services/Flavor"
import * as ReportService from "../services/LandPlantList";  

import '@testing-library/jest-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
 
const mockFlavorCodeService =  jest.spyOn(flavorCodeService, "submitRequest");
 
const onSubmit = jest.fn();

const intialQuery:ReportService.QueryRequest = new ReportService.QueryRequestInstance();


describe("LandPlantList Component", () => {

  beforeEach(async () => {  
    await AsyncStorage.setItem("@token", "sampleToken");

    mockFlavorCodeService.mockResolvedValue({
        data: new flavorCodeService.QueryResultTestInstance(),
      }); 
      

    render( 
        <ReportFilterLandPlantList 
          name="testForm" 
          initialQuery={intialQuery}
          onSubmit={onSubmit} />  
    ); 

    await waitFor(() => expect(mockFlavorCodeService).toHaveBeenCalled());
  });

  // after cleanup when test-case execution is done
  afterEach(cleanup);

  const initTest = async () => {
  }

  it("renders correctly", async () => { 
    expect(screen.getByTestId("testForm")).toBeTruthy();
    expect(screen.getByTestId("flavorFilterCode")).toBeTruthy();
    expect(screen.getByTestId("someFilterIntVal")).toBeTruthy();
    expect(screen.getByTestId("someFilterBigIntVal")).toBeTruthy();
    expect(screen.getByTestId("someFilterBitVal")).toBeTruthy();
    expect(screen.getByTestId("isFilterEditAllowed")).toBeTruthy();
    expect(screen.getByTestId("isFilterDeleteAllowed")).toBeTruthy();
    expect(screen.getByTestId("someFilterFloatVal")).toBeTruthy();
    expect(screen.getByTestId("someFilterDecimalVal")).toBeTruthy();
    expect(screen.getByTestId("someMinUTCDateTimeVal")).toBeTruthy();
    expect(screen.getByTestId("someMinDateVal")).toBeTruthy();
    expect(screen.getByTestId("someFilterMoneyVal")).toBeTruthy();
    expect(screen.getByTestId("someFilterNVarCharVal")).toBeTruthy();
    expect(screen.getByTestId("someFilterVarCharVal")).toBeTruthy();
    expect(screen.getByTestId("someFilterTextVal")).toBeTruthy();
    expect(screen.getByTestId("someFilterPhoneNumber")).toBeTruthy();
    expect(screen.getByTestId("someFilterEmailAddress")).toBeTruthy(); 
    expect(screen.getByTestId("someFilterUniqueIdentifier")).toBeTruthy(); 
    
    expect(screen.getByTestId("flavorFilterCode-label")).toBeTruthy();
    expect(screen.getByTestId("someFilterIntVal-label")).toBeTruthy();
    expect(screen.getByTestId("someFilterBigIntVal-label")).toBeTruthy();
    expect(screen.getByTestId("someFilterBitVal-field")).toBeTruthy();
    expect(screen.getByTestId("isFilterEditAllowed-field")).toBeTruthy();
    expect(screen.getByTestId("isFilterDeleteAllowed-field")).toBeTruthy();
    expect(screen.getByTestId("someFilterFloatVal-label")).toBeTruthy();
    expect(screen.getByTestId("someFilterDecimalVal-label")).toBeTruthy();
    expect(screen.getByTestId("someMinUTCDateTimeVal-label")).toBeTruthy();
    expect(screen.getByTestId("someMinDateVal-label")).toBeTruthy();
    expect(screen.getByTestId("someFilterMoneyVal-label")).toBeTruthy();
    expect(screen.getByTestId("someFilterNVarCharVal-label")).toBeTruthy();
    expect(screen.getByTestId("someFilterVarCharVal-label")).toBeTruthy();
    expect(screen.getByTestId("someFilterTextVal-label")).toBeTruthy();
    expect(screen.getByTestId("someFilterPhoneNumber-label")).toBeTruthy();
    expect(screen.getByTestId("someFilterEmailAddress-label")).toBeTruthy(); 
    expect(screen.getByTestId("someFilterUniqueIdentifier-label")).toBeTruthy(); 
    
    expect(screen.getByTestId("flavorFilterCode-field")).toBeTruthy();
    expect(screen.getByTestId("someFilterIntVal-field")).toBeTruthy();
    expect(screen.getByTestId("someFilterBigIntVal-field")).toBeTruthy();
    expect(screen.getByTestId("someFilterBitVal-field")).toBeTruthy();
    expect(screen.getByTestId("isFilterEditAllowed-field")).toBeTruthy();
    expect(screen.getByTestId("isFilterDeleteAllowed-field")).toBeTruthy();
    expect(screen.getByTestId("someFilterFloatVal-field")).toBeTruthy();
    expect(screen.getByTestId("someFilterDecimalVal-field")).toBeTruthy();
    expect(screen.getByTestId("someMinUTCDateTimeVal-field")).toBeTruthy();
    expect(screen.getByTestId("someMinDateVal-field")).toBeTruthy();
    expect(screen.getByTestId("someFilterMoneyVal-field")).toBeTruthy();
    expect(screen.getByTestId("someFilterNVarCharVal-field")).toBeTruthy();
    expect(screen.getByTestId("someFilterVarCharVal-field")).toBeTruthy();
    expect(screen.getByTestId("someFilterTextVal-field")).toBeTruthy();
    expect(screen.getByTestId("someFilterPhoneNumber-field")).toBeTruthy();
    expect(screen.getByTestId("someFilterEmailAddress-field")).toBeTruthy(); 
    expect(screen.getByTestId("someFilterUniqueIdentifier-field")).toBeTruthy(); 
  });
 

  it("when user enter flavorFilterCode, it set accordingly", async () => { 
    const input = screen.getByTestId("flavorFilterCode-field");
    await act(async () => {
      await fireEvent.change(input, { target: { value: "00000000-0000-0000-0000-000000000000" } });
    }); 
    expect(screen.getByTestId("flavorFilterCode-field")).toHaveValue("Please Select One");
  });
  it("when user enter someFilterIntVal, it set accordingly", async () => { 
    const input = screen.getByTestId("someFilterIntVal-field");
    fireEvent.changeText(input, '99');

    expect(input.props.value).toBe('99');
  });

  it("when user enter someFilterBigIntVal, it set accordingly", async () => { 
    const input = screen.getByTestId("someFilterBigIntVal-field");
    fireEvent.changeText(input, '99');

    expect(input.props.value).toBe('99');
  });

  it("when user enter someFilterBitVal, it set accordingly", async () => {
    const input = screen.getByTestId("someFilterBitVal-field"); 
    fireEvent.click(screen.getByTestId("someFilterBitVal-field"));
    expect(screen.getByTestId("someFilterBitVal-field")).toBeChecked();
  });

  it("when user enter isEditAllowed, it set accordingly", async () => {
    const input = screen.getByTestId("isEditAllowed-field");
    fireEvent.click(screen.getByTestId("isEditAllowed-field"));
    expect(screen.getByTestId("isEditAllowed-field")).toBeChecked();
  });

  it("when user enter isDeleteAllowed, it set accordingly", async () => {
    const input = screen.getByTestId("isDeleteAllowed-field");
    fireEvent.click(screen.getByTestId("isDeleteAllowed-field"));
    expect(screen.getByTestId("isDeleteAllowed-field")).toBeChecked();
  });

  it("when user enter someFilterFloatVal, it set accordingly", async () => {
    const input = screen.getByTestId("someFilterFloatVal-field");
    fireEvent(input, "onChangeText", "1"); 
    await waitFor(() => { 
      expect(input.props.value).toBe('1');
    });
  });

  it("when user enter someFilterDecimalVal, it set accordingly", async () => {
    const input = screen.getByTestId("someFilterDecimalVal-field");
    fireEvent(input, "onChangeText", "1"); 
    await waitFor(() => { 
      expect(input.props.value).toBe('1');
    });
  });

  it("when user enter someMinUTCDateTimeVal, it set accordingly", async () => {
    const input = screen.getByTestId("someMinUTCDateTimeVal-field");
    await act(async () => {
      await fireEvent.change(input, { target: { value: "1/1/2000" } });
    }); 
    //expect(screen.getByTestId("someMinUTCDateTimeVal-field")).toHaveValue("1/1/2000");
  });

  it("when user enter someMinDateVal, it set accordingly", async () => {
    const input = screen.getByTestId("someMinDateVal-field");
    await act(async () => {
      await fireEvent.change(input, { target: { value: "1/1/2000" } });
    }); 
   // expect(screen.getByTestId("someMinDateVal-field")).toHaveValue("1/1/2000");
  });

  it("when user enter someFilterMoneyVal, it set accordingly", async () => {
    const input = screen.getByTestId("someFilterMoneyVal-field");
    fireEvent(input, "onChangeText", "1"); 
    await waitFor(() => { 
      expect(input.props.value).toBe('1');
    });
  });

  it("when user enter someFilterNVarCharVal, it set accordingly", async () => {
    const input = screen.getByTestId("someFilterNVarCharVal-field");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  });

  it("when user enter someFilterVarCharVal, it set accordingly", async () => {
    const input = screen.getByTestId("someFilterVarCharVal-field");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  });

  it("when user enter someFilterTextVal, it set accordingly", async () => {
    const input = screen.getByTestId("someFilterTextVal-field");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  });

  it("when user enter someFilterPhoneNumber, it set accordingly", async () => {
    const input = screen.getByTestId("someFilterPhoneNumber-field");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  });

  it("when user enter someFilterEmailAddress, it set accordingly", async () => {
    const input = screen.getByTestId("someFilterEmailAddress-field");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  }); 

  it("when user enter someFilterUniqueIdentifier, it set accordingly", async () => {
    const input = screen.getByTestId("someFilterUniqueIdentifier-field");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  }); 

  it("when user entered LandPlantList details and clicks on register button, LandPlantListUser api should be called", async () => {
   
    const flavorFilterCode = screen.getByTestId("flavorFilterCode-field");
    await act(async () => {
      await fireEvent.change(flavorFilterCode, { target: { value: "99" } });
    });

    const someFilterIntValInput = screen.getByTestId("someFilterIntVal-field");
    await act(async () => {
      await fireEvent.change(someFilterIntValInput, { target: { value: "99" } });
    });
 
    const someFilterBigIntValInput = screen.getByTestId("someFilterBigIntVal-field");
    await act(async () => {
      await fireEvent.change(someFilterBigIntValInput, { target: { value: "99" } });
    });
 
    const someFilterBitValInput = screen.getByTestId("someFilterBitVal-field");
    await act(async () => {
      await fireEvent.change(someFilterBitValInput, { target: { checked: true } });
    });
 
    const isEditAllowedInput = screen.getByTestId("isEditAllowed-field");
    await act(async () => {
      await fireEvent.change(isEditAllowedInput, { target: { checked: true } });
    });
 
    const isDeleteAllowedInput = screen.getByTestId("isDeleteAllowed-field");
    await act(async () => {
      await fireEvent.change(isDeleteAllowedInput, { target: { checked: true } });
    });
 
    const someFilterFloatValInput = screen.getByTestId("someFilterFloatVal-field");
    await act(async () => {
      await fireEvent.change(someFilterFloatValInput, { target: { value: "99" } });
    });
 
    const someFilterDecimalValInput = screen.getByTestId("someFilterDecimalVal-field");
    await act(async () => {
      await fireEvent.change(someFilterDecimalValInput, { target: { value: "99" } });
    });
 
    const someMinUTCDateTimeValInput = screen.getByTestId("someMinUTCDateTimeVal-field");
    await act(async () => {
      await fireEvent.change(someMinUTCDateTimeValInput, { target: { value: "1/1/2000" } });
    });
 
    const someMinDateValInput = screen.getByTestId("someMinDateVal-field");
    await act(async () => {
      await fireEvent.change(someMinDateValInput, { target: { value: "1/1/2000" } });
    });
 
    const someFilterMoneyValInput = screen.getByTestId("someFilterMoneyVal-field");
    await act(async () => {
      await fireEvent.change(someFilterMoneyValInput, { target: { value: "99" } });
    });
 
    const someFilterNVarCharValInput = screen.getByTestId("someFilterNVarCharVal-field");
    await act(async () => {
      await fireEvent.change(someFilterNVarCharValInput, { target: { value: "Sample Data" } });
    });
 
    const someFilterVarCharValInput = screen.getByTestId("someFilterVarCharVal-field");
    await act(async () => {
      await fireEvent.change(someFilterVarCharValInput, { target: { value: "Sample Data" } });
    });
 
    const someFilterTextValInput = screen.getByTestId("someFilterTextVal-field");
    await act(async () => {
      await fireEvent.change(someFilterTextValInput, { target: { value: "Sample Data" } });
    });
 
    const someFilterPhoneNumberInput = screen.getByTestId("someFilterPhoneNumber-field");
    await act(async () => {
      await fireEvent.change(someFilterPhoneNumberInput, { target: { value: "Sample Data" } });
    });
 
    const someFilterEmailAddressInput = screen.getByTestId("someFilterEmailAddress-field");
    await act(async () => {
      await fireEvent.change(someFilterEmailAddressInput, { target: { value: "Sample Data" } });
    });
 
    const someFilterUniqueIdentifierInput = screen.getByTestId("someFilterUniqueIdentifier-field");
    await act(async () => {
      await fireEvent.change(someFilterUniqueIdentifierInput, { target: { value: "Sample Data" } });
    });
  
    await act(async () => {
      await fireEvent.click(screen.getByTestId("submit-button"));
    }); 
    
  });
});
