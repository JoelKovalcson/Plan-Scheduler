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


function setupSchedule() {

    CURRENT_DATE.text(moment().format("dddd, MMMM Do"));

    events.forEach(element => {
        let row_el = $("<div>")
            .addClass("row")
            .attr('id', element.hour);

        let hour_el = $("<div>")
            .addClass("col-1 hour")
            // Logic setup to handle any time range from 12AM - 11PM 
            .text((element.hour < 12) ? ((element.hour != 0) ? element.hour + "AM" : "12AM") : (element.hour != 12) ? element.hour - 12 + "PM" : element.hour + "PM");

        let event_el = $("<textarea>")
            .addClass("col-10 past description")
            .text(element.event);

        let save_el = $("<button>")
            .addClass("col-1 saveBtn");

        row_el.append(hour_el, event_el, save_el);

        SCHEDULE_CONTAINER.append(row_el);
    });
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

initEvents();