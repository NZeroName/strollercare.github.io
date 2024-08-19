// Универсальная функция для инициализации слайдера
function initSlider({ sliderSelector, slideSelector, prevBtnSelector, nextBtnSelector, slidesPerView = 1, cloneSlides = false }) {
    // Получаем элементы слайдера и кнопок
    const slider = document.querySelector(sliderSelector);
    const slides = document.querySelectorAll(slideSelector);
    const prevBtn = document.getElementById(prevBtnSelector);
    const nextBtn = document.getElementById(nextBtnSelector);
    const totalSlides = slides.length; // Общее количество слайдов
    let index = 0; // Индекс текущего слайда
    let startX = 0; // Начальная позиция касания
    let endX = 0; // Конечная позиция касания
    const slideWidth = 100 / slidesPerView; // Ширина одного слайда в процентах

    // Клонирование первых слайдов, если это необходимо для непрерывного скроллинга
    if (cloneSlides) {
        for (let i = 0; i < slidesPerView; i++) {
            const clonedSlide = slides[i].cloneNode(true); // Клонируем слайд
            slider.appendChild(clonedSlide); // Добавляем клон в конец слайдера
        }
        for (let i = totalSlides - slidesPerView; i < totalSlides; i++) {
            const clonedSlide = slides[i].cloneNode(true); // Клонируем слайд
            slider.insertBefore(clonedSlide, slider.firstChild); // Добавляем клон в начало слайдера
        }
        index = slidesPerView; // Начальная установка индекса
        slider.style.transform = `translateX(${-index * slideWidth}%)`;
    }

    // Функция для отображения слайда с заданным индексом
    function showSlide(i, withTransition = true) {
        const translateXValue = -i * slideWidth;
        slider.style.transition = withTransition ? 'transform 0.5s ease-in-out' : 'none'; // Применяем плавный переход
        slider.style.transform = `translateX(${translateXValue}%)`; // Сдвигаем слайдер
    }

    // Функция для переключения на следующий слайд
    function nextSlide() {
        index++;
        showSlide(index);
        if (index >= totalSlides + slidesPerView) {
            setTimeout(() => {
                index = slidesPerView; // Возвращаемся к первому слайду без клонирования
                showSlide(index, false); // Без перехода
            }, 500); // Время должно соответствовать времени transition
        }
    }

    // Функция для переключения на предыдущий слайд
    function prevSlide() {
        index--;
        showSlide(index);
        if (index < slidesPerView) {
            setTimeout(() => {
                index = totalSlides; // Возвращаемся к последнему слайду без клонирования
                showSlide(index, false); // Без перехода
            }, 500); // Время должно соответствовать времени transition
        }
    }

    // Обработка начала касания
    function handleTouchStart(event) {
        startX = event.touches[0].clientX; // Сохраняем начальную позицию касания
    }

    // Обработка движения касания
    function handleTouchMove(event) {
        endX = event.touches[0].clientX; // Обновляем конечную позицию касания
    }

    // Обработка завершения касания
    function handleTouchEnd() {
        const deltaX = startX - endX;
        // Если свайп влево, переключаем на следующий слайд
        if (deltaX > 50) {
            nextSlide();
        }
        // Если свайп вправо, переключаем на предыдущий слайд
        if (deltaX < -50) {
            prevSlide();
        }
    }

    // Добавляем обработчики событий для кнопок
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // Добавляем обработчики событий для сенсорных событий
    slider.addEventListener("touchstart", handleTouchStart, false);
    slider.addEventListener("touchmove", handleTouchMove, false);
    slider.addEventListener("touchend", handleTouchEnd, false);
}


function gallerySlider() {
    initSlider({
        sliderSelector: '.gallery__slider .slider',
        slideSelector: '.gallery__slider .slide',
        prevBtnSelector: 'prev',
        nextBtnSelector: 'next',
        slidesPerView: 1,// Количество слайдов, отображаемых одновременно
        cloneSlides: true // Клонирование слайдов
    });
}

function blogSlider() {
    if(window.innerWidth >= 360 && window.innerWidth <= 768){
      initSlider({
        sliderSelector: '.blog__links',
        slideSelector: '.blog__link',
        prevBtnSelector: 'blog-prev',
        nextBtnSelector: 'blog-next',
        slidesPerView: 1, 
        cloneSlides: true 
    })} else {
    initSlider({
        sliderSelector: '.blog__links',
        slideSelector: '.blog__link',
        prevBtnSelector: 'blog-prev',
        nextBtnSelector: 'blog-next',
        slidesPerView: 2, 
        cloneSlides: true 
    });
  }
}
  function toggleMenu() {
      let menubtn = document.querySelector('.mobail-menu__toglebtn')
      let mobileNavigate = document.querySelector('.header__mobail-menu-container')
      let shadow = document.querySelector('.mobail-menu__shadow')
    
    if(!shadow.classList.contains('mobail-menu__shadow--active')){
      menubtn.classList.toggle('toglebtn-active')
      mobileNavigate.classList.toggle('header__mobail-menu--active')
      shadow.classList.toggle('mobail-menu__shadow--active')
      document.querySelector('body').style.overflow = 'hidden'
    } else {document.querySelector('body').style.overflow = 'auto'
      menubtn.classList.toggle('toglebtn-active')
      mobileNavigate.classList.toggle('header__mobail-menu--active')
      shadow.classList.toggle('mobail-menu__shadow--active')}
  }

  
  // для активной кнопки toglebtn-active
  // при показе меню header__mobail-menu--active
  // подложка серая mobail-menu__shadow

function showFaq (){
  let faqItem = document.querySelectorAll('.faqs__item')
  faqItem.forEach((faq) => {
    faq.addEventListener('click', function (e) {
      let togglebtn = this.querySelector('.faqs__toggle-vision')
      let subtitle = this.querySelector('.faqs__item-subtitle')
      togglebtn.classList.toggle('show')
      if(togglebtn.classList.contains('show')) {
        togglebtn.querySelector('img').src = 'img/hide.svg'
        subtitle.style.display = 'block'
      } else {subtitle.style.display = 'none'
        togglebtn.querySelector('img').src = 'img/show.svg'
      }
      
    })
  })
}
function hideMobailMenu() {
  let menu = document.querySelector('.mobail-menu').querySelector('.navigate').querySelectorAll('li')
  menu.forEach((link) => {
    link.addEventListener('click', function (e) {
      toggleMenu()
    })
  })
}
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
document.querySelector('.mobail-menu__toglebtn').addEventListener('click', toggleMenu)
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

  if ((window.innerWidth >= 768 && window.innerWidth <= 1199) || (window.innerWidth >= 360 && window.innerWidth <= 768)) {
    const slider = document.querySelector(".slider");
    slider.remove();
    document.querySelector(".gallery__slider").insertAdjacentHTML(
      "beforeend",
      `<div class="slider">
              <div class="slide">
                <div><img src="img/slide1.png" alt="slide" /></div>
              </div>
              <div class="slide">
                <div><img src="img/slide2.png" alt="slide" /></div>
              </div>
              <div class="slide">
                <div><img src="img/slide3.png" alt="slide" /></div>
              </div>
              <div class="slide">
                <div><img src="img/slide4.png" alt="slide" /></div>
              </div>
              <div class="slide">
                <div><img src="img/slide5.png" alt="slide" /></div>
              </div>
              <div class="slide">
                <div><img src="img/slide6.png" alt="slide" /></div>
              </div>
            </div>`
    );
    blogSlider()
  }
  // Запуск слайдеров
gallerySlider();
showFaq()
hideMobailMenu()
});
