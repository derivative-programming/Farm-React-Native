/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  cleanup,
  screen,
  act,
  fireEvent,
} from "@testing-library/react-native";
import {ReportColumnDisplayText} from "./DisplayText";
import '@testing-library/jest-dom';

const initialValues = { testName:"" }

const handleSubmit = jest.fn();

const testId = 'testColumn-column-1';

describe("ReportColumnDisplayText Component", () => {
  // render the ReportColumnDisplayText component
  beforeEach(() => {
  });

  // after cleanup when test-case execution is done
  afterEach(cleanup);

  it("renders 'test Value' correctly", async () => {
    render(
       <table><tbody><tr><ReportColumnDisplayText forColumn="testColumn" label="test label" rowIndex={1} value="test Value" /></tr></tbody></table>
    );

    expect(screen.getByText("test Value")).toBeTruthy();

  });

  it("renders no value correctly", async () => {
    render(
       <table><tbody><tr><ReportColumnDisplayText forColumn="testColumn" label="test label" rowIndex={1} value="" /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

  it("renders null correctly", async () => {
    const noVal:any = null;

    render(
       <table><tbody><tr><ReportColumnDisplayText forColumn="testColumn" label="test label" rowIndex={1} value={noVal} /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

  it("renders isVisible=false correctly", async () => {

    render(
       <table><tbody><tr><ReportColumnDisplayText forColumn="testColumn" label="test label" rowIndex={1} value="test Value" isVisible={false} /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

});
