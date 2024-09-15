import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Formik } from 'formik';
import moment from 'moment';
import { FormInputDate } from './InputDate'; // Adjust the import path

describe('FormInputDate', () => {
  const mockSubmit = jest.fn();

  it('renders correctly', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ dateField: '' }} onSubmit={mockSubmit}>
        <FormInputDate name="dateField" label="Date" />
      </Formik>
    );
    expect(getByTestId('dateField')).toBeTruthy();
  });

  it('is not visible when isVisible is false', () => {
    const { queryByTestId } = render(
      <Formik initialValues={{ dateField: '' }} onSubmit={mockSubmit}>
        <FormInputDate name="dateField" label="Date" isVisible={false} />
      </Formik>
    );
    expect(queryByTestId('dateField')).toBeNull();
  });

  it('is   visible when isVisible is true', () => {
    const { queryByTestId } = render(
      <Formik initialValues={{ dateField: '' }} onSubmit={mockSubmit}>
        <FormInputDate name="dateField" label="Date" isVisible={true} />
      </Formik>
    );
    expect(queryByTestId('dateField')).toBeTruthy();
  });

  it('is disabled when disabled is true', () => {
    const { getByTestId, queryByTestId } = render(
      <Formik initialValues={{ dateField: '' }} onSubmit={mockSubmit}>
        <FormInputDate name="dateField" label="Date" disabled={true} />
      </Formik>
    );
    const button = getByTestId('dateField'); 
    
    expect(queryByTestId('dateField-dateTimePicker')).toBeNull();
    fireEvent.press(getByTestId('dateField'));
    expect(queryByTestId('dateField-dateTimePicker')).toBeNull();
  });

  it('is enabled when disabled is false', () => {
    const { getByTestId, queryByTestId } = render(
      <Formik initialValues={{ dateField: '' }} onSubmit={mockSubmit}>
        <FormInputDate name="dateField" label="Date" disabled={false} />
      </Formik>
    );
    const button = getByTestId('dateField'); 
    
    expect(queryByTestId('dateField-dateTimePicker')).toBeNull();
    fireEvent.press(getByTestId('dateField'));
    expect(queryByTestId('dateField-dateTimePicker')).toBeTruthy();
  });

  it('updates value when a date is selected', () => {
    const testDate = new Date(2020, 5, 15); // Example date
    const formattedDate = moment(testDate).format("YYYY-MM-DD");

    const { getByTestId } = render(
      <Formik initialValues={{ dateField: '' }} onSubmit={mockSubmit}>
        <FormInputDate name="dateField" label="Date" />
      </Formik>
    );

    const button = getByTestId('dateField');
    fireEvent.press(button);

    const datePicker = getByTestId('dateField-dateTimePicker'); 
    fireEvent(datePicker, 'onChange', {}, testDate);
    
    expect(button.props.children).toBe(formattedDate);
  });

  it('displays error text when there is an error', () => {
    // You need to simulate validation error and ensure the field is touched to test this
  });

  it('displays the placeholder when no date is selected', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ dateField: '' }} onSubmit={mockSubmit}>
        <FormInputDate name="dateField" label="Date" placeholder="Select Date" />
      </Formik>
    );

    const button = getByTestId('dateField');
    expect(button.props.children).toBe('Select Date');
  });

  it('displays the initial value correctly', () => {
    const initialValue = '2020-06-15';
    const { getByTestId } = render(
      <Formik initialValues={{ dateField: initialValue }} onSubmit={mockSubmit}>
        <FormInputDate name="dateField" label="Date" />
      </Formik>
    );
    const button = getByTestId('dateField');
    expect(button.props.children).toBe(moment(initialValue).format("YYYY-MM-DD"));
  });

  it('displays the label correctly', () => {
    const { getByText } = render(
      <Formik initialValues={{ dateField: '' }} onSubmit={mockSubmit}>
        <FormInputDate name="dateField" label="Test Date" />
      </Formik>
    );
    expect(getByText('Test Date')).toBeTruthy();
  });

  it('updates Formik state when a date is selected', () => {
    const testDate = new Date(2020, 5, 15); // Example date
    const formattedDate = moment(testDate).format("YYYY-MM-DD");

    const { getByTestId, getByText } = render(
      <Formik initialValues={{ dateField: '' }} onSubmit={mockSubmit}>
        <FormInputDate name="dateField" label="Date" />
      </Formik>
    );

    fireEvent.press(getByTestId('dateField'));
    fireEvent(getByTestId('dateField-dateTimePicker'), 'onChange', {}, testDate);

    fireEvent.press(getByText('Submit')); // Assuming you have a submit button
    expect(mockSubmit).toHaveBeenCalledWith({ dateField: formattedDate });
  });

  it('shows error text only after field is touched', () => {
    // Simulate the field being touched and an error being present
  });

  it('shows date picker when button is pressed', () => {
    const { getByTestId, queryByTestId } = render(
      <Formik initialValues={{ dateField: '' }} onSubmit={mockSubmit}>
        <FormInputDate name="dateField" label="Date" />
      </Formik>
    );

    expect(queryByTestId('dateField-dateTimePicker')).toBeNull();
    fireEvent.press(getByTestId('dateField'));
    expect(queryByTestId('dateField-dateTimePicker')).toBeTruthy();
  });
});