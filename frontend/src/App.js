import "@/App.css";
import { Toaster } from "sonner";
import { DesktopProvider } from "./lib/desktop";
import { Desktop } from "./components/os/Desktop";
import { RecruiterLinks } from "./components/os/RecruiterLinks";
function App() {
  return (
    <DesktopProvider>
      <div className="App relative h-[100svh] overflow-hidden bg-noc-bg text-slate-100">
        <div className="grain" aria-hidden="true" />
        <Desktop />
        <RecruiterLinks />
        <Toaster theme="dark" position="bottom-right" offset={64} toastOptions={{ style: { fontFamily:"JetBrains Mono, monospace", borderRadius: 0, background:"#111622", border:"1px solid #1E293B", color:"#F8FAFC" } }} />
      </div>
    </DesktopProvider>
  );
}
export default App;
