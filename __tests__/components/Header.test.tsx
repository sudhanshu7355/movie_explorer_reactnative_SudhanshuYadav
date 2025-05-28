import React from 'react';
import { render } from '@testing-library/react-native';
import Header from '../../src/components/Header';

describe('Header Component', () => {
  it('renders the title correctly', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Movie')).toBeTruthy(); 
    expect(getByText(' Buzz')).toBeTruthy(); 
  });

  it('renders the full heading', () => {
    const { getByText } = render(<Header />);
    
    expect(getByText(/Movie Buzz/)).toBeTruthy();
  });
});
