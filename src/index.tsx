import React, {useCallback, useRef} from "react";
// import moment from 'react-moment'
import {render} from "react-dom";

import Calendar from "@toast-ui/react-calendar";
import {ISchedule, ICalendarInfo} from "tui-calendar";

import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

import "./styles.css";

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
const schedules: ISchedule[] = [
    {
        calendarId: "1",
        category: "time",
        isVisible: true,
        title: "Shivaji Nagar Meeting",
        id: "1",
        body: "Test",
        start: new Date(new Date().setHours(start.getHours() + 2)),
        end: new Date(new Date().setHours(start.getHours() + 4))
    },
    {
        calendarId: "2",
        category: "time",
        isVisible: true,
        title: "Powai Meeting",
        id: "2",
        body: "Description",
        start: new Date(new Date().setHours(start.getHours() + 1)),
        end: new Date(new Date().setHours(start.getHours() + 2))
    },
    {
        calendarId: "3",
        category: "time",
        isVisible: true,
        title: "Airoli Meeting",
        id: "1",
        body: "Description",
        start: new Date(new Date().setHours(start.getHours() - 2)),
        end
    },
    {
        calendarId: "4",
        category: "time",
        isVisible: true,
        title: "Hinjewadi Meeting",
        id: "2",
        body: "Description",
        start: new Date(new Date().setHours(new Date().getHours() + 22)),
        end: new Date(new Date().setHours(new Date().getHours() + 28))
    },
    {
        calendarId: "5",
        category: "time",
        isVisible: true,
        title: "Andheri Meeting",
        id: "1",
        body: "Description",
        start: new Date(new Date().setHours(new Date().getHours() + 55)),
        end: new Date(new Date().setHours(new Date().getHours() + 58))
    },
    {
        calendarId: "5",
        category: "time",
        isVisible: true,
        title: "Andheri Meeting",
        id: "1",
        body: "Description",
        start: new Date(new Date().setHours(new Date().getHours() + 20)),
        end: new Date(new Date().setHours(new Date().getHours() + 22))
    },
    {
        calendarId: "5",
        category: "time",
        isVisible: true,
        title: "Andheri Meeting",
        id: "2",
        body: "Description",
        start: new Date(new Date().setHours(new Date().getHours() + 15)),
        end: new Date(new Date().setHours(new Date().getHours() + 18))
    }
];

const myTheme = {
    // Theme object to extends default dark theme.
};

const calendars: ICalendarInfo[] = [
    {
        id: "1",
        name: "Mumbai Office",
        color: "#ffffff",
        bgColor: "#9e5fff",
        dragBgColor: "#9e5fff",
        borderColor: "#9e5fff"
    },
    {
        id: "2",
        name: "Pune Office",
        color: "#ffffff",
        bgColor: "#00a9ff",
        dragBgColor: "#00a9ff",
        borderColor: "#00a9ff"
    },
];

function App() {

    const refCalendar = useRef(null);

    const onClickSchedule = useCallback(e => {
        console.log(e);
    }, []);

    const onBeforeCreateSchedule = useCallback(scheduleData => {
        console.log(scheduleData);

        const schedule = {
            id: String(Math.random()),
            title: scheduleData.title,
            isAllDay: scheduleData.isAllDay,
            start: scheduleData.start,
            end: scheduleData.end,
            category: scheduleData.isAllDay ? "allday" : "time",
            dueDateClass: "",
            location: scheduleData.location,
            raw: {
                class: scheduleData.raw["class"]
            },
            state: scheduleData.state
        };

        refCalendar.current.calendarInst.createSchedules([schedule]);
    }, []);

    const onBeforeDeleteSchedule = useCallback(res => {
        console.log(res);

        const {id, calendarId} = res.schedule;

        refCalendar.current.calendarInst.deleteSchedule(id, calendarId);
    }, []);

    const onBeforeUpdateSchedule = useCallback(e => {
        console.log(e);

        const {schedule, changes} = e;

        refCalendar.current.calendarInst.updateSchedule(
            schedule.id,
            schedule.calendarId,
            changes
        );
    }, []);

    function _getFormattedTime(time) {
        const date = new Date(time);
        const h = date.getHours();
        const m = date.getMinutes();

        return `${h}:${m}`;
    }

    function _getTimeTemplate(schedule, isAllDay) {
        var html = [];

        if (!isAllDay) {
            html.push("<strong>" + _getFormattedTime(schedule.start) + "</strong> ");
        }
        if (schedule.isPrivate) {
            html.push('<span class="calendar-font-icon ic-lock-b"></span>');
            html.push(" Private");
        } else {
            if (schedule.isReadOnly) {
                html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
            } else if (schedule.recurrenceRule) {
                html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
            } else if (schedule.attendees.length) {
                html.push('<span class="calendar-font-icon ic-user-b"></span>');
            } else if (schedule.location) {
                html.push('<span class="calendar-font-icon ic-location-b"></span>');
            }
            html.push(" " + schedule.title);
        }

        return html.join("");
    }

    const templates = {
        time: function (schedule) {
            console.log(schedule);
            return _getTimeTemplate(schedule, false);
        }
    };

    return (
        <div className="App">
            <h1>L&T Scheduler | Amit Bidkar</h1>

            <Calendar
                ref={refCalendar}
                defaultView='day' // daily view option
                height="1000px"
                useCreationPopup={true}
                useDetailPopup={true}
                template={templates}
                calendars={calendars}
                schedules={schedules}
                onClickSchedule={onClickSchedule}
                onBeforeCreateSchedule={onBeforeCreateSchedule}
                onBeforeDeleteSchedule={onBeforeDeleteSchedule}
                onBeforeUpdateSchedule={onBeforeUpdateSchedule}
                // view={selectedView}
            />
        </div>
    );
}

const rootElement = document.getElementById("root");
render(<App/>, rootElement);
