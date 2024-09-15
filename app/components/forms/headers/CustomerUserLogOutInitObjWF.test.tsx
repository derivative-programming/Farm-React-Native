import { render, screen } from "@testing-library/react-native";
import { InitResultInstance } from "../services/init/CustomerUserLogOutInitObjWF";
import HeaderCustomerUserLogOut, {
  HeaderCustomerUserLogOutProps,
} from "./CustomerUserLogOutInitObjWF";
import '@testing-library/jest-dom';
const TEST_ID = "test-header";

const mockInitData: HeaderCustomerUserLogOutProps["initData"] =
  new InitResultInstance();

const renderHeader = (props: HeaderCustomerUserLogOutProps) => {
  return render(<HeaderCustomerUserLogOut {...props} />);
};
describe("HeaderCustomerUserLogOut", () => {
  it("should render the component with the correct customer name", () => {
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

