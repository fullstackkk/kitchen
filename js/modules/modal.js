function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }

}

const modal = function (triggerSelector, modalSelector, modalTimerId) {


    const openModalBtn = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);


    openModalBtn.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });


    /// реализуем всплытие модального окна по таймеру 


};

export default modal;
export { closeModal };
export { openModal };