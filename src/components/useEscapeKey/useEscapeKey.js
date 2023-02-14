import { useEffect } from "react";

function useEscapeKey(callback) {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code === "Escape") {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [callback]);
}

export default useEscapeKey;
