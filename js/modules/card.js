import { getResourse } from "../services/services";
const card = function () {
    const container = document.querySelector('[data-container]');

    class MenuItem {
        constructor(img, alt, subtitle, descr, price, parentSelector, ...classes) {
            this.alt = alt;
            this.img = img;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }
        render() {
            const div = document.createElement('div');
            if (this.classes.length === 0) {
                div.classList.add('menu__item');
            } else {
                this.classes.forEach(className => div.classList.add(className));
            }
            div.innerHTML = `
                <img src="${this.img}" alt=${this.alt}>
                <h3 class="menu__item-subtitle">Меню “${this.subtitle}”</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
                    `;

            this.parent.classList.add('flex-wrap');
            this.parent.append(div);
        }
    }

    getResourse('http://localhost:3000/menu')
        .then(data => {
            data.forEach(
                ({ img, altimg, title, descr, price }) => {
                    new MenuItem(img, altimg, title, descr, price, ".menu .container").render();
                });
        });

};

export default card;