import React from 'react';
import renderer from 'react-test-renderer';
import GarageQRPass from '../src/components/GarageQRPass';

jest.mock('react-native-svg', () => {
    const React = require('react');
    const { View } = require('react-native');
    class MockSvg extends React.Component {
        render() {
            return <View testID="mock-svg" {...this.props} />;
        }
    }
    class MockRect extends React.Component {
        render() {
            return <View testID="mock-rect" {...this.props} />;
        }
    }
    return {
        __esModule: true,
        default: MockSvg,
        Rect: MockRect,
    };
});

describe('GarageQRPass', () => {
    it('renders correctly with an eventId', () => {
        let tree: any;
        renderer.act(() => {
            tree = renderer.create(<GarageQRPass eventId="event-test-123" />);
        });
        expect(tree.toJSON()).toBeTruthy();
    });
});
