import { atom, useRecoilState } from 'recoil';

const TabState = atom({
  key: 'TabState',
  default: 'Stopwatch',
});

export function useTab() {
  const [tabState, setTabState] = useRecoilState(TabState);
  function setTab(tab: 'Stopwatch' | 'Timer') {
    setTabState(tab);
  }
  return { tabState, setTab };
}
