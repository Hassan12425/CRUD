import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, where,doc,getDoc,updateDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
const firebaseConfig = {
   apiKey: "AIzaSyBoJ1WakGP6O8h3EPiBDBXpwr2cxZd85N4",
   authDomain: "registration-a9cc5.firebaseapp.com",
   databaseURL: "https://registration-a9cc5-default-rtdb.firebaseio.com",
   projectId: "registration-a9cc5",
   storageBucket: "registration-a9cc5.appspot.com",
   messagingSenderId: "113770753648",
   appId: "1:113770753648:web:4c1a356bba8c0e2d988eb5",
   measurementId: "G-2G4DG154P4"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

document.addEventListener("DOMContentLoaded", async function () {
   const urlParams = new URLSearchParams(window.location.search);
   const docId = urlParams.get("docId");
   const editMode = urlParams.get("editMode");

   if (editMode === "true" && docId) {
     // Show the "Update" button
     document.getElementById("updateuser").style.display = "block";
     document.getElementById("adduser").style.display = "none";
     console.log("docId:", docId);
     console.log("editMode:", editMode);
   }
   console.log(docId);
   if (docId) {
     const decodedDocId = decodeURIComponent(docId);

     const userDoc = doc(db, "users", decodedDocId); 
     try {
       const userSnapshot = await getDoc(userDoc);
       if (userSnapshot.exists()) {
         const userData = userSnapshot.data();
         document.getElementById("uname").value = userData.username;
         document.getElementById("email").value = userData.email;
         
       } else {
         console.log("User not found in Firestore.");
       }
     } catch (error) {
       console.error("Error fetching user data: ", error);
     }
   } else {
     console.error("No docId query parameter provided.");
   }
 });





// Function to add a user to Firestore
async function checkDuplicateUser(uname, email) {
 const usersCollection = collection(db, "users");
 const userQuery = query(usersCollection, where("username", "==", uname), where("email", "==", email));
 const querySnapshot = await getDocs(userQuery);

 if (querySnapshot.empty) {
    return false; // No user with the provided username and email
 } else {
    return true; // Duplicate user exists
 }
}

document.getElementById("adduser").addEventListener("click", async function () {
 const uname = document.getElementById("uname").value;
 const email = document.getElementById("email").value;
 const userType = document.getElementById("userType").value;

 try {
    const isDuplicateUser = await checkDuplicateUser(uname, email);

    if (isDuplicateUser) {
      alert("Error adding user data: Duplicate user exists.");
    } else {
      const docRef = await addDoc(collection(db, "users"), {
        username: uname,
        email: email,
        userType: userType,
      });
      console.log("User data added with ID: ", docRef.id);
    }
 } catch (error) {
    console.error("Error adding user data: ", error);
 }
});



// Assuming you have retrieved the document and stored it in 'userSnapshot'
const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get("docId");
const userDoc = doc(db, "users",docId ); 
try {
const userSnapshot = await getDoc(userDoc);
if (userSnapshot.exists()) {
   const userData = userSnapshot.data();
   const docId = userSnapshot.id; // Get the document ID
 
   // Set the document ID as a value for the 'data-id' attribute in your HTML form
   document.getElementById("userForm").setAttribute("data-id", docId);
   document.getElementById("uname").value = userData.username;
   document.getElementById("email").value = userData.email;
   // You can populate other fields as needed
 } else {
   console.log("User not found in Firestore.");
 }

} catch (error) {
 console.error("Error fetching user data: ", error);
}


 
const updateUserButton = document.getElementById("updateuser");
const addUserButton = document.getElementById("adduser");
updateUserButton.addEventListener("click", async () => {
   const uname = document.getElementById("uname").value;
   const email = document.getElementById("email").value;
   const pass = document.getElementById("pass").value;

   const docId = document.getElementById("userForm").getAttribute("data-id"); // Retrieve the docId

   if (docId) {
       const docRef = doc(db, "users", docId);
       try {
           await updateDoc(docRef, {
               username: uname,
               email: email,
               password: pass,
           });

           console.log("Document updated successfully!");

           document.getElementById("userForm").reset();

           updateUserButton.style.display = "none";
           addUserButton.style.display = "block";
       } catch (error) {
           console.error("Error updating document: ", error);
       }
   } else {
       console.error("Error: 'data-id' attribute is missing or invalid.");
   }
});

