import { createContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

export const USER = 0;
export const GPT = 1;

export const ApiKeyContext = createContext(undefined);
export const Drawer = createDrawerNavigator();
