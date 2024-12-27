document.getElementById('auth-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const birthdate = document.getElementById('birthdate').value;
    const gender = document.getElementById('gender').value;
    const errorMessage = document.getElementById('error-message');

    if (username.length < 4 || username.length > 10 || /[^а-яА-Я0-9]/.test(username)) {
        errorMessage.textContent = 'Логин должен быть 4-10 символов, только буквы русского алфавита и цифры.';
        return;
    }

    const birthYear = new Date(birthdate).getFullYear();
    if (birthYear < 1950 || new Date(birthdate) > new Date()) {
        errorMessage.textContent = 'Дата рождения должна быть между 1950 и текущей датой.';
        return;
    }

    if (!gender) {
        errorMessage.textContent = 'Выберите пол.';
        return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('birthdate', birthdate);
    localStorage.setItem('gender', gender);

    window.location.href = 'index.html';
});
