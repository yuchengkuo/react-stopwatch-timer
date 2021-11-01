import { Stopwatch } from 'components/stopwatch/Stopwatch';
import { Layout } from 'components/Layout';
import { globalStyles } from 'styles/global';
import { Timer } from 'components/timer/Timer';
import { useTab } from 'utils/useTab';

function App() {
  globalStyles();
  const { tabState } = useTab();
  return (
    <Layout>
      {tabState === 'Timer' && <Timer />}
      {tabState === 'Stopwatch' && <Stopwatch />}
    </Layout>
  );
}

export default App;
