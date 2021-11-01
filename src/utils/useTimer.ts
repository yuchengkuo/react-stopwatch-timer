import { useRef } from 'react';
import {
  atom,
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
  waitForAll,
} from 'recoil';

const TimerActiveState = atomFamily({
  key: 'TimerActiveState',
  default: false,
});

const TimerPausedState = atomFamily({
  key: 'TimerPausedState',
  default: false,
});

const TimerCompletedState = atomFamily({
  key: 'TimerCompletedState',
  default: false,
});

const TimerName = atomFamily({
  key: 'TimerName',
  default: (id: number) => `Timer ${String(id + 1)}`,
});

const TimerHour = atomFamily({
  key: 'TimerHour',
  default: '',
});

const TimerMinute = atomFamily({
  key: 'TimerMinute',
  default: '01',
});

const TimerSecond = atomFamily({
  key: 'TimerSecond',
  default: '00',
});

const TimerInputTotalMS = selectorFamily({
  key: 'TimerInputTotalMS',
  get:
    (id) =>
    ({ get }) => {
      const hour = Number(get(TimerHour(id)));
      const min = Number(get(TimerMinute(id)));
      const sec = Number(get(TimerSecond(id)));
      const total = (hour * 3600 + min * 60 + sec) * 1000;
      return total;
    },
  set:
    (id) =>
    ({ reset }) => {
      reset(TimerHour(id));
      reset(TimerMinute(id));
      reset(TimerSecond(id));
    },
});

const TimerState = atomFamily({
  key: 'TimerState',
  default: { start: 0, duration: 0, countdown: 0 },
});

const StartOffset = atomFamily({
  key: 'StartOffset',
  default: 0,
});

const TimerStatePercentage = selectorFamily({
  key: 'TimerStatePercentage',
  get:
    (id: number) =>
    ({ get }) => {
      const timerState = get(TimerState(id));
      const total = get(TimerInputTotalMS(id));
      const offset = get(StartOffset(id));
      const isCompleted = get(TimerCompletedState(id));
      const current = timerState.countdown;
      if (timerState.duration === 0 && !isCompleted) return 0;
      const countdown = total + offset;
      return Math.floor((1 - current / countdown) * 1000) / 1000;
    },
});

const TimerAmount = atom({
  key: 'TimerAmount',
  default: [0],
});

function formatter(timer: number) {
  if (timer < 0) return { centisec: '00', sec: '00', min: '00', hour: '00', full: '00:00:00' };
  const centisec = formatDigit(Math.floor((timer / 10) % 100));
  // round to full second
  const sec = Math.round((timer / 1000) % 60) % 60;
  // round to minute if in last second
  const min =
    Math.round((timer / 1000) % 60) > 59
      ? Math.round((timer / 60000) % 60) % 60
      : Math.floor((timer / 60000) % 60);
  // round to hour if in last minute and last second
  const hour =
    Math.round((timer / 60000) % 60) > 59 && Math.round((timer / 1000) % 60) > 59
      ? Math.round(timer / 3600000)
      : Math.floor(timer / 3600000);
  const full =
    hour === 0
      ? [min, sec].join(':') + '.' + centisec
      : [hour, min, sec].join(':') + '.' + centisec;
  return { centisec, sec: formatDigit(sec), min: formatDigit(min), hour: formatDigit(hour), full };
}

function formatDigit(num: number) {
  if (num.toString().length === 1) return '0' + num;
  return num;
}

export function useTimerInput(id: number) {
  const [timerName, onChangeName] = useRecoilState(TimerName(id));
  const [timerHour, onChangeHour] = useRecoilState(TimerHour(id));
  const [timerMinute, onChangeMinute] = useRecoilState(TimerMinute(id));
  const [timerSec, onChangeSec] = useRecoilState(TimerSecond(id));
  return {
    timerName: { timerName, onChangeName },
    timerHour: { timerHour, onChangeHour },
    timerMinute: { timerMinute, onChangeMinute },
    timerSec: { timerSec, onChangeSec },
  };
}

export function useTimerAmount() {
  const [amount, setAmount] = useRecoilState(TimerAmount);
  function addTimer(id: number) {
    setAmount((cur) => cur.concat(id));
  }
  function removeTimer(id: number) {
    setAmount((cur) => {
      const arr = cur.concat();
      const toRemoveID = arr.findIndex((ID) => ID === id);
      arr.splice(toRemoveID, 1);
      return arr;
    });
  }
  return { amount, addTimer, removeTimer };
}

export function useIsAnyTimerActive() {
  const amount = useRecoilValue(TimerAmount);
  const isActive = useRecoilValue(waitForAll([...amount.map((id) => TimerActiveState(id))]));
  return isActive.filter((item) => item === true).length !== 0;
}

export function useTimer(id: number) {
  const [timerState, setTimerState] = useRecoilState(TimerState(id));
  const resetInput = useResetRecoilState(TimerInputTotalMS(id));
  const resetTimer = useResetRecoilState(TimerState(id));

  const [isActive, setActive] = useRecoilState(TimerActiveState(id));
  const [isPaused, setPaused] = useRecoilState(TimerPausedState(id));
  const [isCompleted, setCompleted] = useRecoilState(TimerCompletedState(id));
  const intervalID = useRef<NodeJS.Timeout>(null);
  const timerData = formatter(timerState.countdown);
  const percentage = useRecoilValue(TimerStatePercentage(id));
  const setStartOffset = useSetRecoilState(StartOffset(id));
  const resetStartOffset = useResetRecoilState(StartOffset(id));

  //
  // Using this works but would get the warning: Cannot update a component (`Batcher`)
  // while rendering a different component (`TimerItem`).
  //
  // if (timerState.countdown < 0) {
  //   setActive(false);
  //   clearInterval(intervalID.current);
  //   setTimerState((cur) => ({ start: cur.start, duration: cur.duration, countdown: 0 }));
  // }
  //

  // Using RecoilCallback due to the need of current state and setter function
  const intervalCallback = useRecoilCallback(
    ({ set, snapshot }) =>
      async (id: number) => {
        const { countdown: currentCountdown } = await snapshot.getPromise(TimerState(id));
        const countdown = await snapshot.getPromise(TimerInputTotalMS(id));
        if (currentCountdown < 0) {
          clearInterval(intervalID.current);
          setCompleted(true);
          setActive(false);
          setPaused(false);
          resetTimer();
        } else {
          set(TimerState(id), (cur) => ({
            start: cur.start,
            duration: Date.now() - cur.start,
            countdown: countdown - cur.duration,
          }));
        }
      },
    []
  );

  function startTimer() {
    setActive(true);
    setPaused(false);
    setCompleted(false);
    setTimerState((cur) => ({
      start: Date.now() - cur.duration,
      duration: cur.duration,
      countdown: cur.countdown,
    }));
    intervalID.current = setInterval(intervalCallback, 10, id);
  }
  function stopTimer() {
    setPaused(true);
    setActive(false);
    setCompleted(false);
    clearInterval(intervalID.current);
  }
  function updateTimer(min: number) {
    console.log('update');
    setStartOffset((cur) => cur + min * 60000);
    setTimerState((cur) => ({
      start: cur.start + 60000 * min,
      duration: cur.duration,
      countdown: cur.countdown,
    }));
  }
  function reset() {
    setActive(false);
    setPaused(false);
    setCompleted(false);
    clearInterval(intervalID.current);
    resetInput();
    resetTimer();
    resetStartOffset();
  }
  function resetCompleted() {
    setActive(false);
    setPaused(false);
    setCompleted(false);
    clearInterval(intervalID.current);
    resetTimer();
    resetStartOffset();
  }
  return {
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
  };
}
