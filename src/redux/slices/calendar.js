import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  events: [
    // '#00AB55', // theme.palette.primary.main,
    // '#1890FF', // theme.palette.info.main,
    // '#54D62C', // theme.palette.success.main,
    // '#FFC107', // theme.palette.warning.main,
    // '#FF4842', // theme.palette.error.main
    // '#04297A', // theme.palette.info.darker
    // '#7A0C2E', // theme.palette.error.darker
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
      allDay: true,
      textColor: '#FF4842',
      description: 'Mahatma Gandhi Jayanti (Holiday)',
      start: '2022-10-01T18:30:00.000Z',
      end: '2022-10-02T18:30:00.000Z',
      title: 'Mahatma Gandhi Jayanti',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
      allDay: true,
      textColor: '#FF4842',
      description: 'Dasara (Holiday)',
      start: '2022-10-04T18:30:00.000Z',
      end: '2022-10-05T18:30:00.000Z',
      title: 'Dasara (Holiday)',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
      allDay: false,
      textColor: '#54D62C',
      description: 'Navratri celebration',
      start: '2022-10-04T08:00:11.290Z',
      end: '2022-10-04T12:00:11.290Z',
      title: 'Navratri celebration',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
      allDay: false,
      textColor: '#FFC107',
      description: 'Term Test-II & Academic Review (TE & BE)',
      start: '2022-10-15T05:15:11.290Z',
      end: '2022-10-18T05:30:11.290Z',
      title: 'Term Test-II & Academic Review (TE & BE)',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7z6',
      allDay: false,
      textColor: '#FFC107',
      description: 'Term Test-II & Academic Review (SE & TE Honour / Minor)',
      start: '2022-10-19T05:15:11.290Z',
      end: '2022-10-21T05:30:11.290Z',
      title: 'Term Test-II & Academic Review (SE & TE Honour / Minor)',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
      allDay: true,
      textColor: '#FF4842',
      description: 'Diwali (Holiday)',
      start: '2022-10-24T16:59:59.999Z',
      end: '2022-10-29T17:00:00.000Z',
      title: 'Diwali (Holiday)',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
      allDay: false,
      textColor: '#7A0C2E',
      description: '3rd Defaulter List (SE/TE/BE)',
      start: '2022-10-14T07:45:11.290Z',
      end: '2022-10-14T07:50:11.290Z',
      title: '3rd Defaulter List (SE/TE/BE)',
    },
  ],
  isOpenModal: false,
  selectedEventId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET EVENTS
    getEventsSuccess(state, action) {
      state.isLoading = false;
      state.events = action.payload;
    },

    // CREATE EVENT
    createEventSuccess(state, action) {
      const newEvent = action.payload;
      state.isLoading = false;
      state.events = [...state.events, newEvent];
    },

    // UPDATE EVENT
    updateEventSuccess(state, action) {
      const event = action.payload;
      const updateEvent = state.events.map((_event) => {
        if (_event.id === event.id) {
          return event;
        }
        return _event;
      });

      state.isLoading = false;
      state.events = updateEvent;
    },

    // DELETE EVENT
    deleteEventSuccess(state, action) {
      const { eventId } = action.payload;
      const deleteEvent = state.events.filter((event) => event.id !== eventId);
      state.events = deleteEvent;
    },

    // SELECT EVENT
    selectEvent(state, action) {
      const eventId = action.payload;
      state.isOpenModal = true;
      state.selectedEventId = eventId;
    },

    // SELECT RANGE
    selectRange(state, action) {
      const { start, end } = action.payload;
      state.isOpenModal = true;
      state.selectedRange = { start, end };
    },

    // OPEN MODAL
    openModal(state) {
      state.isOpenModal = true;
    },

    // CLOSE MODAL
    closeModal(state) {
      state.isOpenModal = false;
      state.selectedEventId = null;
      state.selectedRange = null;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { openModal, closeModal, selectEvent } = slice.actions;

// ----------------------------------------------------------------------

export function getEvents() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/calendar/events');
      dispatch(slice.actions.getEventsSuccess(response.data.events));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createEvent(newEvent) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/events/new', newEvent);
      dispatch(slice.actions.createEventSuccess(response.data.event));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateEvent(eventId, updateEvent) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/events/update', {
        eventId,
        updateEvent,
      });
      dispatch(slice.actions.updateEventSuccess(response.data.event));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteEvent(eventId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/calendar/events/delete', { eventId });
      dispatch(slice.actions.deleteEventSuccess({ eventId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function selectRange(start, end) {
  return async () => {
    dispatch(
      slice.actions.selectRange({
        start: start.getTime(),
        end: end.getTime(),
      })
    );
  };
}
