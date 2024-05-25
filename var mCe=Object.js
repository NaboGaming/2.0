import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile, deleteUser } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getDatabase, ref, set, get, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";

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
const storage = getStorage(app);

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
async function handleFileUpload(selectedFile) {
    const user = getAuth().currentUser;
    if (!user) {
        console.error('No authenticated user.');
        return;
    }

    const lastUploadRef = ref(db, `users/${user.uid}/lastUpload`);
    const lastUploadSnapshot = await get(lastUploadRef);
    const lastUploadTimestamp = lastUploadSnapshot.val();

    const oneMonth = 30 * 24 * 60 * 60 * 1000; // One month in milliseconds
    const now = Date.now();

    if (lastUploadTimestamp && (now - lastUploadTimestamp < oneMonth)) {
        alert('You can only upload a picture once per month.');
        return;
    }

    const fileName = `${Date.now()}_${selectedFile.name}`;
    const storageReference = storageRef(storage, 'profilePictures/' + fileName);
    const uploadTask = uploadBytesResumable(storageReference, selectedFile);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Handle upload progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            // Display the upload progress to the user
            document.getElementById('upload-progress').innerText = 'Upload is ' + progress.toFixed(2) + '% done';
        },
        (error) => {
            // Handle errors
            console.error('Error uploading file:', error);
            document.getElementById('upload-progress').innerText = 'Error uploading file: ' + error.message;
        },
        async () => {
            // Handle successful upload
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // Update user's profile picture URL in Firebase Authentication
            await updateProfile(user, { photoURL: downloadURL });
            // Update the last upload timestamp
            await set(lastUploadRef, now);
            // Auto-refresh the page
            location.reload();
        }
    );
}

// Function to initialize Firebase and handle user authentication state changes
async function main() {
    const { auth } = initializeFirebaseApp();

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("User is signed in");
            await handleUserSession(user);
            const username = displayUserInfo(user);
            setupAllLikeButtons(username);
        } else {
            console.log("User is signed out");
        }
    });
}

// Function to handle user session
async function handleUserSession(user) {
    const sessionId = `${user.uid}_${Date.now()}`;
    const userSessionRef = ref(db, `sessions/${user.uid}`);
    const sessionSnapshot = await get(userSessionRef);

    if (sessionSnapshot.exists()) {
        const previousSessionId = sessionSnapshot.val().sessionId;
        if (previousSessionId !== sessionId) {
            await signOutPreviousSession(user.uid, previousSessionId);
        }
    }

    await set(userSessionRef, { sessionId });

    window.addEventListener('beforeunload', () => {
        removeSession(user.uid, sessionId);
    });
}
// Function to sign out and remove all sessions, then delete the account
async function signOutPreviousSession(uid) {
    const userSessionsRef = ref(db, `sessions/${uid}`);
    const sessionSnapshot = await get(userSessionsRef);
    if (sessionSnapshot.exists()) {
        // Remove all sessions
        await set(userSessionsRef, null);
    }
    
    // Notify the user
    alert('You have been signed out because your account was logged in from another location.');
    
    // Redirect to index.html after a short delay to allow alert to show
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 100); // Adjust delay if necessary

    // Delete the current user
    const currentUser = getAuth().currentUser;
    if (currentUser) {
        await deleteUser(currentUser);
    }
}

// Function to remove a specific session
async function removeSession(uid, sessionId) {
    const userSessionRef = ref(db, `sessions/${uid}`);
    const sessionSnapshot = await get(userSessionRef);
    if (sessionSnapshot.exists() && sessionSnapshot.val().sessionId === sessionId) {
        await set(userSessionRef, null);
    }
}

// Wait for the DOM to be fully loaded before accessing the file input element
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input'); // Assuming you have an input element with id 'file-input'
    const profilePicture = document.getElementById('karibupicha');

    if (fileInput) {
        // Hide the file input element
        fileInput.style.display = 'none';

        // Add click event listener to the profile picture
        if (profilePicture) {
            profilePicture.addEventListener('click', () => {
                fileInput.click();
            });
        } else {
            console.warn("Element with ID 'karibupicha' not found.");
        }

        // Add change event listener to the file input element
        fileInput.addEventListener('change', (event) => {
            const selectedFile = event.target.files[0];

            // Check file size and type
            const maxSize = 1.2 * 1024 * 1024; // 1.2 MB
            const allowedTypes = ['image/gif', 'image/png', 'image/jpeg', 'image/webp'];

            if (selectedFile.size > maxSize) {
                alert('Picha inabidi iwe na saizi pungufu ya 1.2mb, Tafadhari Jaribu Tena  ');
                return;
            }

            if (!allowedTypes.includes(selectedFile.type)) {
                alert('Aina Ya Picha Inayokubalika Ni GIF, PNG, JPG, au WEBP.');
                return;
            }

            if (selectedFile) {
                handleFileUpload(selectedFile);
            }
        });
    } else {
        console.warn("Element with ID 'file-input' not found.");
    }
});

main();
