import React from 'react';
import { render } from '@testing-library/react-native';
import EventCard from '../src/components/EventCard';
import { ReputationProvider } from '../src/context/ReputationContext';

describe('EventCard', () => {
    const renderWithContext = (ui: React.ReactElement) => {
        return render(<ReputationProvider>{ui}</ReputationProvider>);
    };

    const defaultProps = {
        title: 'Test Event',
        host: 'Test Host',
        location: 'Test Location',
        time: '12:00',
        attendees: 50,
    };

    it('renders basic event details correctly', () => {
        const { getByText } = renderWithContext(<EventCard {...defaultProps} />);

        expect(getByText('Test Event')).toBeTruthy();
        expect(getByText('HOSTED BY Test Host')).toBeTruthy();
        expect(getByText('Test Location')).toBeTruthy();
        expect(getByText('12:00')).toBeTruthy();
    });

    it('renders HIGH HYPE badge when hypeScore is >= 100', () => {
        const { getByText } = renderWithContext(<EventCard {...defaultProps} hypeScore={150} />);

        expect(getByText('🔥 HIGH HYPE')).toBeTruthy();

        const { queryByText: queryByTextLow } = renderWithContext(
            <EventCard {...defaultProps} hypeScore={99} />,
        );

        expect(queryByTextLow('🔥 HIGH HYPE')).toBeNull();
    });

    it('renders elevated risk warning', () => {
        const { getByText } = renderWithContext(
            <EventCard {...defaultProps} elevatedRisk={true} />,
        );
        expect(getByText('⚠️ ELEVATED POLICE RISK')).toBeTruthy();
    });

    it('handles secret event rendering and unlocking', () => {
        const { getByText, queryByText } = renderWithContext(
            <EventCard {...defaultProps} isSecret={true} passcode="1234" />,
        );

        // Before unlock, it should hide title and show secret UI
        expect(queryByText('Test Event')).toBeNull();
        expect(getByText('EVENTO SECRETO')).toBeTruthy();
    });
});
