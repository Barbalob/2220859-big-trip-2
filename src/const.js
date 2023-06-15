export const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
  DEFAULT:'default',
};

export const UserAction = {
  UPDATE_POINT : 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};
export const UpdateType = {
  PATCH : 'PATCH',
  MINOR : 'MINOR',
  MAJOR : 'MAJOR'
};

export const FilterType ={
  EVERYTHING : 'everything',
  PAST: 'past',
  FUTURE: 'future',
};
