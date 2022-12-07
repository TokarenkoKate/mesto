import './index.css';
import {
  cardsContainerSelector,
  cardTemplateSelector,
  profileName,
  profileInfo,
  profileAvatar,
  profileAvatarWrapper,
  profileEditButton,
  profileAddButton,
  formAddCard,
  formEditProfile,
  formEditAvatar,
  submitButtonSelector,
  nameInput,
  jobInput,
  popupImageSelector,
  popupAddCardSelector,
  popupEditSelector,
  popupEditAvatarSelector,
  popupDeleteCardSelector,
  validationDetails,
  spinner
} from '../utils/constants';
import Api from '../components/API';
import UserInfo from '../components/UserInfo';
import Section from '../components/Section';
import Card from '../components/Card';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import PopupDeleteCard from '../components/PopupDeleteCard';
import FormValidator from '../components/FormValidator';
import { data } from 'autoprefixer';

// Класс API
const api = new Api({
  url: 'https://nomoreparties.co',
  headers: {
    authorization: 'abec103f-a78d-4f4a-9962-97b2716f17dc',
    'Content-Type': 'application/json'
  }
});

//-------------Профиль пользователя--------------//

// Класс профиля пользователя
const userInfo = new UserInfo({
  profileName,
  profileInfo,
  profileAvatar,
  spinner
});

// Класс списка карточек
const cardsList = new Section({
  renderer: (cardDetails) => {
    cardsList.appendItem(generateNewCard(cardDetails));
  }
}, cardsContainerSelector);

// Начальное заполнение контента профиля и загрузка карточек
Promise.all([
  api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
    userInfo.renderImageLoading(false);
    userInfo.setPageOwnerId(userData._id);
  })
  .catch((err) => {
    console.log(err);
  }),
  api.getInitialCards()
  .then((cards) => {
    cardsList.renderItems(cards);
  })
]);

// Модальное окно редактирования информации о пользователе
const popupEditProfile = new PopupWithForm(popupEditSelector, submitButtonSelector,
  (formValues, renderLoading, closeFunction) => {
    renderLoading();
    api.editUserInfo(formValues)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        closeFunction();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
popupEditProfile.setEventListeners();

// Заполнение модального окна редактирования информации о пользователе
function fillPopupData(data) {
  nameInput.value = data.name;
  jobInput.value = data.about;
}

// Модальное окно редактирования аватара
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, submitButtonSelector,
  (formValues, renderLoading, closeFunction) => {
    renderLoading();
    api.editUserAvatar(formValues)
      .then((userAvatar) => {
        userInfo.setUserAvatar(userAvatar);
        closeFunction();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formEditAvatarValidation.disableSubmitButton();
      });
  }
);
popupEditAvatar.setEventListeners();

//-------------Карточки--------------//

// Функция создания карточки
function generateNewCard(cardDetails) {
  const card = new Card(
    cardDetails,
    cardTemplateSelector,
    userInfo.getPageOwnerId(),
    // Обработчик клика на изображение
    () => {
      popupWithImage.open(cardDetails);
    },
    // Обработчик добавления лайка
    (currentCardId, likesCount, isLiked, toggleButtonClass) => {
      api.addLike(currentCardId)
        .then((data) => {
          likesCount.textContent = data.likes.length;
          isLiked();
          toggleButtonClass();
        })
        .catch((err) => {
          console.log(err);
        })
    },
    // Обработчик удаления лайка
    (currentCardId, likesCount, isLiked, toggleButtonClass) => {
      api.removeLike(currentCardId)
        .then((data) => {
          likesCount.textContent = data.likes.length;
          isLiked();
          toggleButtonClass();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // Обработчик удаления карточки
    (currentCardId, cardDeleteFunction) => {
      popupDeleteCard.open(currentCardId, cardDeleteFunction);
    });
  return card.generateCard();
}

// Модальное окно с изображением
const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

// Модальное окно удаления карточки
const popupDeleteCard = new PopupDeleteCard(popupDeleteCardSelector, submitButtonSelector,
  // Обработчик отправки формы
  (currentCardId, cardDeleteFunction) => {
    api.deleteCard(currentCardId)
      .then(() => {
        cardDeleteFunction();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
popupDeleteCard.setEventListeners();

// Модальное окно добавления новой карточки
const popupAddCard = new PopupWithForm(popupAddCardSelector, submitButtonSelector,
  // Обработчки отправки формы
  (formValues, renderLoading, closeFunction) => {
    renderLoading();
    api.addNewCard(formValues)
      .then((cardDetails) => {
        cardsList.prependItem(generateNewCard(cardDetails));
        closeFunction();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        formAddValidation.disableSubmitButton();
      });
  }
);
popupAddCard.setEventListeners();

// Валидация

const formAddValidation = new FormValidator(validationDetails, formAddCard);
formAddValidation.enableValidation();

const formEditValidation = new FormValidator(validationDetails, formEditProfile);
formEditValidation.enableValidation();

const formEditAvatarValidation = new FormValidator(validationDetails, formEditAvatar);
formEditAvatarValidation.enableValidation();

// Слушатели открытия модальных окон

profileAddButton.addEventListener('click', () => {
  popupAddCard.open();
});

profileEditButton.addEventListener('click', () => {
  fillPopupData(userInfo.getUserInfo());
  formEditValidation._toggleButtonState();
  popupEditProfile.open();
});

profileAvatarWrapper.addEventListener('click', () => {
  popupEditAvatar.open();
});
