const publicKey = '';
const privateKey = '';

const timestamp = new Date().getTime();
const hash = md5(timestamp + privateKey + publicKey);
const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

async function fetchMarvelCharacters() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    const data = await response.json();
    const container = document.getElementById('character-data');
    if (data.data && data.data.results) {
      container.innerHTML = data.data.results.map(character => `
        <div>
          <h2>${character.name}</h2>
          <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}"/>
          <p>${character.description || "Error!"}</p>
        </div>`).join('');
    }
  } catch (error) {
    console.error('Error fetching Marvel API data:', error.message);
    document.getElementById('error').textContent = `Error: ${error.message}`;
  }
}

fetchMarvelCharacters();

function beginCountDown(durationInSeconds) {
  let remainingTime = durationInSeconds;

  const countdownInterval = setInterval(() => {
    if (remainingTime > 0) {
      console.log(`Left over time...: ${remainingTime}s`);
      remainingTime--;
    } else {
      console.log("...times up!!!");
      clearInterval(countdownInterval);
    }
  }, 1000);
}

beginCountDown(10);

function delayedNotification(message, delayInMilliseconds) {
  setTimeout(() => {
    console.log(`Notification: ${message}`);
  }, delayInMilliseconds);
}

delayedNotification("Delayed notification.", 10000);

function repeatNotification(message, intervalInMilliseconds) {
  const notificationInterval = setInterval(() => {
    console.log(`Notification: ${message}`);
  }, intervalInMilliseconds);

  setTimeout(() => {
    clearInterval(notificationInterval);
    console.log("Notifications ");
  }, 10000);
}

repeatNotification("Footnote: This is API and it can be frustrating!", 1000);
