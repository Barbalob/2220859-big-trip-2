import { POINT_TYPES } from '../const.js';
import AbstractView from '../framework/view/abstract-stateful-view.js';


const upFirstLetter = ((word) => `${word[0].toUpperCase()}${word.slice(1)}`);
// cons t formatOfferstitle = (title) => title.split(' ').join('_');
const getOfferIdFromMarkup = (markupId) => {
  const markupAssets = markupId.split('-');
  return Number(markupAssets[2]) || 0;
};

const createFiltersTemplate = (point, destination, offersByType) => {
  const pointDestination = destination.find((dest) =>  dest.id === point.destination);
  const typeOffers = offersByType.find((offer) =>  offer.type === point.type).offers;
  const pointOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  // const {dateFrom, dateTo, basePrice, type} = point;
  const {basePrice, type} = point;
  const {name, description, pictures} = pointDestination || {};
  const pointId = point.id || 0;

  return (
    `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

  ${POINT_TYPES.map((pointType) => (
      `<div class="event__type-item">
        <input id="event-type-${pointType}-${pointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${pointId}">${upFirstLetter(pointType)}</label>
      </div>`
    )).join('')} 
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${pointId}">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${name || ''}" list="destination-list-${pointId}">
      <datalist id="destination-list-${pointId}">
        ${destination.map((dest) => `<option value="${dest.name}"></option>`).join('')}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
      <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" value="${'18/03/19 12:25'}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-${pointId}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" value="${'18/03/19 13:35'}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${pointId}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${pointId}" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">${point.id ? 'Delete':'Cancel'}</button>
    ${point.id ? (
      `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`) : ''
    }
  </header>

  <section class="event__details">
  ${typeOffers.length ? `
  <section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>

  <div class="event__available-offers">

  ${typeOffers.map((typeOffer) => (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${typeOffer.id}-${pointId}" 
        type="checkbox" name="event-offer-${typeOffer.id}-${pointId}" ${pointOffers.map((offer)=>offer.id).includes(typeOffer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${typeOffer.id}-${pointId}">
          <span class="event__offer-title">${typeOffer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${typeOffer.price}</span>
        </label>
      </div>`
    )).join('')}

  </div>
</section>
  ` : ''}
    

  ${pointDestination ? (
      `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    ${pictures.lenght ? (
        `
      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${pictures.map((photo)=> `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`)}
        // ${pictures.map((photo)=> (`<img class="event__photo" src="${photo.src}" alt="${photo.description}"></img>`)).join('')}
        </div>
      </div>
      `
      ) : ''}
      </section>`) : ''}
  </section>
</form>
</li>
  `
  );
};


export default class PointEditView extends AbstractView{
  #point        = null;
  #destination  = [];
  #offersByType = [];


  constructor(point, destination, offersByType){
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offersByType = offersByType;
    this._setState(this.#point);
    this.#setInnerHandlers();
  }

  get template() {
    return createFiltersTemplate(this._state, this.#destination, this.#offersByType);
  }

  resetState = () => {
    this.updateElement(this.#point);
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

  #modeButtonClickHandler = () =>{
    this._callback.modeButtonClick();
  }

  #formSubmutHandler = (event) =>{
    event.preventDefault();
    this._callback.formSubmit(this._state);
  }

  #formResetHandler = (event) =>{
    event.preventDefault();
    this._callback.formReset();
  }

  #changeTypeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
      offers:[],
    });
  }

  #changeDestinationHandler = (evt) => {
    const newDestination = this.#destination.find((dest) => dest.name === evt.target.value);
    this.updateElement({
      destination: newDestination ? newDestination.id : this._state.destination,
    });
  }

  #changePriceHandler = (evt) => {
    const inputPrice = Number(evt.target.value);
    const isValidPrice = !Number.isNaN(inputPrice) && !evt.target.value.includes('e');
    const newPrice = isValidPrice ? Math.round(inputPrice) : this._state.basePrice;

    this._setState({
      basePrice:newPrice
    });
    evt.target.value = newPrice;
  }

  #changeOffersHandler = (evt) => {
    const {id, checked} = evt.target;
    const offerId = getOfferIdFromMarkup(id);
    const currentOffers  = this._state.offers;
    let newOffers = [];

    if (checked) {
      newOffers = [
        ...currentOffers,
        offerId,
      ];
    } else {
      const offerIndex = currentOffers.findIndex((currentId) => currentId === offerId);
      newOffers = [
        ...currentOffers.slice(0, offerIndex),
        ...currentOffers.slice(offerIndex + 1),
      ];
    }

    this._setState({
      offers:newOffers,
    });
  }


  #setInnerHandlers = () => {
    const offersNode = this.element.querySelector('.event__available-offers');
    if(offersNode){
      offersNode.addEventListener('change', this.#changeOffersHandler);
    }

    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changePriceHandler);
  }

  _restoreHandlers(){
    this.#setInnerHandlers();
    this.setFormSubmutHandler(this._callback.formSubmit);
    this.setFormResetHandler(this._callback.formReset);
    this.setModeButtonClickHandler(this._callback.modeButtonClick);
  }
}
