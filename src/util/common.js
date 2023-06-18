import dayjs from 'dayjs';
import { FilterType } from '../const';

export function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

const getPointDuration = (point) => {
  const {dateForm: startDate, dateTo: endDate} = point;
  const duration = (new Date(endDate)).getTime() - (new Date(startDate)).getTime();
  return duration;
};

export const sortPointsByPrice = (a, b) => b.basePrice - a.basePrice;
export const sortPointsByTime = (a, b) => getPointDuration(b) - getPointDuration(a);
export const humanizeTaskDueDate = (dueDate, form) => dueDate ? dayjs(dueDate).format(form) : '';

export const dateDifference = (a, b) => {
  let difference = '';
  a = dayjs(a);
  b = dayjs(b);
  const H = 'H';
  const D = 'D';
  const M = 'M';
  const space = ' ';
  const day = a.diff(b, 'day');
  const hour = a.diff(b, 'hour') ;
  const minute = a.diff(b, 'minute');
  if (day > 0) {
    difference = difference + day + D + space;
  }
  if (hour > 0) {
    difference = difference + hour % 24 + H + space;
  }
  if (minute > 0) {
    difference = difference + minute % 60 + M;
  }
  return difference;
};

export const DayMonth = (a) => {
  a = new Date(a);
  a = a.toDateString();
  const b = a.split(' ');
  const space = ' ';
  return b[1] + space + b[2];
};

export const checkIfPatchUpdate = (a, b) => {
  const isPriceEqual = a.basePrice === b.basePrice;
  const isDurationEqual = getPointDuration(a) === getPointDuration(b);

  return isPriceEqual && isDurationEqual;
};

export const filterPoints = {
  [FilterType.EVERYTHING] : (points) => [...points],
  [FilterType.FUTURE] : (points) => points.filter((point) => new Date(point.dateForm).getTime() >= Date.now()),
  [FilterType.PAST] : (points) => points.filter((point) => new Date(point.dateTo).getTime() < Date.now()),
};

