import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { signUpRequest, LoginRequest, getAllMovies, deleteMovie } from '../../src/axiosRequest/Axiosrequest'; // adjust path as needed

const mock = new MockAdapter(axios);

describe('API Service', () => {
  afterEach(() => {
    mock.reset();
  });

  describe('signUpRequest', () => {
    it('should post signup data and return response', async () => {
      const mockData = { user: { email: 'test@example.com', password: '123456' } };
      mock.onPost('https://movie-explorer-ror-ashutosh-singh.onrender.com/users').reply(201, { success: true });

      const response = await signUpRequest(mockData);
      expect(response.status).toBe(201);
      expect(response.data).toEqual({ success: true });
    });
  });

  describe('LoginRequest', () => {
    it('should post login data and return token', async () => {
      const loginData = { user: { email: 'test@example.com', password: '123456' } };
      const mockResponse = { token: 'abc123' };

      mock.onPost('https://movie-explorer-ror-ashutosh-singh.onrender.com/users/sign_in').reply(200, mockResponse);

      const response = await LoginRequest(loginData);
      expect(response.status).toBe(200);
      expect(response.data).toEqual(mockResponse);
    });
  });

  describe('getAllMovies', () => {
    it('should fetch list of movies', async () => {
      const mockMovies = [{ id: 1, title: 'Movie A' }, { id: 2, title: 'Movie B' }];

      mock.onGet('https://movie-explorer-ror-ashutosh-singh.onrender.com/api/v1/movies').reply(200, {
        movies: mockMovies,
      });

      const movies = await getAllMovies();
      expect(movies).toEqual(mockMovies);
    });

    it('should return null on error', async () => {
      mock.onGet('https://movie-explorer-ror-ashutosh-singh.onrender.com/api/v1/movies').networkError();

      const result = await getAllMovies();
      expect(result).toBeNull();
    });
  });

  describe('deleteMovie', () => {
    it('should delete movie with valid token', async () => {
      const movieId = 1;
      const token = 'valid_token';

      mock
        .onDelete(`https://movie-explorer-ror-ashutosh-singh.onrender.com/api/v1/movies/${movieId}`)
        .reply((config) => {
          expect(config.headers.Authorization).toBe(`Bearer ${token}`);
          return [204];
        });

      const result = await deleteMovie(movieId, token);
      expect(result).toBe(true);
    });

    it('should return false on deletion error', async () => {
      const movieId = 999;
      const token = 'invalid_token';

      mock
        .onDelete(`https://movie-explorer-ror-ashutosh-singh.onrender.com/api/v1/movies/${movieId}`)
        .reply(401, { error: 'Unauthorized' });

      const result = await deleteMovie(movieId, token);
      expect(result).toBe(false);
    });
  });
});
