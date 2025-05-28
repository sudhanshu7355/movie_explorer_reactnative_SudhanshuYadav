import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen from '../../src/screens/ProfileScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('ProfileScreen', () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    useSelector.mockReturnValue('Admin'); // Mock role
    useNavigation.mockReturnValue({ navigate: navigateMock });
    navigateMock.mockClear();
  });

  it('renders user role and name correctly', () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText('Admin')).toBeTruthy();
    expect(getByText('Sudhanshu Yadav')).toBeTruthy();
  });

  it('renders all profile options', () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText('Account')).toBeTruthy();
    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('Offers & Referrals')).toBeTruthy();
    expect(getByText('About')).toBeTruthy();
  });

  it('navigates to EditProfile when Account is pressed', () => {
    const { getByText } = render(<ProfileScreen />);
    fireEvent.press(getByText('Account'));
    expect(navigateMock).toHaveBeenCalledWith('EditProfile');
  });

  it('navigates to Settings when Settings is pressed', () => {
    const { getByText } = render(<ProfileScreen />);
    fireEvent.press(getByText('Settings'));
    expect(navigateMock).toHaveBeenCalledWith('Settings');
  });

  it('navigates to Offers when Offers & Referrals is pressed', () => {
    const { getByText } = render(<ProfileScreen />);
    fireEvent.press(getByText('Offers & Referrals'));
    expect(navigateMock).toHaveBeenCalledWith('Offers');
  });

  it('navigates to About when About is pressed', () => {
    const { getByText } = render(<ProfileScreen />);
    fireEvent.press(getByText('About'));
    expect(navigateMock).toHaveBeenCalledWith('About');
  });
});
