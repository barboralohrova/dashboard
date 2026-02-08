import React, { useState, useEffect } from 'react';
import { useCalendarStore } from '../../stores/calendarStore';
import { CalendarEventCard } from './CalendarEventCard';
import { CalendarEventForm } from './CalendarEventForm';
import { Button } from '../ui';

const DAYS_OF_WEEK = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];

export const CalendarView: React.FC = () => {
  const { events, selectedDate, setSelectedDate, getEventsForDate, getEventsForMonth, isLoading, deleteEvent } = useCalendarStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const monthEvents = getEventsForMonth(currentYear, currentMonth);
  const selectedDateEvents = getEventsForDate(selectedDate);
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    // Convert Sunday (0) to 7, and shift Monday to be 1
    return day === 0 ? 6 : day - 1;
  };
  
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const handleDayClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
  };
  
  const getEventsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => {
      const eventStart = event.datum_zacatek.split('T')[0];
      const eventEnd = event.datum_konec.split('T')[0];
      return dateStr >= eventStart && dateStr <= eventEnd;
    });
  };
  
  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };
  
  const isSelectedDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return dateStr === selectedDate;
  };
  
  const monthNames = [
    'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
  ];
  
  const handleAddEvent = async (eventData: any) => {
    try {
      await useCalendarStore.getState().addEvent(eventData);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to add event:', error);
      alert('Nepodařilo se vytvořit událost. Zkuste to prosím znovu.');
    }
  };
  
  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id);
    } catch (error) {
      console.error('Failed to delete event:', error);
      alert('Nepodařilo se smazat událost. Zkuste to prosím znovu.');
    }
  };
  
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-xl text-gray-600">Načítám kalendář...</p>
        </div>
      </div>
    );
  }
  
  const calendarDays = generateCalendarDays();
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-matcha-dark">📅 Kalendář</h2>
        <Button onClick={() => setIsFormOpen(true)} variant="primary">
          + Nová událost
        </Button>
      </div>
      
      {/* Month navigation */}
      <div className="bg-white rounded-kawaii shadow-md p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePreviousMonth}
            className="px-4 py-2 text-matcha-dark hover:bg-matcha-light rounded-kawaii transition-colors"
          >
            ← Předchozí
          </button>
          <h3 className="text-xl font-bold text-matcha-dark">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button
            onClick={handleNextMonth}
            className="px-4 py-2 text-matcha-dark hover:bg-matcha-light rounded-kawaii transition-colors"
          >
            Další →
          </button>
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="text-center font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }
            
            const dayEvents = getEventsForDay(day);
            const isTodayDay = isToday(day);
            const isSelected = isSelectedDay(day);
            
            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={`aspect-square p-1 rounded-kawaii border-2 transition-all hover:shadow-md ${
                  isTodayDay
                    ? 'border-matcha-dark bg-matcha-light'
                    : isSelected
                    ? 'border-matcha-dark bg-warm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-sm font-semibold mb-1">{day}</div>
                {dayEvents.length > 0 && (
                  <div className="flex justify-center">
                    <span className="text-xs px-1 bg-matcha-dark text-white rounded-full">
                      {dayEvents.length}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Events for selected date */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Události pro {selectedDate}
        </h3>
        
        {selectedDateEvents.length > 0 ? (
          <div className="space-y-3">
            {selectedDateEvents.map((event) => (
              <CalendarEventCard
                key={event.id}
                event={event}
                onDelete={handleDeleteEvent}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-kawaii">
            <p className="text-gray-500">Žádné události pro tento den</p>
          </div>
        )}
      </div>
      
      {/* Calendar Event Form Modal */}
      <CalendarEventForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddEvent}
        defaultDate={selectedDate}
      />
    </div>
  );
};
