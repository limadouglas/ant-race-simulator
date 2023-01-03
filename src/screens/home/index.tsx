import { useCallback, useState } from "react";
import { Box, useDisclose } from "native-base";
import { FlatList } from "react-native";
import { AntCard } from "../../components/antCard";
import { useAnts } from "../../hooks/useAnts";
import { AntSheet } from "../../components/antSheet";
import { AntDto } from "../../dtos/AntDto";
import { Header } from "../../components/header";
import { ButtonFab } from "../../components/buttomFab";
import { AlertError } from "../../components/alertError";

export const Home = () => {
  const { ants, getAnts, startRace } = useAnts();

  const { isOpen, onOpen, onClose } = useDisclose();

  const [antSelected, setAntSelected] = useState<AntDto>();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  const handlerStartRace = () => {
    setIsLoading(true);
    startRace(() => setIsLoading(false));
  };

  const handlerGetAnts = async () => {
    setShowAlertError(false);
    setIsLoading(true);
    getAnts()
      .catch(() => setShowAlertError(true))
      .finally(() => setIsLoading(false));
  };

  const handlerPressAntCard = useCallback((ant: AntDto) => {
    setAntSelected(ant);
    onOpen();
  }, []);

  const shouldShowAntsList = (_ants: AntDto[]): boolean =>
    _ants && _ants.length <= 0;

  return (
    <Box flex={1} safeArea p={5}>
      {showAlertError && (
        <AlertError onClose={() => setShowAlertError(false)} />
      )}
      {shouldShowAntsList(ants) ? (
        <ButtonFab
          bottom={400}
          label="Get Ants"
          onPress={handlerGetAnts}
          isLoading={isLoading}
        />
      ) : (
        <>
          <FlatList
            data={ants}
            renderItem={({ item, index }) => (
              <AntCard
                ant={item}
                position={index + 1}
                onPress={handlerPressAntCard}
              />
            )}
            ListHeaderComponent={<Header title="Ants" />}
          />
          <ButtonFab
            label="Start Race"
            onPress={handlerStartRace}
            isLoading={isLoading}
          />
          <AntSheet ant={antSelected} isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </Box>
  );
};
