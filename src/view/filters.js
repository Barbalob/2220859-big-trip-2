import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { filterPoints } from '../util/common.js';


const createFiltersTemplate = (points, currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" ${currentFilterType === FilterType.EVERYTHING ? 'checked':''}>
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>
  <div class="trip-filters__filter">
    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" ${filterPoints[FilterType.FUTURE](points).length === 0 ? 'disabled' : ''} ${currentFilterType === FilterType.FUTURE ? 'checked':''}>
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>
  <div class="trip-filters__filter">
    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${filterPoints[FilterType.PAST](points).length === 0 ? 'disabled' : ''} ${currentFilterType === FilterType.PAST ? 'checked':''}>
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`
);


export default class FiltersView extends AbstractView{
  #points = [];
  #currentFilterType = FilterType.EVERYTHING;


  constructor(points,currentFilterType){
    super();
    this.#points = points;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFiltersTemplate(this.#points, this.#currentFilterType);
  }

  setFilterChangeHandler = (callback) => {
    this._callback.changeFilter = callback;
    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  #filterChangeHandler = (evt) => {
    this._callback.changeFilter(evt.target.value);
  }
}
