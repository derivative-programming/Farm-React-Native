/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  cleanup,
  screen,
  act,
  fireEvent,
} from "@testing-library/react-native";
import {ReportColumnDisplayUrl} from "./DisplayUrl";
import '@testing-library/jest-dom';

const initialValues = { testName:"" }

const handleSubmit = jest.fn();

const testId = 'testColumn-column-1';

describe("ReportColumnDisplayUrl Component", () => {
  // render the ReportColumnDisplayUrl component
  beforeEach(() => {
  });

  // after cleanup when test-case execution is done
  afterEach(cleanup);

  it("renders no value correctly", async () => {
    render(
       <table><tbody><tr><ReportColumnDisplayUrl forColumn="testColumn" label="test label" rowIndex={1} value="" linkText="Test Text" /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

  it("renders null correctly", async () => {
    const noVal:any = null;

    render(
       <table><tbody><tr><ReportColumnDisplayUrl forColumn="testColumn" label="test label" rowIndex={1} value={noVal} linkText="Test Text" /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

  it("renders isVisible=false correctly", async () => {

    render(
       <table><tbody><tr><ReportColumnDisplayUrl forColumn="testColumn" label="test label" rowIndex={1} value="test Value" isVisible={false} linkText="test text" /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

});
