import { render, screen } from "@testing-library/react-native";
import { InitResultInstance } from "../services/init/PacUserFlavorListInitReport";
import HeaderPacUserFlavorList, {
  HeaderPacUserFlavorListProps,
} from "./PacUserFlavorListInitReport";
import '@testing-library/jest-dom';
const TEST_ID = "test-header";

const mockInitData: HeaderPacUserFlavorListProps["initData"] =
  new InitResultInstance();

const renderHeader = (props: HeaderPacUserFlavorListProps) => {
  return render(<HeaderPacUserFlavorList {...props} />);
};
describe("HeaderPacAddPlant", () => {
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
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveAttribute("hidden");
  });
});

