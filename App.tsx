import React from "react";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

import { Home } from "./src/screens/home";
import { AntsContextProvider } from "./src/contexts/AntsContext";

export default function App() {
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
