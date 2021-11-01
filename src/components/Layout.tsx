import { styled } from 'stitches.config';
import { SideMenu } from './SideMenu';

export function Layout({ children }) {
  return (
    <>
      <SideMenu />
      <Main>{children}</Main>
    </>
  );
}

const Main = styled('main', {
  py: 120,
  display: 'flex',
  flexDirection: 'column',
  px: 16,
});
