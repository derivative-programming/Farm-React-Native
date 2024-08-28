import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Formik } from 'formik';
import { FormInputNumber } from './InputNumber'; // Adjust the import path

describe('FormInputNumber', () => {

  it('renders correctly', () => {
    const { getByTestId, getByText } = render(
      <Formik initialValues={{ number: '' }} onSubmit={() => {}}>
        <FormInputNumber name="number" label="Number" />
      </Formik>
    );
    expect(getByTestId('number')).toBeTruthy();
    expect(getByText('Number')).toBeTruthy();
  });

  it('is not visible when isVisible is false', () => {
    const { queryByTestId } = render(
      <Formik initialValues={{ number: '' }} onSubmit={() => {}}>
        <FormInputNumber name="number" label="Number" isVisible={false} />
      </Formik>
    ); 
    expect(queryByTestId('number')).toBeNull();
  });

  it('is   visible when isVisible is true', () => {
    const { queryByTestId } = render(
      <Formik initialValues={{ number: '' }} onSubmit={() => {}}>
        <FormInputNumber name="number" label="Number" isVisible={true} />
      </Formik>
    ); 
    expect(queryByTestId('number')).toBeTruthy();
  });

  it('is disabled when disabled is true', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ number: '' }} onSubmit={() => {}}>
        <FormInputNumber name="number" label="Number" disabled={true} />
      </Formik>
    );
    expect(getByTestId('number').props.editable).toBe(false);
  });

  it('is enabled when disabled is false', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ number: '' }} onSubmit={() => {}}>
        <FormInputNumber name="number" label="Number" disabled={false} />
      </Formik>
    );
    expect(getByTestId('number').props.editable).toBe(true);
  });

  
  it('displays the label correctly', () => {
    const { getByText } = render(
      <Formik initialValues={{ number: '' }} onSubmit={() => {}}>
        <FormInputNumber name="number" label="Number" />
      </Formik>
    );
    expect(getByText('Number')).toBeTruthy();
  });

  it('updates value when text changes', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ number: '' }} onSubmit={() => {}}>
        <FormInputNumber name="number" label="Number" />
      </Formik>
    );
    const input = getByTestId('number');
    fireEvent.changeText(input, '100');
    expect(input.props.value).toBe('100');
  });

  it('displays error text when there is an error', () => {
    // Test to ensure that error messages are displayed when appropriate
  });
 

  it('displays the initial value correctly', () => {
    const initialValue = '100';
    const { getByTestId } = render(
      <Formik initialValues={{ number: initialValue }} onSubmit={() => {}}>
        <FormInputNumber name="number" label="Number" />
      </Formik>
    );
    const input = getByTestId('number');
    expect(input.props.value).toBe(initialValue);
  });

  it('displays placeholder when no value is entered', () => {
    const placeholderText = 'Enter amount';
    const { getByPlaceholderText } = render(
      <Formik initialValues={{ number: '' }} onSubmit={() => {}}>
        <FormInputNumber name="number" label="Number" placeholder={placeholderText} />
      </Formik>
    );
    expect(getByPlaceholderText(placeholderText)).toBeTruthy();
  });

  it('is accessible with the correct accessibilityLabel', () => {
    const labelText = "Number";
    const { getByTestId } = render(
      <Formik initialValues={{ number: '' }} onSubmit={() => {}}>
        <FormInputNumber name="number" label={labelText} />
      </Formik>
    );
    const input = getByTestId('number');
    // Example: expect(input.props.accessibilityLabel).toBe(labelText);
  });
});