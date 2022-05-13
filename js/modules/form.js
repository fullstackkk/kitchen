import { closeModal } from "./modal";
import { openModal } from "./modal";
import { postData } from "../services/services";

const form = function (formSelector, modalTimerId) {

    /// forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: "img/form/spinner.svg",
        success: 'Спасибо! Мы скоро с вами свяжемся',
        fail: 'Что то пошло не так '
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) { // функция передачи запроса 
        form.addEventListener('submit', (e) => { // вешаем  обработчик события на кнопку 
            e.preventDefault(); // отменяем стандартное поведение события , страница не будет перезагружатся

            const statusMessage = document.createElement('div'); // создаем окно с сообщеними о процессе запроса  
            statusMessage.classList.add('status'); // присваевваем стили этому окну 
            /* statusMessage.src = message.loading; */ // еще не доделал 
            form.append(statusMessage); // добавляем это окошко в верстку на время выполнения 

            const formData = new FormData(form); // для передачи данных преобразовываем данные сперва в ключь значение 

            // преобразование типа данны formData в json с помощью методов глобального Object 
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            const object = {};  // теперь преобразуем их в объект 
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            console.log(`formData = ${object}`);
            postData('http://localhost:3000/requests', json) // postData это промис ,возвращает json ответ от сервера 
                /*.then(data => data.text()})*/ // эта строчка нужна только если мы не работаем с json
                .then(data => {
                    console.log(`first then: starting`);
                    console.log(data);
                    showThanksModal(message.success);
                })
                .catch(() => {
                    showThanksModal(message.fail);
                })
                .finally(() => {
                    form.reset();
                    statusMessage.remove();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                    <div class="modal__content">                    
                        <div data-close class="modal__close">&times;</div>
                        <div class="modal__title">${message}</div>
                    </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);

    }
};

export default form;