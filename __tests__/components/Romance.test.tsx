import React from 'react';
import { render } from '@testing-library/react-native';
import Romance from '../../src/components/Romance'; 
import Card from '../../src/components/Card';


jest.mock('./Card', () => 'Card');

describe('Romance Component', () => {
  const mockMovies = [
    { id: '1', title: 'Romantic Movie 1', genre: 'Romance' },
    { id: '2', title: 'Action Movie', genre: 'Action' },
    { id: '3', title: 'Romantic Movie 2', genre: 'Romance' },
  ];

  it('renders the title correctly', () => {
    const { getByText } = render(<Romance movies={mockMovies} />);
    expect(getByText('Romance')).toBeTruthy();
  });

  it('filters and displays only romance genre movies', () => {
    const { getAllByText } = render(<Romance movies={mockMovies} />);
    const renderedCards = getAllByText('Card'); 
    expect(renderedCards.length).toBe(2); 
  });

  it('renders nothing if there are no romance genre movies', () => {
    const nonRomanceMovies = [
      { id: '1', title: 'Comedy Movie', genre: 'Comedy' },
      { id: '2', title: 'Action Movie', genre: 'Action' },
    ];
    const { queryByText } = render(<Romance movies={nonRomanceMovies} />);
    expect(queryByText('Card')).toBeNull();
  });

  it('handles empty movie list gracefully', () => {
    const { getByText, queryByText } = render(<Romance movies={[]} />);
    expect(getByText('Romance')).toBeTruthy();
    expect(queryByText('Card')).toBeNull();
  });

  it('handles missing movie prop gracefully', () => {
    const { getByText, queryByText } = render(<Romance />);
    expect(getByText('Romance')).toBeTruthy();
    expect(queryByText('Card')).toBeNull();
  });
});
