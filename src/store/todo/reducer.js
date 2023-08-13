import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
  missions: [],
  isLoadingAdd: false,
  loadingDelete: [],
  loadingUpdate: [],
  selectedMission: [],
};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MISSION: {
      return { ...state, isLoadingAdd: true };
    }

    case ActionTypes.ADD_MISSION_SUCCESS: {
      const newData = [
        ...state.missions,
        {
          id: Math.floor(Date.now()),
          name: action.payload,
        }
      ];

      return { ...state, missions: newData, isLoadingAdd: false };
    }

    case ActionTypes.ADD_MISSION_FAILED: {
      return { ...state, isLoadingAdd: false };
    }

    case ActionTypes.UPDATE_MISSION: {
      return { ...state, loadingUpdate: [...state.loadingUpdate, action.payload] };
    }

    case ActionTypes.UPDATE_MISSION_SUCCESS: {
      const newData = state.missions.map((item) => {
        if (item.id !== action.payload.id) {
          return { ...item, mission: action.payload.mission };
        }

        return item;
      });

      const newLoading = state.loadingUpdate.filter((item) => item !== action.payload.id);

      return { ...state, missions: newData, loadingUpdate: newLoading };
    }

    // CHƯA COVER TRƯỜNG HỢP NÀY
    case ActionTypes.UPDATE_MISSION_FAILED: {
      const newLoading = state.loadingUpdate.filter((item) => item !== action.payload.id);
      return { ...state, loadingUpdate: newLoading };
    }

    case ActionTypes.DELETE_MISSION: {
      return { ...state, loadingDelete: [...state.loadingDelete, action.payload] };
    }

    case ActionTypes.DELETE_MISSION_SUCCESS: {
      const newData = state.missions.filter((item) => item.id !== action.payload);
      const newLoading = state.loadingDelete.filter((item) => item !== action.payload);

      return { ...state, missions: newData, loadingDelete: newLoading };
    }

    // CHƯA COVER TRƯỜNG HỢP NÀY
    case ActionTypes.DELETE_MISSION_FAILED: {
      return { ...state };
    }

    case ActionTypes.SELECT_MISSION_TO_DELETE: {
      return { ...state, selectedMission: [...state.selectedMission, action.payload] };
    }

    default:
      return state;
  }
};

export default todoReducer;

// Notes:
// Object.assign method
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

// Spread syntax:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
