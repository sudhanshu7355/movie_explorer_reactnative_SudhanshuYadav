import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PremiumScreen from '../../src/screens/PremiumScreen';


jest.mock('../components/Plan', () => {
  return ({ data }) => {
    return (
      <Text testID={`plan-${data.name}`}>
        {data.name} - {data.price}
      </Text>
    );
  };
});

describe('PremiumScreen', () => {
  it('renders heading and subheading correctly', () => {
    const { getByText } = render(<PremiumScreen />);
    expect(getByText('Choose your Plan')).toBeTruthy();
    expect(getByText('Watch unlimited movies and shows')).toBeTruthy();
  });

  it('renders all plan cards', () => {
    const { getByTestId } = render(<PremiumScreen />);
    expect(getByTestId('plan-1_day')).toBeTruthy();
    expect(getByTestId('plan-7_days')).toBeTruthy();
    expect(getByTestId('plan-1_month')).toBeTruthy();
  });

  it('displays comparison chart with correct labels', () => {
    const { getByText } = render(<PremiumScreen />);
    expect(getByText('Compare Plans')).toBeTruthy();
    expect(getByText('Basic')).toBeTruthy();
    expect(getByText('Standard')).toBeTruthy();
    expect(getByText('Premium')).toBeTruthy();
    expect(getByText('Good')).toBeTruthy();
    expect(getByText('Better')).toBeTruthy();
    expect(getByText('Best')).toBeTruthy();
    expect(getByText('720p')).toBeTruthy();
    expect(getByText('1080p')).toBeTruthy();
    expect(getByText('4K+HDR')).toBeTruthy();
  });

  it('renders and presses the subscribe button', () => {
    const { getByText } = render(<PremiumScreen />);
    const button = getByText('Subscribe Now');
    expect(button).toBeTruthy();
    fireEvent.press(button);
   
  });

  it('displays terms and conditions', () => {
    const { getByText } = render(<PremiumScreen />);
    expect(
      getByText('By continuing you agree to our Terms of Service & Privacy Policy')
    ).toBeTruthy();
  });
});
