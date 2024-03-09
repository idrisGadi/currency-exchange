import './App.css';
import { Header } from './features/header/Header';
import { Exchange } from './features/exchange/Exchange';

function App() {
  return (
    <body className='mx-auto flex max-w-screen-xl flex-col gap-6'>
      <header className='h-full w-full'>
        <Header />
      </header>
      <main className='h-full w-full'>
        <Exchange />
      </main>
    </body>
  );
}

export default App;
