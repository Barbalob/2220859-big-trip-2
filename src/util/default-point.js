import { POINT_TYPES } from '../const';
import { nanoid } from 'nanoid';

export const getDefaultPoint = () => ({
  id: nanoid(),
  basePrice: '',
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: POINT_TYPES[0],
});
