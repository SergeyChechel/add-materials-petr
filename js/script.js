window.addEventListener('DOMContentLoaded', () => {

    function req(e) {
        if (e) {
            e.preventDefault();
        }
        // let body = {
        //     name: 'Someone',
        //     surname: 'Else',
        //     age: 26, 
        //     id: Math.random()
        // };
        const form = document.querySelector('form');

        let formData = new FormData(form);
        formData.append('id', Math.random());
        
        let obj = {};

        formData.forEach((value, key) => {
            obj[key] = value;
        });

        // let json = JSON.stringify(obj);


        // const request = new XMLHttpRequest();
        // request.open('POST', 'http://localhost:3000/people');
        // request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        // request.send(json);

        // request.addEventListener('load', function() {
        //     if (request.readyState === 4 && request.status == 200) {
        //         let data = JSON.parse(request.response);
        //         console.log(data);
        //         // createCards(data);
        //     } else {
        //         console.error('Что-то пошло не так...');
        //     }
        // });

        // getResource('http://localhost:3000/people', obj)
        //     .then(data => createCards(data.data))
        //     .catch(err => console.error(err));
        axios.post('http://localhost:3000/people', obj);
            
    }

    // async function getResource(url, data) {
    //     const res = await fetch(`${url}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json; charset=utf-8'
    //         },
    //         body: JSON.stringify(data)
    //     });
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }
    //     return await res.json();
    // }

    // async function getResource(url) {
    //     const res = await axios(`${url}`);
    //     if (res.status !== 200) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }
    //     return res;
    // }

    
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
    const btn2 = document.querySelector('form button');

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

    btn2.addEventListener('click', (e) => req(e));

    
    



});