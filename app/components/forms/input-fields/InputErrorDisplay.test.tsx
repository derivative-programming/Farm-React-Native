import React from 'react';
import { render } from '@testing-library/react-native';
import { Formik } from 'formik';
import { FormInputErrorDisplay } from './InputErrorDisplay'; // Adjust the import path

describe('FormInputErrorDisplay', () => {

  it('renders correctly', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ testField: '' }} onSubmit={() => {}}>
        <FormInputErrorDisplay name="testErrorDisplay" forInputName="testField" />
      </Formik>
    );
    expect(getByTestId('testErrorDisplay')).toBeTruthy();
  });

  it('displays error message when field has error and is touched', () => {
    const { getByText, getByTestId } = render(
      <Formik 
        initialValues={{ testField: '' }}
        initialErrors={{ testField: 'Error message' }}
        initialTouched={{ testField: true }}
        onSubmit={() => {}}
      >
        <FormInputErrorDisplay name="testErrorDisplay" forInputName="testField" />
      </Formik>
    );
    expect(getByText('Error message')).toBeTruthy();
    expect(getByTestId('testErrorDisplay')).toBeTruthy();
  });

  it('does not display error message when field has no error', () => {
    const { queryByText } = render(
      <Formik initialValues={{ testField: '' }} onSubmit={() => {}}>
        <FormInputErrorDisplay name="testErrorDisplay" forInputName="testField" />
      </Formik>
    );
    expect(queryByText('Error message')).toBeNull();
  });

  it('does not display error message when field is not touched', () => {
    const { queryByText } = render(
      <Formik 
        initialValues={{ testField: '' }}
        initialErrors={{ testField: 'Error message' }}
        onSubmit={() => {}}
      >
        <FormInputErrorDisplay name="testErrorDisplay" forInputName="testField" />
      </Formik>
    );
    expect(queryByText('Error message')).toBeNull();
  });

  // Additional tests as needed...
});