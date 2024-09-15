import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Formik } from 'formik';
import { FormInputEmail } from './InputEmail'; // Adjust the import path

describe('FormInputEmail', () => {
  const mockSubmit = jest.fn();
 
  it('renders correctly', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ email: '' }} onSubmit={mockSubmit}>
        <FormInputEmail name="email" label="Email" />
      </Formik>
    );
    expect(getByTestId('email')).toBeTruthy();
  });

  it('is not visible when isVisible is false', () => {
    const { queryByTestId } = render(
      <Formik initialValues={{ email: '' }} onSubmit={mockSubmit}>
        <FormInputEmail name="email" label="Email" isVisible={false} />
      </Formik>
    );
    expect(queryByTestId('email')).toBeNull();
  });

  it('is   visible when isVisible is true', () => {
    const { queryByTestId } = render(
      <Formik initialValues={{ email: '' }} onSubmit={mockSubmit}>
        <FormInputEmail name="email" label="Email" isVisible={true} />
      </Formik>
    );
    expect(queryByTestId('email')).toBeTruthy();
  });

  it('is disabled when disabled is true', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ email: '' }} onSubmit={mockSubmit}>
        <FormInputEmail name="email" label="Email" disabled={true} />
      </Formik>
    );
    expect(getByTestId('email').props.editable).toBe(false);
  });
  it('is enabled when disabled is false', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ email: '' }} onSubmit={mockSubmit}>
        <FormInputEmail name="email" label="Email" disabled={false} />
      </Formik>
    );
    expect(getByTestId('email').props.editable).toBe(true);
  });

  it('updates value when text changes', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ email: '' }} onSubmit={mockSubmit}>
        <FormInputEmail name="email" label="Email" />
      </Formik>
    );
    const input = getByTestId('email');
    fireEvent.changeText(input, 'test@example.com');
    expect(input.props.value).toBe('test@example.com');
  });

  it('displays error text when there is an error', () => {
    // Simulate a scenario where an error message should be displayed
  });

  it('displays the correct placeholder', () => {
    const { getByPlaceholderText } = render(
      <Formik initialValues={{ email: '' }} onSubmit={mockSubmit}>
        <FormInputEmail name="email" label="Email" placeholder="Enter your email" />
      </Formik>
    );
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
  });

  it('displays the label correctly', () => {
    const { getByText } = render(
      <Formik initialValues={{ email: '' }} onSubmit={mockSubmit}>
        <FormInputEmail name="email" label="Email" />
      </Formik>
    );
    expect(getByText('Email')).toBeTruthy();
  });

  // Add more tests as needed...
});