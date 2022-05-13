const slider = function ({ container, slideSelector, prevArrow, nextArrow, totalCounter, currentCounter }) {
    /// slider

    const slider = document.querySelector(container),
        slide = document.querySelectorAll(slideSelector),
        prevBtn = document.querySelector(prevArrow),
        nextBtn = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter);

    let slideIndex = 1;

    showSlide(slideIndex);
    if (slide.length < 10) {
        total.textContent = `0${slide.length}`;
    } else {
        total.textContent = `${slide.length}`;
    }

    prevBtn.addEventListener('click', () => {
        PlusSlide(-1);
    });
    nextBtn.addEventListener('click', () => {
        PlusSlide(1);
    });

    function showSlide(i) {
        if (i > slide.length) {
            slideIndex = 1;
        } else if (i < 1) {
            slideIndex = slide.length;
        } else {
            slideIndex = i;
        }

        slide.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
        slide[slideIndex - 1].classList.remove('hide');
        slide[slideIndex - 1].classList.add('show');
        current.textContent = `0${slideIndex}`;

    }
    function PlusSlide(n) {
        showSlide(slideIndex += n);
    }

    ///dots for slider 

    slider.style.position = "relative";

    createDots();

    const dot = document.querySelectorAll('.dot');

    function createDots() {
        const dots = document.createElement('div');
        let count = 0;
        dots.classList.add('carousel-indicators');

        slide.forEach(() => {
            dots.innerHTML += `
            <button class="dot" id="dot__${count}"></button>
            `;
            count++;
        });
        slider.append(dots);
    }


    dot.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.id.slice(5)) + 1;
            showSlide(id);
        });
    });
};

export default slider;