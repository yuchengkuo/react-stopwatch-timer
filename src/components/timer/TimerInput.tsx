import { PillButton } from 'components/Buttons';
import { styled } from 'stitches.config';
import { useTimerInput } from 'utils/useTimer';

export const TimerInput = ({ id }) => {
  const { timerName, timerHour, timerMinute, timerSec } = useTimerInput(id);
  function handler(value: string, name: string) {
    if (Number(value) > 59 && (name === 'minute' || name === 'second')) return '59';
    if (Number(value) < 0) return '00';
    if (value.startsWith('0') && value.length > 2) return value.slice(1, 3);
    if (Number(value).toString().length > 2) return value.slice(0, 2);
    if (Number(value).toString().length === 1) value = '0' + value;
    return value;
  }

  return (
    <>
      <TimerInputWrap>
        <div>
          <input
            type="text"
            onClick={(e) => (e.target as HTMLInputElement).select()}
            onChange={(e) => timerName.onChangeName(e.target.value)}
            value={timerName.timerName}
          />
        </div>
        <div>
          <input
            type="tel"
            name="hour"
            onClick={(e) => (e.target as HTMLInputElement).select()}
            onChange={(e) => timerHour.onChangeHour(handler(e.target.value, e.target.name))}
            value={timerHour.timerHour}
            placeholder="HH"
            inputMode="decimal"
          />
          <span>:</span>
          <input
            type="tel"
            name="minute"
            onClick={(e) => (e.target as HTMLInputElement).select()}
            onChange={(e) => timerMinute.onChangeMinute(handler(e.target.value, e.target.name))}
            value={timerMinute.timerMinute}
            placeholder="MM"
            inputMode="decimal"
          />
          <span>:</span>
          <input
            type="tel"
            name="second"
            onClick={(e) => (e.target as HTMLInputElement).select()}
            onChange={(e) => timerSec.onChangeSec(handler(e.target.value, e.target.name))}
            value={timerSec.timerSec}
            placeholder="SS"
            inputMode="decimal"
          />
        </div>
        <div>
          <PillButton onClick={() => timerMinute.onChangeMinute('5')}>5 min</PillButton>
          <PillButton onClick={() => timerMinute.onChangeMinute('10')}>10 min</PillButton>
          <PillButton onClick={() => timerMinute.onChangeMinute('30')}>30 min</PillButton>
        </div>
      </TimerInputWrap>
    </>
  );
};

const TimerInputWrap = styled('div', {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',

  fontFamily: '$sans',
  fontSize: 32,
  fontWeight: 400,

  '& div:nth-child(2)': {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: 4,
    '@phone': {
      gap: 0,
    },
  },

  '& div:last-child': {
    display: 'flex',
  },

  input: {
    fontFamily: '$sans',
    fontSize: 32,
    fontWeight: 400,
    fontFeatureSettings: '"tnum"',
    borderRadius: 4,
    '&:focus': {
      backgroundColor: '$blue4',
    },
  },
  '& input[type="tel"]': {
    border: 'none',
    backgroundColor: '$blue3',
    display: 'inline-flex',
    py: 8,
    px: 4,
    width: 52,
    textAlign: 'center',
    '&:focus': {
      backgroundColor: '$blue4',
      outline: 'none',
    },
  },
  '& input[type="text"]': {
    border: 'none',
    backgroundColor: '$blue3',
    fontSize: 14,
    px: 8,
    py: 12,
    '&:focus': {
      backgroundColor: '$blue4',
      outline: 'none',
    },
  },
});
