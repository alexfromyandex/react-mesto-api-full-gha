import '../index.css';
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup.js';
import Login from './Login';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip';

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

  const [tooltipInfo, setTooltipInfo] = React.useState({ isOpen: false, isRegDone: false });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState(' ');
  const [pageNavigation, setPageNavigation] = React.useState({
    link: '/signup',
    title: 'Регистрация'
  });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(card => {
        setCards(state => state.map(c => {
          return (c._id === card.updatedCard._id ? card.updatedCard: c);
        }));
      })
      .catch(res => console.error(res));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => setCards(state => state.filter(c => c !== card)))
      .catch(res => console.error(res));
  }

  function handleUpdateUser(data) {
    api
      .patchUserData(data)
      .then(() => {
        setCurrentUser({
          name: data.name,
          about: data.about,
          avatar: currentUser.avatar,
          _id: currentUser._id,
          cohort: currentUser.cohort
        });
        closeAllPopups();
      })
      .catch(res => console.error(res));
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data.avatar)
      .then(() => {
        setCurrentUser({
          name: currentUser.name,
          about: currentUser.about,
          avatar: data.avatar,
          _id: currentUser._id,
          cohort: currentUser.cohort
        });
        closeAllPopups();
      })
      .catch(res => console.error(res));
  }

  function handleAddPlaceSubmit(card) {
    api
      .postNewCard(card)
      .then(res => {
        setCards([res.card, ...cards]);
        closeAllPopups();
      })
      .catch(res => console.error(res));
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleLogin(formValue) {
    auth
      .authorize(formValue.email, formValue.password)
      .then(data => {
        //localStorage.setItem('jwt', data.token);
        setUserEmail(formValue.email);
        fetchTheMainPageData();
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch(err => {
        setTooltipInfo({ isOpen: true, isRegDone: false });
      });
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/signin', { replace: true });
  }

  function fetchTheMainPageData() {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([user, initialCards]) => {
        console.log(initialCards);
        setCurrentUser(user.userData);
        setCards(initialCards.data);
      })
      .catch(err => console.error(err));
  }

  // const handleTokenCheck = () => {
  //   if (localStorage.getItem('jwt')) {
  //     const jwt = localStorage.getItem('jwt');
  //     auth
  //       .checkToken(jwt)
  //       .then(res => {
  //         fetchTheMainPageData();
  //         setUserEmail(res.data.email);
  //         if (res) {
  //           setLoggedIn(true);
  //           navigate('/', { replace: true });
  //         }
  //       })
  //       .catch(err => console.error(err));
  //   }
  // };

  React.useEffect(() => {
    navigate('/signin', { replace: true });
    // handleTokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header pageNavigation={pageNavigation} handleLogOut={handleLogOut} email={userEmail} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProtectedRoute
                  element={Main}
                  loggedin={loggedIn}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditProfile={handleEditProfileClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  setNavigation={setPageNavigation}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/signup"
            element={<Register setNavigation={setPageNavigation} toggleTooltip={setTooltipInfo} />}
          />
          <Route
            path="/signin"
            element={<Login handleLogin={handleLogin} setNavigation={setPageNavigation} />}
          />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          title="Вы уверены?"
          name="delete-card"
          onClose={closeAllPopups}
          buttonText="Да"
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip tooltipInfo={tooltipInfo} setTooltipInfo={setTooltipInfo} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
