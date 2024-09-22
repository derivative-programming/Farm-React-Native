import { render, screen } from "@testing-library/react-native";

import { InitResultInstance } from "../services/init/LandPlantListInitReport";
import HeaderLandPlantList, {
  HeaderLandPlantListProps,
} from "./LandPlantListInitReport";
import '@testing-library/jest-dom';

const TEST_ID = "test-header"; 
const mockInitData: HeaderLandPlantListProps["initData"] =
  new InitResultInstance();
mockInitData.landName = "Test Land Name";
mockInitData.currentDateHeaderVal = "Test Current Date";
mockInitData.currentDateTimeHeaderVal = "Test Current Date Time";

const renderHeader = (props: HeaderLandPlantListProps) => {
  return render(<HeaderLandPlantList {...props} />);
};

describe("HeaderLandPlantList", () => {
  it("should render the component with the correct land name", () => {
    renderHeader({
      name: TEST_ID,
      isHeaderVisible: true,
      initData: mockInitData,
    });

    const headerElement = screen.getByTestId(TEST_ID);

    expect(headerElement).not.toHaveAttribute("hidden"); 
  });

  it("should be hidden elements when isHeaderVisible is false", () => {
    renderHeader({
      name: TEST_ID,
      isHeaderVisible: false,
      initData: mockInitData,
    });

    const headerElement = screen.getByTestId(TEST_ID);

    expect(headerElement).toBeTruthy();
    expect(headerElement).toHaveAttribute("hidden");
  });
});