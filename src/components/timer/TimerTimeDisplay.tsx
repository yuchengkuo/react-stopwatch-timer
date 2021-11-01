import { PillButton } from 'components/Buttons';
import { styled } from 'stitches.config';
import { Text } from 'styles/text';
import { useTimerInput } from 'utils/useTimer';

export function TimerTimeDisplay({ timerData, updateTimer, id }) {
  const { timerName } = useTimerInput(id);
  return (
    <>
      <TimerTimeDisplayWrap>
        <Text css={{ py: 8 }}>{timerName.timerName}</Text>
        <TimerTimeWrap>
          {timerData.hour !== '00' && (
            <>
              <Text type="timerActive">{timerData.hour}</Text>
              <Text type="timer" css={{ fontSize: 16, pb: 6 }}>
                h
              </Text>
            </>
          )}
          <Text type="timerActive">{timerData.min}</Text>
          <Text type="timer" css={{ fontSize: 16, pb: 6 }}>
            m
          </Text>
          <Text type="timerActive">{timerData.sec}</Text>
          <Text type="timer" css={{ fontSize: 16, pb: 6 }}>
            s
          </Text>
        </TimerTimeWrap>
        <div>
          <PillButton onClick={() => updateTimer(1)}>+ 1 min</PillButton>
          <PillButton onClick={() => updateTimer(5)}>+ 5 min</PillButton>
          <PillButton onClick={() => updateTimer(15)}>+ 15 min</PillButton>
        </div>
      </TimerTimeDisplayWrap>
    </>
  );
}

const TimerTimeWrap = styled('div', {
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'flex-end',
  gap: 8,
});

const TimerTimeDisplayWrap = styled('div', {
  height: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '& div:last-child': {
    display: 'flex',
  },
});
