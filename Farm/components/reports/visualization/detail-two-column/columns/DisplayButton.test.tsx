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

const testId = 'testColumn-column-0-button';
 
describe("ReportColumnDisplayButton Component", () => {
  // render the ReportColumnDisplayButton component
  beforeEach(() => { 
  });

  // after cleanup when test-case execution is done
  afterEach(cleanup); 

  it("renders 'test Value' correctly", async () => {
    render(
       <ReportColumnDisplayButton forColumn="testColumn" buttonText="test text" value="test Value" onPress={onPress} />
    );

    expect(screen.getByText("test text")).toBeInTheDocument(); 
    
  });
 
  it("renders no value correctly", async () => {
    render(
       <ReportColumnDisplayButton forColumn="testColumn" buttonText="test label" value="" onPress={onPress} />
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });
  
  it("renders null correctly", async () => {
    const noVal:any = null;

    render(
       <ReportColumnDisplayButton forColumn="testColumn" buttonText="test label" value={noVal} onPress={onPress} />
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });
  
  it("renders isVisible=false correctly", async () => { 

    render(
      <ReportColumnDisplayButton forColumn="testColumn" buttonText="test label" value="test value"  onPress={onPress} isVisible={false} />
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();

    expect(screen.getByTestId(testId)).toContainHTML("<td testID=\"testColumn-column-1\" />");
  });
 
 
});
