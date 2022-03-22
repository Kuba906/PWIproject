
const Colors = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow",
 "gray", "gray", "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"];

let elements = document.querySelectorAll("div");
elements = [...elements];
let startTime;
let currentEl = "";
const pickedElements = [];
const gameLength = elements.length / 2;
let Score = 0;
let check = false;

const clickCard = function () {
    if(check === false){
        startTime = new Date().getTime();
    }
    check = true;
    let object = this;
    currentEl = object;

    if (currentEl == pickedElements[0]){
         return;
    }

    currentEl.classList.remove("hidden");

    if (pickedElements.length === 0) {
        pickedElements[0] = currentEl;
        return;
    }
    else {
        elements.forEach(card => card.removeEventListener("click", clickCard))
        pickedElements[1] = currentEl;

        setTimeout(function () {
            if (pickedElements[0].className === pickedElements[1].className) {
                pickedElements.forEach(card => card.classList.add("off"))
                Score++;
                elements = elements.filter(card => !card.classList.contains("off"));
                if (Score == gameLength) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000
                    alert(`Udało się! Twój wynik to: ${gameTime} sekund`)
                    location.reload();
                }
            }
            else {
                pickedElements.forEach(card => card.classList.add("hidden"))
            }
            currentEl = "";
            pickedElements.length = 0;
            elements.forEach(card => card.addEventListener("click", clickCard))

        }, 500)
    }
};

const init = function () {
    elements.forEach(card => {
        const position = Math.floor(Math.random() * Colors.length);
        card.classList.add(Colors[position]);
        Colors.splice(position, 1);
    })
        elements.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener("click", clickCard)
        })
};

init()