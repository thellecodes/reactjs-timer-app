import React, { useState, memo, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components'
import { useCountdown } from "../hooks/useCountDown";

function Progress({ timerMin, dateWithMins, animationDuration, stopTimer }) {

  const [days, hours, minutes, seconds] = useCountdown(dateWithMins, timerMin);

  const customMinute = Math.abs(minutes) > 10 ? Math.abs(minutes) : `0${Math.abs(minutes)}`;
  const customSeconds = Math.abs(seconds) > 10 ? Math.abs(seconds) : `0${Math.abs(seconds)}`;

  // Clear Intervals and rest time
  useEffect(() => {
    if ((days + hours + minutes + seconds) <= 0) {
      var interval_id = window.setInterval(() => { }, 99999);
      for (var i = 0; i < interval_id; i++)
        window.clearInterval(i);
      stopTimer();
    }
  }, [minutes, seconds])

  return (
    <div className="pg-container">
      {/* <div className="pg-widget">
        <div className="pg-widget-inner"></div>

        <div className="pg-widget-number">
          {timerMin > 0 ? customMinute : "00"}:{timerMin > 0 ? customSeconds : "00"}
        </div>

        <div className="circle">
          <div className="bar left">
            <div className="progress"></div>
          </div>


          <div className="bar right">
            <div className="progress"></div>
          </div>
        </div>
      </div> */}

      <Pgwidget>
        <PgWidgetInner />
        <PgwidgetNumber>
          {timerMin > 0 ? (customMinute) : "00"}:{timerMin > 0 ? (customSeconds) : "00"}
        </PgwidgetNumber>

        <Circle>
          <PgwidgetBarL>
            <PgwidgetProgressLeft {...{ animationDuration, timerMin }} />
          </PgwidgetBarL>

          <PgwidgetBarR>
            <PgwidgetProgressRight {...{ animationDuration, timerMin }} />
          </PgwidgetBarR>
        </Circle>
      </Pgwidget>
    </div>
  )
}

export default Progress;

const left = keyframes`100% { transform: rotate(180deg) }`;
const right = keyframes`100% { transform: rotate(180deg) }`;

const Pgwidget = styled.div`
    height: 194px;
    width: 194px;
    border-radius: 50%;
    position: relative;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
`;

const PgWidgetInner = styled.div`
    position: absolute;
    width: 174px;
    height: 174px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    background-color: var(--default-color);
    z-index: 6;
`;

const PgwidgetNumber = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    font-size: 1.8rem;
    font-weight: 500;
    color: var(--white-col);
    font-family: "Rubik", sans-serif;
`;

const Circle = styled.div``;

const PgwidgetBarL = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    clip: rect(0px, 194px, 194px, 97px);
    border-radius: 100%;
    z-index: 1;
`;

const PgwidgetBarR = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    clip: rect(0px, 194px, 194px, 97px);
    border-radius: 100%;
    z-index: 1;
    transform: rotate(180deg)
`;

const PgwidgetProgressLeft = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background: #fff;
    clip: rect(0px, 97px, 194px, 0px);
    border-radius: 100%;
    // animation: ${left} 10s linear both;
    animation: ${props => (props.timerMin > 0 ? css`${left} ${props.animationDuration}s linear both` : '')} ;
  `;

const PgwidgetProgressRight = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    background: #fff;
    clip: rect(0px, 97px, 194px, 0px);
    border-radius: 100%;
    animation: ${props => (props.timerMin > 0 ? css`${right} ${props.animationDuration}s linear both` : '')} ;
    animation-delay: ${props => (props.timerMin > 0 ? css`${props.animationDuration}s ` : '')} ;
  `;