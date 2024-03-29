import { useEffect, useState } from "react";

export default function useSuggestInstall() {
  const [suggestInstall, setSuggestInstall] = useState(false)

  useEffect(() => {
    // Detects if device is on iOS 
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    }
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      setSuggestInstall(true)
    }
  }, [])

  return { suggestInstall }
}