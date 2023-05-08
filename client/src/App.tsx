import { Nav, Project, Donate, Donators } from "./components";
import Web3Provider from "./utilities/Web3Provider";

function App() {
  return (
    <Web3Provider>
      <main className="min-h-screen app-bg">
        <Nav />
        <div className="px-32 pt-12">
          <h1 className="font-bold text-5xl text-white pb-12">
            Help Fundraise SwiftFix's BossPaayos Project
          </h1>
          <div className="flex flex-col lg:flex-row justify-center lg:justify-start space-x-6 ">
            <Project />
            <div className="flex flex-col">
              <Donate />
              <Donators />
            </div>
          </div>
        </div>
      </main>
    </Web3Provider>
  );
}

export default App;
