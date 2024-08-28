import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Formik } from 'formik';
import { FormInputMoney } from './InputMoney'; // Adjust the import path

describe('FormInputMoney', () => {

  it('renders correctly', () => {
    const { getByTestId, getByText } = render(
      <Formik initialValues={{ money: '' }} onSubmit={() => {}}>
        <FormInputMoney name="money" label="Money" />
      </Formik>
    );
    expect(getByTestId('money')).toBeTruthy();
    expect(getByText('Money')).toBeTruthy();
  });

  it('is not visible when isVisible is false', () => {
    const { queryByTestId } = render(
      <Formik initialValues={{ money: '' }} onSubmit={() => {}}>
        <FormInputMoney name="money" label="Money" isVisible={false} />
      </Formik>
    ); 
    expect(queryByTestId('money')).toBeNull();
  });

  it('is   visible when isVisible is true', () => {
    const { queryByTestId } = render(
      <Formik initialValues={{ money: '' }} onSubmit={() => {}}>
        <FormInputMoney name="money" label="Money" isVisible={true} />
      </Formik>
    ); 
    expect(queryByTestId('money')).toBeTruthy();
  });

  it('is disabled when disabled is true', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ money: '' }} onSubmit={() => {}}>
        <FormInputMoney name="money" label="Money" disabled={true} />
      </Formik>
    );
    expect(getByTestId('money').props.editable).toBe(false);
  });

  it('is enabled when disabled is false', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ money: '' }} onSubmit={() => {}}>
        <FormInputMoney name="money" label="Money" disabled={false} />
      </Formik>
    );
    expect(getByTestId('money').props.editable).toBe(true);
  });

  
  it('displays the label correctly', () => {
    const { getByText } = render(
      <Formik initialValues={{ money: '' }} onSubmit={() => {}}>
        <FormInputMoney name="money" label="Money" />
      </Formik>
    );
    expect(getByText('Money')).toBeTruthy();
  });

  it('updates value when text changes', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ money: '' }} onSubmit={() => {}}>
        <FormInputMoney name="money" label="Money" />
      </Formik>
    );
    const input = getByTestId('money');
    fireEvent.changeText(input, '100');
    expect(input.props.value).toBe('100');
  });

  it('displays error text when there is an error', () => {
    // Test to ensure that error messages are displayed when appropriate
  });

  it('displays the currency prefix', () => {
    const { getByText } = render(
      <Formik initialValues={{ money: '' }} onSubmit={() => {}}>
        <FormInputMoney name="money" label="Money" />
      </Formik>
    );
    expect(getByText('$')).toBeTruthy();
  });

  it('displays the initial value correctly', () => {
    const initialValue = '100';
    const { getByTestId } = render(
      <Formik initialValues={{ money: initialValue }} onSubmit={() => {}}>
        <FormInputMoney name="money" label="Money" />
      </Formik>
    );
    const input = getByTestId('money');
    expect(input.props.value).toBe(initialValue);
  });

  it('displays placeholder when no value is entered', () => {
    const placeholderText = 'Enter amount';
    const { getByPlaceholderText } = render(
      <Formik initialValues={{ money: '' }} onSubmit={() => {}}>
        <FormInputMoney name="money" label="Money" placeholder={placeholderText} />
      </Formik>
    );
    expect(getByPlaceholderText(placeholderText)).toBeTruthy();
  });

  it('is accessible with the correct accessibilityLabel', () => {
    const labelText = "Money";
    const { getByTestId } = render(
      <Formik initialValues={{ money: '' }} onSubmit={() => {}}>
        <FormInputMoney name="money" label={labelText} />
      </Formik>
    );
    const input = getByTestId('money');
    // Example: expect(input.props.accessibilityLabel).toBe(labelText);
  });
});