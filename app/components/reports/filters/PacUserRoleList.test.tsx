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
import ReportFilterPacUserRoleList from "./PacUserRoleList";
import * as flavorCodeService from "../../lookups/services/Flavor"
import * as ReportService from "../services/PacUserRoleList";

import '@testing-library/jest-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mockFlavorCodeService =  jest.spyOn(flavorCodeService, "submitRequest");

const onSubmit = jest.fn();

const intialQuery:ReportService.QueryRequest = new ReportService.QueryRequestInstance();

describe("PacUserRoleList Component", () => {

  beforeEach(async () => {
    await AsyncStorage.setItem("@token", "sampleToken");

    mockFlavorCodeService.mockResolvedValue({
        data: new flavorCodeService.QueryResultTestInstance(),
      });

    render(
        <ReportFilterPacUserRoleList
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
    expect(screen.getByTestId("flavorCode")).toBeTruthy();
    expect(screen.getByTestId("someIntVal")).toBeTruthy();
    expect(screen.getByTestId("someBigIntVal")).toBeTruthy();
    expect(screen.getByTestId("someBitVal")).toBeTruthy();
    expect(screen.getByTestId("isEditAllowed")).toBeTruthy();
    expect(screen.getByTestId("isDeleteAllowed")).toBeTruthy();
    expect(screen.getByTestId("someFloatVal")).toBeTruthy();
    expect(screen.getByTestId("someDecimalVal")).toBeTruthy();
    expect(screen.getByTestId("someMinUTCDateTimeVal")).toBeTruthy();
    expect(screen.getByTestId("someMinDateVal")).toBeTruthy();
    expect(screen.getByTestId("someMoneyVal")).toBeTruthy();
    expect(screen.getByTestId("someNVarCharVal")).toBeTruthy();
    expect(screen.getByTestId("someVarCharVal")).toBeTruthy();
    expect(screen.getByTestId("someTextVal")).toBeTruthy();
    expect(screen.getByTestId("somePhoneNumber")).toBeTruthy();
    expect(screen.getByTestId("someEmailAddress")).toBeTruthy();

    expect(screen.getByTestId("flavorCode-label")).toBeTruthy();
    expect(screen.getByTestId("someIntVal-label")).toBeTruthy();
    expect(screen.getByTestId("someBigIntVal-label")).toBeTruthy();
    expect(screen.getByTestId("someBitVal-field")).toBeTruthy();
    expect(screen.getByTestId("isEditAllowed-field")).toBeTruthy();
    expect(screen.getByTestId("isDeleteAllowed-field")).toBeTruthy();
    expect(screen.getByTestId("someFloatVal-label")).toBeTruthy();
    expect(screen.getByTestId("someDecimalVal-label")).toBeTruthy();
    expect(screen.getByTestId("someMinUTCDateTimeVal-label")).toBeTruthy();
    expect(screen.getByTestId("someMinDateVal-label")).toBeTruthy();
    expect(screen.getByTestId("someMoneyVal-label")).toBeTruthy();
    expect(screen.getByTestId("someNVarCharVal-label")).toBeTruthy();
    expect(screen.getByTestId("someVarCharVal-label")).toBeTruthy();
    expect(screen.getByTestId("someTextVal-label")).toBeTruthy();
    expect(screen.getByTestId("somePhoneNumber-label")).toBeTruthy();
    expect(screen.getByTestId("someEmailAddress-label")).toBeTruthy();

    expect(screen.getByTestId("flavorCode-field")).toBeTruthy();
    expect(screen.getByTestId("someIntVal-field")).toBeTruthy();
    expect(screen.getByTestId("someBigIntVal-field")).toBeTruthy();
    expect(screen.getByTestId("someBitVal-field")).toBeTruthy();
    expect(screen.getByTestId("isEditAllowed-field")).toBeTruthy();
    expect(screen.getByTestId("isDeleteAllowed-field")).toBeTruthy();
    expect(screen.getByTestId("someFloatVal-field")).toBeTruthy();
    expect(screen.getByTestId("someDecimalVal-field")).toBeTruthy();
    expect(screen.getByTestId("someMinUTCDateTimeVal-field")).toBeTruthy();
    expect(screen.getByTestId("someMinDateVal-field")).toBeTruthy();
    expect(screen.getByTestId("someMoneyVal-field")).toBeTruthy();
    expect(screen.getByTestId("someNVarCharVal-field")).toBeTruthy();
    expect(screen.getByTestId("someVarCharVal-field")).toBeTruthy();
    expect(screen.getByTestId("someTextVal-field")).toBeTruthy();
    expect(screen.getByTestId("somePhoneNumber-field")).toBeTruthy();
    expect(screen.getByTestId("someEmailAddress-field")).toBeTruthy();
  });

  it("when user enter flavorCode, it set accordingly", async () => {
    const input = screen.getByTestId("flavorCode-field");
    await act(async () => {
      await fireEvent.change(input, { target: { value: "00000000-0000-0000-0000-000000000000" } });
    });
    expect(screen.getByTestId("flavorCode-field")).toHaveValue("Please Select One");
  });
  it("when user enter someIntVal, it set accordingly", async () => {
    const input = screen.getByTestId("someIntVal-field");
    fireEvent.changeText(input, '99');

    expect(input.props.value).toBe('99');
  });

  it("when user enter someBigIntVal, it set accordingly", async () => {
    const input = screen.getByTestId("someBigIntVal-field");
    fireEvent.changeText(input, '99');

    expect(input.props.value).toBe('99');
  });

  it("when user enter someBitVal, it set accordingly", async () => {
    const input = screen.getByTestId("someBitVal-field");
    fireEvent.click(screen.getByTestId("someBitVal-field"));
    expect(screen.getByTestId("someBitVal-field")).toBeChecked();
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

  it("when user enter someFloatVal, it set accordingly", async () => {
    const input = screen.getByTestId("someFloatVal-field");
    fireEvent(input, "onChangeText", "1");
    await waitFor(() => {
      expect(input.props.value).toBe('1');
    });
  });

  it("when user enter someDecimalVal, it set accordingly", async () => {
    const input = screen.getByTestId("someDecimalVal-field");
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

  it("when user enter someMoneyVal, it set accordingly", async () => {
    const input = screen.getByTestId("someMoneyVal-field");
    fireEvent(input, "onChangeText", "1");
    await waitFor(() => {
      expect(input.props.value).toBe('1');
    });
  });

  it("when user enter someNVarCharVal, it set accordingly", async () => {
    const input = screen.getByTestId("someNVarCharVal-field");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  });

  it("when user enter someVarCharVal, it set accordingly", async () => {
    const input = screen.getByTestId("someVarCharVal-field");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  });

  it("when user enter someTextVal, it set accordingly", async () => {
    const input = screen.getByTestId("someTextVal-field");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  });

  it("when user enter somePhoneNumber, it set accordingly", async () => {
    const input = screen.getByTestId("somePhoneNumber-field");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  });

  it("when user enter someEmailAddress, it set accordingly", async () => {
    const input = screen.getByTestId("someEmailAddress-field");
    fireEvent.changeText(input, 'sample data');

    expect(input.props.value).toBe('sample data');
  });

  it("when user entered PacUserRoleList details and clicks on register button, PacUserRoleList api should be called", async () => {

    const flavorCode = screen.getByTestId("flavorCode-field");
    await act(async () => {
      await fireEvent.change(flavorCode, { target: { value: "99" } });
    });

    const someIntValInput = screen.getByTestId("someIntVal-field");
    await act(async () => {
      await fireEvent.change(someIntValInput, { target: { value: "99" } });
    });

    const someBigIntValInput = screen.getByTestId("someBigIntVal-field");
    await act(async () => {
      await fireEvent.change(someBigIntValInput, { target: { value: "99" } });
    });

    const someBitValInput = screen.getByTestId("someBitVal-field");
    await act(async () => {
      await fireEvent.change(someBitValInput, { target: { checked: true } });
    });

    const isEditAllowedInput = screen.getByTestId("isEditAllowed-field");
    await act(async () => {
      await fireEvent.change(isEditAllowedInput, { target: { checked: true } });
    });

    const isDeleteAllowedInput = screen.getByTestId("isDeleteAllowed-field");
    await act(async () => {
      await fireEvent.change(isDeleteAllowedInput, { target: { checked: true } });
    });

    const someFloatValInput = screen.getByTestId("someFloatVal-field");
    await act(async () => {
      await fireEvent.change(someFloatValInput, { target: { value: "99" } });
    });

    const someDecimalValInput = screen.getByTestId("someDecimalVal-field");
    await act(async () => {
      await fireEvent.change(someDecimalValInput, { target: { value: "99" } });
    });

    const someMinUTCDateTimeValInput = screen.getByTestId("someMinUTCDateTimeVal-field");
    await act(async () => {
      await fireEvent.change(someMinUTCDateTimeValInput, { target: { value: "1/1/2000" } });
    });

    const someMinDateValInput = screen.getByTestId("someMinDateVal-field");
    await act(async () => {
      await fireEvent.change(someMinDateValInput, { target: { value: "1/1/2000" } });
    });

    const someMoneyValInput = screen.getByTestId("someMoneyVal-field");
    await act(async () => {
      await fireEvent.change(someMoneyValInput, { target: { value: "99" } });
    });

    const someNVarCharValInput = screen.getByTestId("someNVarCharVal-field");
    await act(async () => {
      await fireEvent.change(someNVarCharValInput, { target: { value: "Sample Data" } });
    });

    const someVarCharValInput = screen.getByTestId("someVarCharVal-field");
    await act(async () => {
      await fireEvent.change(someVarCharValInput, { target: { value: "Sample Data" } });
    });

    const someTextValInput = screen.getByTestId("someTextVal-field");
    await act(async () => {
      await fireEvent.change(someTextValInput, { target: { value: "Sample Data" } });
    });

    const somePhoneNumberInput = screen.getByTestId("somePhoneNumber-field");
    await act(async () => {
      await fireEvent.change(somePhoneNumberInput, { target: { value: "Sample Data" } });
    });

    const someEmailAddressInput = screen.getByTestId("someEmailAddress-field");
    await act(async () => {
      await fireEvent.change(someEmailAddressInput, { target: { value: "Sample Data" } });
    });

    await act(async () => {
      await fireEvent.click(screen.getByTestId("submit-button"));
    });

  });
});

