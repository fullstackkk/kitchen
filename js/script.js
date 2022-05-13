import tabs from './modules/tabs';
import calc from './modules/calc';
import card from './modules/card';
import form from './modules/form';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import { openModal } from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('[data-modal]', '.modal', modalTimerId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    calc();
    card();
    form('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    slider({
        container: '.offer__slider',
        slideSelector: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current'
    });
    timer('.timer', '2023-07-05');
});