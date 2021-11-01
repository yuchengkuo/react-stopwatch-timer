import { ControlButton, PillButton } from 'components/Buttons';
import { CheckIcon, CloseIcon, PauseIcon, StartIcon } from 'components/Icons';
import { useEffect } from 'react';
import { styled } from 'stitches.config';
import { useTimer, useTimerAmount } from 'utils/useTimer';
import { TimerInput } from './TimerInput';
import { TimerTimeDisplay } from './TimerTimeDisplay';

export const TimerItem = ({ id }) => {
  const { removeTimer } = useTimerAmount();
  const {
    startTimer,
    stopTimer,
    updateTimer,
    reset,
    resetCompleted,
    timerData,
    percentage,
    isActive,
    isPaused,
    isCompleted,
  } = useTimer(id);
  return (
    <>
      <TimerItemWrap>
        {isActive || isPaused || isCompleted ? (
          <TimerTimeDisplay id={id} timerData={timerData} updateTimer={updateTimer} />
        ) : (
          <TimerInput id={id} />
        )}
        <ControlWrap>
          <ControlButton
            type={isActive ? 'active' : 'default'}
            onClick={isCompleted ? resetCompleted : isActive ? stopTimer : startTimer}
            css={{ width: 96, backgroundColor: '$blue4', '@phone': { width: 64 } }}
          >
            {isCompleted ? <CheckIcon /> : isActive ? <PauseIcon /> : <StartIcon />}
            <Progress percentage={percentage} id={id} />
          </ControlButton>
        </ControlWrap>
        <PillButton onClick={reset} css={{ position: 'absolute', right: 12, bottom: 12 }}>
          Reset
        </PillButton>
        {id !== 0 && (
          <PillButton
            onClick={() => {
              reset();
              removeTimer(id);
            }}
            css={{ position: 'absolute', right: 12, top: 12, p: 8 }}
          >
            <CloseIcon />
          </PillButton>
        )}
      </TimerItemWrap>
    </>
  );
};

const TimerItemWrap = styled('div', {
  boxSizing: 'border-box',
  backgroundColor: '$blue2',
  border: 'solid 1px $blue4',
  borderRadius: 8,
  p: 32,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  height: 240,
  mt: 12,
  mb: 36,
  '@phone': {
    p: 12,
    height: 200,
  },
});

const ControlWrap = styled('div', {
  boxSizing: 'border-box',
  button: {
    position: 'relative',
  },
});

const Svg = styled('svg', {
  position: 'absolute',
  top: -1,
  left: -1,
  transform: 'rotate(-90deg)',
  '@phone': {
    width: 64,
    height: 64,
  },
});

function Progress({ percentage, id }) {
  useEffect(() => {
    const circle = document.querySelector(`.progress-${id}`) as SVGCircleElement;
    const length = circle.r.baseVal.value * 2 * Math.PI;
    circle.style.strokeDasharray = `${length} ${length}`;
    circle.style.strokeDashoffset = String(length - percentage * length);
  });
  return (
    <Svg width="98" height="98" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle className={`progress-${id}`} cx="49" cy="49" r="48.5" stroke="black" />
    </Svg>
  );
}
