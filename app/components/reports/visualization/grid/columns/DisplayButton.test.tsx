/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  cleanup,
  screen,
  act,
  fireEvent,
} from "@testing-library/react-native";
import {ReportColumnDisplayButton} from "./DisplayButton";
import '@testing-library/jest-dom';

const initialValues = { testName:"" }

const handleSubmit = jest.fn();
const onPress = jest.fn();

const testId = 'testColumn-column-1';

describe("ReportColumnDisplayButton Component", () => {
  // render the ReportColumnDisplayButton component
  beforeEach(() => {
  });

  // after cleanup when test-case execution is done
  afterEach(cleanup);

  it("renders 'test Value' correctly", async () => {
    render(
       <table><tbody><tr><ReportColumnDisplayButton forColumn="testColumn" rowIndex={1} value="test Value" buttonText="test text" onPress={onPress} /></tr></tbody></table>
    );

    expect(screen.getByText("test text")).toBeTruthy();

  });

  it("renders no value correctly", async () => {
    render(
       <table><tbody><tr><ReportColumnDisplayButton forColumn="testColumn" rowIndex={1} value="" buttonText="test text" onPress={onPress} /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

  it("renders null correctly", async () => {
    const noVal:any = null;

    render(
       <table><tbody><tr><ReportColumnDisplayButton forColumn="testColumn" rowIndex={1} value={noVal} buttonText="test text" onPress={onPress} /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

  it("renders isVisible=false correctly", async () => {

    render(
       <table><tbody><tr><ReportColumnDisplayButton forColumn="testColumn" rowIndex={1} value="test Value" buttonText="test text" onPress={onPress} isVisible={false} /></tr></tbody></table>
    );

    expect(screen.getByTestId(testId)).toBeTruthy();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });

});
