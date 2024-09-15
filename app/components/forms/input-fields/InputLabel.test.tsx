import React from 'react';
import { render } from '@testing-library/react-native';
import { FormLabel } from './InputLabel'; // Adjust the import path

describe('FormLabel', () => {

  it('renders correctly with text', () => {
    const labelText = "Test Label";
    const { getByText } = render(
      <FormLabel text={labelText} />
    );
    expect(getByText(labelText)).toBeTruthy();
  });

  it('is not rendered when isVisible is false', () => {
    const labelText = "Test Label";
    const { queryByText } = render(
      <FormLabel text={labelText} isVisible={false} />
    );
    expect(queryByText(labelText)).toBeNull();
  });

  it('is   rendered when isVisible is true', () => {
    const labelText = "Test Label";
    const { queryByText } = render(
      <FormLabel text={labelText} isVisible={true} />
    );
    expect(queryByText(labelText)).toBeTruthy();
  });

  it('displays the correct text', () => {
    const labelText = "Another Test Label";
    const { getByText } = render(
      <FormLabel text={labelText} />
    );
    expect(getByText(labelText)).toBeTruthy();
  });
  it('uses the name prop as testID correctly', () => {
    const labelText = "Label Text";
    const testName = "testName";
    const { getByTestId } = render(
      <FormLabel text={labelText} name={testName} />
    );
    expect(getByTestId(testName)).toBeTruthy();
  });

  it('applies correct styles', () => {
    const labelText = "Label Text";
    const { getByText } = render(
      <FormLabel text={labelText} />
    );
    const label = getByText(labelText);
    // Assuming you have a way to check the styles, like `getComputedStyle` in web environments
    // Example: expect(label.props.style).toMatchObject({ fontSize: 16, color: '#333' });
  });

  it('is accessible with the correct accessibilityLabel', () => {
    const labelText = "Label Text";
    const { getByText } = render(
      <FormLabel text={labelText} />
    );
    const label = getByText(labelText);
    // Example: expect(label.props.accessibilityLabel).toBe(labelText);
  });
})