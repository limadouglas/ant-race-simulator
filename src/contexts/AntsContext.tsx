import { createContext, ReactNode, useEffect, useState } from "react";

import { AntDto } from "../dtos/AntDto";
import { api } from "../services/api";
import { numberToProbability, orderByName, orderByProbability } from "../utils";

export type AntsContextProps = {
  ants: AntDto[];
  getAnts: () => Promise<AntDto[]>;
  startRace: (callbackLastItemExecuted: () => void) => void;
};

type AntsContextProviderProps = {
  children: ReactNode;
};

export const AntsContext = createContext<AntsContextProps>(
  {} as AntsContextProps
);

export const AntsContextProvider = ({ children }: AntsContextProviderProps) => {
  const [ants, setAnts] = useState<AntDto[]>([]);

  const getAnts = () =>
    new Promise<AntDto[]>(async (resolve, reject) => {
      try {
        const { data } = await api.get("/ants");
        setAnts(
          orderByName(data.ants.map((ant) => ({ ...ant, probability: 0 })))
        );
        resolve(null);
      } catch (error) {
        console.log("error", JSON.stringify(error));
        reject(error);
      }
    });

  // Ant-win likelihood algorithm: don't change this!
  function generateAntWinLikelihoodCalculator() {
    const delay = 7000 + Math.random() * 7000;
    const likelihoodOfAntWinning = Math.random();

    return (callback) => {
      setTimeout(() => {
        callback(likelihoodOfAntWinning);
      }, delay);
    };
  }

  const updateProbability = (ant: AntDto, probability: number) => {
    setAnts((oldAnts) => {
      const antsUpdated = [
        ...oldAnts.filter((_ant) => _ant.name !== ant.name),
        { ...ant, probability: numberToProbability(probability) },
      ];
      const antsOrdered = orderByProbability(antsUpdated);
      return antsOrdered;
    });
  };

  const resetRace = () => {
    setAnts((oldAnts) =>
      oldAnts
        .map((ant) => ({ ...ant, probability: 0 }))
        .sort((a, b) => (a.name > b.name ? 1 : -1))
    );
  };

  const startRace = (callbackLastItemExecuted: () => void) => {
    resetRace();
    ants.forEach((ant, index) =>
      generateAntWinLikelihoodCalculator()((probability) => {
        updateProbability(ant, probability);
        if (index === ants.length - 1) {
          callbackLastItemExecuted();
        }
      })
    );
  };

  return (
    <AntsContext.Provider value={{ ants, startRace, getAnts }}>
      {children}
    </AntsContext.Provider>
  );
};
