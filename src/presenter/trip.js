import { render, RenderPosition} from '../framework/render';
import Sort from '../view/sort.js';
// import EditForm from '../view/edit-form.js';
// import CreationForm from '../view/creation-form.js';
import TripList from '../view/trip-list.js';
// import Point from '../view/point.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter';
import { updateItem } from '../util/common';
// import PointModel from '../model/point-model.js';

class Trip {
  #pointsListComponent  = null;
  #mainContainer  = null;
  #pointModal = null;
  #points = [];
  #destination = [];
  #offersByType = [];
  #pointPresenter = new Map();

  constructor({container, pointModel}){
    this.#mainContainer = container;
    this.#pointsListComponent = new TripList();
    this.#pointModal = pointModel;
  }

  init() {
    const points = this.#pointModal.getPoints();
    const destination = this.#pointModal.getDestination();
    const offersByType = this.#pointModal.getOffersByType();
    this.#points = points;
    this.#destination = destination;
    this.#offersByType = offersByType;

    if (points.length === 0){
      render(new EmptyListView(), this.#mainContainer);
      return;
    }

    render(new Sort(), this.#mainContainer, RenderPosition.BEFOREEND);
    render(this.#pointsListComponent, this.#mainContainer, RenderPosition.BEFOREEND);


    for (const point of points){
      this.#renderPoint(point, destination, offersByType);
    }
  }

  #resetAllPoints = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetPoint());
  }

  #renderPoint(point, destination, offers){
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#handlePointUpdate, this.#resetAllPoints);
    pointPresenter.init(point, destination, offers);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #handlePointUpdate = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#destination, this.#offersByType);
  }
}

export default Trip;
