const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let index = 0;

function showSlide(i) {
  slider.style.transform = `translateX(${-i * 100}%)`;
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

document.addEventListener("DOMContentLoaded", function () {
  // Находим все ссылки, которые начинаются с "#", т.е. якорные ссылки
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    // Добавляем обработчик события клика на каждую якорную ссылку
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Предотвращаем стандартное поведение перехода по ссылке
      // Получаем ID элемента, на который ссылается якорная ссылка
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId); // Находим этот элемент на странице

      if (targetElement) {
        // Рассчитываем положение целевого элемента относительно начала страницы,
        // учитывая высоту заголовка шапки
        const topOffset =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          document.querySelector(".header").offsetHeight;

        // Запускаем плавный скролл к рассчитанному положению с длительностью 600 мс
        smoothScrollTo(topOffset, 600);
      }
    });
  });

  // Функция плавного скролла к указанной позиции
  function smoothScrollTo(targetY, duration) {
    const startY = window.pageYOffset; // Начальная позиция скролла
    const distance = targetY - startY; // Расстояние, которое нужно пройти
    const startTime = performance.now(); // Время начала анимации

    // Основная функция анимации
    function animation(currentTime) {
      const timeElapsed = currentTime - startTime; // Время, прошедшее с начала анимации
      const progress = Math.min(timeElapsed / duration, 1); // Прогресс анимации (от 0 до 1)

      // Перемещаем окно на новую позицию, пропорционально прогрессу
      window.scrollTo(0, startY + distance * easeInOutQuad(progress));

      // Если анимация еще не завершена, продолжаем ее
      if (progress < 1) requestAnimationFrame(animation);
    }
    // Функция, которая добавляет плавность анимации
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
    // Запуск анимации
    requestAnimationFrame(animation);
  }
});
