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
import ReportFilterPlantUserDetails from "./PlantUserDetails";

import * as ReportService from "../services/PlantUserDetails";

import '@testing-library/jest-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

const onSubmit = jest.fn();

const intialQuery:ReportService.QueryRequest = new ReportService.QueryRequestInstance();

describe("PlantUserDetails Component", () => {

  beforeEach(async () => {
    await AsyncStorage.setItem("@token", "sampleToken");

    render(
        <ReportFilterPlantUserDetails
          name="testForm"
          initialQuery={intialQuery}
          onSubmit={onSubmit} />
    );

  });

  // after cleanup when test-case execution is done
  afterEach(cleanup);

  const initTest = async () => {
  }

  it("renders correctly", async () => {
    expect(screen.getByTestId("testForm")).toBeTruthy();

  });

  it("when user entered PlantUserDetails details and clicks on register button, PlantUserDetailsUser api should be called", async () => {

    await act(async () => {
      await fireEvent.click(screen.getByTestId("submit-button"));
    });

  });
});

