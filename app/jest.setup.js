// jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));


jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn().mockResolvedValue(null), // Adjust as needed
    removeItem: jest.fn(),
    clear: jest.fn(),
    // Add other methods as required for your tests
  }));
  