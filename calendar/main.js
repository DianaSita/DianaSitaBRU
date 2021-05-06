import {create, insertDay, getDisplayedMonth, getDisplayedYear} from "./rendering.js"
import {HOLIDAYS, MONTHS, DAYS} from "./config.js"

create();

update(getDisplayedMonth(), getDisplayedYear());

function update(month, year) {
    let days = [];
    let row = 1;
    let currentDate = new Date();
    let date = new Date(year, month, 1);
    do {
        let dayOfWeek = date.getDay();
        let day = {
            number: date.getDate(),
            i: DAYS.find(x => x.id === dayOfWeek).orderNumber,
            j: row,
            isWeekend: DAYS.find(x => x.id === dayOfWeek).isWeekend,
            isHoliday: HOLIDAYS.some(x => x.month - 1 === month && x.day === date.getDate()),
        };
        if (date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDate() == currentDate.getDate())
        {
            day['isToday'] = true;
        }
        days.push(day);
        if (DAYS.find(x => x.id === dayOfWeek).orderNumber === 7) {
            row++;
        }
        date.setDate(date.getDate() + 1);
    } while (date.getMonth() === month);
    let container = document.getElementById("days-container");
    container.innerHTML = "";
    days.forEach(day => container.appendChild(insertDay(day)));
}

document.getElementById("arrow-left").onclick = () => {
    let date = new Date(getDisplayedYear(), getDisplayedMonth(), 1);
    if(date.getMonth === 0) {
        date.setMonth(11);
        date.setFullYear(date.getFullYear - 1);
    } else {
        date.setMonth(date.getMonth() - 1);
    }
    document.getElementById("head-year").textContent = date.getFullYear();
    document.getElementById("head-month").textContent = MONTHS[date.getMonth()];
    update(date.getMonth(), date.getFullYear());
}

document.getElementById("arrow-right").onclick = () => {
    let date = new Date(getDisplayedYear(), getDisplayedMonth(), 1);
    if(date.getMonth === 11) {
        date.setMonth(0);
        date.setFullYear(date.getFullYear + 1);
    } else {
        date.setMonth(date.getMonth() + 1);
    }
    document.getElementById("head-year").textContent = date.getFullYear();
    document.getElementById("head-month").textContent = MONTHS[date.getMonth()];
    update(date.getMonth(), date.getFullYear());
}
