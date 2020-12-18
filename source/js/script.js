if (document.querySelector(`.page--index`)) {
  let card = document.querySelector(`.card`);
  let cardContent = card.querySelector(`.card__wrapper`);
  let cardShare = card.querySelector(`.card__share`);

  let formModal = document.querySelector(`.form`);
  let formOpenBtn = card.querySelector(`.card__button-save`);
  let formCloseBtn = document.querySelector(`.form__close`);

  let overlay = document.querySelector(`.overlay`);

  // Открытие формы
  formOpenBtn.addEventListener(`click`, () => {
    formModal.classList.add(`form--shown`);
    overlay.classList.add(`overlay--shown`);
    document.body.style.overflow = `hidden`;
  });

  // Следующий шаг формы
  let formModalSave = formModal.querySelector(`.form__save`);
  let formModalShare = formModal.querySelector(`.form__share`);
  let formSaveBtn = formModalSave.querySelector(`.button`);

  let formContactInputs = formModal.querySelectorAll(`[name=contacts]`);

  formSaveBtn.addEventListener(`click`, () => {
    if (!formInputs[0].value) {
      formInputs[0].parentNode.classList.add(`form__field--required`);

      return;
    }

    card.classList.add(`card--share`);
    addAnimationClassHidden(cardContent, `card__wrapper--hidden`);

    addAnimationClassHidden(formModalSave, `form__save--hidden`);

    formContactInputs[1].value = formContactInputs[0].value;

    window.setTimeout(() => {
      cardShare.classList.add(`card__share--shown`);

      formModalShare.classList.add(`form__share--shown`);
    }, 300);
  });

  // Закрытие формы
  formCloseBtn.addEventListener(`click`, () => {
    if (card.classList.contains(`card--share`)) {
      removeAnimationClassShown(cardShare, `card__share--shown`);
      removeAnimationClassShown(formModalShare, `form__share--shown`);
    }

    removeAnimationClassShown(formModal, `form--shown`);
    overlay.classList.remove(`overlay--shown`);
    document.body.removeAttribute(`style`);

    window.setTimeout(() => {
      if (card.classList.contains(`card--share`)) {
        card.classList.remove(`card--share`);
        removeAnimationClassHidden(cardContent, `card__wrapper--hidden`, `flex`);
      }

      formModalSave.classList.remove(`form__save--hidden`);
    }, 300);
  });

  // Проверка на заполненность полей формы
  let formInputs = formModal.querySelectorAll(`input`);

  let formShareBtn = formModalShare.querySelector(`.form__button-share`);
  let formLaterBtn = formModalShare.querySelector(`.form__button-later`);

  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener(`input`, () => {
      if (formInputs[i].value) {
        formInputs[i].parentNode.classList.remove(`form__field--required`);

        if (!i) {
          formSaveBtn.disabled = false;
        } else {
          formShareBtn.disabled = false;
          formLaterBtn.disabled = false;
        }
      } else {
        formInputs[i].parentNode.classList.add(`form__field--required`);

        if (!i) {
          formSaveBtn.disabled = true;
        } else {
          formShareBtn.disabled = true;
          formLaterBtn.disabled = true;
        }
      }
    });
  }

  // Завершающий шаг формы
  formShareBtn.addEventListener(`click`, () => {
    for (let i = 1; i < formInputs.length; i++) {
      if (!formInputs[i].value) {
        formInputs[i].parentNode.classList.add(`form__field--required`);

        return;
      }
    }

    window.open(`finished-share.html`, `_self`);
  });

  formLaterBtn.addEventListener(`click`, () => {
    window.open(`finished-save.html`, `_self`);
  });
}

if (document.querySelector(`.card__description`)) {
  // Ссылка "See more" в описании карточки
  let cardDescription = document.querySelector(`.card__description`);
  let cardDescriptionText = cardDescription.firstChild.textContent;

  let showCardDescriptionLink = () => {
    if (window.matchMedia(`(max-width: 767px)`).matches) {
      if (cardDescription.style.height !== `auto`) {
        cardDescription.firstChild.textContent = `${cardDescriptionText.slice(0, 63)}… `;
      }

      cardDescription.lastChild.style.display = `inline`;
    } else {
      cardDescription.firstChild.textContent = cardDescriptionText;
      cardDescription.lastChild.removeAttribute(`style`);
    }
  };

  var showMore = () => {
    if (cardDescription.style.height === `auto`) {
      cardDescription.lastChild.textContent = `See more`;
      cardDescription.firstChild.textContent = `${cardDescriptionText.slice(0, 63)}… `;
      cardDescription.removeAttribute(`style`);
    } else {
      cardDescription.firstChild.textContent = cardDescriptionText;
      cardDescription.lastChild.textContent = `Hide`;
      cardDescription.style.height = `auto`;
      cardDescription.style.overflow = `visible`;
    }
  };

  showCardDescriptionLink();

  window.addEventListener(`resize`, () => {
    showCardDescriptionLink();
  });
}

if (document.querySelector(`.page--finished`)) {
  // Автозапуск анимации
  let videos = document.querySelectorAll(`video`);

  for (let i = 0; i < videos.length; i++) {
    videos[i].play();
  }
}

if (document.querySelector(`.page--saved`)) {
  // Скрытие картинки с анимацией
  let messages = document.querySelectorAll(`.message__mobile`);

  for (let i = 0; i < messages.length; i++) {
    let msgContent = messages[i].querySelector(`.message__content`);
    let msgAnimation = messages[i].querySelector(`.message__animation`);

    msgAnimation.addEventListener(`ended`, () => {
      msgContent.classList.add(`message__content--shown`);
      msgAnimation.classList.remove(`message__animation--shown`);
    });
  }
}

// Скрытие элемента (добавляем класс с анимацией &--hidden)
function addAnimationClassHidden(el, cls) {
  el.style.display = window.getComputedStyle(el).display;
  el.classList.add(cls);

  window.setTimeout(() => {
    el.removeAttribute(`style`);
  }, 300);
}

// Скрытие элемента (удаляем класс с анимацией &--shown)
function removeAnimationClassShown(el, cls) {
  resetCSSAnimation(el, cls);
  el.style.animationDirection = `reverse`;

  window.setTimeout(() => {
    el.classList.remove(cls);
    el.removeAttribute(`style`);
  }, 300);
}

// Появление элемента (удаляем класс с анимацией &--hidden)
function removeAnimationClassHidden(el, cls, display = `block`) {
  resetCSSAnimation(el, cls);
  el.style.animationDirection = `reverse`;
  el.style.display = display;

  window.setTimeout(() => {
    el.classList.remove(cls);
    el.removeAttribute(`style`);
  }, 300);
}

// Сброс CSS-анимации
function resetCSSAnimation(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
