import React from 'react';
import { render } from '@testing-library/react-native';
import Action from '../../src/components/Action';

// Mock the Card component to isolate test
jest.mock('./Card', () => {
  return ({ data }) => <Text>{data.title}</Text>;
});

const sampleMovies = [
  { id: 1, title: 'Action Movie 1', genre: 'Action' },
  { id: 2, title: 'Comedy Movie', genre: 'Comedy' },
  { id: 3, title: 'Action Movie 2', genre: 'Action' },
];

describe('Action Component', () => {
  it('renders correctly with action movies', () => {
    const { getByText, queryByText } = render(<Action movies={sampleMovies} />);

    // Header
    expect(getByText('Action')).toBeTruthy();

    expect(getByText('Action Movie 1')).toBeTruthy();
    expect(getByText('Action Movie 2')).toBeTruthy();
    expect(queryByText('Comedy Movie')).toBeNull();
  });

  it('renders nothing when no action movies are provided', () => {
    const { queryByText } = render(
      <Action movies={[{ id: 4, title: 'Drama Movie', genre: 'Drama' }]} />
    );

    expect(queryByText('Drama Movie')).toBeNull();
  });

  it('handles empty movie list gracefully', () => {
    const { toJSON } = render(<Action movies={[]} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles missing movies prop gracefully', () => {
    const { toJSON } = render(<Action />);
    expect(toJSON()).toMatchSnapshot();
  });
});
