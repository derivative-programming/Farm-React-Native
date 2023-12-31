/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  cleanup,
  screen,
  act,
} from "@testing-library/react-native";
import ReportConnectedPacUserFlavorList from "./PacUserFlavorList";
import * as ReportService from "../services/PacUserFlavorList";
import * as InitReportService from "../services/init/PacUserFlavorListInitReport";


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

describe("PacUserFlavorList Connected Report Component", () => {
  // render the PacUserFlavorList component
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
          <ReportConnectedPacUserFlavorList />
      )
    });
  });
  // after cleanup when test-case execution is done
  afterEach(cleanup);
  it("renders correctly", async () => {
    expect(screen.getByTestId("reportConnectedPacUserFlavorList")).toBeInTheDocument();

    if("".length > 0){
      expect(screen.getByTestId("page-intro-text")).toBeInTheDocument();
      expect(screen.getByTestId("page-intro-text"))
        .toHaveTextContent("");
    }
  });
});

