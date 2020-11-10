window.addEventListener('DOMContentLoaded', () => {

    function req() {
        const request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:3000/people');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        request.send();

        request.addEventListener('load', function() {
            if (request.readyState === 4 && request.status == 200) {
                let data = JSON.parse(request.response);

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

            } else {
                console.error('Что-то пошло не так...');
            }
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