const openButtonHelpAchievement = document.querySelector('[data-open-modal-helpAchievement]');
const closeButtonHelpAchievement =
  document.querySelector('[data-close-modal-helpAchievement]');
const modalHelpAchievement = document.querySelector('[data-modal-helpAchievement]');

openButtonHelpAchievement.onclick = (e) => {
  e.preventDefault();
  modalHelpAchievement.showModal();
};
closeButtonHelpAchievement.onclick = (e) => {
  e.preventDefault();
  modalHelpAchievement.close();
};
