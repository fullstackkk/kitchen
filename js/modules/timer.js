const timer = function (id, deadline) {
    ///timer

    // первая функция должна получать времмя и дату 
    // эта функция получает вреемя и возвращает объект с полями времени 
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()); // neew Data - это данный момент ,  
        // по фокту мы получаем сколько осталось до окончания тааймера 
        // надо понимать ччто время мы получаем в формате миллисекунд ,тоесть это будет 3479865936464- ну или типа того 
        // для того чтоб получить вменяемое время нужно все перемножить , как ниже 

        const days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor(t / 1000 % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    // вспомагательная фун-я которая добавляет 0 к тем числам которые состоят из одной цыфры    
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // вторая функция , она получает элементы со страницы  ,
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();
        //третья функция , сопоставляет элементы со страницы и полученные даты , и выводит все это дело на страницу 
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    //  вызываем функцию которая на входе принимает в себя сеелектор - тег\id 
    //  и вторым параметром дату к которой стримится таймер  
    //  функция при первом запуске страници выполняется сразу
    //  а затемм обновляет время каждую сегунду 
    setClock(id, deadline);
};

export default timer;