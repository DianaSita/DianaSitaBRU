import {MONTHS, DAYS} from "./config.js"

export function create() {
    loadeFont();
    document.body.style.cssText = `
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(40, 40, 40);
    height: 100vh;
    user-select: none;
    `;
    let calendar = document.createElement('div');
    calendar.style.cssText = `
        width: 90vmin; 
        height: 90vmin; 
        background-color: inherit;
        border: rgb(207, 13, 13) solid 2px;
        `;
    calendar.id = "calendar";
    calendar.appendChild(createHead());
    calendar.appendChild(createContainer());
    document.body.appendChild(calendar);
}

export function getDisplayedYear() {
    return document.getElementById("head-year").textContent;
}

export function getDisplayedMonth() {
    return MONTHS.indexOf(document.getElementById("head-month").textContent);
}

export function insertDay(day) {
    let calendarDay = document.createElement('div');
    calendarDay.style.cssText = `
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 1.5vmin 1vmin;
        font-weight: 700;
        color: rgb(214, 114, 114);
        border-radius: 50%;
        border: rgb(40, 40, 40) solid 2px;
        align-items: center;
        grid-column-start: ${day.i};
        grid-row-start: ${day.j};
    `;
    calendarDay.textContent = day.number;
    if (day.isToday) {
        calendarDay.style.backgroundColor = "rgb(207, 13, 13)";
        calendarDay.style.color = "rgb(40, 40, 40)";
        return calendarDay;
    } else if (day.isWeekend) {
        calendarDay.style.color = "rgb(207, 13, 13)";
    }
    if (day.isHoliday) {
        calendarDay.style.color = "white";
        calendarDay.style.fontWeight = "800";
    }  
    calendarDay.onclick = (evt) => {
        let selected = document.querySelectorAll("[selected]");
        selected.forEach(element => { 
            element.removeAttribute("selected");
            element.style.border = "rgb(40, 40, 40) solid 2px";
        });
        evt.currentTarget.setAttribute("selected", "true");
        evt.currentTarget.style.border = "rgb(207, 13, 13) solid 2px";
    };
    return calendarDay;
}

function createHead() {
    let date = new Date();
    let head = document.createElement("div");
    let year = createHeadElement();
    year.id = "head-year";
    year.textContent = date.getFullYear();
    let month = createHeadElement();
    month.id = "head-month";
    month.textContent = MONTHS[date.getMonth()];
    head.id = "calendar-head";
    head.style.cssText = `
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 12%;
        border-bottom:rgb(207, 13, 13) solid 2px;
        `;
    head.appendChild(month);
    head.appendChild(year);
    return head;
}

function createHeadElement() {
    let element = document.createElement("div");
    element.style.cssText = `
        font-weight: 700;
        color: rgb(207, 13, 13);
        `;
    return element;
}

function createContainer() {
    let container = document.createElement("div");
    container.style.cssText = `
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 88%;
    `;
    let leftArrow = createArrow();
    leftArrow.id = "arrow-left";
    leftArrow.innerHTML = "&#xf053";
    container.appendChild(leftArrow);
    let innerContainer = document.createElement("div");
    innerContainer.style.height = "100%";
    innerContainer.style.width = "90%";
    let nameGrid = createNameGrid(DAYS);
    innerContainer.appendChild(nameGrid);
    let dayGrid = createDayGrid(DAYS.length);
    innerContainer.appendChild(dayGrid);
    container.appendChild(innerContainer);
    let rightArrow = createArrow();
    rightArrow.id = "arrow-right";
    rightArrow.innerHTML = "&#xf054";
    container.appendChild(rightArrow);
    return container;
}

function createArrow(){
    let arrow = document.createElement("div");
    arrow.style.cssText = `
        line-height: 75vmin;
        height: 100%;
        width: 5%;
        background-color: inherit;
        color: rgb(207, 13, 13);
        font-family: FontAwesome;
        font-style: normal;
        vertical-align: middle;
        text-align: center;
    `;
    return arrow;
}

function createNameGrid(daysInfo) {
    let grid = document.createElement("grid");
    grid.id = "day-name-container";
    grid.style.cssText = `
        display: grid; 
        grid-template-columns: repeat(${daysInfo.length}, 1fr);
        height: 10%;
        width: 100%;
        background-color: inherit;
    `;
    let days = daysInfo.sort((a, b) => a.orderNumber - b.orderNumber);
    days.forEach(day => {
        let dayName = document.createElement('div');
        dayName.textContent = day.name;
        dayName.style.cssText = `
            padding: 1.5vmin;
            font-weight: 600;
            text-align: center;
        `;
        if (day.isWeekend) {
            dayName.style.color = "rgb(207, 13, 13)";
        } else {
            dayName.style.color = "rgb(214, 114, 114)";
        }
        grid.appendChild(dayName);
    });
    return grid;
}

function createDayGrid(length) {
    let grid = document.createElement('grid');
    grid.id = 'days-container';
    grid.style.cssText = `
        background-color: inherit;
        height: 90%;
        display: grid;
        grid-template-columns: repeat(${length}, 1fr);
    `;
    return grid;
}

function loadeFont() {
    let font = document.createElement("style");
    font.appendChild(document.createTextNode("\
    @font-face {\
        font-family: FontAwesome;\
        src: url(./fonts/fontawesome-webfont.eot?) format('eot'),\
             url(./fonts/fontawesome-webfont.svg) format('svg'),\
             url(./fonts/fontawesome-webfont.ttf) format('truetype'),\
             url(./fonts/fontawesome-webfont.woff) format('woff'),\
             url(./fonts/fontawesome-webfont.woff2) format('woff2'),\
             url(./fonts/FontAwesome.otf) format('otf');\
    }\
    "));
    document.head.appendChild(font);
}
