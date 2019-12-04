/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
// TODO - add other action types
export const ADD_TAG = createActionName('ADD_TAG');
export const REMOVE_TAG = createActionName('REMOVE_TAG');
export const CHANGE_DURATION = createActionName('CHANGE_DURATION');
// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
// TODO - add other action creators
export const addTag = payload => ({ payload, type: ADD_TAG });
export const removeTag = payload => ({ payload, type: REMOVE_TAG });
export const changeDuration = payload => ({ payload, type: CHANGE_DURATION });
// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    // TODO - handle other action types
    case ADD_TAG:
      return {
        ...statePart,
        tags: [...statePart.tags, action.payload],
      };
    case REMOVE_TAG:

      // eslint-disable-next-line no-case-declarations
      const index = statePart.tags.indexOf(action.payload);
      return {
        ...statePart,
        tags: [
          ...statePart.tags.slice(0, index),
          ...statePart.tags.slice(index + 1),
        ],
      };
    case CHANGE_DURATION:
      return {
        ...statePart,
        duration: {
          ...statePart.duration,
          ...action.payload,
        },
      };
    default:
      return statePart;
  }
}



