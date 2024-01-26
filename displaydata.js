
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc,deleteDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';

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

const collectionRef = collection(db, "users");



const dataTable = document.getElementById("data-table").getElementsByTagName('tbody')[0];
const originalRowVisibility = new Map(); // Map to store original row visibility

// Function to populate the table
const fetchData = async () => {
    try {
        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const row = dataTable.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);

            cell1.textContent = data.username;
            cell2.textContent = data.email;
            cell3.textContent = data.userType;

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", () => {
                const url = `index.html?docId=${doc.id}&editMode=true`;
                window.location.href = url;
              
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                deleteDocument(doc.id);
            });

            cell4.appendChild(editButton);
            cell4.appendChild(deleteButton);

            originalRowVisibility.set(row, true); // Store original visibility
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

// Call the fetchData function to populate the table
fetchData();






const deleteDocument = async (docId) => {
    try {
        await deleteDoc(doc(db, "users", docId));
        console.log("Document deleted successfully!");
        location.reload(); 
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};


