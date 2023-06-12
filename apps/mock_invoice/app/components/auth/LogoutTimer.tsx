import { useLocation, useSubmit } from "@remix-run/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog } from "@reach/dialog";
import { submitButtonClasses, dangerButtonClasses } from "../common";

export default function LogoutTimer() {
  const [status, setStatus] = useState<"idle" | "show-modal">("idle");

  const location = useLocation();

  // SO WHAT SHOULD HAPPEN
  // MODAL, AUTOMATICALLY SHOWN,
  //  WHERE USER DECIDES IF HE WANTS TO LOGOUT OR NOT
  // IF HE FAILS TO CLICK ON
  // "KEEP LOGGED IN" OR "LOG OUT", IT WILL BE LOGGED OUT AUTOMATICALLY

  // 🐨 add the useSubmit hook here so you can trigger a logout
  const submit = useSubmit();
  // I've shortened the logoutTime and modalTime with these to test this more easily:
  const logoutTime = /* 1000 * 60 * 60 * 24; */ 15000;
  const modalTime = /* logoutTime - 1000 * 60 * 2; */ 6000;

  const modalTimer = useRef<ReturnType<typeof setTimeout>>();
  const logoutTimer = useRef<ReturnType<typeof setTimeout>>();

  const logout = useCallback(() => {
    // 🐨 log the user out by submitting to /logout
    // 🐨 provide the `redirectTo` value as part of the body of
    // the request so after the user logs in again they will be
    // right back where they left off
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

  useEffect(() => resetTimers(), [resetTimers, location.key]);
  useEffect(() => cleanupTimers, [cleanupTimers]);

  function closeModal() {
    resetTimers();
    setStatus("idle");
  }

  console.log({ status, key: location.key });

  return (
    <Dialog
      aria-label="Pending Logout Notification"
      isOpen={status === "show-modal"}
      onDismiss={closeModal}
    >
      <div className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center">
        <div className="z-50 bg-base-300 max-w-[520px] p-6 rounded mx-auto flex flex-col justify-center items-center">
          <h1 className="text-d-h3 mb-4">Are you still there?</h1>
          <p>
            You are going to be logged out due to inactivity. Close this modal
            to stay logged in.
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
      </div>
    </Dialog>
  );
}
