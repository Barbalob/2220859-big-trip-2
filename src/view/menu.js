import { createElement } from '../render.js';

const createFiltersTemplate = () => (
  `
  <nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>
  `
);

export default class FiltersView {
  getTemplate () {
    return createFiltersTemplate;
  }

  getElement () {
    if (!this.element){
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
