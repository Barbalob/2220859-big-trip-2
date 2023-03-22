import { render, RenderPosition } from '../render.js';

import Sort from '../view/sort.js';
import EditForm from '../view/edit-form.js';
import CreationForm from '../view/creation-form.js';
import TripList from '../view/trip-list.js';
import Point from '../view/point.js';

class Trip {
  constructor({container}){
    this.component = new TripList();
    this.container = container;
  }

  init() {
    render(new Sort(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container, RenderPosition.BEFOREEND);
    render(new CreationForm(), this.component.getElement(), RenderPosition.BEFOREEND);
    render(new EditForm(), this.component.getElement(), RenderPosition.BEFOREEND);
    for (let i = 0; i<3; i++){
      render(new Point(), this.component.getElement(), RenderPosition.BEFOREEND);
    }
  }
}

export default Trip;
