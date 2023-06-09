import { useLocation, useSubmit } from "@remix-run/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog } from "@reach/dialog";

export default function LogoutTimer() {
  const [status, setStatus] = useState<"idle" | "show-modal">("idle");

  const location = useLocation();
  const submit = useSubmit();

  const logoutTime = 1000 * 60 * 60 * 24;
  const modalTime = logoutTime - 1000 * 60 * 2;

  const modalTimer = useRef<ReturnType<typeof setTimeout>>();
  const logoutTimer = useRef<ReturnType<typeof setTimeout>>();

  const logout = useCallback(() => {
    submit(
      { redirectTo: location.pathname },
      { method: "post", action: "/logout" }
    );
  }, [submit, location.pathname]);

  const cleanupTimers = useCallback(() => {
    clearTimeout(modalTimer.current);
    clearTimeout(logoutTimer.current);
  }, []);

  const resetTimers = useCallback(() => {
    cleanupTimers();

    modalTimer.current = setTimeout(() => {
      setStatus("show-modal");
    }, modalTime);

    logoutTimer.current = setTimeout(logout, logoutTime);
  }, [cleanupTimers, logout, logoutTime, modalTime]);

  useEffect(() => {
    return resetTimers();
  }, [resetTimers, location.key]);

  useEffect(() => {
    return cleanupTimers;
  }, [cleanupTimers]);

  function closeModal() {
    setStatus("idle");
    resetTimers();
  }
}
