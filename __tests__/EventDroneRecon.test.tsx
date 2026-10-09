import React from 'react';
import { render } from '@testing-library/react-native';
import EventDroneRecon from '../src/components/EventDroneRecon';

jest.mock('../src/context/HazardContext', () => ({
  useHazards: () => ({
    hazards: []
  })
}));

describe('EventDroneRecon', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <EventDroneRecon
        visible={true}
        eventLocation={{ latitude: 0, longitude: 0 }}
        onClose={() => {}}
      />
    );
    expect(getByText('DRONE RECON')).toBeTruthy();
  });
});
