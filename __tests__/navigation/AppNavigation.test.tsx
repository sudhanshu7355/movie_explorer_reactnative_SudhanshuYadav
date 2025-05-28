import React from 'react';
import { render } from '@testing-library/react-native';
import AppNavigation from '../../src/navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';


jest.mock('../screens/HomeScreen', () => 'HomeScreen');
jest.mock('../screens/PremiumScreen', () => 'PremiumScreen');
jest.mock('../screens/ProfileScreen', () => 'ProfileScreen');
jest.mock('../screens/ExplorerScreen', () => 'ExplorerScreen');


jest.mock('react-native/Libraries/Image/Image', () => 'Image');

describe('AppNavigation', () => {
  it('renders all four tabs correctly', async () => {
    const { findByText } = render(
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );

    
    expect(await findByText('Home')).toBeTruthy();
    expect(await findByText('Explorer')).toBeTruthy();
    expect(await findByText('Premium')).toBeTruthy();
    expect(await findByText('Profile')).toBeTruthy();
  });

  it('renders without crashing', () => {
    const { toJSON } = render(
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    );
    expect(toJSON()).toMatchSnapshot(); 
  });
});
