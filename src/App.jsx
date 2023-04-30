import { Show } from 'solid-js';
import { MainHeader, MainContent } from "./layouts";
import { useLocation } from "@solidjs/router";

function App() {
  const location = useLocation();
  
  return (
    <>
      <Show when={location && location.pathname === '/'}>
        <MainHeader />
      </Show>
      <MainContent />
    </>
  );
}

export default App;