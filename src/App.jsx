import { useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import {
  Home,
  Profile
} from './pages';
import {
  Footer,
  NavBar
} from './components';
import { Global, css } from '@emotion/react'

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
    background: #162230;
    color: #ffffff;
    font-family: 'Rajdhani', sans-serif;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #1e2d3d;
  }
  ::-webkit-scrollbar-thumb {
    background: #60a5fa30;
    border-radius: 3px;
  }
`;

// Title mapping function
const getPageTitle = (pathname) => {
  if (pathname === '/') return 'Home';
  if (pathname === '/login') return 'Login';
  if (pathname.includes('/settings')) return 'Settings';
  if (pathname.includes('/leaderboard')) return 'Leaderboard';
  if (pathname.includes('/shop')) return 'Shop';
  if (pathname.includes('/games')) return 'Games';
  if (pathname.includes('/profile')) return 'Profile';
  return null;
};

// Hard Code
const notifications = [
  { id: 1, icon: 'match', title: 'Match found — CS2', createdAt: 1773716122000, unread: true  },
  { id: 2, icon: 'rank_up', title: 'You ranked up to Diamond I', createdAt: 1773714622000, unread: true  },
  { id: 3, icon: 'friend_request', title: 'AKaliber sent you a friend request', createdAt: 1773685822000, unread: true },
  { id: 4, icon: 'friend_add', title: 'You have successfully added AKaliber as a friend', createdAt: 1773675022000, unread: true },
  { id: 5, icon: 'friend_remove', title: 'You have successfully removed AKaliber as a friend', createdAt: 1773649822000, unread: true },
  { id: 6, icon: 'friend_block', title: 'You successfully blocked AKaliber', createdAt: 1773477022000, unread: true },
  { id: 7, icon: 'shop', title: 'Your shop order was fulfilled', createdAt: 1773304222000, unread: false },
  { id: 8, icon: 'won_game', title: 'Game Won - CS2 - ID: 123182', createdAt: 1770888622000, unread: false }
];

const AppLayout = ({ notifications }) => {
  return (
    <div>
      <NavBar notifications={notifications} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
};

export default function App() {
  const location = useLocation();
  
  // Update document title based on current route
  useEffect(() => {
    const title = getPageTitle(location.pathname);
    document.title = title ? `MatchMaking | ${title}` : 'MatchMaking';
  }, [location.pathname]);
  
  return (
    <>
      <Global styles={globalStyles} />
      <Routes>
        <Route
          path="/login"
          element={<Home />}
        />
        <Route element={<AppLayout notifications={notifications} />}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/games"
            element={<Profile />}
          />
          <Route
            path="/leaderboard"
            element={<Profile />}
          />
          <Route
            path="/shop"
            element={<Profile />}
          />
          <Route
            path="/profile/:id?"
            element={<Profile />}
          />
          <Route
            path="/settings"
            element={<Profile />}
          />
        </Route>
      </Routes>
    </>
  )
};