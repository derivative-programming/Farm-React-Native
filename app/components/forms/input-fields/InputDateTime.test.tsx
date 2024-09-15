import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Formik } from 'formik';
import { FormInputDateTime } from './InputDateTime'; // Adjust the import path

describe('FormInputDateTime', () => {
  const mockFieldName = 'testDateTime';
  const mockLabel = 'Test Date & Time';
  const placeholder = 'Select Date & Time';

  it('renders correctly when visible', () => {
    const { getByTestId, getByText } = render(
      <Formik initialValues={{ [mockFieldName]: '' }} onSubmit={() => {}}>
        <FormInputDateTime name={mockFieldName} label={mockLabel} />
      </Formik>
    );
    expect(getByText(mockLabel)).toBeTruthy();
    expect(getByTestId(`${mockFieldName}-button`)).toBeTruthy();
    expect(getByTestId(mockFieldName).props.children).toBe(placeholder);
  });

  it('does not render when not visible', () => {
    const { queryByTestId } = render(
      <Formik initialValues={{ [mockFieldName]: '' }} onSubmit={() => {}}>
        <FormInputDateTime name={mockFieldName} label={mockLabel} isVisible={false} />
      </Formik>
    );
    expect(queryByTestId(mockFieldName)).toBeNull();
  });

  it('displays selected date and time correctly', () => {
    // Create a mock date-time value
    const mockDateTime = new Date(2020, 5, 15, 15, 30); // June 15, 2020, 15:30
    const formattedDateTime = '6/15/2020 3:30 PM'; // Expected display format

    const { getByTestId,queryByTestId } = render(
      <Formik initialValues={{ [mockFieldName]: mockDateTime.toISOString() }} onSubmit={() => {}}>
        <FormInputDateTime name={mockFieldName} label={mockLabel} />
      </Formik>
    );

    // Simulate opening the DateTimePicker and selecting a date
    fireEvent.press(getByTestId(`${mockFieldName}-button`));
    expect(queryByTestId('testDateTime-picker')).toBeTruthy(); 
    fireEvent(getByTestId(`${mockFieldName}-picker`), 'onChange', {}, mockDateTime);

    expect(getByTestId(mockFieldName).props.children).toBe(formattedDateTime);
  });

  it('shows error message when there is a validation error', () => {
    // Render the component with an initial error
    const errorMessage = 'Invalid date and time';
    const { getByTestId } = render(
      <Formik
        initialValues={{ [mockFieldName]: '' }}
        initialErrors={{ [mockFieldName]: errorMessage }}
        initialTouched={{ [mockFieldName]: true }} // Field must be touched for error to show
        onSubmit={() => {}}
      >
        <FormInputDateTime name={mockFieldName} label={mockLabel} />
      </Formik>
    );

    expect(getByTestId(`${mockFieldName}-error`).props.children).toBe(errorMessage);
  }); 

  it('is non-interactive when disabled', () => {
    const { getByTestId, queryByTestId } = render(
      <Formik initialValues={{ testDateTime: '' }} onSubmit={() => {}}>
        <FormInputDateTime name="testDateTime" label="Test Date & Time" disabled={true} />
      </Formik>
    );

    expect(queryByTestId('testDateTime-picker')).toBeNull();
    fireEvent.press(getByTestId('testDateTime-button'));
    expect(queryByTestId('testDateTime-picker')).toBeNull(); 
 
  });


  it('is interactive when enabled', () => {
    const { getByTestId, queryByTestId } = render(
      <Formik initialValues={{ testDateTime: '' }} onSubmit={() => {}}>
        <FormInputDateTime name="testDateTime" label="Test Date & Time" disabled={false} />
      </Formik>
    );

    expect(queryByTestId('testDateTime-picker')).toBeNull();
    fireEvent.press(getByTestId('testDateTime-button'));
    expect(queryByTestId('testDateTime-picker')).toBeTruthy(); 
 
  });
  it('is accessible with correct accessibility features', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ testDateTime: '' }} onSubmit={() => {}}>
        <FormInputDateTime name="testDateTime" label="Test Date & Time" />
      </Formik>
    );

    expect(getByTestId('testDateTime-button').props.accessibilityLabel).toBe('Test Date & Time');
  });
});