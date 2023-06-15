
import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const EmptyListMessage = {
  [FilterType.EVERYTHING] : 'Click New Event To create your first point',
  [FilterType.FUTURE] : 'There are no future events now',
  [FilterType.PAST] : 'There are no past events now',
};

const createFiltersTemplate = (filterType, isTripEmpty) => (
  `
  <p class="trip-events__msg">
  ${isTripEmpty ? EmptyListMessage[FilterType.EVERYTHING] : EmptyListMessage[filterType]}
  </p>
`
);

export default class EmptyFormView extends AbstractView{
  #filterType = FilterType.EVERYTHING;
  #isTripEmpty = 0;

  constructor(filterType, isTripEmpty){
    super();
    this.#filterType = filterType;
    this.#isTripEmpty = isTripEmpty;
  }

  get template() {
    return createFiltersTemplate(this.#filterType, this.#isTripEmpty);
  }
}
