import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Popular from '../../src/components/Popular'; 
import Card from '../../src/components/Card'; 

describe('Popular Component', () => {
  const mockMovies = [
    { id: '1', title: 'Movie 1', rating: 9 },
    { id: '2', title: 'Movie 2', rating: 7 },
    { id: '3', title: 'Movie 3', rating: 8 },
    { id: '4', title: 'Movie 4', rating: 10 },
  ];

  it('renders correctly with movies', () => {
    const { getByText, getAllByType } = render(<Popular movies={mockMovies} />);

   
    expect(getByText('Popular Now')).toBeTruthy();

   
    const cards = getAllByType(Card);
    expect(cards.length).toBe(3); 
  });

  it('filters out movies with a rating below 8', () => {
    const { getAllByType } = render(<Popular movies={mockMovies} />);

   
    const cards = getAllByType(Card);
    const cardTitles = cards.map(card => card.props.data.title);

    expect(cardTitles).toEqual(['Movie 1', 'Movie 3', 'Movie 4']);
  });

  it('handles an empty list of movies', () => {
    const { getByText } = render(<Popular movies={[]} />);

   
    expect(getByText('Popular Now')).toBeTruthy();
  });

  it('handles null or undefined movies', () => {
    const { getByText } = render(<Popular movies={null} />);

    
    expect(getByText('Popular Now')).toBeTruthy();
  });
});
