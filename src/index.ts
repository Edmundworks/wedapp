console.log("Hello, world");
console.log("test phrase");
console.log("3rd test");

const gridLocation1 = document.getElementById("gridRef1")! as HTMLImageElement;
const gridLocation2 = document.getElementById("gridRef2")! as HTMLImageElement;
const gridLocation3 = document.getElementById("gridRef3")! as HTMLImageElement;
const gridLocation4 = document.getElementById("gridRef4")! as HTMLImageElement;
const gridLocation5 = document.getElementById("gridRef5")! as HTMLImageElement;
const gridLocation6 = document.getElementById("gridRef6")! as HTMLImageElement;
const gridLocation7 = document.getElementById("gridRef7")! as HTMLImageElement;
const gridLocation8 = document.getElementById("gridRef8")! as HTMLImageElement;
const gridLocation9 = document.getElementById("gridRef9")! as HTMLImageElement;

// Current Page

const currentPageText = document.getElementById("currentPageType") as HTMLElement;

// Nav buttons

const navAll = document.getElementById("navAll") as HTMLButtonElement
const navBoard = document.getElementById("navBoard") as HTMLButtonElement

// form and checkboxes

const tableForm = document.getElementById("tableForm") as HTMLFormElement;

// add event listener for all checkboxes
const checkboxes = Array.from(document.querySelectorAll(".checkbox"));

// event listener

checkboxes.forEach((item) => {
    let checkbox = item as HTMLInputElement;
    item.addEventListener("change", function() {
        if (checkbox.checked) { 
            updatePinned(checkbox.value, true);
        }
        else {
            updatePinned(checkbox.value, false);
        }
    })
});

// navigation buttons

const forwardButton = document.getElementById("forward") as HTMLButtonElement;
const backButton = document.getElementById("back") as HTMLButtonElement;

const pageNumberDisplay = document.getElementById("pageNumber") as HTMLElement;

//  references for resizing
const modal = document.getElementById("modal1") as HTMLElement;
const loginModal = document.getElementById("loginModal") as HTMLElement;
const modalImage = document.getElementById("modalImage") as HTMLImageElement;
const table = document.getElementById("table") as HTMLTableElement;

const login = document.getElementById("login") as HTMLElement;


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
]


type Photo = {
    id: number;
    source: string;
    isPinned: boolean;
    tagged?: User[];

}

type User = {
    // todo
    }

let photos: Photo[] = [
    { id: 1, source: "images/Baxter Wed_1.jpg", isPinned: false},
    { id: 2, source: "images/Baxter Wed_2.jpg", isPinned: false},
    { id: 3, source: "images/Baxter Wed_3.jpg", isPinned: false},
    { id: 4, source: "images/Baxter Wed_4.jpg", isPinned: false},
    { id: 5, source: "images/Baxter Wed_5.jpg", isPinned: false},
    { id: 6, source: "images/Baxter Wed_6.jpg", isPinned: false},
    { id: 7, source: "images/Baxter Wed_7.jpg", isPinned: false},
    { id: 8, source: "images/Baxter Wed_8.jpg", isPinned: false},
    { id: 9, source: "images/Baxter Wed_9.jpg", isPinned: false},
    { id: 10, source: "images/Baxter Wed_10.jpg", isPinned: false},
    { id: 11, source: "images/Baxter Wed_11.jpg", isPinned: false},
    { id: 12, source: "images/Baxter Wed_12.jpg", isPinned: false},
    { id: 13, source: "images/Baxter Wed_13.jpg", isPinned: false},
    { id: 14, source: "images/Baxter Wed_14.jpg", isPinned: false},
    { id: 15, source: "images/Baxter Wed_15.jpg", isPinned: false},
    { id: 16, source: "images/Baxter Wed_16.jpg", isPinned: false},
    { id: 17, source: "images/Baxter Wed_17.jpg", isPinned: false},
    { id: 18, source: "images/Baxter Wed_18.jpg", isPinned: false},
    { id: 19, source: "images/Baxter Wed_19.jpg", isPinned: false},
    { id: 20, source: "images/Baxter Wed_20.jpg", isPinned: false},
    { id: 21, source: "images/Baxter Wed_21.jpg", isPinned: false},
    { id: 22, source: "images/Baxter Wed_22.jpg", isPinned: false},
    { id: 23, source: "images/Baxter Wed_23.jpg", isPinned: false},

];

let pinnedPhotos = new Set();

// hardcoded for now, future iterations will change this
const photoCount = photos.length;

let pageCount = Math.ceil(photoCount / 9);

let boardPageCount = Math.ceil(pinnedPhotos.size / 9);

let boardCurrentPage = 0;

let currentPage = 0;

let targetCurrentPage = 0;

enum PageType {all, board};

// NOTE - I updated this to change the global currentPage variable based on what 
// is passed to it here

function newSetGridPictures(type: PageType, pageNumber: number) {
    targetCurrentPage = pageNumber;
    let photoNumberBase = pageNumber * 9;
    let targetArray: Photo[] = [];
    if (type === PageType.all) {
        targetArray = photos;
        showCheckboxes();
        currentPage = pageNumber;
    } else if (type === PageType.board) {
        setBoardPageNumbers();
        targetArray = Array.from(pinnedPhotos) as Photo[];
        hideCheckboxes();
        boardCurrentPage = pageNumber;
    } else return;
    for (let location of gridLocations) {
        let index = gridLocations.indexOf(location);
        if (targetArray[photoNumberBase + index]) {
            let parentCell = location.parentElement as HTMLTableCellElement;
                parentCell.style.display = "table-cell";
            location.src = targetArray[photoNumberBase + index].source;
            location.alt = String(photoNumberBase + index + 1) 
            } else {
                location.src = "";
                let parentCell = location.parentElement as HTMLTableCellElement;
                parentCell.style.display = "none";

        }
}  };

enum PageDirection {back, forward};

function changePage(type: PageType, direction: PageDirection) {
    if (type === PageType.all) {
        targetCurrentPage = currentPage;
    } else if (type === PageType.board) {
        targetCurrentPage = boardCurrentPage;
    }

    if (direction === PageDirection.forward) {
        targetCurrentPage += 1;
        newSetGridPictures(type, targetCurrentPage);
    } else if (direction === PageDirection.back) {
        targetCurrentPage -= 1;
        newSetGridPictures(type, targetCurrentPage);
   }

   if (type === PageType.all) {
    currentPage = targetCurrentPage;
   } else if (PageType.board) {
    boardCurrentPage = targetCurrentPage;
   }


}

let currentPageType: PageType;

function setPageType(typeToggle: PageType) {
    if (typeToggle === PageType.all) {
        currentPageType = PageType.all
        currentPageText.textContent = "All Photos";
        navAll.hidden = true;
        navBoard.hidden = false;
    } else if (typeToggle === PageType.board) {
       currentPageType = PageType.board;
       currentPageText.textContent = "Your board";
       navAll.hidden = false;
       navBoard.hidden = true; 
    }

}

function displayPageNumber() {
    let pageCountDisplay;
    let currentPageDisplay = 0; 
    if (currentPageType === PageType.all) {
    pageCountDisplay = pageCount;
    currentPageDisplay = currentPage + 1;    
    } else if (currentPageType === PageType.board) {
        pageCountDisplay = boardPageCount;
        currentPageDisplay = boardCurrentPage +1;
    } else {
        pageCountDisplay = "Error";
    }

    if (pageCountDisplay != 0) {
        pageNumberDisplay.style.display = "block";
        pageNumberDisplay.innerHTML = "Page "+(currentPageDisplay).toString()+" of "+pageCountDisplay.toString()+"";
    } else pageNumberDisplay.style.display = "none";
}

function disableButtonChecker(type: PageType) {
    // refactor into a new function
    // this works but looks as janky as hell
    
    
    let targetPageCount;
    if (type === PageType.all) {
       targetCurrentPage = currentPage;
       targetPageCount = pageCount; 
    } else if (type == PageType.board) {
        targetCurrentPage = boardCurrentPage;
        targetPageCount = boardPageCount;
    }

    forwardButton.hidden = false;
    backButton.hidden = false;

    if (targetCurrentPage === 0) {
        if (targetPageCount === 0) {
            forwardButton.hidden = true;
            backButton.hidden = true;
        } else { 
            forwardButton.hidden = false;
            backButton.hidden = true;
        }
    } 
    if (targetCurrentPage + 1 === targetPageCount) {
        if (targetCurrentPage === 0) {
            forwardButton.hidden = true;
            backButton.hidden = true;
        } else {
            forwardButton.hidden = true;
        backButton.hidden = false;
         }
        
    }  
}

function openImageModal(reference: HTMLImageElement) {
    modal.style.display = "block";
    modalImage.src = reference.src;
    hideTable();
}

function openLoginModal() {
    alert("button click worked");
    // loginModal.style.display = "block";
    // hideTable();
}

function closeModal(targetModal: HTMLElement) {
    targetModal.style.display = "none";
    showTable();
}

function hideTable() {
    table.style.display = "none";
}

function showTable() {
    table.style.display ="block";
}

function hideCell(id: string) {
    let currentCell = document.getElementById(id) as HTMLTableCellElement;
    currentCell.style.display = "none";
}

// updates photos array when a photo is pinned / unpinned
// also updates the pinnedPhotos Set

function updatePinned(gridRef: string, isPinned: boolean) {
    let gridLocation = document.getElementById(gridRef)! as HTMLImageElement;
    let targetId = +gridLocation.alt
    let index = photos.findIndex(photo => photo.id === targetId);
    if (isPinned === true) {
        photos[index].isPinned = true;
        pinnedPhotos.add(photos[index]);
    } else {
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
        const checkbox = item as HTMLInputElement;
        let gridLocation = document.getElementById(checkbox.value)! as HTMLImageElement;
        let targetId = +gridLocation.alt
        let currentPhoto = photos.find(photo => photo.id === targetId)
        if (currentPhoto?.isPinned) {
            checkbox.checked = true;
        }
    })    
};

function clearCheckboxes() {
    checkboxes.forEach((item) => {
    const checkbox = item as HTMLInputElement;
    checkbox.checked = false;
})};


function hideCheckboxes() {
    checkboxes.forEach((item) => {
        const checkbox = item as HTMLInputElement;
        checkbox.style.visibility = "hidden";
})};

function showCheckboxes() {
    checkboxes.forEach((item) => {
        const checkbox = item as HTMLInputElement;
        checkbox.style.visibility = "visible";
})};