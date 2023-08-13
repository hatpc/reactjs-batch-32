import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteMissionAction,
  deleteMissionSuccessAction,
  updateMissionAction,
  updateMissionSuccessAction,
  selectMissionToDeleteAction,
} from '../../store/todo/action';

import Loading from '../loading';

function List() {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.todoReducer.missions);
  const selectedMission = useSelector((state) => state.todoReducer.selectedMission);

  const handleDeleteMultiMission = () => {
    selectedMission?.forEach(item => {
      dispatch(deleteMissionAction(item));

      setTimeout(() => {
        dispatch(deleteMissionSuccessAction(item));
      }, 2000);
    })
  }

  return missions?.length > 0 ? (
    <>
    {    
      missions.map((m) => <>
        <ListItem key={m.id} content={m.name} id={m.id} />
      </>)
    }
    <div className='text-center'>
      <button
      onClick={handleDeleteMultiMission}
      className='btn btn-danger'>
        Delete
        </button>
    </div>
    </>

  ) : (
    <>
      <ListItem
        classes="text-danger"
        content="Không có nhiệm vụ"
        isHiddenButton
      />
    </>
  );
}

export default List;

function ListItem({ id, content, classes, isHiddenButton = false }) {
  const [mission, setMission] = useState('');

  const dispatch = useDispatch();
  const loadingDelete = useSelector((state) => state.todoReducer.loadingDelete);
  const loadingUpdate = useSelector((state) => state.todoReducer.loadingUpdate);

  const onDeleteMission = () => {
    dispatch(deleteMissionAction(id));

    setTimeout(() => {
      dispatch(deleteMissionSuccessAction(id));
    }, 2000);
  };

  const onChangeMission = (e) => {
    setMission(e.target.value);
  };

  const onUpdateMission = () => {
    dispatch(updateMissionAction(id));

    setTimeout(() => {
      dispatch(updateMissionSuccessAction({ id, mission }));
    }, 1000);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13 && mission) {
      onUpdateMission();
    }
  };

  const onSelectMission = (e, selectedId) => {
    const {checked} = e?.target || {};
  
    if (checked) {
      dispatch(selectMissionToDeleteAction(selectedId));
    }
  };

  useEffect(() => {
    setMission(content);
  }, [content]);

  return (
    <div className="input-group mb-3">
      {!isHiddenButton > 0 ? <input type="checkbox" className='mr-2' onChange={(e)=>onSelectMission(e, id)} /> : ''}
      
      <input
        type="text"
        className={`form-control ${classes}`}
        placeholder="Nhiệm vụ 1"
        value={mission}
        onChange={onChangeMission}
        onKeyDown={onKeyDown}
      />

      {!isHiddenButton && (
        <div className="input-group-append">
          <button
            className="btn btn-outline-danger"
            type="button"
            disabled={loadingDelete.includes(id)}
            onClick={onDeleteMission}
          >
            {loadingDelete.includes(id) ? (
              <Loading />
            ) : (
              <i className="fa-solid fa-trash" />
            )}
          </button>

          <button
            className="btn btn-outline-info"
            type="button"
            disabled={loadingUpdate.includes(id)}
            onClick={onUpdateMission}
          >
            {loadingUpdate.includes(id) ? (
              <Loading />
            ) : (
              <i className="fas fa-edit" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
