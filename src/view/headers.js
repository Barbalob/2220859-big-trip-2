import AbstractView from '../framework/view/abstract-view.js';
import { DayMonth, sortPointsByDay } from '../util/common.js';

const findCity = (index, destination, sortPoints) => destination[sortPoints[index].destination - 1].name;

const additionalOfferPrice = (type, offers, listOffers) => {
  let additionalPrice = 0;
  const array = listOffers.find((offer) => offer.type === type);
  for (const offer of offers){
    additionalPrice += array.offers[offer-1].price;
  }
  return additionalPrice;
};

const printCity = (sortPoints, destination) => {
  if (sortPoints.length > 3){
    return `${findCity(0,destination,sortPoints)} &mdash; ... &mdash; ${findCity(sortPoints.length-1,destination,sortPoints)}`;
  }
  else if(sortPoints.length === 3){
    return `${findCity(0,destination,sortPoints)} &mdash; ${findCity(1,destination,sortPoints)} &mdash; ${findCity(2,destination,sortPoints)}`;
  }
  else if(sortPoints.length === 2){
    return `${findCity(0,destination,sortPoints)} &mdash; ${findCity(1,destination,sortPoints)}`;
  }
  else if(sortPoints.length === 1){
    return `${findCity(0,destination,sortPoints)}`;
  }
  return 'Trip';
};

const printPrice = (sortPoints, offers) => {
  let price = 0;

  for (const point of sortPoints){
    price = point.basePrice + price + additionalOfferPrice(point.type, point.offers, offers);

  }
  return price;
};

const printDate = (sortPoints) => {
  let dateStart = '';
  let dateEnd = '';
  if (sortPoints.length >= 2){
    dateStart = DayMonth(sortPoints[0].dateFrom);
    dateEnd = DayMonth(sortPoints[sortPoints.length-1].dateTo);
    if (dateStart.split(' ')[0] === dateEnd.split(' ')[0]){
      dateEnd = dateEnd.split(' ')[1];
    }
  }
  else if (sortPoints.length === 1){
    dateStart = DayMonth(sortPoints[0].dateFrom);
    return `${dateStart}`;
  }
  else {
    return '';
  }
  return `${dateStart}&nbsp;&mdash;&nbsp;${dateEnd}`;
};

const createFiltersTemplate = (points, destination, offers) => {
  const sortPoints = points.sort(sortPointsByDay);

  return (
    `
    <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${printCity(sortPoints,destination)}</h1>

      <p class="trip-info__dates">${printDate(sortPoints)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${printPrice(sortPoints, offers)}</span>
    </p>
    </section>
  `
  );
};


export default class HeadersView extends AbstractView{
  #points = [];
  #destination = []
  #offers = []

  constructor(points, destination, offers){
    super();
    this.#points = points;
    this.#destination= destination;
    this.#offers= offers;
  }

  get template() {
    return createFiltersTemplate(this.#points, this.#destination, this.#offers);
  }

}
