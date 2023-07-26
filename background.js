// Keep track of the enabled status
let enabled = false;

// Function to inject the image overlay into the webpage's DOM
function injectImageOverlay() {
  const imgSrc = chrome.runtime.getURL('twitter.png');
  const overlayElement = document.createElement('div');
  overlayElement.setAttribute('id', 'extensionOverlay');
  overlayElement.style.position = 'fixed';
  overlayElement.style.top = '50%';
  overlayElement.style.left = '50%';
  overlayElement.style.transform = 'translate(-50%, -50%)';
  overlayElement.style.zIndex = '9999';
  overlayElement.innerHTML = `<a href="https://www.x.com"><img src="${imgSrc}" alt="Twitter Bird" style="height: 48px; width: 46px;"></a>`;
  
  document.body.appendChild(overlayElement);
}

// Function to toggle the overlay on/off
function toggleOverlay() {
  if (enabled) {
    document.getElementById('extensionOverlay').style.display = 'none';
  } else {
    injectImageOverlay();
  }
  enabled = !enabled;
}

// Listen for a message from the content script to toggle the overlay
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleOverlay') {
    toggleOverlay();
  }
});
