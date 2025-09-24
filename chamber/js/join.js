// Timestamp
document.getElementById('timestamp').value = new Date().toISOString();

// Modals
const modalLinks = {
  'np-details': 'np-modal',
  'bronze-details': 'bronze-modal',
  'silver-details': 'silver-modal',
  'gold-details': 'gold-modal'
};

const closeButtons = {
  'close-np-modal': 'np-modal',
  'close-bronze-modal': 'bronze-modal',
  'close-silver-modal': 'silver-modal',
  'close-gold-modal': 'gold-modal'
};

for (const linkId in modalLinks) {
  const link = document.getElementById(linkId);
  const modalId = modalLinks[linkId];
  const modal = document.getElementById(modalId);
  link.addEventListener('click', (e) => {
    e.preventDefault();
    modal.showModal();
  });
}

for (const btnId in closeButtons) {
  const btn = document.getElementById(btnId);
  const modalId = closeButtons[btnId];
  const modal = document.getElementById(modalId);
  btn.addEventListener('click', () => {
    modal.close();
  });
}
