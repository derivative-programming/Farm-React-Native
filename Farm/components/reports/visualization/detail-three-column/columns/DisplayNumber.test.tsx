/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  cleanup,
  screen,
  act,
  fireEvent,
} from "@testing-library/react-native";
import {ReportColumnDisplayNumber} from "./DisplayNumber";
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

  it("renders 123 correctly", async () => {

    render(
       <table><tbody><tr><ReportColumnDisplayNumber forColumn="testColumn" label="test label" rowIndex={1} value={123} /></tr></tbody></table>
    );

    expect(screen.getByText("123")).toBeTruthy();

  });

  it("renders 1234 correctly", async () => {

    render(
       <table><tbody><tr><ReportColumnDisplayNumber forColumn="testColumn" label="test label" rowIndex={1} value={1234} /></tr></tbody></table>
    );

    expect(screen.getByText("1,234")).toBeTruthy();

  });

  it("renders 123.4 correctly", async () => {

    render(
       <table><tbody><tr><ReportColumnDisplayNumber forColumn="testColumn" label="test label" rowIndex={1} value={123.4} /></tr></tbody></table>
    );

    expect(screen.getByText("123.4")).toBeTruthy();

  });

  it("renders 123.45 correctly", async () => {

    render(
       <table><tbody><tr><ReportColumnDisplayNumber forColumn="testColumn" label="test label" rowIndex={1} value={123.45} /></tr></tbody></table>
    );

    expect(screen.getByText("123.45")).toBeTruthy();

  });

  it("renders null correctly", async () => {
    const noVal:any = null;

    render(
      <table><tbody><tr><ReportColumnDisplayNumber forColumn="testColumn" label="test label" rowIndex={1} value={noVal} /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

  it("renders isVisible=false correctly", async () => {

    render(
       <table><tbody><tr><ReportColumnDisplayNumber forColumn="testColumn" label="test label" rowIndex={1} value={123} isVisible={false} /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

});
