import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getDatabase, ref, set, get, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
const firebaseConfig = {apiKey: "AIzaSyC_VKdV-KsIzUiOb7jFLsYXdTsuGkLiS-Q",authDomain: "register-71bde.firebaseapp.com",projectId: "register-71bde",storageBucket: "register-71bde.appspot.com",messagingSenderId: "412548441298",appId: "1:412548441298:web:e0fb2b6c5fbd4af7d0b90b"};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
function initializeFirebaseApp() {
const auth = getAuth(app);
auth.languageCode = "en";
return { auth };
}
function displayUserInfo(user) {
const displayName = user.displayName.split(' ')[0];
const email = user.email;
const photoURL = user.photoURL;
const username = user.displayName;
const uid = user.uid.substring(0, 5);

function updateElementText(id, text) {
const element = document.getElementById(id);
if (element) {
element.innerText = text;
} else {
console.warn(`Element with ID '${id}' not found.`);
}
}

function updateElementSrc(id, src) {
const element = document.getElementById(id);
if (element) {
element.src = src;
} else {
console.warn(`Element with ID '${id}' not found.`);
}
}
updateElementText("displayName", displayName);
updateElementText("karibujina", displayName);
updateElementText("pubgjina", displayName);
updateElementText("jinamtaa", displayName);
updateElementText("email", email);
updateElementText("karibuemail", email);
updateElementSrc("profilePicture", photoURL);
updateElementSrc("menupicha", photoURL);
updateElementSrc("karibupicha", photoURL);
updateElementText("userId", uid);
return username;
}
async function setupLikeButton(username, likeButtonId) {
const uniqueItemId = likeButtonId.replace('like', ''); 
const likeDocRef = ref(db, `likes/${username}/${uniqueItemId}`);

const likeButtonElement = document.getElementById(likeButtonId);
if (!likeButtonElement) return; 

const likeButton = likeButtonElement.querySelector('input[type="checkbox"]');
const likesCountSpan = likeButtonElement.querySelector('.count-likes');

const likeDocSnapshot = await get(likeDocRef);
const isLiked = likeDocSnapshot.exists();

likeButton.checked = isLiked;
likeButton.setAttribute('data-item-id', uniqueItemId); 

likeButton.addEventListener('change', async (event) => {
const isChecked = event.target.checked;
if (isChecked) {
await set(likeDocRef, true);
await runTransaction(ref(db, `total_likes/${uniqueItemId}`), (currentData) => {
return (currentData || 0) + 1;
});
} else {
await set(likeDocRef, null);
await runTransaction(ref(db, `total_likes/${uniqueItemId}`), (currentData) => {
return Math.max((currentData || 0) - 1, 0);
});
}
});

onValue(ref(db, `total_likes/${uniqueItemId}`), (snapshot) => {
likesCountSpan.innerText = snapshot.exists() ? snapshot.val() : 0;
});
}

async function setupAllLikeButtons(username) {
const likeButtons = document.querySelectorAll('[id^="like"]');
likeButtons.forEach(async (likeButtonElement) => {
const likeButtonId = likeButtonElement.id;
await setupLikeButton(username, likeButtonId);
});
}
function main() {
const { auth } = initializeFirebaseApp();

onAuthStateChanged(auth, (user) => {
if (user) {
console.log("User is signed in");
const username = displayUserInfo(user);
setupAllLikeButtons(username);
} else {
console.log("User is signed out");
}
});
}
main();
