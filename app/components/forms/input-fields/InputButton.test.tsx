import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FormInputButton } from './InputButton'; // Adjust the import path
import { ActivityIndicator } from 'react-native';

describe('FormInputButton', () => {

  it('renders correctly', () => {
    const { getByTestId } = render(
      <FormInputButton name="testButton" buttonText="Click Me" onPress={() => {}} />
    );
    expect(getByTestId('testButton')).toBeTruthy();
  });

  it('is visible when isVisible is true', () => {
    const { getByTestId } = render(
      <FormInputButton name="testButton" buttonText="Click Me" onPress={() => {}} isVisible={true} />
    );
    expect(getByTestId('testButton')).toBeTruthy();
  });

  it('is not visible when isVisible is false', () => {
    const { queryByTestId } = render(
      <FormInputButton name="testButton" buttonText="Click Me" onPress={() => {}} isVisible={false} />
    );
    expect(queryByTestId('testButton')).toBeNull();
  });

  it('is disabled when isEnabled is false', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <FormInputButton name="testButton" buttonText="Click Me" onPress={onPressMock} isEnabled={false} />
    );
    fireEvent.press(getByTestId('testButton'));
    expect(onPressMock).not.toHaveBeenCalled();
  });


  it('is enabled when isEnabled is true', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <FormInputButton name="testButton" buttonText="Click Me" onPress={onPressMock} isEnabled={true} />
    );
    fireEvent.press(getByTestId('testButton'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <FormInputButton name="testButton" buttonText="Click Me" onPress={onPressMock} />
    );
    fireEvent.press(getByTestId('testButton'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('shows ActivityIndicator when isProcessing is true', () => {
    const { getByTestId } = render(
      <FormInputButton name="testButton" buttonText="Click Me" onPress={() => {}} isProcessing={true} />
    );
    const indicator = getByTestId('testButton').findByType(ActivityIndicator);
    expect(indicator).toBeTruthy();
  });

  // Add more tests as needed, for example, to test different styles based on props
});