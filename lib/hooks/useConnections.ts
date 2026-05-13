"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getStoredConnectionStates,
  setStoredConnectionStates,
} from "@/lib/services/connections";
import type { Connection, ConnectionStatus } from "@/lib/services/connections";

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
    const states = getStoredConnectionStates();
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
      setStoredConnectionStates(
        Object.fromEntries(next.map((c) => [c.slug, c.status]))
      );
      return next;
    });
  }, []);

  const connect = useCallback((slug: string) => {
    if (slug !== "basalam") return;

    setConnections((prev) => {
      const next = prev.map((c) =>
        c.slug === slug ? { ...c, status: "connected" as const } : c
      );
      setStoredConnectionStates(
        Object.fromEntries(next.map((c) => [c.slug, c.status]))
      );
      return next;
    });
  }, []);

  return { connections, toggleConnection, connect };
}
