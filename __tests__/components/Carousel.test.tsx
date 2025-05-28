import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Carousel from '../../src/components/Carousel';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

const mockMovies = [
  {
    id: 1,
    title: 'Movie One',
    genre: 'Action',
    rating: '9.1',
    releaseYear: '2022',
    description: 'First movie description',
    poster_url: 'https://example.com/movie1.jpg',
  },
  {
    id: 2,
    title: 'Movie Two',
    genre: 'Drama',
    rating: '8.3',
    releaseYear: '2023',
    description: 'Second movie description',
    poster_url: 'https://example.com/movie2.jpg',
  },
];

const renderWithStore = (movies = mockMovies) => {
  const store = mockStore({ movies: { movies } });
  return render(
    <Provider store={store}>
      <Carousel />
    </Provider>
  );
};

describe('Carousel Component', () => {
  it('renders title and movies', () => {
    const { getByText } = renderWithStore();
    expect(getByText('Featured Movies')).toBeTruthy();
    expect(getByText('Movie One')).toBeTruthy();
  });

  it('renders correct number of pagination dots', () => {
    const { getAllByTestId } = renderWithStore();
    const dots = getAllByTestId('pagination-dot');
    expect(dots.length).toBe(mockMovies.length);
  });

  it('opens modal on poster press and shows details', () => {
    const { getByText, getByRole } = renderWithStore();

    // Press movie poster
    fireEvent.press(getByRole('button'));

    // Expect modal content
    expect(getByText('Movie One')).toBeTruthy();
    expect(getByText('First movie description')).toBeTruthy();
    expect(getByText('9.1')).toBeTruthy();
    expect(getByText('2022')).toBeTruthy();
  });

  it('closes modal when close button is pressed', () => {
    const { getByText, getByRole, queryByText } = renderWithStore();

    // Open modal
    fireEvent.press(getByRole('button'));
    expect(getByText('Movie One')).toBeTruthy();

    // Press close icon
    fireEvent.press(getByRole('image'));
    expect(queryByText('Movie One')).toBeNull();
  });
});
