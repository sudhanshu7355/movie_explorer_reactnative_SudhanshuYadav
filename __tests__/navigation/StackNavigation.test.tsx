import React from 'react';
import { render } from '@testing-library/react-native';
import StackNavigation from '../../src/navigation/StackNavigation';


jest.mock('../screens/LoginScreen', () => 'LoginScreen');
jest.mock('../screens/SignupScreen', () => 'SignupScreen');
jest.mock('./AppNavigation', () => 'AppNavigation');

describe('StackNavigation', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<StackNavigation />);
    expect(toJSON()).toBeTruthy();
  });

  it('starts on the Login screen by default', async () => {
    const { findByText } = render(<StackNavigation />);
    expect(await findByText('LoginScreen')).toBeTruthy();
  });

  it('contains Signup and Main screen in the stack', async () => {
    const { findByText, rerender } = render(<StackNavigation />);

    
    jest.mock('../screens/LoginScreen', () => 'Ignored');
    jest.mock('../screens/SignupScreen', () => 'SignupScreen');
    rerender(<StackNavigation />);
    expect(await findByText('LoginScreen')).toBeTruthy(); 

    
    
  });
});
