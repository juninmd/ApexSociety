import React from 'react';
import { render } from '@testing-library/react-native';
import CrewBadge from '../src/components/CrewBadge';

describe('<CrewBadge />', () => {
    it('renders correctly with given name and rank', () => {
        const { getByText } = render(<CrewBadge name="Night Runners" rank="PRO" />);

        // Initial extraction logic check
        expect(getByText('NR')).toBeTruthy();
        expect(getByText('PRO')).toBeTruthy();
    });

    it('applies small size styling correctly', () => {
        const { getByText } = render(<CrewBadge name="Small Crew" size="small" />);
        const initials = getByText('SC');

        expect(initials).toBeTruthy();
        expect(initials.props.style).toEqual(expect.arrayContaining([expect.objectContaining({ fontSize: 14 })]));
    });

    it('applies large size styling correctly', () => {
        const { getByText } = render(<CrewBadge name="Large Crew" size="large" />);
        const initials = getByText('LC');

        expect(initials).toBeTruthy();
        expect(initials.props.style).toEqual(expect.arrayContaining([expect.objectContaining({ fontSize: 36 })]));
    });
});