import React from 'react';
import { useState } from 'react';
import { Transition } from 'react-transition-group';

function Card(props) {
  return (
    <div className="card" >
      <div
        onClick={props.onClick}
        className={props.cardStyle}
      >
      </div>
    </div>
  );
}
