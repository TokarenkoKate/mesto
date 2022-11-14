import './index.css';
import {
  initialCards,
  cardsContainerSelector,
  profileAddButton,
  profileEditButton,
  nameInput,
  jobInput,
  formAddCard,
  formEditProfile,
  validationDetails,
  popupImageSelector,
  popupAddCardSelector,
  popupEditSelector,
  profileNameSelector,
  profileInfoSelector,
  cardSelector
} from '../utils/constants';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import Card from '../components/Card';
import UserInfo from '../components/UserInfo';
import FormValidator from '../components/FormValidator';

function generateNewCard(cardDetails) {
  const card = new Card(cardDetails, cardSelector, () => {
    const popupWithImage = new PopupWithImage(popupImageSelector, cardDetails);
    popupWithImage.open();
  });
  return card.generateCard();
}

const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
    cardsList.addItem(generateNewCard(item));
  }
}, cardsContainerSelector);
cardsList.renderItems();

const popupAddCard = new PopupWithForm(popupAddCardSelector,
  (formValues) => {
    cardsList.addItem(generateNewCard(formValues));
    formAddValidation.disableSubmitButton();
  }
);
popupAddCard.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  infoSelector: profileInfoSelector
});

const popupEditProfile = new PopupWithForm(popupEditSelector,
  (formValues) => { userInfo.setUserInfo(formValues); }
);
popupEditProfile.setEventListeners();

const formAddValidation = new FormValidator(validationDetails, formAddCard);
formAddValidation.enableValidation();

const formEditValidation = new FormValidator(validationDetails, formEditProfile);
formEditValidation.enableValidation();

function fillPopupData(data) {
  nameInput.value = data.name;
  jobInput.value = data.info;
}

profileAddButton.addEventListener('click', () => {
  popupAddCard.open();
});

profileEditButton.addEventListener('click', () => {
  fillPopupData(userInfo.getUserInfo());
  popupEditProfile.open();
});
