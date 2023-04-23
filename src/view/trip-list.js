import AbstractView from '../framework/view/abstract-view.js';

const createFiltersTemplate = () => (
  `
  <ul class="trip-events__list">
  </ul>
  `
);

export default class FiltersView extends AbstractView{
  get template() {
    return createFiltersTemplate();
  }
}
