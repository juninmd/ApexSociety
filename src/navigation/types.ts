import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
    Map: undefined;
    Events: undefined;
    Menu: undefined;
    Moments: undefined; // CrewScreen
    Profile: undefined;
};

export type RootTabScreenProps<T extends keyof RootTabParamList> = BottomTabScreenProps<
    RootTabParamList,
    T
>;

declare global {
    namespace ReactNavigation {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        interface RootParamList extends RootTabParamList {}
    }
}
