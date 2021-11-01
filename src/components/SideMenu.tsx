import { TabButton } from './Buttons';
import * as Icons from './Icons';
import { styled } from 'stitches.config';
import { useTab } from 'utils/useTab';
import { useStopwatch } from 'utils/useStopwatch';
import { useIsAnyTimerActive } from 'utils/useTimer';
import { Text } from 'styles/text';

export function SideMenu() {
  const { tabState, setTab } = useTab();
  const { isActive: stopwatchIsActive } = useStopwatch();
  const timerIsActive = useIsAnyTimerActive();
  return (
    <>
      <SideMenuWrap>
        <Text css={{ fontSize: 24, pl: 24, mb: 24, '@tablet': { display: 'none' } }}>Menu</Text>
        <TabButton
          disabled={timerIsActive}
          active={tabState === 'Stopwatch' ? 'true' : null}
          onClick={() => setTab('Stopwatch')}
        >
          <Icons.StopwatchIcon />
          Stopwatch
        </TabButton>
        <TabButton
          disabled={stopwatchIsActive}
          active={tabState === 'Timer' ? 'true' : null}
          onClick={() => setTab('Timer')}
        >
          <Icons.TimerIcon />
          Timer
        </TabButton>
      </SideMenuWrap>
      <Footer>
        <Text css={{ fontSize: 12, color: '$blue5', a: { color: '$blue5' } }}>
          A practice done by <a href="https://yuchengkuo.com">YuCheng Kuo</a>.
        </Text>
      </Footer>
    </>
  );
}

const SideMenuWrap = styled('aside', {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  px: 40,
  pt: 100,
  pb: 40,
  gap: 8,
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  backgroundColor: '$blue2',
  width: 280,
  borderRight: '1px solid $blue3',
  boxShadow: '1px 0px 8px rgba(0, 0, 0, 0.08)',
  zIndex: 99,
  transition: 'all 300ms ease-in-out',

  '@tablet': {
    position: 'absolute',
    backgroundColor: 'unset',
    border: 'none',
    boxShadow: 'none',
    maxWidth: 468,
    width: '100%',
    bottom: 'unset',
    alignItems: 'flex-start',
    justifyContent: 'stretch',
    flexDirection: 'row',
    pt: 40,
    pb: 24,
    px: 24,
    ml: '50%',
    transform: 'translateX(-50%)',

    button: {
      width: '100%',
      textAlign: 'center',
      border: '1px solid $blue2',
    },
  },
});

const Footer = styled('footer', {
  position: 'fixed',
  bottom: 40,
  left: 40,
  zIndex: 999,

  '@tablet': {
    bottom: 12,
    left: 24,
  },
});
