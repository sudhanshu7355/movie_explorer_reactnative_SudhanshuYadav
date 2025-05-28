import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Card from '../../src/components/Card';

const mockData = {
  title: 'Inception',
  genre: 'Action',
  rating: '8.8',
  release_year: '2010',
  description: 'A mind-bending thriller.',
  poster_url: 'https://example.com/inception.jpg',
};

describe('Card Component', () => {
  it('renders correctly with data', () => {
    const { getByText } = render(<Card data={mockData} />);
    expect(getByText('Inception')).toBeTruthy();
  });

  it('shows "No data available" when no data is passed', () => {
    const { getByText } = render(<Card data={null} />);
    expect(getByText('No data available')).toBeTruthy();
  });

  it('renders placeholder when poster_url is missing', () => {
    const { getByText } = render(<Card data={{ ...mockData, poster_url: null }} />);
    expect(getByText('No image')).toBeTruthy();
  });

  it('opens and closes modal on press', () => {
    const { getByText, queryByText } = render(<Card data={mockData} />);

    // Open modal
    fireEvent.press(getByText('Inception'));
    expect(getByText('A mind-bending thriller.')).toBeTruthy();

    // Close modal
    fireEvent.press(getByText('✕'));
    expect(queryByText('A mind-bending thriller.')).toBeNull();
  });

  it('renders genre, rating, and year', () => {
    const { getByText } = render(<Card data={mockData} />);
    fireEvent.press(getByText('Inception'));

    expect(getByText('Action')).toBeTruthy();
    expect(getByText('⭐️')).toBeTruthy();
    expect(getByText('8.8')).toBeTruthy();
    expect(getByText('2010')).toBeTruthy();
  });
});
