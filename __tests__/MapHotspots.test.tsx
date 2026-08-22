import React from 'react';
import renderer from 'react-test-renderer';
import MapHotspots from '../src/components/MapScreen/MapHotspots';

jest.mock('react-native-maps', () => {
    const React = require('react');
    const { View } = require('react-native');
    class MockCircle extends React.Component {
        render() {
            return <View testID="mock-circle" {...this.props} />;
        }
    }
    return {
        __esModule: true,
        Circle: MockCircle,
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
            tree = renderer.create(<MapHotspots />);
        });
        expect(tree.toJSON()).toBeTruthy();
    });
});
