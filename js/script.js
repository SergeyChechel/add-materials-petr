window.addEventListener('DOMContentLoaded', () => {

    function req() {
        // const request = new XMLHttpRequest();
        // request.open('GET', 'http://localhost:3000/people');
        // request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        // request.send();

        // request.addEventListener('load', function() {
        //     if (request.readyState === 4 && request.status == 200) {
        //         let data = JSON.parse(request.response);
        //         createCards(data);
        //     } else {
        //         console.error('Что-то пошло не так...');
        //     }
        // });

        getResource('http://localhost:3000/people')
            .then(data => createCards(data.data))
            .catch(err => console.error(err));

            
    }

    // async function getResource(url) {
    //     const res = await fetch(`${url}`);
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }
    //     return await res.json();
    // }

    async function getResource(url) {
        const res = await axios(`${url}`);
        if (res.status !== 200) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return res;
    }

    
    function createCards(data) {
        data.forEach(item => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${item.photo}" alt="photo">
                <div class="name">${item.name} ${item.surname}</div>
                <div class="sex">
                    <img src="${item.sex == 'male' ? 'icons/mars.png' : 'icons/female.png'}" alt="male">
                </div>
                <div class="age">${item.age}</div>
            `;

            document.querySelector('.app').append(card);
        });
    }

    const btn = document.querySelector('.cards');

    btn.addEventListener('click', () => {
        if (!btn.classList.contains('showed')) {
            btn.classList.add('showed');
            btn.innerHTML = 'Скрыть карточки';
            btn.nextElementSibling.style.display = '';
            req();
        } else {
            btn.classList.remove('showed');
            btn.innerHTML = 'Показать карточки';
            btn.nextElementSibling.innerHTML = '';
        }
        
    });

    
    



});