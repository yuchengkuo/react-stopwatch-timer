import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'stitches.config';
import { Text } from 'styles/text';
import { FormattedStopwatch, useStopwatch } from 'utils/useStopwatch';
import { ControlButton, PillButton } from '../Buttons';
import { StopwatchTimeDisplay } from './StopwatchTimeDisplay';
import { SplitList } from './SplitList';

export function Stopwatch() {
  const [mode, setMode] = useState<'Total' | 'Lap'>('Total');
  const { centisec, sec, min, hour } = useRecoilValue(FormattedStopwatch(mode));
  const { startStopwatch, stopStopwatch, setLap, reset, isActive } = useStopwatch();
  return (
    <StopwatchWrap>
      <Text as="h1" type="h1">
        Stopwatch
      </Text>
      <PillButtonsWrap>
        <PillButton state={mode === 'Lap' ? 'active' : null} onClick={() => setMode('Lap')}>
          Lap
        </PillButton>
        <PillButton state={mode === 'Total' ? 'active' : null} onClick={() => setMode('Total')}>
          Total
        </PillButton>
      </PillButtonsWrap>
      <StopwatchTimeDisplay>
        {hour !== '00' && (
          <>
            <Text type="digit">{hour}</Text>
            <Text type="digit"> : </Text>
          </>
        )}
        <Text type="digit">{min}</Text>
        <Text type="digit"> : </Text>
        <Text type="digit">{sec}</Text>
        <Text type="digit"> . </Text>
        <Text type="digit">{centisec}</Text>
      </StopwatchTimeDisplay>
      <ControlButtonWrap>
        <ControlButton
          type={isActive ? 'active' : 'default'}
          onClick={isActive ? stopStopwatch : startStopwatch}
        >
          {isActive ? 'Stop' : 'Start'}
        </ControlButton>
        <ControlButton type="ghost" onClick={setLap} disabled={!isActive}>
          Lap
        </ControlButton>
        <ControlButton type="muted" onClick={reset} css={{ ml: 'auto' }}>
          Reset
        </ControlButton>
      </ControlButtonWrap>

      <SplitList />
    </StopwatchWrap>
  );
}

const StopwatchWrap = styled('div', {
  maxWidth: 420,
  mx: 'auto',
  width: '100%',
});

const PillButtonsWrap = styled('div', {
  display: 'flex',
  gap: 4,
  justifyContent: 'flex-end',
  mb: 8,
  height: 32,
});

const ControlButtonWrap = styled('div', {
  display: 'flex',
  gap: 16,
  mt: 40,
});
