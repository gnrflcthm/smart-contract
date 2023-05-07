import { Project, Donate } from "./components";
import Web3Provider from "./utilities/Web3Provider";

function App() {
  return (
    <Web3Provider>
      <main className="bg-on_primary h-full min-h-screen block lg:flex flex-col lg:flex-row items-center justify-around lg:px-10 lg:space-x-10 space-y-10 lg:space-y-0 py-10 lg:py-0">
        <Project />
        <Donate />
      </main>
    </Web3Provider>
  );
}

export default App;
