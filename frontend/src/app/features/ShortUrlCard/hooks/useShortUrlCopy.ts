import { useCallback, useRef, useState } from "react";
import { redirectBaseUrl } from "app/constants";

const TOOLTIP_DELAY = 1500;

type ReturnTuple = [(shortUrl: string) => void, string];
export const useShortUrlCopy = (): ReturnTuple => {
  const timerRef = useRef<number>();
  const [tooltipMessage, setTooltipMessage] = useState("Copy");

  const onShortUrlCopy = useCallback((shortUrl: string) => {
    navigator.clipboard.writeText(`${redirectBaseUrl}/${shortUrl}`);

    setTooltipMessage("Copied to clipboard!");

    clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      setTooltipMessage("Copy");
    }, TOOLTIP_DELAY);
  }, []);

  return [onShortUrlCopy, tooltipMessage];
};
