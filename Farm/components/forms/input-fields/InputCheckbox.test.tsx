import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FormInputCheckbox } from './InputCheckbox'; // Adjust the import path
import { Formik } from 'formik';

describe('FormInputCheckbox', () => {
  const onSubmit = jest.fn();

  it('renders correctly', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ testCheckbox: false }}
      onSubmit={onSubmit}>
        <FormInputCheckbox name="testCheckbox" label="Test Checkbox" />
      </Formik>
    );
    expect(getByTestId('testCheckbox')).toBeTruthy();
  });

  it('is not visible when isVisible is false', () => {
    const { queryByTestId } = render(
      <Formik initialValues={{ testCheckbox: false }}
      onSubmit={onSubmit}>
        <FormInputCheckbox name="testCheckbox" label="Test Checkbox" isVisible={false} />
      </Formik>
    );
    expect(queryByTestId('testCheckbox')).toBeNull();
  });
  

  it('is visible when isVisible is true', () => {
    const { queryByTestId } = render(
      <Formik initialValues={{ testCheckbox: false }}
      onSubmit={onSubmit}>
        <FormInputCheckbox name="testCheckbox" label="Test Checkbox" isVisible={true} />
      </Formik>
    );
    expect(queryByTestId('testCheckbox')).toBeTruthy();
  });

  it('is disabled when disabled is true', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ testCheckbox: false }}
      onSubmit={onSubmit}>
        <FormInputCheckbox name="testCheckbox" label="Test Checkbox" disabled={true} />
      </Formik>
    );
    expect(getByTestId('testCheckbox').props.disabled).toBeTruthy();
  });
  it('is enabled when disabled is false', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ testCheckbox: false }}
      onSubmit={onSubmit}>
        <FormInputCheckbox name="testCheckbox" label="Test Checkbox" disabled={false} />
      </Formik>
    );
    expect(getByTestId('testCheckbox').props.disabled).not.toBeTruthy();
  });

  it('toggles value when pressed', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ testCheckbox: false }}
      onSubmit={onSubmit}>
        <FormInputCheckbox name="testCheckbox" label="Test Checkbox" />
      </Formik>
    );
    const switchComponent = getByTestId('testCheckbox');
    fireEvent(switchComponent, 'onValueChange', true);
    expect(switchComponent.props.value).toBe(true);
  });

  it('displays error text when there is an error', () => {
    // You need to trigger validation and make sure the field is touched to test this
  });

  // Additional test for label presence
  it('displays the label', () => {
    const { getByText } = render(
      <Formik initialValues={{ testCheckbox: false }}
      onSubmit={onSubmit}>
        <FormInputCheckbox name="testCheckbox" label="Test Checkbox" />
      </Formik>
    );
    expect(getByText('Test Checkbox')).toBeTruthy();
  });
});