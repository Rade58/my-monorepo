import { useLocation, useSubmit } from "@remix-run/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog } from "@reach/dialog";
import { submitButtonClasses, dangerButtonClasses } from "../common";

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

  return (
    <Dialog
      aria-label="Pending Logout Notification"
      isOpen={status === "show-modal"}
      onDismiss={closeModal}
    >
      <div>
        <h1 className="text-d-h3 mb-4">Are you still there?</h1>
        <p>
          You are going to be logged out due to inactivity. Close this modal to
          stay logged in.
        </p>
        <div className="h-8" />
        <div className="flex items-end gap-8">
          <button onClick={closeModal} className={submitButtonClasses}>
            Remain Logged In
          </button>
          <button onClick={logout} className={dangerButtonClasses}>
            Logout
          </button>
        </div>
      </div>
    </Dialog>
  );
}
