import { remove, render} from '../framework/render';
import Sort from '../view/sort.js';
import TripList from '../view/trip-list.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter';
import { sortPointsByPrice, sortPointsByTime, updateItem, filterPoints } from '../util/common';
import { FilterType, SortType, UpdateType, UserAction } from '../const';
import { getDefaultPoint } from '../util/default-point';
import NewPointPresenter from './new-point-presenter';

class Trip {
  #pointsListComponent  = new TripList();;
  #mainContainer  = null;
  #pointModel = null;
  #filterModel = null;
  #sortComponent = new Sort();
  #emptyListComponent = null;
  #newPointPresenter = null

  // #points = [];
  // #destination = [];
  // #offers = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY

  constructor({container, pointModel, filterModel, onNewPointDestroy}){
    this.#mainContainer = container;
    this.#pointModel = pointModel;
    this.#pointModel.addObserver(this.#handleModelEvent);

    this.#filterModel = filterModel;
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newPointPresenter = new NewPointPresenter(this.#pointsListComponent.element, this.#handleViewAction, onNewPointDestroy);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoints = filterPoints[filterType](points);

    switch (this.#currentSortType){
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointsByTime);
    }

    return filteredPoints;
  }

  get destination(){
    return this.#pointModel.destination;
  }

  get offers(){
    return this.#pointModel.offers;
  }

  get isTripEmpty(){
    return this.#pointModel.points.length === 0;
  }

  init() {
    this.#renderTrip();
  }

  createPoint(){
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(getDefaultPoint(), this.destination, this.offers);
  }


  #handleViewAction = (actionType, updateType, update) =>{
    switch (actionType){
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType){
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.destination, this.offers);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({resetDorttype:true});
        this.#renderTrip();
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType){
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  }


  #resetAllPoints = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetPoint());
  }

  #renderPoint(point, destination, offers){
    if (point.basePrice !== '' && point.destination !== 0){
      const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#handleViewAction, this.#resetAllPoints);
      pointPresenter.init(point, destination, offers);
      this.#pointPresenter.set(point.id, pointPresenter);
    }
  }

  #handlePointUpdate = (updatedPoint) => {
    this.#pointModel.points = updateItem(this.points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.destination, this.offers);
  }

  #clearTrip = ({resetSortType=false} = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderTrip = () => {
    if (this.points.length === 0){
      remove(this.#sortComponent);
      this.#emptyListComponent = new EmptyListView(this.#filterModel.filter, this.isTripEmpty);
      render(this.#emptyListComponent, this.#mainContainer);
      return;
    }

    remove(this.#emptyListComponent);
    render(this.#sortComponent, this.#mainContainer);
    render(this.#pointsListComponent, this.#mainContainer);

    this.#sortComponent.setSortChangeHandler(this.#handleSortTypeChange);

    for (const point of this.points){
      this.#renderPoint(point, this.destination, this.offers);
    }
  }

}

export default Trip;
