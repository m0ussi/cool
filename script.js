const cards = document.querySelectorAll('.card');
const cardContainer = document.getElementById('cardContainer');
const bottomText = document.getElementById('bottomText');
const contentContainer = document.getElementById('contentContainer');

cards.forEach(card => {
  card.addEventListener('click', () => {
    // If the card is already flipped, unflip it
    if (card.classList.contains('flipped')) {
      card.classList.remove('flipped');
      cardContainer.classList.remove('move-down');
      bottomText.classList.remove('hide');
      fadeOutContent(); // Fade out the content
      localStorage.removeItem('selectedCard'); // Clear stored selection
    } else {
      // Flip the clicked card
      card.classList.add('flipped');

      // Delay the move-down animation
      setTimeout(() => {
        cardContainer.classList.add('move-down');
      }, 600); // 0.6s delay to match the flip animation

      // Hide the bottom text
      bottomText.classList.add('hide');

      // Load content based on the selected card
      const cardTitle = card.querySelector('.card-title').textContent;
      localStorage.setItem('selectedCard', cardTitle); // Save selection

      // Fade out current content
      fadeOutContent(() => {
        // Load new content after fade-out
        if (cardTitle === 'Portfolio') {
          loadContent('matrix-website.html');
        } else if (cardTitle === 'Home') {
          loadContent('home.html');
        } else if (cardTitle === 'Socials') {
          loadContent('socials.html');
        }
      });
    }

    // Unflip all other cards
    cards.forEach(otherCard => {
      if (otherCard !== card) {
        otherCard.classList.remove('flipped');
      }
    });
  });
});

// On page load, check localStorage and apply the selected card state
window.addEventListener('load', () => {
  const selectedCard = localStorage.getItem('selectedCard');
  if (selectedCard) {
    const cardToSelect = Array.from(cards).find(card => 
      card.querySelector('.card-title').textContent === selectedCard
    );
    if (cardToSelect) {
      cardToSelect.click(); // Simulate a click on the selected card
    }
  }
});

// Function to fade out content
function fadeOutContent(callback) {
  contentContainer.classList.remove('visible'); // Hide content
  setTimeout(() => {
    contentContainer.innerHTML = ''; // Clear content after fade-out
    if (callback) callback();
  }, 500); // Wait for the fade-out transition to complete
}

// Function to load new content with fade-in
function loadContent(url) {
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  contentContainer.appendChild(iframe);
  contentContainer.classList.add('visible'); // Show content with fade-in
}   