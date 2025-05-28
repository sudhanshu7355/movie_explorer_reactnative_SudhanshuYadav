import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import MyListScreen from '../../src/screens/ExplorerScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

const mockMovies = [
  {
    id: 1,
    title: 'Inception',
    release_year: 2010,
    duration: 148,
    rating: 8.8,
    genre: 'Sci-Fi',
    poster_url: 'https://image.com/inception.jpg',
    description: 'Dream within a dream.',
  },
  {
    id: 2,
    title: 'The Matrix',
    release_year: 1999,
    duration: 136,
    rating: 8.7,
    genre: 'Action',
    poster_url: 'https://image.com/matrix.jpg',
    description: 'Reality is a simulation.',
  }
];

const renderComponent = (role = 'user', movies = mockMovies) => {
  const store = mockStore({
    movies: { movies },
    user: { role }
  });

  return render(
    <Provider store={store}>
      <MyListScreen />
    </Provider>
  );
};

describe('MyListScreen', () => {
  it('renders screen header', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('Heading').props.children).toBe('My Watchlist');
  });

  it('renders movie list from store', async () => {
    const { getByText } = renderComponent();
    expect(getByText('Inception')).toBeTruthy();
    expect(getByText('The Matrix')).toBeTruthy();
  });

  it('shows add button if user is supervisor', () => {
    const { getByRole } = renderComponent('supervisor');
    expect(getByRole('button')).toBeTruthy();
  });

  it('does not show add button if user is not supervisor', () => {
    const { queryByRole } = renderComponent('user');
    expect(queryByRole('button')).toBeNull();
  });

  it('searches and filters movies correctly', async () => {
    const { getByPlaceholderText, queryByText } = renderComponent();

    const input = getByPlaceholderText('Search your movies...');
    act(() => {
      fireEvent.changeText(input, 'Matrix');
    });

    await waitFor(() => {
      expect(queryByText('The Matrix')).toBeTruthy();
      expect(queryByText('Inception')).toBeNull();
    });
  });

  it('displays empty state message when no results found', async () => {
    const { getByPlaceholderText, findByText } = renderComponent();

    const input = getByPlaceholderText('Search your movies...');
    act(() => {
      fireEvent.changeText(input, 'Unknown Movie');
    });

    const emptyMessage = await findByText('No movies found matching your search.');
    expect(emptyMessage).toBeTruthy();
  });

  it('opens and closes modal on add button press', () => {
    const { getByRole, getByTestId, queryByTestId } = renderComponent('supervisor');

    const addButton = getByRole('button');
    fireEvent.press(addButton);

    const closeButton = getByTestId('modalClose');
    expect(closeButton).toBeTruthy();

    fireEvent.press(closeButton);
    expect(queryByTestId('modalClose')).toBeNull(); 
  });

  it('loads more movies on button press', async () => {
    const longMovieList = Array.from({ length: 15 }, (_, index) => ({
      ...mockMovies[0],
      id: index + 1,
      title: `Movie ${index + 1}`
    }));

    const { getByText, queryByText } = renderComponent('user', longMovieList);

    await waitFor(() => {
      expect(getByText('Movie 1')).toBeTruthy();
    });

    const loadMoreButton = getByText('Load More Movies');
    fireEvent.press(loadMoreButton);

    await waitFor(() => {
      expect(queryByText('Movie 6')).toBeTruthy();
    });
  });
});
