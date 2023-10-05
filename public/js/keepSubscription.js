document.addEventListener('DOMContentLoaded', (event) => {
    const cancelBtn = document.getElementById('cancelSubscriptionBtn');
    const keepBtn = document.getElementById('keepSubscriptionBtn');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const overlay = document.getElementById('overlay');
  
    // Show the popup for canceling subscription
    cancelBtn.addEventListener('click', () => {
      overlay.classList.remove('hidden');
    });
  
    // Go to profile edit page for keeping subscription
    keepBtn.addEventListener('click', () => {
      window.location.href = 'editProfile.hbs';
    });
  
    // Hide the popup and confirm cancellation
    yesBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
      alert('Subscription Cancelled');
    });
  
    // Just hide the popup for "No"
    noBtn.addEventListener('click', () => {
      overlay.classList.add('hidden');
    });
  });