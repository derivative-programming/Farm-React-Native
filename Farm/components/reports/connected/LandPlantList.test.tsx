/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  cleanup,
  screen,
  act, 
} from "@testing-library/react-native";
import ReportConnectedLandPlantList from "./LandPlantList"; 
import * as ReportService from "../services/LandPlantList";
import * as InitReportService from "../services/init/LandPlantListInitReport"; 
import * as flavorCodeService from "../../lookups/services/Flavor"

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
const mockFlavorCodeService =  jest.spyOn(flavorCodeService, "submitRequest");

describe("LandPlantList Connected Report Component", () => {
  // render the LandPlantList component
  beforeEach(async() => {
    await AsyncStorage.setItem("@token", "sampleToken");
    mockReportInitService.mockResolvedValue({
      data: new InitReportService.InitResultInstance(),
    });

    mockFlavorCodeService.mockResolvedValue({
      data: new flavorCodeService.QueryResultTestInstance(),
    }); 
    
    mockReportService.mockResolvedValue({
      data: new ReportService.QueryResultInstance(),
    }); 

    await act(async () => {
      render(
        
          <ReportConnectedLandPlantList landCode={"00000"} />
        
      
      )
    });
  });

  // after cleanup when test-case execution is done
  afterEach(cleanup);


  it("renders correctly", async () => {
    
    expect(screen.getByTestId("reportConnectedLandPlantList")).toBeTruthy();
       
    expect(screen.getByTestId("tacFarmDashboardBreadcrumb")).toBeTruthy();

    expect(screen.getByTestId("back-button")).toBeTruthy(); 
 
    if("A list of plants on the land".length > 0){ 
      expect(screen.getByTestId("page-intro-text")).toBeTruthy();
      expect(screen.getByTestId("page-intro-text"))
        .toHaveTextContent("A list of plants on the land");
    }

  });
 
});
