/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  cleanup,
  screen,
  act,
  fireEvent,
} from "@testing-library/react-native";
import { ReportColumnDisplayDateTime } from "./DisplayDateTime";
import '@testing-library/jest-dom';

const initialValues = { testName:"" }

const handleSubmit = jest.fn();

const testId = 'testColumn-column-1';

describe("ReportColumnDisplayPhoneNumber Component", () => {
  // render the ReportColumnDisplayPhoneNumber component
  beforeEach(() => {
  });

  // after cleanup when test-case execution is done
  afterEach(cleanup);

  it("renders 2034-01-03T13:45:00Z correctly", async () => {
    render(
       <table><tbody><tr><ReportColumnDisplayDateTime forColumn="testColumn" label="test label" rowIndex={1} value={"2034-01-03T13:45:00Z"} /></tr></tbody></table>
    );

    expect(screen.getByText("1/3/2034 8:45 AM")).toBeTruthy();

  });

  it("renders 1753-01-01T00:00:00Z correctly", async () => {
    render(
       <table><tbody><tr><ReportColumnDisplayDateTime forColumn="testColumn" label="test label" rowIndex={1} value={"1753-01-01T00:00:00Z"} /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

  it("renders null correctly", async () => {
    const noVal:any = null;

    render(
       <table><tbody><tr><ReportColumnDisplayDateTime forColumn="testColumn" label="test label" rowIndex={1} value={noVal} /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

  it("renders isVisible=false correctly", async () => {

    render(
       <table><tbody><tr><ReportColumnDisplayDateTime forColumn="testColumn" label="test label" rowIndex={1} value="2034-01-03T00:45:00Z" isVisible={false} /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

});
