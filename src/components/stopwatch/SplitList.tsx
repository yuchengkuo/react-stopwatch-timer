import { useRecoilValue } from 'recoil';
import { styled } from 'stitches.config';
import { LapState } from 'utils/useStopwatch';

export function SplitList() {
  const splitLists = useRecoilValue(LapState);
  return (
    <>
      <SplitTable>
        {splitLists.length !== 0 && (
          <thead>
            <tr>
              <th>Lap No.</th>
              <th>Split</th>
              <th>Total</th>
            </tr>
          </thead>
        )}
        <tbody>
          {splitLists.map((list, i) => (
            <tr key={i}>
              <td>No. {list.index}</td>
              <td>{list.current}</td>
              <td>{list.total}</td>
            </tr>
          ))}
        </tbody>
      </SplitTable>
    </>
  );
}

const SplitTable = styled('table', {
  mt: 36,
  width: '100%',
  '& th': {
    fontSize: 14,
    fontWeight: 400,
    textTransform: 'uppercase',
    pb: 16,
  },
  '& td': {
    fontSize: 18,
    fontWeight: 500,
    pb: 12,
  },
  '& th:first-child, & td:first-child': {
    textAlign: 'left',
    width: 'min-content',
  },
  '& th:last-child, & td:last-child': {
    textAlign: 'right',
  },
  '& th:nth-child(2), & td:nth-child(2)': {
    pl: 24,
    textAlign: 'left',
  },
});
