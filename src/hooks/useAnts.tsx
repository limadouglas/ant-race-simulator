import { useContext } from "react";

import { AntsContext } from "../contexts/AntsContext";

export const useAnts = () => {
  const context = useContext(AntsContext);
  return context;
};
