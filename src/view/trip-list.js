import { createElement } from '../render.js';

const createFiltersTemplate = () => (
  `
  <ul class="trip-events__list">
  </ul>
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
