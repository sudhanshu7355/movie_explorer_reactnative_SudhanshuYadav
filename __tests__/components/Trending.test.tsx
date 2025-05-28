import React from 'react';
import { render } from '@testing-library/react-native';
import Trending from '../../src/components/Trending';
import Card from '../../src/components/Card';

jest.mock('./Card', () => 'Card');

describe('Trending Component', () => {
  const mockMovies = [
    { id: '1', title: 'Movie 1' },
    { id: '2', title: 'Movie 2' },
  ];

  it('renders the "Trending Now" title', () => {
    const { getByText } = render(<Trending movies={mockMovies} />);
    expect(getByText('Trending Now')).toBeTruthy();
  });

  it('renders all movie cards passed via props', () => {
    const { getAllByText } = render(<Trending movies={mockMovies} />);
    const cards = getAllByText('Card');
    expect(cards.length).toBe(2);
  });

  it('handles an empty movie list without crashing', () => {
    const { getByText, queryByText } = render(<Trending movies={[]} />);
    expect(getByText('Trending Now')).toBeTruthy();
    expect(queryByText('Card')).toBeNull();
  });

  it('handles undefined or null movies without crashing', () => {
    const { getByText, queryByText } = render(<Trending />);
    expect(getByText('Trending Now')).toBeTruthy();
    expect(queryByText('Card')).toBeNull();
  });
});
