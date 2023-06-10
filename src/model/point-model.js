import { offers } from '../mocks/offer';
import { points } from '../mocks/points';
import { destination } from '../mocks/destination';
import Observable from '../framework/observable';

export default class PointModel extends Observable{
  #points = []
  #destination = []
  #offers = []
  init(){
    this.#points = points;
    this.#destination = destination;
    this.#offers = offers;
  }

  get points(){
    return this.#points;
  }

  get destination(){
    return this.#destination;
  }

  get offers(){
    return this.#offers;
  }

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1){
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index+1),
    ];

    this._notify(updateType,update);
  }

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType,update);
  }

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1){
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index+1),
    ];

    this._notify(updateType, update);
  }
}
