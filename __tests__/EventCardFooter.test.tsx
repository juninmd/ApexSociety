import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import EventCardFooter from '../src/components/EventCardFooter';
import * as Location from 'expo-location';

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  getCurrentPositionAsync: jest.fn().mockResolvedValue({ coords: { latitude: 0, longitude: 0 } }),
}));

jest.mock('../src/context/ReputationContext', () => ({
  useReputation: () => ({ addReputation: jest.fn() })
}));

jest.mock('../src/context/EventContext', () => ({
  useEvents: () => ({ incrementHype: jest.fn() })
}));

describe('EventCardFooter', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <EventCardFooter eventId="test-1" attendees={10} />
    );
    expect(getByText('10 GOING')).toBeTruthy();
  });

  it('handles boost hype correctly', () => {
    const { getByText } = render(
      <EventCardFooter eventId="test-1" attendees={10} />
    );

    act(() => {
        fireEvent.press(getByText('🔥 BOOST'));
    });
  });
});
