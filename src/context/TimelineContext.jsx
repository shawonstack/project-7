import { createContext, useContext, useState } from 'react';

const TimelineContext = createContext(null);

const initialEntries = [
  {
    id: 1,
    type: 'meetup',
    friendName: 'Tom Riper',
    date: new Date('2026-03-28'),
  },
  {
    id: 2,
    type: 'text',
    friendName: 'Sarah Chen',
    date: new Date('2026-03-28'),
  },
  {
    id: 3,
    type: 'meetup',
    friendName: 'Olivia Martinez',
    date: new Date('2026-03-26'),
  },
  {
    id: 4,
    type: 'video',
    friendName: 'Asna Patel',
    date: new Date('2026-03-23'),
  },
  {
    id: 5,
    type: 'meetup',
    friendName: 'Sarah Chen',
    date: new Date('2026-03-21'),
  },
  {
    id: 6,
    type: 'call',
    friendName: 'Marcus Johnson',
    date: new Date('2026-03-18'),
  },
  {
    id: 7,
    type: 'meetup',
    friendName: 'Asna Patel',
    date: new Date('2026-03-17'),
  },
  {
    id: 8,
    type: 'text',
    friendName: 'Olivia Martinez',
    date: new Date('2026-03-15'),
  },
  {
    id: 9,
    type: 'call',
    friendName: 'Lisa Nakamura',
    date: new Date('2026-03-15'),
  },
  {
    id: 10,
    type: 'call',
    friendName: 'Sarah Chen',
    date: new Date('2026-03-11'),
  },
  {
    id: 11,
    type: 'call',
    friendName: 'Marcus Johnson',
    date: new Date('2026-03-08'),
  },
  {
    id: 12,
    type: 'video',
    friendName: "Asna O'Brian",
    date: new Date('2026-02-24'),
  },
];

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState(initialEntries);

  const addEntry = (type, friendName) => {
    const newEntry = {
      id: Date.now(),
      type,
      friendName,
      date: new Date(),
    };
    setEntries(prev => [newEntry, ...prev]);
  };

  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  return useContext(TimelineContext);
}
