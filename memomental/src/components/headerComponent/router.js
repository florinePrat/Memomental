import { createStackNavigator } from 'react-navigation'
import MenuContainer from './menu'
import Signup from '../Signup/Signup'

const EntryStack = createStackNavigator(
    {
        Signup: {
            screen: Signup,
        },
    },
    {
        headerMode: 'float',
    }
);

export const RootStack = createStackNavigator(
    {
        EntryStack: { screen: EntryStack },
        MenuStack: { screen: MenuContainer },
    },
    {
        headerMode: 'none',
        initialRouteName: 'AppStack',
    }
)