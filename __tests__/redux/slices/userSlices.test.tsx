import reducer, { setRole, setToken } from '../../../src/redux/slices/userSlices';

describe('userSlice reducer', () => {
  const initialState = {
    role: null,
    token: null,
  };

  it('should return the initial state', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle setRole', () => {
    const role = 'admin';
    const result = reducer(initialState, setRole(role));
    expect(result.role).toBe(role);
    expect(result.token).toBeNull(); 
  });

  it('should handle setToken', () => {
    const token = 'abc123';
    const result = reducer(initialState, setToken(token));
    expect(result.token).toBe(token);
    expect(result.role).toBeNull(); 
  });

  it('should not change state for unknown action type', () => {
    const result = reducer(initialState, { type: 'unknown/action' });
    expect(result).toEqual(initialState);
  });
});
