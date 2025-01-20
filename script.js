const state = {
    keyfob_selected: false,
    keyfobs: [0, 0, 0, 0],
}

DOOR_UNLOCK = createRandomKey()
state.keyfobs[0] = DOOR_UNLOCK
DOOR = document.getElementById("door")
SCANNED = document.getElementById("scanned-data")
WRITE = document.getElementById("scanner-input")

// Create a random key 
function createRandomKey() {
    data = Math.random().toString(16).slice(2, 10).toUpperCase()
    command = "#" + data
    return command;
}

function getKeyfobID() {
    return parseInt(state.keyfob_selected.id.slice(-1))
}

// Select a keyfob, deselect unselected keyfob, deselect selected keyfob if clicked twice
function selectKeyfob(this_keyfob) {
    if (state.keyfob_selected == this_keyfob) {
        state.keyfob_selected.classList.remove("selected");
        state.keyfob_selected = false;
        return
    } else if (state.keyfob_selected) {
        state.keyfob_selected.classList.remove("selected");
    }
    state.keyfob_selected = this_keyfob
    state.keyfob_selected.classList.add("selected");
}

// Try to unlock the door, alert when keyfob not selected, fail when wrong key
function unlockDoor() {
    if (state.keyfob_selected) {
        id = getKeyfobID()
        key = state.keyfobs[id]
        if (key == DOOR_UNLOCK) {
            DOOR.data = "icons/car-door-icon.svg"
            setTimeout(closeDoor, 3000);
        }
    } else {
        alert("Please select a key fob before opening the door!")
    }
}

function closeDoor() {
    DOOR.data = "icons/car-door-closed.svg"
}

// Scan key fob
function scanKeyfob() {
    if (state.keyfob_selected) {
        id = getKeyfobID()
        key = state.keyfobs[id]
        SCANNED.value = key
    } else {
        alert("Please select a key fob before scanning!")
    }
}

// Write to key fob
function writeKeyfob() {
    if (state.keyfob_selected) {
        id = getKeyfobID()
        key = WRITE.value
        state.keyfobs[id] = key
        WRITE.value = ""
    } else {
        alert("Please select a key fob before writing!")
    }
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function refresh() {
    SCANNED.value = ""
}