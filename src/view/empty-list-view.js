
import AbstractView from '../framework/view/abstract-view.js';

const createFiltersTemplate = () => (
  `
  <p class="trip-events__msg">Click New Event to create your first point</p>
`
);


export default class FiltersView extends AbstractView{
  get template() {
    return createFiltersTemplate();
  }
}
