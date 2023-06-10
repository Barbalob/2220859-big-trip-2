import { POINT_TYPES } from '../const';

export const getDefaultPoint = () => ({
  id: 0,
  basePrice: '',
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: POINT_TYPES[0],
});
