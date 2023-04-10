import { render, RenderPosition } from '../render.js';

import Sort from '../view/sort.js';
// import EditForm from '../view/edit-form.js';
// import CreationForm from '../view/creation-form.js';
import TripList from '../view/trip-list.js';
import Point from '../view/point.js';
// import PointModel from '../model/point-model.js';

class Trip {
  #component  = null;
  #container  = null;
  #pointModal = null;
  constructor({container, pointModel}){
    this.#component = new TripList();
    this.#container = container;
    this.#pointModal = pointModel;
  }

  init() {
    const points = this.#pointModal.getPoints();
    const destination = this.#pointModal.getDestination();
    const offersByType = this.#pointModal.getOffersByType();

    render(new Sort(), this.#container, RenderPosition.BEFOREEND);
    render(this.#component, this.#container, RenderPosition.BEFOREEND);


    for (const point of points){
      render(new Point(point, destination, offersByType), this.#component.element, RenderPosition.BEFOREEND);
    }
  }
}

export default Trip;
