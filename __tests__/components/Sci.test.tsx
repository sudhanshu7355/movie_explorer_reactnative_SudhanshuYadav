import React from 'react';
import { render } from '@testing-library/react-native';
import Sci from '../../src/components/Sci';
import Card from '../../src/components/Card';


jest.mock('./Card', () => 'Card');

describe('Sci Component', () => {
  const mockMovies = [
    { id: '1', title: 'Sci-Fi Movie 1', genre: 'Sci-Fi' },
    { id: '2', title: 'Drama Movie', genre: 'Drama' },
    { id: '3', title: 'Sci-Fi Movie 2', genre: 'Sci-Fi' },
  ];

  it('renders the title correctly', () => {
    const { getByText } = render(<Sci movies={mockMovies} />);
    expect(getByText('Sci-Fi')).toBeTruthy();
  });

  it('displays only movies of genre "Sci-Fi"', () => {
    const { getAllByText } = render(<Sci movies={mockMovies} />);
    const renderedCards = getAllByText('Card'); 
    expect(renderedCards.length).toBe(2);
  });

  it('renders no cards if there are no "Sci-Fi" movies', () => {
    const noSciFi = [
      { id: '1', title: 'Comedy', genre: 'Comedy' },
      { id: '2', title: 'Romance', genre: 'Romance' },
    ];
    const { queryByText } = render(<Sci movies={noSciFi} />);
    expect(queryByText('Card')).toBeNull();
  });

  it('handles an empty movie list', () => {
    const { getByText, queryByText } = render(<Sci movies={[]} />);
    expect(getByText('Sci-Fi')).toBeTruthy();
    expect(queryByText('Card')).toBeNull();
  });

  it('handles missing movies prop', () => {
    const { getByText, queryByText } = render(<Sci />);
    expect(getByText('Sci-Fi')).toBeTruthy();
    expect(queryByText('Card')).toBeNull();
  });
});
