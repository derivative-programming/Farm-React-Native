/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  cleanup,
  screen,
  act,
} from "@testing-library/react-native";
import ReportConnectedTacFarmDashboard from "./TacFarmDashboard";
import * as ReportService from "../services/TacFarmDashboard";
import * as InitReportService from "../services/init/TacFarmDashboardInitReport";


import '@testing-library/jest-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
const mockedUsedNavigate = jest.fn();
const mockParams = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => mockParams.mockReturnValue({ id: "00000000-0000-0000-0000-000000000000",}),
}));
const mockReportInitService = jest.spyOn(ReportService, "initPage");
const mockReportService = jest.spyOn(ReportService, "submitRequest");

describe("TacFarmDashboard Connected Report Component", () => {
  // render the TacFarmDashboard component
  beforeEach(async() => {
    await AsyncStorage.setItem("@token", "sampleToken");
    mockReportInitService.mockResolvedValue({
      data: new InitReportService.InitResultInstance(),
    });

    mockReportService.mockResolvedValue({
      data: new ReportService.QueryResultInstance(),
    });
    await act(async () => {
      render(
          <ReportConnectedTacFarmDashboard />
      )
    });
  });
  // after cleanup when test-case execution is done
  afterEach(cleanup);
  it("renders correctly", async () => {
    expect(screen.getByTestId("reportConnectedTacFarmDashboard")).toBeInTheDocument();

    if("Farm Dashboard page intro text".length > 0){
      expect(screen.getByTestId("page-intro-text")).toBeInTheDocument();
      expect(screen.getByTestId("page-intro-text"))
        .toHaveTextContent("Farm Dashboard page intro text");
    }
  });
});

