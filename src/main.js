import ListFilterView from './view/filters.js';
import ListHeadersView from './view/headers.js';
import ListMenuView from './view/menu.js';
import Trip from './presenter/trip.js';
import { render, RenderPosition } from './render.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripMainContainer = document.querySelector('.trip-main');
const tripContainer = document.querySelector('.trip-events');
const menuContainer = document.querySelector('.trip-controls__navigation');
// const siteMain = document.querySelector('.page-main');
const tripPresenter = new Trip({container : tripContainer});

render(new ListFilterView(), filterContainer);
render(new ListHeadersView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new ListMenuView(), menuContainer);

tripPresenter.init();
