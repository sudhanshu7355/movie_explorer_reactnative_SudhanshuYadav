import { store } from '../src/redux/store';
import { setMovies } from '../src/redux/slices/movieSlice';
import { setRole, setToken } from '../src/redux/slices/userSlices';

describe('Redux Store', () => {
  it('should initialize with the correct default state', () => {
    const state = store.getState();
    expect(state.movies).toEqual({
      movies: [],
      loading: false,
      error: null,
    });
    expect(state.user).toEqual({
      role: null,
      token: null,
    });
  });

  it('should handle movieSlice actions', () => {
    const sampleMovies = [{ id: 1, title: 'Interstellar' }];
    store.dispatch(setMovies(sampleMovies));
    const state = store.getState();
    expect(state.movies.movies).toEqual(sampleMovies);
  });

  it('should handle userSlice actions', () => {
    store.dispatch(setRole('admin'));
    store.dispatch(setToken('abc123'));
    const state = store.getState();
    expect(state.user.role).toBe('admin');
    expect(state.user.token).toBe('abc123');
  });
});
