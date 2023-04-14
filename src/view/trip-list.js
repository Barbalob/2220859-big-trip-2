import { createElement } from '../render.js';

const createFiltersTemplate = () => (
  `
  <ul class="trip-events__list">
  </ul>
  `
);

export default class FiltersView {
  #element = null;

  get template() {
    return createFiltersTemplate();
  }

  get element () {
    if (!this.#element){
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement () {
    this.#element = null;
  }
}
