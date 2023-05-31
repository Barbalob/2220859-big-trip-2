import { render} from '../framework/render';
import Sort from '../view/sort.js';
import TripList from '../view/trip-list.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter';
import { sortPointsByPrice, sortPointsByTime, updateItem } from '../util/common';
import { SortType } from '../const';

class Trip {
  #pointsListComponent  = new TripList();;
  #mainContainer  = null;
  #pointModal = null;
  #sortComponent = new Sort()

  #points = [];
  #destination = [];
  #offers = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY

  constructor({container, pointModel}){
    this.#mainContainer = container;
    this.#pointModal = pointModel;
  }

  init() {
    this.#points = [...this.#pointModal.points];
    this.#destination = this.#pointModal.destination;
    this.#offers = this.#pointModal.offersByType;//this.#pointModal.getOffersByType();

    this.#renderTrip();
  }

  #sortPoints = (sortType) => {
    switch (sortType){
      case SortType.PRICE:
        this.#points.sort(sortPointsByPrice);
        break;
      case SortType.TIME:
        this.#points.sort(sortPointsByTime);
        break;
      default:
        this.#points = [...this.#pointModal.points];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType){
      return;
    }

    this.#sortPoints(sortType);
    this.#clearTrip();
    this.#renderTrip();
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
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#destination, this.#offers);
  }

  #clearTrip = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderTrip = () => {
    if ( this.#points.length === 0){
      render(new EmptyListView(), this.#mainContainer);
      return;
    }

    render(this.#sortComponent, this.#mainContainer);
    render(this.#pointsListComponent, this.#mainContainer);

    this.#sortComponent.setSortChangeHandler(this.#handleSortTypeChange);

    for (const point of this.#points){
      this.#renderPoint(point, this.#destination, this.#offers);
    }
  }

}

export default Trip;
