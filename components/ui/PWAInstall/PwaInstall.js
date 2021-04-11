import React, { useEffect, useState } from "react";

import { LangContext } from "../../../context";
const PwaInstall = ({ className }) => {
  const LangContextx = React.useContext(LangContext);
  const [supportsPWA, setSupportsPWA] = useState(
    !(
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://")
    )
  );
  let deferredPrompt;

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
    });
  });
  const onClick = (evt) => {
    evt.preventDefault();
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
      } else {
      }
      setSupportsPWA(false);
    });
  };

  return (
    <>
      {supportsPWA && (
        <button
          id="PWA-button"
          aria-label={LangContextx.PWAInstall}
          title={LangContextx.PWAInstall}
          onClick={onClick}
        >
          {LangContextx.PWAInstall}
        </button>
      )}
    </>
  );
};

export default PwaInstall;
