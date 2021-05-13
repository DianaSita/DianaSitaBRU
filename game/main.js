import {SIZES, PARAMS} from "./const.js"

generate();

function generate() {
    loadeFont();
    document.body.style.cssText = `
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${PARAMS.colors.background};
    font-weight: 700;
    min-height: 100vh;
    user-select: none;
    `;
    document.oncontextmenu = function() {return false};
    let gameBox = document.createElement("div");
    gameBox.id = "gameBox";
    gameBox.style.cssText = `
    width: 90vmin; 
    min-height: 95vmin;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: inherit;
    margin-top: 2vmin;
    `;
    gameBox.appendChild(createPanel());
    gameBox.appendChild(createField());
    document.body.appendChild(gameBox);
}

function createPanel() {
    let panel = document.createElement("div");
    panel.style.textAlign = "center";
    panel.appendChild(createSelect(SIZES));
    panel.appendChild(createButton());
    let rules = document.createElement("p");
    rules.textContent = PARAMS.rules;
    rules.id = "rules";
    rules.style.visibility = "hidden";
    panel.appendChild(rules);
    let element = document.createElement("span");
    element.id = "flag";
    element.style.color = PARAMS.colors.flag;
    element.style.fontFamily = "FontAwesome";
    element.style.visibility = "hidden";
    element.innerHTML = PARAMS.flag;
    panel.appendChild(element);
    let counter = document.createElement("span");
    counter.id = "counter";
    counter.style.visibility = "hidden";
    panel.appendChild(counter);
    return panel;
}

function createSelect(sizes) {
    let element = document.createElement("select");
    element.id = "select";
    element.style.cssText = `
    padding: 1.5vmin 2vmin;
    border: ${PARAMS.colors.fieldDark} solid 1px;
    outline: none;
    font-weight: inherit;
    box-shadow: none;
    background-color: inherit;
    `;
    sizes.forEach(el => {
        let option = document.createElement("option");
        option.text = el.name;
        element.appendChild(option);
    })
    return element;
}

function createButton() {
    let element = document.createElement("button");
    element.style.cssText = `
    margin: 0 2vmin;
    font-weight: inherit;
    padding: 1.5vmin 2vmin;
    border: ${PARAMS.colors.fieldDark} solid 1px;
    background-color: inherit;
    `;
    element.textContent = "Start";
    element.onmouseover = (evt) => {
        evt.target.style.backgroundColor = PARAMS.colors.fieldDark;
    };
    element.onmouseleave = (evt) => {
        evt.target.style.backgroundColor = PARAMS.colors.background;
    }
    element.onclick = (evt) => {
        evt.target.style.backgroundColor = PARAMS.colors.background;
        renderField();
    }
    return element;
}

function createField() {
    let field = document.createElement("div");
    field.id = "field";
    field.style.cssText = `
        background-color: inherit;
        height: 85%;
        border: ${PARAMS.colors.border};
        line-height: 10px;
        margin: 2vmin 0;
    `;
    return field;
}

function renderField() {
    document.getElementById("flag").style.visibility = "hidden";
    document.getElementById("counter").style.visibility = "hidden";
    document.getElementById("rules").style.visibility = "visible";
    let size = SIZES[document.getElementById("select").selectedIndex].size;
    let fieldArray = new Array(size * size).fill(null);
    let field = document.getElementById("field");
    field.innerHTML = "";
    fieldArray.forEach((el, i) => {
        field.appendChild(createFieldElement(i));
    })
    field.style.width = size * 5 + "vmin";
    field.onclick = (evt) => {
        setBombs(evt);
    };
    field.oncontextmenu = (evt) => {
        setFlag(evt);
    }
}

function createFieldElement(i) {
    let cell = document.createElement('span');
    cell.style.cssText = `
    display: inline-block;
    width: 2vmin;
    height: 2vmin;
    overflow: hidden;
    padding: 1.5vmin 1.5vmin;
    font-weight: 700;
    font-family: FontAwesome, Sans serif;
    background-color: ${i % 2 == 0 ? PARAMS.colors.fieldDark : PARAMS.colors.fieldLight};
    color: ${PARAMS.colors.flag};
    `;
    return cell;
}

function setBombs(evt) {
    document.getElementById("flag").style.visibility = "visible";
    document.getElementById("counter").style.visibility = "visible";
    let size = Math.sqrt(document.getElementById("field").childElementCount);

    let field = new Array(size * size).fill(null).map((_, i) => {
        let cell = {
            check: false,
            flag: false,
            bomb: Math.random() < SIZES.find(a => a.size == size).coeff,
            neighbours: [],
            x: i % size,
            y: i / size | 0
        };
        return cell; 
    });

    field[[...evt.target.parentNode.children].indexOf(evt.target)].bomb = false;
    document.getElementById("counter").textContent = field.filter(x => x.bomb).length;

    field.forEach((cell) => {
        [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]].forEach((step) => {
            let dx = cell.x + step[0];
            let dy = cell.y + step[1];
            if (dx >= 0 && dx < size && dy >= 0 && dy < size) {
                cell.neighbours.push(field[dy * size + dx]);
            }
        });
    });

    Array.from(document.getElementById("field").children).forEach((elCell, i) => {
        elCell.cell = field[i];
        elCell.cell.element = elCell; 
    }); 

    start(evt, field);

    document.getElementById("field").onclick = (event) => {
        start(event, field);
    }
}

function start(event, field) {
    if (event.target.cell.flag) {
        event.target.cell.flag = false;
        event.target.cell.element.innerHTML = "";
        document.getElementById("counter").textContent = +document.getElementById("counter").textContent + 1;
    } else if (event.target.cell.bomb) {
        field.forEach(cell => {
            if (cell.bomb) {
                cell.element.style.color = PARAMS.colors.bomb;
                cell.element.innerHTML = PARAMS.bomb;
            }
        });
        alert("Game over!");
        document.getElementById("field").onclick = () => {};
        document.getElementById("field").oncontextmenu = () => {};
    } else if (!event.target.cell.check) {
            open(event.target.cell);
    }
    if(field.every(i => i.check || i.flag || i.bomb)) {
        field.forEach(cell => {
            if (cell.bomb) {
                cell.element.style.color = PARAMS.colors.flower;
                cell.element.innerHTML = PARAMS.flower;
            }
        });
        alert("Victory!");
        document.getElementById("field").onclick = () => {};
        document.getElementById("field").oncontextmenu = () => {};
    }
}

function open(cell) {
    cell.check = true;
    cell.element.style.backgroundColor = PARAMS.colors.checked;
    let number = cell.neighbours.reduce((param, c) => param + c.bomb, 0);
    if(number > 0) {
        cell.element.textContent = number;
    } else {
        cell.neighbours.forEach(e => {
            if(!e.check) {
                open(e);
            }
        });
    }
}

function setFlag(evt) {
    let counter = document.getElementById("counter");
    if(!evt.target.cell.check && counter.textContent && !evt.target.cell.flag) {
        evt.target.cell.flag = true;
        evt.target.cell.element.innerHTML = PARAMS.flag;
        counter.textContent = counter.textContent - 1;
    }
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
