import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../../src/screens/LoginScreen';
import { getAllMovies, LoginRequest } from '../../src/axiosRequest/Axiosrequest';
import { setMovies } from '../../src/redux/slices/movieSlice';
import { setRole, setToken } from '../../src/redux/slices/userSlices';
import { useDispatch } from 'react-redux';

jest.mock('../axiosRequest/Axiosrequest');
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();

describe('LoginScreen', () => {
  const mockNavigation = { replace: jest.fn(), navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
  });

  it('renders login form and fetches movies on mount', async () => {
    getAllMovies.mockResolvedValueOnce([{ id: 1, title: 'Test Movie' }]);
    render(<LoginScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(getAllMovies).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith(setMovies([{ id: 1, title: 'Test Movie' }]));
    });
  });

  it('shows alert when email or password is empty', async () => {
    const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});
    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Enter your email'), '');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), '');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
    });

    alertMock.mockRestore();
  });

  it('shows alert for invalid email format', async () => {
    const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});
    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'invalidemail');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), '12345678');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
    });

    alertMock.mockRestore();
  });

  it('handles successful login and redirects to Main', async () => {
    LoginRequest.mockResolvedValueOnce({
      data: { id: 1, role: 'user', token: 'abc123' },
    });

    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'sud@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), '12345678');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(LoginRequest).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith(setRole('user'));
      expect(mockDispatch).toHaveBeenCalledWith(setToken('abc123'));
      expect(mockNavigation.replace).toHaveBeenCalledWith('Main');
    });
  });

  it('shows alert on login failure', async () => {
    const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});
    LoginRequest.mockRejectedValueOnce(new Error('Invalid credentials'));

    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} />);
    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'sud@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'wrongpassword');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
    });

    alertMock.mockRestore();
  });

  it('navigates to Signup screen on clicking Sign Up', () => {
    const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
    fireEvent.press(getByText('Sign Up'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Signup');
  });
});
