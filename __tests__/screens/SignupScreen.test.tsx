import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignupScreen from '../../src/screens/SignupScreen';
import { signUpRequest } from '../../src/axiosRequest/Axiosrequest';

jest.mock('../axiosRequest/Axiosrequest', () => ({
  signUpRequest: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockReplace = jest.fn();

const createTestProps = () => ({
  navigation: {
    navigate: mockNavigate,
    replace: mockReplace,
  },
});

describe('SignupScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and sign-up button', () => {
    const props = createTestProps();
    const { getByPlaceholderText, getByText } = render(<SignupScreen {...props} />);

    expect(getByPlaceholderText('Enter your full name')).toBeTruthy();
    expect(getByPlaceholderText('Enter your email address')).toBeTruthy();
    expect(getByPlaceholderText('Enter your phone number')).toBeTruthy();
    expect(getByPlaceholderText('Create a password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm your password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('shows alert when fields are empty', async () => {
    const props = createTestProps();
    const { getByText } = render(<SignupScreen {...props} />);
    const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});
    fireEvent.press(getByText('Sign Up'));
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
    });
  });

  it('shows alert for invalid email', async () => {
    const props = createTestProps();
    const { getByPlaceholderText, getByText } = render(<SignupScreen {...props} />);
    fireEvent.changeText(getByPlaceholderText('Enter your full name'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Enter your email address'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Enter your phone number'), '1234567890');
    fireEvent.changeText(getByPlaceholderText('Create a password'), 'pass123');
    fireEvent.changeText(getByPlaceholderText('Confirm your password'), 'pass123');

    const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Please enter a valid email');
    });
  });

  it('shows alert for mismatched passwords', async () => {
    const props = createTestProps();
    const { getByPlaceholderText, getByText } = render(<SignupScreen {...props} />);
    fireEvent.changeText(getByPlaceholderText('Enter your full name'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Enter your email address'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your phone number'), '1234567890');
    fireEvent.changeText(getByPlaceholderText('Create a password'), 'pass123');
    fireEvent.changeText(getByPlaceholderText('Confirm your password'), 'pass1234');

    const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Passwords do not match');
    });
  });

  it('calls signUpRequest and navigates on successful signup', async () => {
    signUpRequest.mockResolvedValue({ data: { id: 1 } });
    const props = createTestProps();

    const { getByPlaceholderText, getByText } = render(<SignupScreen {...props} />);
    fireEvent.changeText(getByPlaceholderText('Enter your full name'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Enter your email address'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your phone number'), '1234567890');
    fireEvent.changeText
