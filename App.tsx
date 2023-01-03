import React from "react";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

import { Home } from "./src/screens/home";
import { AntsContextProvider } from "./src/contexts/AntsContext";
import * as SplashScreen from "expo-splash-screen";
export default function App() {
  SplashScreen.preventAutoHideAsync();
  setTimeout(() => {
    SplashScreen.hideAsync();
  }, 2000);
  
  return (
    <>
      <StatusBar style="auto" />
      <NativeBaseProvider>
        <AntsContextProvider>
          <Home />
        </AntsContextProvider>
      </NativeBaseProvider>
    </>
  );
}
