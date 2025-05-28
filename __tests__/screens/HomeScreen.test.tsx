import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import { getAllMovies } from '../../src/axiosRequest/Axiosrequest';


jest.mock('../components/Header', () => () => <Text>Header</Text>);
jest.mock('../components/Carousel', () => () => <Text>Carousel</Text>);
jest.mock('../components/Popular', () => ({ movies }) => <Text>Popular: {movies.length}</Text>);
jest.mock('../components/Trending', () => ({ movies }) => <Text>Trending: {movies.length}</Text>);
jest.mock('../components/Action', () => ({ movies }) => <Text>Action: {movies.length}</Text>);
jest.mock('../components/Sci', () => ({ movies }) => <Text>Sci: {movies.length}</Text>);
jest.mock('../components/Romance', () => ({ movies }) => <Text>Romance: {movies.length}</Text>);


jest.mock('../axiosRequest/Axiosrequest');

describe('HomeScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading indicator initially', () => {
    const { getByText, getByTestId } = render(<HomeScreen />);
    expect(getByText('Loading movies...')).toBeTruthy();
  });

  it('renders movie sections on successful fetch', async () => {
    const mockMovies = [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
    ];
    getAllMovies.mockResolvedValueOnce(mockMovies);

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText('Header')).toBeTruthy();
      expect(getByText('Carousel')).toBeTruthy();
      expect(getByText('Popular: 2')).toBeTruthy();
      expect(getByText('Trending: 2')).toBeTruthy();
      expect(getByText('Action: 2')).toBeTruthy();
      expect(getByText('Sci: 2')).toBeTruthy();
      expect(getByText('Romance: 2')).toBeTruthy();
    });
  });

  it('displays error message on fetch failure', async () => {
    getAllMovies.mockRejectedValueOnce(new Error('Fetch failed'));

    const { getByText } = render(<HomeScreen />);
    
    await waitFor(() => {
      expect(getByText('Failed to load movies')).toBeTruthy();
    });
  });
});
