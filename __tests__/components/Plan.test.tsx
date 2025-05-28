import React from 'react';
import { render } from '@testing-library/react-native';
import Plan from '../../src/components/Plan';

const mockData = {
  name: 'Premium',
  price: '$9.99',
  device: '4 devices',
  feature: ['HD streaming', 'Offline mode', 'No ads', 'Bonus content'],
};

describe('Plan Component', () => {
  it('renders plan name, price, and device', () => {
    const { getByText } = render(<Plan data={mockData} />);
    expect(getByText('Premium')).toBeTruthy();
    expect(getByText('$9.99')).toBeTruthy();
    expect(getByText('4 devices')).toBeTruthy();
  });

  it('renders only first 3 features', () => {
    const { queryByText } = render(<Plan data={mockData} />);
    expect(queryByText('HD streaming')).toBeTruthy();
    expect(queryByText('Offline mode')).toBeTruthy();
    expect(queryByText('No ads')).toBeTruthy();
    expect(queryByText('Bonus content')).toBeNull(); 
  });
});
