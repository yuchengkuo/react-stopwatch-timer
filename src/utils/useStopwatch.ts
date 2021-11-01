import { useRef } from 'react';
import {
  atom,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

const StopwatchActiveState = atom({
  key: 'StopwatchActiveState',
  default: false,
});

const StopwatchState = atom({
  key: 'StopwatchState',
  default: { start: 0, duration: 0 },
});

const LapStopwatchState = atom({
  key: 'LapStopwatchState',
  default: { start: 0, duration: 0 },
});

export const LapState = atom({
  key: 'LapState',
  default: [],
});

export const FormattedStopwatch = selectorFamily({
  key: 'StopwatchSelector',
  get:
    (type: 'Lap' | 'Total') =>
    ({ get }) => {
      const { duration } = get(type === 'Lap' ? LapStopwatchState : StopwatchState);
      return formatter(duration);
    },
});

function formatter(duration: number) {
  const centisec = formatDigit(Math.floor((duration / 10) % 100));
  const sec = formatDigit(Math.floor((duration / 1000) % 60));
  const min = formatDigit(Math.floor((duration / 60000) % 60));
  const hour = formatDigit(Math.floor((duration / 3600000) % 24));
  const full =
    hour === '00'
      ? [min, sec].join(':') + '.' + centisec
      : [hour, min, sec].join(':') + '.' + centisec;
  return { centisec, sec, min, hour, full };
}

function formatDigit(num: number | string) {
  if (num.toString().length === 1) return '0' + num;
  return num;
}

export function useStopwatch() {
  const setStopwatchState = useSetRecoilState(StopwatchState);
  const reestStopwatchState = useResetRecoilState(StopwatchState);

  const setLapStopwatchState = useSetRecoilState(LapStopwatchState);
  const reestLapStopwatchState = useResetRecoilState(LapStopwatchState);

  const setLapState = useSetRecoilState(LapState);
  const resetLapState = useResetRecoilState(LapState);

  const currentLap = useRecoilValue(FormattedStopwatch('Lap'));
  const total = useRecoilValue(FormattedStopwatch('Total'));

  const [isActive, setActive] = useRecoilState(StopwatchActiveState);

  const intervalID = useRef<NodeJS.Timeout>(null);
  const lapIntervalID = useRef<NodeJS.Timeout>(null);

  const initializer = (curr) => ({
    start: Date.now() - curr.duration,
    duration: curr.duration,
  });
  const updater = (curr) => ({ start: curr.start, duration: Date.now() - curr.start });

  function startStopwatch() {
    setActive(true);
    setStopwatchState(initializer);
    intervalID.current = setInterval(() => {
      setStopwatchState(updater);
    }, 10);

    setLapStopwatchState(initializer);
    lapIntervalID.current = setInterval(() => {
      setLapStopwatchState(updater);
    }, 10);
  }
  function stopStopwatch() {
    setActive(false);
    clearInterval(intervalID.current);
    clearInterval(lapIntervalID.current);
  }
  function setLap() {
    setLapState((currArr) => {
      const arr = currArr.concat();
      arr.unshift({ index: arr.length + 1, current: currentLap.full, total: total.full });
      return arr;
    });
    clearInterval(lapIntervalID.current);
    reestLapStopwatchState();
    setLapStopwatchState(initializer);
    lapIntervalID.current = setInterval(() => {
      setLapStopwatchState(updater);
    }, 10);
  }
  function reset() {
    setActive(false);
    clearInterval(intervalID.current);
    clearInterval(lapIntervalID.current);
    reestStopwatchState();
    reestLapStopwatchState();
    resetLapState();
  }
  return { startStopwatch, stopStopwatch, setLap, reset, isActive };
}
