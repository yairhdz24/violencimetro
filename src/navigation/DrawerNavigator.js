import React from "react";
import { Animated } from "react-native";
import DrawerContent from "../components/DrawerContent";

const DrawerNavigator = ({
  navigation,
  currentScreen,
  drawerOpen,
  toggleDrawer,
  drawerAnimation,
}) => {
  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: "70%",
        backgroundColor: "white",
        transform: [{ translateX: drawerAnimation }],
        zIndex: 2,
      }}>
      <DrawerContent navigation={navigation} closeDrawer={toggleDrawer} />
    </Animated.View>
  );
};

export default DrawerNavigator;
