import { render, screen } from "@testing-library/react-native";

import { InitResultInstance } from "../services/init/PlantUserDetailsInitReport";
import HeaderPlantUserDetails, {
  HeaderPlantUserDetailsProps,
} from "./PlantUserDetailsInitReport";
import '@testing-library/jest-dom';

const TEST_ID = "test-header";
const mockInitData: HeaderPlantUserDetailsProps["initData"] =
  new InitResultInstance();

const renderHeader = (props: HeaderPlantUserDetailsProps) => {
  return render(<HeaderPlantUserDetails {...props} />);
};

describe("HeaderPlantUserDetails", () => {
  it("should render the component with the correct plant name", () => {
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

