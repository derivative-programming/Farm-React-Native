/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  cleanup,
  screen,
  act,
  fireEvent,
} from "@testing-library/react-native";
import {ReportColumnDisplayPhoneNumber} from "./DisplayPhoneNumber";
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

  it("renders 1234567 correctly", async () => {
    render(
       <table><tbody><tr><ReportColumnDisplayPhoneNumber forColumn="testColumn" label="test label" rowIndex={1} value="1234567" /></tr></tbody></table>
    );

    expect(screen.getByText("123-4567")).toBeTruthy();

  });

  it("renders 123 4567 correctly", async () => {
    render(
       <table><tbody><tr><ReportColumnDisplayPhoneNumber forColumn="testColumn" label="test label" rowIndex={1} value="123 4567" /></tr></tbody></table>
    );

    expect(screen.getByText("123-4567")).toBeTruthy();

  });

  it("renders 123-4567 correctly", async () => {
    render(
       <table><tbody><tr><ReportColumnDisplayPhoneNumber forColumn="testColumn" label="test label" rowIndex={1} value="123-4567" /></tr></tbody></table>
    );

    expect(screen.getByText("123-4567")).toBeTruthy();

  });

  it("renders 1234567890 correctly", async () => {
    render(
       <table><tbody><tr><ReportColumnDisplayPhoneNumber forColumn="testColumn" label="test label" rowIndex={1} value="1234567890" /></tr></tbody></table>
    );

    expect(screen.getByText("(123) 456-7890")).toBeTruthy();

  });

  it("renders no value correctly", async () => {
    render(
      <table><tbody><tr><ReportColumnDisplayPhoneNumber forColumn="testColumn" label="test label" rowIndex={1} value="" /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

  it("renders null correctly", async () => {
    const noVal:any = null;

    render(
       <table><tbody><tr><ReportColumnDisplayPhoneNumber forColumn="testColumn" label="test label" rowIndex={1} value={noVal} /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

  it("renders isVisible=false correctly", async () => {

    render(
       <table><tbody><tr><ReportColumnDisplayPhoneNumber forColumn="testColumn" label="test label" rowIndex={1} value="test Value" isVisible={false} /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

});
