// import { offers } from '../mocks/offer';
// import { points } from '../mocks/points';
// import { destination } from '../mocks/destination';
import { UpdateType } from '../const';
import Observable from '../framework/observable';

export default class PointModel extends Observable{
  #points = [];
  #destination = [];
  #offers = [];
  #pointsApiService = null;

  constructor({pointsApiService}){
    super();
    this.#pointsApiService=pointsApiService;
  }

  async init(){
    try{
      this.#points = await this.#pointsApiService.points;
      this.#destination = await this.#pointsApiService.destinations;
      this.#offers = await this.#pointsApiService.offers;
    } catch{
      this.#points =[];
      this.#destination = [];
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
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

  async updatePoint (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1){
      throw new Error('Can\'t update unexisting point');
    }

    try{
      const updatedPoint =await this.#pointsApiService.updatePoint(update);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index+1),
      ];

      this._notify(updateType,update);
    } catch {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint (updateType, update) {
    try{
      const updatedPoint =await this.#pointsApiService.addPoint(update);

      this.#points = [
        updatedPoint,
        ...this.#points,
      ];

      this._notify(updateType,update);
    } catch {
      throw new Error('Can\'t update point');
    }
  }

  async deletePoint (updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1){
      throw new Error('Can\'t update unexisting point');
    }

    try{
      await this.#pointsApiService.deletePoint(update);

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index+1),
      ];

      this._notify(updateType,update);
    } catch {
      throw new Error('Can\'t update point');
    }
  }
}
