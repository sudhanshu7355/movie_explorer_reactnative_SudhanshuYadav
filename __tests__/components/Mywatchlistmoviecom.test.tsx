import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Mywatchlistmoviecom from '../../src/components/Mywatchlistmoviecom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as axiosModule from '../../src/axiosRequest/Axiosrequest';

const mockStore = configureStore([]);
const mockDeleteMovie = jest.spyOn(axiosModule, 'deleteMovie');

describe('Mywatchlistmoviecom', () => {
  let store;

  const baseProps = {
    id: '123',
    title: 'Inception',
    year: '2010',
    duration: '2h 28m',
    rating: '8.8',
    genre: 'Sci-Fi',
    searchQuery: '',
    image: 'https://example.com/image.jpg',
    description: 'A mind-bending thriller.',
  };

  beforeEach(() => {
    store = mockStore({
      user: {
        role: 'supervisor',
        token: 'mock-token',
      },
    });
  });

  it('renders movie component with correct title', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Mywatchlistmoviecom {...baseProps} />
      </Provider>
    );

    expect(getByText('Inception')).toBeTruthy();
    expect(getByText('2010')).toBeTruthy();
    expect(getByText('Sci-Fi')).toBeTruthy();
  });

  it('does not render if movie title does not match search query', () => {
    const props = { ...baseProps, searchQuery: 'Matrix' };
    const { queryByText } = render(
      <Provider store={store}>
        <Mywatchlistmoviecom {...props} />
      </Provider>
    );

    expect(queryByText('Inception')).toBeNull();
  });

  it('opens modal on press', () => {
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <Mywatchlistmoviecom {...baseProps} />
      </Provider>
    );

    const movieTitle = getByText('Inception');
    fireEvent.press(movieTitle);

    expect(getByRole('button')).toBeTruthy(); 
  });

  it('calls deleteMovie on long press confirm', async () => {
    mockDeleteMovie.mockResolvedValueOnce(true);
    const { getByText, UNSAFE_getByType } = render(
      <Provider store={store}>
        <Mywatchlistmoviecom {...baseProps} />
      </Provider>
    );

    const touchable = UNSAFE_getByType(require('react-native').TouchableOpacity);
    fireEvent(touchable, 'onLongPress');

    await waitFor(() => {
      expect(mockDeleteMovie).toHaveBeenCalledWith('123', 'mock-token');
    });
  });
});
