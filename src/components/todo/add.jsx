import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/loading';

import { addMissionAction, addMissionSuccessAction } from '../../store/todo/action';

function Add(props) {
  const dispatch = useDispatch();
  const isLoadingAdd = useSelector((state) => state.todoReducer.isLoadingAdd);

  const [mission, setMission] = useState('');

  const onChange = (e) => {
    setMission(e.target.value);
  };

  const onAddMission = () => {
    dispatch(addMissionAction());

    setTimeout(() => {
      dispatch(addMissionSuccessAction(mission))
  
      setMission('');
    }, 100)
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13 && mission && !isLoadingAdd) {
      onAddMission()
    }
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Type your mission..."
        value={mission}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={isLoadingAdd}
      />

      <div className="input-group-append">
        <button className="btn btn-outline-primary d-flex justify-content-center align-items-center" type="button" onClick={onAddMission} disabled={!mission || isLoadingAdd}>
          {
            isLoadingAdd ? <Loading /> : <i className="fa-solid fa-plus" />
          }
        </button>
      </div>
    </div>
  );
}

export default Add;
