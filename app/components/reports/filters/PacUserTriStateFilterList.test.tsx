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
import ReportFilterPacUserTriStateFilterList from "./PacUserTriStateFilterList";
import * as flavorCodeService from "../../lookups/services/Flavor"
import * as ReportService from "../services/PacUserTriStateFilterList";

import '@testing-library/jest-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mockFlavorCodeService =  jest.spyOn(flavorCodeService, "submitRequest");

const onSubmit = jest.fn();

const intialQuery:ReportService.QueryRequest = new ReportService.QueryRequestInstance();

describe("PacUserTriStateFilterList Component", () => {

  beforeEach(async () => {
    await AsyncStorage.setItem("@token", "sampleToken");

    mockFlavorCodeService.mockResolvedValue({
        data: new flavorCodeService.QueryResultTestInstance(),
      });

    render(
        <ReportFilterPacUserTriStateFilterList
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

  it("when user entered PacUserTriStateFilterList details and clicks on register button, PacUserTriStateFilterList api should be called", async () => {

    await act(async () => {

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

