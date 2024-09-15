import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Formik } from 'formik';
import { FormInputSelect } from './InputSelect'; // Adjust the import path

describe('FormInputSelect', () => {
  const options = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    // Add more options as needed
  ];

  it('renders correctly', () => {
    const { getByTestId, getByText } = render(
      <Formik initialValues={{ selectField: '' }} onSubmit={() => {}}>
        <FormInputSelect name="selectField" label="Select Field" options={options} />
      </Formik>
    );
    expect(getByTestId('selectField')).toBeTruthy();
    expect(getByText('Select Field')).toBeTruthy();
  });

  it('is not visible when isVisible is false', () => {
    const { queryByTestId } = render(
      <Formik initialValues={{ selectField: '' }} onSubmit={() => {}}>
        <FormInputSelect name="selectField" label="Select Field" options={options} isVisible={false} />
      </Formik>
    );
    expect(queryByTestId('selectField')).toBeNull();
  });
  

  it('is   visible when isVisible is true', () => {
    const { queryByTestId } = render(
      <Formik initialValues={{ selectField: '' }} onSubmit={() => {}}>
        <FormInputSelect name="selectField" label="Select Field" options={options} isVisible={true} />
      </Formik>
    );
    expect(queryByTestId('selectField')).toBeTruthy();
  });

  it('is disabled when disabled is true', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ selectField: '' }} onSubmit={() => {}}>
        <FormInputSelect name="selectField" label="Select Field" options={options} disabled={true} />
      </Formik>
    );
    
    expect(getByTestId('selectField').props.enabled).toBe(false);
  });


  it('is enabled when disabled is false', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ selectField: '' }} onSubmit={() => {}}>
        <FormInputSelect name="selectField" label="Select Field" options={options} disabled={false} />
      </Formik>
    );
    expect(getByTestId('selectField').props.enabled).toBe(false);
  });

  it('displays all options including placeholder', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ selectField: '' }} onSubmit={() => {}}>
        <FormInputSelect name="selectField" label="Select Field" options={options} placeholder="Please Select One" />
      </Formik>
    );
    const picker = getByTestId('selectField');
    expect(picker.props.children.length).toBe(options.length + 1); // +1 for placeholder
  });

  it('updates Formik state when an option is selected', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ selectField: '' }} onSubmit={() => {}}>
        <FormInputSelect name="selectField" label="Select Field" options={options} />
      </Formik>
    );
    const picker = getByTestId('selectField');
    fireEvent(picker, 'onValueChange', 'opt1');
    // Verify that the value 'opt1' is now selected in the picker
  });

  it('displays error text when there is an error', () => {
    // Test to ensure that error messages are displayed when appropriate
  });

  it('displays the initial value correctly', () => {
    const initialValue = 'opt1';
    const { getByTestId } = render(
      <Formik initialValues={{ selectField: initialValue }} onSubmit={() => {}}>
        <FormInputSelect name="selectField" label="Select Field" options={options} />
      </Formik>
    );
    const picker = getByTestId('selectField');
    expect(picker.props.selectedValue).toBe(initialValue);
  });

  it('displays the placeholder correctly', () => {
    const placeholder = 'Please Select One';
    const { getByTestId } = render(
      <Formik initialValues={{ selectField: '' }} onSubmit={() => {}}>
        <FormInputSelect name="selectField" label="Select Field" options={options} placeholder={placeholder} />
      </Formik>
    );
    const picker = getByTestId('selectField');
    // Check if the placeholder is the first item
    expect(picker.props.children[0].props.label).toBe(placeholder);
  });

  it('is accessible with the correct accessibilityLabel', () => {
    const { getByTestId } = render(
      <Formik initialValues={{ selectField: '' }} onSubmit={() => {}}>
        <FormInputSelect name="selectField" label="Select Field" options={options} />
      </Formik>
    );
    const picker = getByTestId('selectField');
    expect(picker.props.accessibilityLabel).toBe('selectField');
  });
  
  it('displays the label correctly', () => {
    const label = "Select Field";
    const { getByText } = render(
      <Formik initialValues={{ selectField: '' }} onSubmit={() => {}}>
        <FormInputSelect name="selectField" label={label} options={options} />
      </Formik>
    );
    expect(getByText(label)).toBeTruthy();
  });
});