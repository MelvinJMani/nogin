import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './ui/AppLayout';
import { Home } from './ui/Home';
import { GamePage } from './ui/GamePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'sudoku', element: <GamePage title='Sudoku' /> },
      { path: '2048', element: <GamePage title='2048' /> },
      { path: 'tetris', element: <GamePage title='Tetris' /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
