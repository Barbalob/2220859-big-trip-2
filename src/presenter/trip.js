import { render, RenderPosition } from '../render.js';

import Sort from '../view/sort.js';
import EditForm from '../view/edit-form.js';
import CreationForm from '../view/creation-form.js';
import TripList from '../view/trip-list.js';
import Point from '../view/point.js';
import PointModel from '../model/point-model.js';

class Trip {
  constructor({container}){
    this.component = new TripList();
    this.container = container;
    this.pointModal = new PointModel();
  }

  init() {
    const points = this.pointModal.getPoints();
    const destination = this.pointModal.getDestination();
    const offersByType = this.pointModal.getOffersByType();

    render(new Sort(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container, RenderPosition.BEFOREEND);
    render(new CreationForm(), this.component.getElement(), RenderPosition.BEFOREEND);
    render(new EditForm(points[0], destination, offersByType), this.component.getElement(), RenderPosition.BEFOREEND);

    for (const point of points){
      render(new Point(point, destination, offersByType), this.component.getElement(), RenderPosition.BEFOREEND);
    }
  }
}

export default Trip;
