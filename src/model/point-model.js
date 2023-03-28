import { destination } from '../mocks/destination';
import { offersByType } from '../mocks/offer';
import { points } from '../mocks/points';

export default class PointModel{
  constructor(){
    this.points = points;
    this.destination = destination;
    this.offersByType = offersByType;
  }

  getPoints(){
    return this.points;
  }

  getDestination(){
    return this.destination;
  }

  getOffersByType(){
    return this.offersByType;
  }
}
