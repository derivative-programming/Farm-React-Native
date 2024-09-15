/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import {
  render,
  cleanup,
  screen,
  act,
} from "@testing-library/react-native";
import {ReportGridPacUserDateGreaterThanFilterList} from "./PacUserDateGreaterThanFilterList";

import '@testing-library/jest-dom';

const onSort = jest.fn();
const onExport = jest.fn();
const onNavigateTo = jest.fn();
const onRefreshRequest = jest.fn();
const onRefresh = jest.fn();
const onEndReached = jest.fn();

describe("PacUserDateGreaterThanFilterList Form Component", () => {
  // render the PacUserDateGreaterThanFilterList Form component
  beforeEach(async() => {
    await act(async () => {
      render(
        <ReportGridPacUserDateGreaterThanFilterList
          isSortDescending={true}
          items={[]}
          name="testName"
          contextCode=""
          onSort={onSort}
          onExport={onExport}
          onNavigateTo={onNavigateTo}
          onRefreshRequest={onRefreshRequest}
          sortedColumnName="testColumnName"
          currentPage={1}
          pageSize={10}
          totalItemCount={0}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
        />

      )
    });
  });

  // after cleanup when test-case execution is done
  afterEach(cleanup);

  it("renders correctly", async () => {
    expect(screen.getByTestId("testName")).toBeTruthy();
  });

});

