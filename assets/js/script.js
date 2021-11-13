// Start time - 9AM
const START_TIME = moment({
    hour: 9
});
// End time - 5PM
const END_TIME = moment({
    hour: 17
});

const SCHEDULE_CONTAINER = $("#schedule");
const CURRENT_DATE = $("#currentDay");

// Object to hold all the events
var events;
var cur_time = moment();

function setupSchedule() {

    CURRENT_DATE.text(moment().format("dddd, MMMM Do"));

    for(let i = 0; i < events.length; i++) {
        let row_el = $("<div>")
            .addClass("row")
            .attr('id', events[i].hour);

        let hour_el = $("<div>")
            .addClass("col-1 hour")
            // Logic setup to handle any time range from 12AM - 11PM 
            .text((events[i].hour < 12) ? ((events[i].hour != 0) ? events[i].hour + "AM" : "12AM") : (events[i].hour != 12) ? events[i].hour - 12 + "PM" : events[i].hour + "PM");

        
        let event_el = $("<textarea>")
            .addClass("col-10 description")
            .text(events[i].event);
        if (events[i].hour < cur_time.hour()) {
            event_el.addClass("past");
        } else if (events[i].hour == cur_time.hour()) {
            event_el.addClass("present");
        } else {
            event_el.addClass("future");
        }
        events[i].element = event_el;
        let save_el = $("<button>")
            .addClass("col-1 saveBtn");

        row_el.append(hour_el, event_el, save_el);

        SCHEDULE_CONTAINER.append(row_el);
    }
}

// Sets events to a default of empty
function defaultEvents() {
    let tmp = [];
    let start = START_TIME.hour();
    let end = END_TIME.hour();
    for (let i = start; i <= end; i++) {
        tmp.push({
            hour: i,
            event: ""
        });
    }
    return tmp;
}

// Gets events from localStorage or creates new events for each time
function initEvents() {
    try {
        events = JSON.parse(localStorage.getItem("events"));
        if (events == null) events = defaultEvents();
    }
    // If localStorage is unable to be parsed, reset it.
    catch {
        events = defaultEvents();
    }
    setupSchedule();
}

function checkTime() {
    cur_time = moment();
    events.forEach((event) => {
        if (event.hour < cur_time.hour()) {
            event.element.addClass("past");
            event.element.removeClass("present");
            event.element.removeClass("future");
        } else if (event.hour == cur_time.hour()) {
            event.element.addClass("present");
            event.element.removeClass("past");
            event.element.removeClass("future");
        } else {
            event.element.addClass("future");
            event.element.removeClass("past");
            event.element.removeClass("present");
        }
    });
}

// Load and set events
initEvents();
// Start timer to check time every minute
setInterval(checkTime, 1000 * 60);