import React from 'react';

import './loading.css'

function Loading(props) {
  return (
    <div className="spinner spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loading;
