import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getDatabase, ref, set, get, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js"; // Import Firebase Storage module

const firebaseConfig = {
    apiKey: "AIzaSyC_VKdV-KsIzUiOb7jFLsYXdTsuGkLiS-Q",
    authDomain: "register-71bde.firebaseapp.com",
    projectId: "register-71bde",
    storageBucket: "register-71bde.appspot.com",
    messagingSenderId: "412548441298",
    appId: "1:412548441298:web:e0fb2b6c5fbd4af7d0b90b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to initialize Firebase app and authentication
function initializeFirebaseApp() {
    const auth = getAuth(app);
    auth.languageCode = "en";
    return { auth };
}

// Function to display user information in the UI
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

// Function to setup like buttons
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

// Function to setup all like buttons
async function setupAllLikeButtons(username) {
    const likeButtons = document.querySelectorAll('[id^="like"]');
    likeButtons.forEach(async (likeButtonElement) => {
        const likeButtonId = likeButtonElement.id;
        await setupLikeButton(username, likeButtonId);
    });
}

// Function to handle file upload to Firebase Storage
function handleFileUpload(selectedFile) {
    const storage = getStorage();
    const fileName = `${Date.now()}_${selectedFile.name}`;
    const storageReference = storageRef(storage, 'profilePictures/' + fileName);
    const uploadTask = uploadBytesResumable(storageReference, selectedFile);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Handle upload progress
        },
        (error) => {
            // Handle errors
            console.error('Error uploading file:', error);
        },
        () => {
            // Handle successful upload
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // Update user's profile picture URL in Firebase Authentication
                const user = getAuth().currentUser;
                if (user) {
                    updateProfile(user, {
                        photoURL: downloadURL
                    }).then(() => {
                        // Update UI with the new profile picture
                        console.log('Profile picture updated successfully:', downloadURL);
                    }).catch((error) => {
                        console.error('Error updating profile picture:', error);
                    });
                }
            });
        }
    );
}

// Function to initialize Firebase and handle user authentication state changes
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

// Wait for the DOM to be fully loaded before accessing the file input element
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input'); // Assuming you have an input element with id 'file-input'
    if (fileInput) {
        fileInput.addEventListener('change', (event) => {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
                handleFileUpload(selectedFile);
            }
        });
    } else {
        console.warn("Element with ID 'file-input' not found.");
    }

    main();
});
