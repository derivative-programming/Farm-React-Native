import { render, screen } from "@testing-library/react-native";

import { InitResultInstance } from "../services/init/PacUserTriStateFilterListInitReport";
import HeaderPacUserTriStateFilterList, {
  HeaderPacUserTriStateFilterListProps,
} from "./PacUserTriStateFilterListInitReport";
import '@testing-library/jest-dom';

const TEST_ID = "test-header";
const mockInitData: HeaderPacUserTriStateFilterListProps["initData"] =
  new InitResultInstance();

const renderHeader = (props: HeaderPacUserTriStateFilterListProps) => {
  return render(<HeaderPacUserTriStateFilterList {...props} />);
};

describe("HeaderPacUserTriStateFilterList", () => {
  it("should render the component with the correct pac name", () => {
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

