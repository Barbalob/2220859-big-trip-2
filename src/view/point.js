import AbstractView from '../framework/view/abstract-view.js';
import { dateDifference, humanizeTaskDueDate } from '../util/common.js';

const createFiltersTemplate = (point, destination, offersByType) => {
  const pointDestination = destination.find((dest) =>  dest.id === point.destination);
  const pointTypeOffers = offersByType.find((offer) =>  offer.type === point.type).offers;
  const pointOffers = pointTypeOffers.filter((offer) =>  point.offers.includes(offer.id));
  const {dateTo, dateFrom} = point;
  return (
    `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${'2019-03-18'}">${'MAR 18'}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${point.type} ${pointDestination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${humanizeTaskDueDate(dateFrom,'DD/MM/YY HH:mm')}">${humanizeTaskDueDate(dateFrom,'HH:mm')}</time>
        &mdash;
        <time class="event__end-time" datetime="${humanizeTaskDueDate(dateTo,'DD/MM/YY HH:mm')}">${humanizeTaskDueDate(dateTo,'HH:mm')}</time>
      </p>
      <p class="event__duration">${dateDifference(dateTo, dateFrom)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${pointOffers.map((offer)=>(
      `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`
    )).join('')}
    </ul>
    <button class="event__favorite-btn ${point.isFavorite===true?'event__favorite-btn--active':''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>
  `
  );
};


export default class PointView extends AbstractView{
  #point        = null;
  #destination  = null;
  #offersByType = null;


  constructor(point, destination, offersByType){
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offersByType = offersByType;
  }

  get template() {
    return createFiltersTemplate(this.#point, this.#destination, this.#offersByType);
  }

  setModeButtonClickHandler = (callback) =>{
    this._callback.modeButtonClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click',this.#modeButtonClickHandler);
  }

  setFormSubmutHandler = (callback) =>{
    this._callback.formSubmit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit',this.#formSubmutHandler);
  }

  setFormResetHandler = (callback) =>{
    this._callback.formReset = callback;
    this.element.querySelector('.event--edit').addEventListener('reset',this.#formResetHandler);
  }

  setFavoriteButtonClickHandler = (callback) =>{
    this._callback.favoriteButtonClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click',this.#favoriteButtonClickHandler);
  }

  #modeButtonClickHandler = () =>{
    this._callback.modeButtonClick();
  }

  #formSubmutHandler = (event) =>{
    event.preventDefault();
    this._callback.formSubmit();
  }

  #formResetHandler = (event) =>{
    event.preventDefault();
    this._callback.formReset();
  }

  #favoriteButtonClickHandler = () => {
    this._callback.favoriteButtonClick();
  }

}
