import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootTabParamList = {
    Map: undefined;
    Events: undefined;
    Menu: undefined;
    Moments: undefined; // CrewScreen
    Profile: undefined;
};

export type RootStackParamList = {
    Main: NavigatorScreenParams<RootTabParamList>;
    CreateEvent: undefined;
};

export type RootTabScreenProps<T extends keyof RootTabParamList> = BottomTabScreenProps<
    RootTabParamList,
    T
>;

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    T
>;

declare global {
    namespace ReactNavigation {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        interface RootParamList extends RootStackParamList {}
    }
}
