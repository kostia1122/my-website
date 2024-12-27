document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".content-section");
    const menuLinks = document.querySelectorAll(".menu-link");
    const userLogin = document.getElementById("user-login");
    const profileLogin = document.getElementById("profile-login");
    const profileBirthdate = document.getElementById("profile-birthdate");
    const profileGender = document.getElementById("profile-gender");
    const profileTestResult = document.getElementById("profile-test-result");

    const logoutButton = document.getElementById("logout-button");
    const dictionaryList = document.getElementById("dictionary-list");
    const termDescription = document.getElementById("term-description");
    const searchInput = document.getElementById("search-input");

    menuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));

            sections.forEach(section => section.classList.remove("active"));
            menuLinks.forEach(link => link.classList.remove("active"));

            target.classList.add("active");
            link.classList.add("active");
        });
    });

    const terms = {
        "Ил-2": "Штурмовик времен Великой Отечественной войны.",
        "Т-34": "Основной средний танк СССР во Второй мировой войне.",
        "Шерман": "Американский танк, использовавшийся союзниками.",
        "Ямато": "Японский линкор, один из самых мощных кораблей.",
        "Пантера": "Средний немецкий танк Второй мировой.",
        "Фокке-Вульф": "Немецкий истребитель времен Второй мировой.",
        "Кобра": "Американский истребитель-бомбардировщик.",
        "Королевский тигр": "Тяжелый танк Германии.",
        "Мессершмитт": "Серия немецких самолетов-истребителей.",
        "Тайгер": "Тяжелый немецкий танк."
    };

    dictionaryList.innerHTML = Object.keys(terms)
        .map(term => `<li data-term="${term}">${term}</li>`)
        .join("");

    dictionaryList.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
            const term = e.target.getAttribute("data-term");
            termDescription.textContent = terms[term];
        }
    });

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll("#dictionary-list li").forEach(li => {
            const term = li.getAttribute("data-term").toLowerCase();
            li.style.display = term.includes(query) ? "block" : "none";
        });
    });

    const galleryImages = [
        "images/image1.jpg",
        "images/image2.jpg",
        "images/image3.jpg",
        "images/image4.jpg",
        "images/image5.jpg"
    ];
    const galleryImage = document.getElementById("gallery-image");
    const prevSlide = document.getElementById("prev-slide");
    const nextSlide = document.getElementById("next-slide");

    let currentSlideIndex = 0;

    function updateGallery() {
        galleryImage.src = galleryImages[currentSlideIndex];
        galleryImage.alt = `Слайд ${currentSlideIndex + 1}`;
        document.getElementById("gallery-info").textContent = `${currentSlideIndex + 1} из ${galleryImages.length}`;
    }

    prevSlide.addEventListener("click", () => {
        currentSlideIndex = Math.max(currentSlideIndex - 1, 0);
        updateGallery();
    });

    nextSlide.addEventListener("click", () => {
        currentSlideIndex = Math.min(currentSlideIndex + 1, galleryImages.length - 1);
        updateGallery();
    });

    updateGallery();

    const quizContainer = document.getElementById("quiz-container");
    const quizResult = document.getElementById("quiz-result");
    const questions = [
        { type: "input", question: "Как называется советский штурмовик?", answer: "Ил-2" },
        { type: "input", question: "Какая страна создала танк Т-34?", answer: "СССР" },
        { type: "choice", question: "Как назывался самый мощный японский линкор?", options: ["Ямато", "Мусаси", "Синано"], answer: "Ямато" },
        { type: "choice", question: "К какой стране принадлежал танк 'Шерман'?", options: ["СССР", "США", "Германия"], answer: "США" },
        { type: "choice", question: "Назовите немецкий истребитель.", options: ["Ил-2", "Мессершмитт", "Фокке-Вульф"], answer: "Мессершмитт" },
        { type: "input", question: "Какой танк Германии называли 'Королевский тигр'?", answer: "Королевский тигр" },
        { type: "input", question: "Назовите основной самолет немецкой армии.", answer: "Фокке-Вульф" },
        { type: "choice", question: "Какой танк был основным у СССР?", options: ["Т-34", "Шерман", "Пантера"], answer: "Т-34" },
        { type: "input", question: "Какое прозвище дали немецкому тяжелому танку Tiger?", answer: "Тайгер" },
        { type: "choice", question: "Какой американский истребитель назывался 'Кобра'?", options: ["Кобра", "Мустанг", "Тандерболт"], answer: "Кобра" }
    ];

    function renderQuiz() {
        quizContainer.innerHTML = "";
        questions.forEach((q, index) => {
            const questionBlock = document.createElement("div");
            questionBlock.classList.add("quiz-question-block");

            const questionText = document.createElement("p");
            questionText.textContent = `Вопрос ${index + 1}: ${q.question}`;
            questionBlock.appendChild(questionText);

            if (q.type === "input") {
                const input = document.createElement("input");
                input.type = "text";
                input.classList.add("quiz-input");
                input.dataset.index = index;
                questionBlock.appendChild(input);
            } else if (q.type === "choice") {
                q.options.forEach(option => {
                    const label = document.createElement("label");
                    const radio = document.createElement("input");
                    radio.type = "radio";
                    radio.name = `question-${index}`;
                    radio.value = option;
                    label.appendChild(radio);
                    label.appendChild(document.createTextNode(option));
                    questionBlock.appendChild(label);
                });
            }

            const feedback = document.createElement("div");
            feedback.classList.add("quiz-feedback");
            questionBlock.appendChild(feedback);

            quizContainer.appendChild(questionBlock);
        });

        const submitButton = document.createElement("button");
        submitButton.textContent = "Проверить";
        submitButton.classList.add("quiz-submit-btn");
        submitButton.addEventListener("click", checkAnswers);
        quizContainer.appendChild(submitButton);
    }

    function checkAnswers() {
        let score = 0;
        document.querySelectorAll(".quiz-question-block").forEach((block, index) => {
            const q = questions[index];
            const feedback = block.querySelector(".quiz-feedback");
            let userAnswer;

            if (q.type === "input") {
                userAnswer = block.querySelector(".quiz-input").value.trim();
            } else if (q.type === "choice") {
                const selectedOption = block.querySelector("input[type='radio']:checked");
                userAnswer = selectedOption ? selectedOption.value : null;
            }

            if (userAnswer && userAnswer.toLowerCase() === q.answer.toLowerCase()) {
                score++;
                feedback.textContent = "Ответ верный!";
                feedback.style.color = "green";
            } else {
                feedback.textContent = `Ответ неправильный. Правильный ответ: ${q.answer}`;
                feedback.style.color = "red";
            }
        });

        quizResult.textContent = `Вы набрали ${score} из ${questions.length} баллов.`;

        localStorage.setItem("testResult", score);

        if (profileTestResult) {
            profileTestResult.textContent = `Последний результат теста: ${score} из ${questions.length} баллов.`;
        }

        document.querySelectorAll(".quiz-input, input[type='radio'], .quiz-submit-btn").forEach(input => {
            input.disabled = true;
        });

        const retryButton = document.createElement("button");
        retryButton.textContent = "Пройти тест снова";
        retryButton.classList.add("quiz-retry-btn");
        retryButton.addEventListener("click", () => {
            document.querySelectorAll(".quiz-input").forEach(input => input.value = "");
            document.querySelectorAll("input[type='radio']").forEach(radio => radio.checked = false);
            document.querySelectorAll(".quiz-feedback").forEach(feedback => feedback.textContent = "");
            quizResult.textContent = "";

            document.querySelectorAll(".quiz-input, input[type='radio'], .quiz-submit-btn").forEach(input => {
                input.disabled = false;
            });

            retryButton.remove();
        });

        quizContainer.appendChild(retryButton);
    }

    renderQuiz();

    const storedLogin = localStorage.getItem("username");
    const storedBirthdate = localStorage.getItem("birthdate");
    const storedGender = localStorage.getItem("gender");
    const storedTestResult = localStorage.getItem("testResult");

    if (storedLogin) {
        userLogin.textContent = `Логин: ${storedLogin}`;
        profileLogin.textContent = storedLogin;
        profileBirthdate.textContent = storedBirthdate || "Не указано";
        profileGender.textContent = storedGender === "male" ? "Мужской" : "Женский";
        if (storedTestResult !== null) {
            profileTestResult.textContent = `Последний результат теста: ${storedTestResult} из ${questions.length} баллов.`;
        }
    }

    logoutButton.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "auth.html";
    });
});
