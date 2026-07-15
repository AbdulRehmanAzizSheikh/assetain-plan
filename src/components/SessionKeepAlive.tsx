"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SESSION_MAX_AGE_SEC } from "@/lib/auth-client";

async function logoutAndRedirect(router: ReturnType<typeof useRouter>) {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch {
    /* ignore */
  }
  router.replace("/unlock");
  router.refresh();
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

  useEffect(() => {
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;
    let heartbeat: ReturnType<typeof setInterval> | null = null;
    let leftAt: number | null = null;

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
          if (!ok) void logoutAndRedirect(router);
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
        void logoutAndRedirect(router);
      }, SESSION_MAX_AGE_SEC * 1000);
    };

    const onReturn = () => {
      clearLeaveTimer();
      if (leftAt && Date.now() - leftAt >= SESSION_MAX_AGE_SEC * 1000) {
        leftAt = null;
        void logoutAndRedirect(router);
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
      clearLeaveTimer();
      stopHeartbeat();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onLeave);
    };
  }, [router]);

  return null;
}
