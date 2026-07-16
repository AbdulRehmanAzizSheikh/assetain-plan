"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SESSION_MAX_AGE_SEC } from "@/lib/auth-client";
import LoadingScreen from "./LoadingScreen";

async function logoutRequest() {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    /* ignore */
  }
}

async function refreshSession(): Promise<boolean> {
  try {
    const res = await fetch("/api/auth/refresh", { method: "POST" });
    return res.ok;
  } catch {
    return false;
  }
}

export default function SessionKeepAlive() {
  const router = useRouter();
  const [locking, setLocking] = useState(false);

  useEffect(() => {
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;
    let heartbeat: ReturnType<typeof setInterval> | null = null;
    let leftAt: number | null = null;
    let cancelled = false;

    const logoutAndRedirect = async () => {
      if (cancelled) return;
      setLocking(true);
      await logoutRequest();
      router.replace("/unlock");
      router.refresh();
    };

    const clearLeaveTimer = () => {
      if (leaveTimer) {
        clearTimeout(leaveTimer);
        leaveTimer = null;
      }
    };

    const startHeartbeat = () => {
      if (heartbeat) return;
      void refreshSession();
      heartbeat = setInterval(() => {
        void refreshSession().then((ok) => {
          if (!ok) void logoutAndRedirect();
        });
      }, 20_000);
    };

    const stopHeartbeat = () => {
      if (heartbeat) {
        clearInterval(heartbeat);
        heartbeat = null;
      }
    };

    const onLeave = () => {
      leftAt = Date.now();
      stopHeartbeat();
      clearLeaveTimer();
      leaveTimer = setTimeout(() => {
        void logoutAndRedirect();
      }, SESSION_MAX_AGE_SEC * 1000);
    };

    const onReturn = () => {
      clearLeaveTimer();
      if (leftAt && Date.now() - leftAt >= SESSION_MAX_AGE_SEC * 1000) {
        leftAt = null;
        void logoutAndRedirect();
        return;
      }
      leftAt = null;
      startHeartbeat();
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") onLeave();
      else onReturn();
    };

    if (document.visibilityState === "hidden") onLeave();
    else startHeartbeat();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onLeave);

    return () => {
      cancelled = true;
      clearLeaveTimer();
      stopHeartbeat();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onLeave);
    };
  }, [router]);

  if (!locking) return null;
  return <LoadingScreen message="Session expired — locking…" />;
}
