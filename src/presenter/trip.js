import { render, RenderPosition, replace} from '../framework/render';

import Sort from '../view/sort.js';
import EditForm from '../view/edit-form.js';
// import CreationForm from '../view/creation-form.js';
import TripList from '../view/trip-list.js';
import Point from '../view/point.js';
import EmptyListView from '../view/empty-list-view.js';
// import PointModel from '../model/point-model.js';

class Trip {
  #pointsListComponent  = null;
  #mainContainer  = null;
  #pointModal = null;
  constructor({container, pointModel}){
    this.#pointsListComponent = new TripList();
    this.#mainContainer = container;
    this.#pointModal = pointModel;
  }

  init() {
    const points = this.#pointModal.getPoints();
    const destination = this.#pointModal.getDestination();
    const offersByType = this.#pointModal.getOffersByType();

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

  #renderPoint(point, destination, offers){
    const pointComponent = new Point(point, destination, offers);
    const pointEditComponent = new EditForm(point, destination, offers);

    const turnPointToEdit = () => {
      replace(pointEditComponent, pointComponent);
    };

    const turnPointToView = () => {
      replace(pointComponent, pointEditComponent);
    };


    const onEscKeyup = (event) => {
      if (event.key === 'Escape'){
        turnPointToView();
        document.removeEventListener('keyup', onEscKeyup);
      }
    };

    pointComponent.setModeButtonClickHandler(()=>{
      turnPointToEdit();
      document.addEventListener('keyup', onEscKeyup);
    });

    pointEditComponent.setModeButtonClickHandler(()=>{
      turnPointToView();
      document.removeEventListener('keyup', onEscKeyup);
    });
    pointEditComponent.setFormSubmutHandler(()=>{
      turnPointToView();
      document.removeEventListener('keyup', onEscKeyup);
    });
    pointEditComponent.setFormResetHandler(()=>{
      turnPointToView();
      document.removeEventListener('keyup', onEscKeyup);
    });

    render(pointComponent, this.#pointsListComponent.element);
  }
}

export default Trip;
