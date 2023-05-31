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
