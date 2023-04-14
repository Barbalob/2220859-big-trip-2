import { render, RenderPosition } from '../render.js';

import Sort from '../view/sort.js';
import EditForm from '../view/edit-form.js';
// import CreationForm from '../view/creation-form.js';
import TripList from '../view/trip-list.js';
import Point from '../view/point.js';
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
      this.#pointsListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const turnPointToView = () => {
      this.#pointsListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };


    const onEscKeyup = (event) => {
      if (event.key === 'Escape'){
        turnPointToView();
        document.removeEventListener('keyup', onEscKeyup);
      }
    };


    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click',()=>{
      turnPointToEdit();
      document.addEventListener('keyup', onEscKeyup);
    });


    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click',()=>{
      turnPointToView();
      document.removeEventListener('keyup', onEscKeyup);
    });
    pointEditComponent.element.querySelector('.event--edit').addEventListener('submit',(event)=>{
      event.preventDefault();
      turnPointToView();
      document.removeEventListener('keyup', onEscKeyup);
    });
    pointEditComponent.element.querySelector('.event--edit').addEventListener('reset',(event)=>{
      event.preventDefault();
      turnPointToView();
      document.removeEventListener('keyup', onEscKeyup);
    });

    render(pointComponent, this.#pointsListComponent.element);
  }
}

export default Trip;
