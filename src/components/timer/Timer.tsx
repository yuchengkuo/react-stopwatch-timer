import { ControlButton } from 'components/Buttons';
import { AddIcon } from 'components/Icons';
import { styled } from 'stitches.config';
import { Text } from 'styles/text';
import { useTimerAmount } from 'utils/useTimer';
import { TimerItem } from './TimerItem';

export const Timer = () => {
  const { amount, addTimer } = useTimerAmount();
  return (
    <>
      <TimerWrap>
        <Text as="h1" type="h1">
          Timer
        </Text>
        {amount.map((timerID) => (
          <TimerItem key={timerID} id={timerID} />
        ))}
        <ControlButton
          type="ghost"
          css={{
            width: 32,
            mx: '50%',
            transform: 'translateX(-50%)',
            transformOrigin: '-450% 50%',
          }}
          onClick={() => addTimer(amount[amount.length - 1] + 1)}
        >
          <AddIcon />
        </ControlButton>
      </TimerWrap>
    </>
  );
};

const TimerWrap = styled('div', {
  maxWidth: 420,
  mx: 'auto',
  width: '100%',
});
