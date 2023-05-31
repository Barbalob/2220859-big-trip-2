// import { createElement } from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';

const sortTypes = Object.values(SortType);
const isSortTypeDisabled = (sortType) => sortType === 'event' || sortType === 'offer';
const upFirstLetter = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;

const createSortTemplate = () => (
  `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sortTypes.map((sortType) => (
    `
    <div class="trip-sort__item  trip-sort__item--${sortType}">
    <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}"
      data-sort-type="${sortType}" ${sortType === SortType.DAY ? 'checked' : ''} ${isSortTypeDisabled(sortType) ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${sortType}">${upFirstLetter(sortType)}</label>
    </div>
    `
  )).join('')}
  </form>
`
);

export default class SortView extends AbstractView{
  get template() {
    return createSortTemplate();
  }

  setSortChangeHandler = (callback) => {
    this._callback.sortChange = callback;
    this.element.addEventListener('change', (evt) => {
      const input = evt.target && evt.target.closest('input');
      if (input){
        this.#sortInputHandler(input.dataset.sortType);
      }
    });
  }

  #sortInputHandler = (sortType) => {
    this._callback.sortChange(sortType);
  }
}

