"use strict";
// Elements for photo grid
const gridLocation1 = document.getElementById("gridRef1");
const gridLocation2 = document.getElementById("gridRef2");
const gridLocation3 = document.getElementById("gridRef3");
const gridLocation4 = document.getElementById("gridRef4");
const gridLocation5 = document.getElementById("gridRef5");
const gridLocation6 = document.getElementById("gridRef6");
const gridLocation7 = document.getElementById("gridRef7");
const gridLocation8 = document.getElementById("gridRef8");
const gridLocation9 = document.getElementById("gridRef9");
// log in status
let isLoggedIn = false;
let storedUser = localStorage.getItem('currentUser');
const navigation = document.getElementById("navigation");
// Current Page
const currentPageText = document.getElementById("currentPageType");
// Nav buttons
const navAll = document.getElementById("navAll");
const navBoard = document.getElementById("navBoard");
const myButton = document.getElementById("myBTN");
// form and checkboxes
const tableForm = document.getElementById("tableForm");
// add event listener for all checkboxes
const checkboxes = Array.from(document.querySelectorAll(".checkbox"));
// event listener for checkboxes
checkboxes.forEach((item) => {
    let checkbox = item;
    item.addEventListener("change", function () {
        if (checkbox.checked) {
            updatePinned(checkbox.value, true);
        }
        else {
            updatePinned(checkbox.value, false);
        }
    });
});
// navigation buttons
const forwardButton = document.getElementById("forward");
const backButton = document.getElementById("back");
const pageNumberDisplay = document.getElementById("pageNumber");
//  modals and tables
const modal = document.getElementById("modal1");
const modalImage = document.getElementById("modalImage");
const table = document.getElementById("table");
const loginModal = document.getElementById("loginModal");
// auth buttons
const login = document.getElementById("login");
const logout = document.getElementById("logout");
// grid location array
let gridLocations = [
    gridLocation1,
    gridLocation2,
    gridLocation3,
    gridLocation4,
    gridLocation5,
    gridLocation6,
    gridLocation7,
    gridLocation8,
    gridLocation9
];
// hardcode photos
let photos = [
    { id: 1, source: "images/Baxter Wed_1.jpg", isPinned: false },
    { id: 2, source: "images/Baxter Wed_2.jpg", isPinned: false },
    { id: 3, source: "images/Baxter Wed_3.jpg", isPinned: false },
    { id: 4, source: "images/Baxter Wed_4.jpg", isPinned: false },
    { id: 5, source: "images/Baxter Wed_5.jpg", isPinned: false },
    { id: 6, source: "images/Baxter Wed_6.jpg", isPinned: false },
    { id: 7, source: "images/Baxter Wed_7.jpg", isPinned: false },
    { id: 8, source: "images/Baxter Wed_8.jpg", isPinned: false },
    { id: 9, source: "images/Baxter Wed_9.jpg", isPinned: false },
    { id: 10, source: "images/Baxter Wed_10.jpg", isPinned: false },
    { id: 11, source: "images/Baxter Wed_11.jpg", isPinned: false },
    { id: 12, source: "images/Baxter Wed_12.jpg", isPinned: false },
    { id: 13, source: "images/Baxter Wed_13.jpg", isPinned: false },
    { id: 14, source: "images/Baxter Wed_14.jpg", isPinned: false },
    { id: 15, source: "images/Baxter Wed_15.jpg", isPinned: false },
    { id: 16, source: "images/Baxter Wed_16.jpg", isPinned: false },
    { id: 17, source: "images/Baxter Wed_17.jpg", isPinned: false },
    { id: 18, source: "images/Baxter Wed_18.jpg", isPinned: false },
    { id: 19, source: "images/Baxter Wed_19.jpg", isPinned: false },
    { id: 20, source: "images/Baxter Wed_20.jpg", isPinned: false },
    { id: 21, source: "images/Baxter Wed_21.jpg", isPinned: false },
    { id: 22, source: "images/Baxter Wed_22.jpg", isPinned: false },
    { id: 23, source: "images/Baxter Wed_23.jpg", isPinned: false },
];
let pinnedPhotos = new Set();
// set pagecounts
const photoCount = photos.length;
let pageCount = Math.ceil(photoCount / 9);
let boardPageCount = Math.ceil(pinnedPhotos.size / 9);
let boardCurrentPage = 0;
let currentPage = 0;
let targetCurrentPage = 0;
var PageType;
(function (PageType) {
    PageType[PageType["all"] = 0] = "all";
    PageType[PageType["board"] = 1] = "board";
})(PageType || (PageType = {}));
;
// update grid pictures for new page
function newSetGridPictures(type, pageNumber) {
    targetCurrentPage = pageNumber;
    let photoNumberBase = pageNumber * 9;
    let targetArray = [];
    if (type === PageType.all) {
        targetArray = photos;
        showCheckboxes();
        currentPage = pageNumber;
    }
    else if (type === PageType.board) {
        setBoardPageNumbers();
        targetArray = Array.from(pinnedPhotos);
        hideCheckboxes();
        boardCurrentPage = pageNumber;
    }
    else
        return;
    for (let location of gridLocations) {
        let index = gridLocations.indexOf(location);
        if (targetArray[photoNumberBase + index]) {
            let parentCell = location.parentElement;
            parentCell.style.display = "table-cell";
            location.src = targetArray[photoNumberBase + index].source;
            location.alt = String(photoNumberBase + index + 1);
        }
        else {
            location.src = "";
            let parentCell = location.parentElement;
            parentCell.style.display = "none";
        }
    }
}
;
var PageDirection;
(function (PageDirection) {
    PageDirection[PageDirection["back"] = 0] = "back";
    PageDirection[PageDirection["forward"] = 1] = "forward";
})(PageDirection || (PageDirection = {}));
;
function changePage(type, direction) {
    if (type === PageType.all) {
        targetCurrentPage = currentPage;
    }
    else if (type === PageType.board) {
        targetCurrentPage = boardCurrentPage;
    }
    if (direction === PageDirection.forward) {
        targetCurrentPage += 1;
        newSetGridPictures(type, targetCurrentPage);
    }
    else if (direction === PageDirection.back) {
        targetCurrentPage -= 1;
        newSetGridPictures(type, targetCurrentPage);
    }
    if (type === PageType.all) {
        currentPage = targetCurrentPage;
    }
    else if (PageType.board) {
        boardCurrentPage = targetCurrentPage;
    }
}
let currentPageType;
function setPageType(typeToggle) {
    if (typeToggle === PageType.all) {
        currentPageType = PageType.all;
        currentPageText.textContent = "All Photos";
    }
    else if (typeToggle === PageType.board) {
        currentPageType = PageType.board;
        currentPageText.textContent = "Your board";
    }
}
function displayPageNumber() {
    let pageCountDisplay;
    let currentPageDisplay = 0;
    if (currentPageType === PageType.all) {
        pageCountDisplay = pageCount;
        currentPageDisplay = currentPage + 1;
    }
    else if (currentPageType === PageType.board) {
        pageCountDisplay = boardPageCount;
        currentPageDisplay = boardCurrentPage + 1;
    }
    else {
        pageCountDisplay = "Error";
    }
    if (pageCountDisplay != 0) {
        pageNumberDisplay.style.display = "block";
        pageNumberDisplay.innerHTML = "Page " + (currentPageDisplay).toString() + " of " + pageCountDisplay.toString() + "";
    }
    else
        pageNumberDisplay.style.display = "none";
}
function disableButtonChecker(type) {
    // refactor into a new function
    // this works but looks as janky as hell
    let targetPageCount;
    if (type === PageType.all) {
        targetCurrentPage = currentPage;
        targetPageCount = pageCount;
    }
    else if (type == PageType.board) {
        targetCurrentPage = boardCurrentPage;
        targetPageCount = boardPageCount;
    }
    forwardButton.style.removeProperty("color");
    forwardButton.onclick = null;
    forwardButton.onclick = forwardWrapper;
    forwardButton.classList.remove("grey-hover");
    backButton.style.removeProperty("color");
    backButton.onclick = null;
    backButton.onclick = backWrapper;
    backButton.classList.remove("grey-hover");
    if (targetCurrentPage === 0) {
        if (targetPageCount === 0) {
            forwardButton.style.color = "#A0A0A0";
            forwardButton.onclick = preventDefaultClick;
            forwardButton.classList.add("grey-hover");
            backButton.style.color = "#A0A0A0";
            backButton.onclick = preventDefaultClick;
            backButton.classList.add("grey-hover");
        }
        else {
            backButton.style.color = "#A0A0A0";
            backButton.classList.add("grey-hover");
            backButton.onclick = preventDefaultClick;
        }
    }
    if (targetCurrentPage + 1 === targetPageCount) {
        if (targetCurrentPage === 0) {
            forwardButton.style.color = "#A0A0A0";
            forwardButton.onclick = preventDefaultClick;
            forwardButton.classList.add("grey-hover");
            backButton.style.color = "#A0A0A0";
            backButton.onclick = preventDefaultClick;
            backButton.classList.add("grey-hover");
        }
        else {
            forwardButton.style.color = "#A0A0A0";
            forwardButton.onclick = preventDefaultClick;
            forwardButton.classList.add("grey-hover");
        }
    }
}
function openImageModal(reference) {
    modal.style.display = "block";
    modalImage.src = reference.src;
    hideTable();
}
function openLoginModal() {
    console.log("openLoginModal function called success");
    loginModal.style.display = "block";
    hideTable();
}
function closeModal(targetModal) {
    targetModal.style.display = "none";
    showTable();
}
function hideTable() {
    table.style.display = "none";
}
function showTable() {
    table.style.display = "block";
}
function hideAuthButton(targetButton) {
    let target = document.getElementById(targetButton);
    target.style.display = "none";
}
function showAuthButton(targetButton) {
    let target = document.getElementById(targetButton);
    target.style.display = "span";
}
function hideCell(id) {
    let currentCell = document.getElementById(id);
    currentCell.style.display = "none";
}
// updates photos array when a photo is pinned / unpinned
// also updates the pinnedPhotos Set
function updatePinned(gridRef, isPinned) {
    let gridLocation = document.getElementById(gridRef);
    let targetId = +gridLocation.alt;
    let index = photos.findIndex(photo => photo.id === targetId);
    if (isPinned === true) {
        photos[index].isPinned = true;
        pinnedPhotos.add(photos[index]);
    }
    else {
        photos[index].isPinned = false;
        pinnedPhotos.delete(photos[index]);
    }
}
function setBoardPageNumbers() {
    boardPageCount = Number(Math.ceil(pinnedPhotos.size / 9));
}
// toggle checkboxes in the UI based on contents of Photos
function toggleDisplayCheckboxes() {
    checkboxes.forEach((item) => {
        const checkbox = item;
        let gridLocation = document.getElementById(checkbox.value);
        let targetId = +gridLocation.alt;
        let currentPhoto = photos.find(photo => photo.id === targetId);
        if (currentPhoto === null || currentPhoto === void 0 ? void 0 : currentPhoto.isPinned) {
            checkbox.checked = true;
        }
    });
}
;
function clearCheckboxes() {
    checkboxes.forEach((item) => {
        const checkbox = item;
        checkbox.checked = false;
    });
}
;
function hideCheckboxes() {
    checkboxes.forEach((item) => {
        const checkbox = item;
        checkbox.style.visibility = "hidden";
    });
}
;
function showCheckboxes() {
    checkboxes.forEach((item) => {
        const checkbox = item;
        checkbox.style.visibility = "visible";
    });
}
;
function toggleNavigation() {
    if (storedUser === null || storedUser === '') {
        console.log('currentUser is blank');
        console.log(isLoggedIn);
        console.log("no current user");
        navigation.style.visibility = "hidden";
    }
    else {
        console.log(isLoggedIn);
        navigation.style.visibility = "visible";
    }
}
function hideAuthOnStart() {
    if (storedUser) {
        hideAuthButton("login");
        showAuthButton("logout");
    }
    else {
        hideAuthButton("logout");
        showAuthButton("login");
    }
}
function hideCheckboxesonStart() {
    if (storedUser) {
        showCheckboxes();
    }
    else {
        hideCheckboxes();
    }
}
function activateElement(element) {
    // Get all elements with the "active" class
    const activeElements = document.querySelectorAll('.active');
    // Iterate through each active element and remove the "active" class
    activeElements.forEach((activeElement) => {
        activeElement.classList.remove('active');
    });
    // Toggle the "active" class on the clicked element
    element.classList.toggle('active');
}
function logouter() {
    localStorage.removeItem('currentUser');
    storedUser = localStorage.getItem('currentUser');
    console.log(storedUser);
    hideAuthOnStart();
    toggleNavigation();
    alert("Logged Out");
    login.style.display = "block";
}
function preventDefaultClick(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log("Custom click handler");
}
// wrapper functions that bundles all new page functions into one
function forwardWrapper() {
    changePage(currentPageType, PageDirection.forward);
    displayPageNumber();
    disableButtonChecker(currentPageType);
    clearCheckboxes();
    toggleDisplayCheckboxes();
}
function backWrapper() {
    changePage(currentPageType, PageDirection.back);
    displayPageNumber();
    disableButtonChecker(currentPageType);
    clearCheckboxes();
    toggleDisplayCheckboxes();
}
// password validation (replace with call to backend in future)
// Define a valid username and password 
const validUsername = 'user123';
const validPassword = 'pass123';
// Function to validate the form on submission
function validateForm() {
    // Get references to form elements and error message
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('pword');
    // Get the entered username and password
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;
    // password validation
    if (enteredUsername === validUsername && enteredPassword === validPassword) {
        // Successful login
        localStorage.setItem('currentUser', enteredUsername);
        storedUser = localStorage.getItem(`currentUser`);
        isLoggedIn = true;
        console.log(isLoggedIn);
        console.log(storedUser);
        alert("Login Successful");
        hideAuthButton("login");
        showAuthButton("logout");
        // You can redirect the user or perform other actions here
        return true; // Allow form submission
    }
    else {
        // Failed login
        alert("invalid username or password");
        return false; // Prevent form submission
    }
}
