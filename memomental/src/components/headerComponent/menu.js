import React from 'react'
import {createDrawerNavigator, DrawerActions} from 'react-navigation'
import {Icon, Header} from 'react-native-elements'

//these are the components to be navigated to from the menu
import Home from '../pages/homePage'
import Cartes from '../cards/homeCards'

const Menu = createDrawerNavigator(
    {
        "Home": { screen: Home },
        "Cartes": { screen: Cartes },
    },
    {
        drawerWidth: 300,
        drawerPosition: 'left',
        initialRouteName: 'Rick',
    }
);

const MenuContainer = () => {
    let pressMenu;

    return(
        <React.Fragment>
            <Header
                backgroundColor="white"
                leftComponent={
                    <Icon
                        name="menu"
                        onPress={() => {
                            pressMenu.dispatch(DrawerActions.toggleDrawer())
                        }}
                    />
                }
            />
            <Menu
                ref={navigatorRef => { pressMenu = navigatorRef}}
            />
        </React.Fragment>
    )
};

export default MenuContainer