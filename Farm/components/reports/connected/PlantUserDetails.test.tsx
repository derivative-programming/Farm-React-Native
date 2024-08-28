/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  cleanup,
  screen,
  act,
} from "@testing-library/react-native";
import ReportConnectedPlantUserDetails from "./PlantUserDetails";
import * as ReportService from "../services/PlantUserDetails";
import * as InitReportService from "../services/init/PlantUserDetailsInitReport";

import '@testing-library/jest-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mockedUsedNavigate = jest.fn();
const mockUserParams = jest.fn();

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

const mockReportInitService = jest.spyOn(ReportService, "initPage");
const mockReportService = jest.spyOn(ReportService, "submitRequest");

describe("PlantUserDetails Connected Report Component", () => {
  // render the PlantUserDetails component
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

          <ReportConnectedPlantUserDetails plantCode={"00000"} />

      )
    });
  });

  // after cleanup when test-case execution is done
  afterEach(cleanup);

  it("renders correctly", async () => {

    expect(screen.getByTestId("reportConnectedPlantUserDetails")).toBeTruthy();
    expect(screen.getByTestId("tacFarmDashboardBreadcrumb")).toBeTruthy();
    expect(screen.getByTestId("landPlantListBreadcrumb")).toBeTruthy();
    expect(screen.getByTestId("back-button")).toBeTruthy();
    if("Plant Details page intro text".length > 0){
      expect(screen.getByTestId("page-intro-text")).toBeTruthy();
      expect(screen.getByTestId("page-intro-text"))
        .toHaveTextContent("Plant Details page intro text");
    }

  });

});

