import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Boot } from "./Boot";
import { Ticker } from "./Ticker";
import { Wallpaper } from "./Wallpaper";
import { DesktopIcons } from "./DesktopIcons";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { StartMenu } from "./StartMenu";
import { APP } from "./appMeta";
import { APP_COMPONENTS } from "./apps";
import { useDesktop, useIsMobile } from "../../lib/desktop";

export const Desktop = () => {
  const d = useDesktop();
  const mobile = useIsMobile();
  const area = useRef(null);
  const [booted, setBooted] = useState(() => sessionStorage.getItem("l0-boot") === "1");
  const [startOpen, setStartOpen] = useState(false);
  const finishBoot = useCallback(() => setBooted(true), []);
  const { open } = d;

  useEffect(() => {
    if (!booted) return undefined;
    sessionStorage.setItem("l0-boot", "1");
    if (window.innerWidth >= 768) open("sobre", "right");
    return undefined;
  }, [booted]);

  const reboot = () => {
    sessionStorage.removeItem("l0-boot");
    setBooted(false);
  };

  return (
    <>
      <AnimatePresence>{!booted && <Boot onDone={finishBoot} />}</AnimatePresence>
      <Ticker />
      <Wallpaper ready={booted} />
      <DesktopIcons ready={booted} />
      <div ref={area} data-testid="desktop-area" className="pointer-events-none fixed inset-x-0 bottom-12 top-8 z-10">
        <AnimatePresence>
          {Object.entries(d.wins)
            .filter(([, st]) => !st.min)
            .map(([id, st]) => {
              const App = APP_COMPONENTS[id];
              return (
                <Window key={id} id={id} meta={APP[id]} st={st} isTop={d.top === id} mobile={mobile} areaRef={area}>
                  <App />
                </Window>
              );
            })}
        </AnimatePresence>
      </div>
      <StartMenu open={startOpen} onClose={() => setStartOpen(false)} onReboot={reboot} />
      <Taskbar onStart={() => setStartOpen((o) => !o)} startOpen={startOpen} />
    </>
  );
};
