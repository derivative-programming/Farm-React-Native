import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Formik } from 'formik';
import { FormInputText } from './InputText'; // Adjust the import path

describe('FormInputText', () => {
  const mockSubmit = jest.fn();
 
  it('renders correctly', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ text: '' }} onSubmit={mockSubmit}>
        <FormInputText name="text" label="Text" />
      </Formik>
    );
    expect(getByTestId('text')).toBeTruthy();
  });

  it('is not visible when isVisible is false', () => {
    const { queryByTestId } = render(
      <Formik initialValues={{ text: '' }} onSubmit={mockSubmit}>
        <FormInputText name="text" label="Text" isVisible={false} />
      </Formik>
    );
    expect(queryByTestId('text')).toBeNull();
  });

  it('is   visible when isVisible is true', () => {
    const { queryByTestId } = render(
      <Formik initialValues={{ text: '' }} onSubmit={mockSubmit}>
        <FormInputText name="text" label="Text" isVisible={true} />
      </Formik>
    );
    expect(queryByTestId('text')).toBeTruthy();
  });

  it('is disabled when disabled is true', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ text: '' }} onSubmit={mockSubmit}>
        <FormInputText name="text" label="Text" disabled={true} />
      </Formik>
    );
    expect(getByTestId('text').props.editable).toBe(false);
  });
  it('is enabled when disabled is false', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ text: '' }} onSubmit={mockSubmit}>
        <FormInputText name="text" label="Text" disabled={false} />
      </Formik>
    );
    expect(getByTestId('text').props.editable).toBe(true);
  });

  it('updates value when text changes', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ text: '' }} onSubmit={mockSubmit}>
        <FormInputText name="text" label="Text" />
      </Formik>
    );
    const input = getByTestId('text');
    fireEvent.changeText(input, 'sample data');
    expect(input.props.value).toBe('sample data');
  });

  it('displays error text when there is an error', () => {
    // Simulate a scenario where an error message should be displayed
  });

  it('displays the correct placeholder', () => {
    const { getByPlaceholderText } = render(
      <Formik initialValues={{ text: '' }} onSubmit={mockSubmit}>
        <FormInputText name="text" label="Text" placeholder="Enter your text" />
      </Formik>
    );
    expect(getByPlaceholderText('Enter your text')).toBeTruthy();
  });

  it('displays the label correctly', () => {
    const { getByText } = render(
      <Formik initialValues={{ text: '' }} onSubmit={mockSubmit}>
        <FormInputText name="text" label="Text" />
      </Formik>
    );
    expect(getByText('Text')).toBeTruthy();
  });

  // Add more tests as needed...
});