"use client";

import { useState, useEffect, useCallback } from "react";
import type { Connection, ConnectionStatus } from "@/lib/services/connections";

const STORAGE_KEY = "connection-states";

function loadStates(): Record<string, ConnectionStatus> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStates(states: Record<string, ConnectionStatus>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
}

function applyStates(
  connections: Connection[],
  states: Record<string, ConnectionStatus>
): Connection[] {
  return connections.map((c) => ({
    ...c,
    status: states[c.slug] ?? c.status,
  }));
}

export function useConnections(initialConnections: Connection[]) {
  const [connections, setConnections] = useState<Connection[]>(
    initialConnections
  );

  useEffect(() => {
    const states = loadStates();
    setConnections(applyStates(initialConnections, states));
  }, [initialConnections]);

  const toggleConnection = useCallback((slug: string) => {
    if (slug !== "basalam") return;

    setConnections((prev) => {
      const next = prev.map((c) =>
        c.slug === slug
          ? {
              ...c,
              status:
                c.status === "connected"
                  ? ("not_connected" as const)
                  : ("connected" as const),
            }
          : c
      );
      saveStates(Object.fromEntries(next.map((c) => [c.slug, c.status])));
      return next;
    });
  }, []);

  const connect = useCallback((slug: string) => {
    if (slug !== "basalam") return;

    setConnections((prev) => {
      const next = prev.map((c) =>
        c.slug === slug ? { ...c, status: "connected" as const } : c
      );
      saveStates(Object.fromEntries(next.map((c) => [c.slug, c.status])));
      return next;
    });
  }, []);

  return { connections, toggleConnection, connect };
}
