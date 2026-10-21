import React from 'react';
import renderer from 'react-test-renderer';
import MapHotspots from '../src/components/MapScreen/MapHotspots';
import { EventProvider } from '../src/context/EventContext';
import { ReputationProvider } from '../src/context/ReputationContext';

jest.mock('react-native-maps', () => {
    const React = require('react');
    const { View } = require('react-native');
    class MockCircle extends React.Component {
        render() {
            return <View testID="mock-circle" {...this.props} />;
        }
    }
    class MockMarker extends React.Component {
        render() {
            return <View testID="mock-marker" {...this.props} />;
        }
    }
    return {
        __esModule: true,
        Circle: MockCircle,
        Marker: MockMarker,
    };
});

describe('MapHotspots', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('renders without crashing', () => {
        let tree: any;
        renderer.act(() => {
            tree = renderer.create(
                <ReputationProvider>
                    <EventProvider>
                        <MapHotspots />
                    </EventProvider>
                </ReputationProvider>,
            );
        });
        expect(tree.toJSON()).toBeTruthy();
    });
});
