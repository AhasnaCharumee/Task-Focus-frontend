import React, { useCallback, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getCalendarEvents } from '../../services/taskService';
import type { CalendarEvent } from '../../services/taskService';
import styles from './Calendar.module.css';

export default function CalendarPage() {
  const calendarRef = useRef<any>(null);

  useEffect(() => {
    const handler = () => {
      try {
        calendarRef.current?.getApi()?.refetchEvents();
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('tasks:changed', handler as EventListener);
    return () => window.removeEventListener('tasks:changed', handler as EventListener);
  }, []);
  // FullCalendar will call this to fetch events for the visible range
  const fetchEvents = useCallback(async (fetchInfo: { startStr: string; endStr: string }, successCallback: (events: any) => void) => {
    try {
      const eventsResp = await getCalendarEvents(fetchInfo.startStr, fetchInfo.endStr);
      // backend may return an array or an object { events: [...] } — handle both
      let eventsArray: any = [];
      if (Array.isArray(eventsResp)) eventsArray = eventsResp;
      else if (eventsResp && Array.isArray((eventsResp as any).events)) eventsArray = (eventsResp as any).events;
      else if (eventsResp && Array.isArray((eventsResp as any).data)) eventsArray = (eventsResp as any).data;
      else {
        console.warn('Unexpected calendar response shape', eventsResp);
        eventsArray = [];
      }

      // Map backend event shape to FullCalendar event objects
      const fc = eventsArray.map((e: CalendarEvent) => ({
        id: e.id,
        title: e.title,
        start: e.start,
        end: e.end,
        allDay: !!e.allDay,
        extendedProps: { labels: e.labels, isTemplate: e.isTemplate },
      }));
      successCallback(fc);
    } catch (err) {
      console.error('Failed to load calendar events', err);
      successCallback([]);
    }
  }, []);

  const handleEventClick = () => {
    // Disabled: clicking events no longer opens iCal download
  };

  return (
    <div className={styles.calendarPage}>
      <div className={styles.calendarHeader}>
        <h2 className={styles.calendarTitle}>📅 Calendar</h2>
      </div>
      <div className={styles.calendarContainer}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
          events={(fetchInfo, successCallback) => fetchEvents(fetchInfo as any, successCallback as any)}
          eventClick={handleEventClick}
          height={600}
        />
      </div>
    </div>
  );
}
