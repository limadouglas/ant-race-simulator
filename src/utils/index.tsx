import { AntDto } from "../dtos/AntDto";

export const numberToProbability = (probability: number) =>
  Number((probability * 100).toFixed(1));

export const orderByName = (_ants: AntDto[]) =>
  _ants.sort((a, b) => (a.name > b.name ? 1 : -1));

  export const orderByProbability = (_ants: AntDto[]) =>
  _ants.sort((a, b) => (a.probability < b.probability ? 1 : -1));
