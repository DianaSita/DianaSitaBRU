import {create, insertDay, getDisplayedMonth, getDisplayedYear} from "./rendering.js"
import {HOLIDAYS, DAYS, ISPREVANDNEXTDATESHOW} from "./config.js"

create();

update(getDisplayedMonth(), getDisplayedYear());

function update(month, year) {
    let days = [];
    let row = 1;
    let currentDate = new Date();
    let date = new Date(year, month, 1);
    if(ISPREVANDNEXTDATESHOW) {
        date.setDate(-DAYS.find(x => x.id === date.getDay()).orderNumber + 2);
    }
    do {
        let dayOfWeek = date.getDay();
        let day = {
            number: date.getDate(),
            i: DAYS.find(x => x.id === dayOfWeek).orderNumber,
            j: row,
            isWeekend: DAYS.find(x => x.id === dayOfWeek).isWeekend,
            isHoliday: HOLIDAYS.some(x => x.month - 1 == date.getMonth() && x.day == date.getDate()),
            isPrevOrNext: date.getMonth() < month || date.getMonth() > month,
        };
        if (date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && date.getDate() == currentDate.getDate())
        {
            day["isToday"] = true;
        }
        days.push(day);
        if (DAYS.find(x => x.id === dayOfWeek).orderNumber === 7) {
            row++;
        }
        date.setDate(date.getDate() + 1);
        if(ISPREVANDNEXTDATESHOW) {
            if((date.getMonth() > month || date.getFullYear() != year) && (DAYS.find(x => x.id === date.getDay()).orderNumber === 1)){
                break;
            }
        } else if(date.getMonth() !== month){
            break;
        }
    } while (true);
    let container = document.getElementById("days-container");
    container.innerHTML = "";
    days.forEach(day => container.appendChild(insertDay(day)));
}

document.getElementById("arrow-left").onclick = () => {
    let date = new Date(getDisplayedYear(), getDisplayedMonth() - 1, 1);
    document.getElementById("head-year").value = date.getFullYear();
    document.getElementById("head-month").selectedIndex = date.getMonth();
    update(date.getMonth(), date.getFullYear());
}

document.getElementById("arrow-right").onclick = () => {
    let date = new Date(getDisplayedYear(), getDisplayedMonth() + 1, 1);
    document.getElementById("head-year").value = date.getFullYear();
    document.getElementById("head-month").selectedIndex = date.getMonth();
    update(date.getMonth(), date.getFullYear());
}

document.getElementById("head-year").onblur = () => {
    if (getDisplayedYear() < 1900 || getDisplayedYear() > 3000) {
        document.getElementById("head-year").value = (new Date().getFullYear());
    }
    update(getDisplayedMonth(), getDisplayedYear());
}

document.getElementById("head-month").onchange = () => {
    update(getDisplayedMonth(), getDisplayedYear());
}
