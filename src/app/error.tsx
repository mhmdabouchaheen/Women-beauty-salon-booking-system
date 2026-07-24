"use client";

import { useEffect } from "react";
import ServerErrorView from "@/src/components/auth/ServerErrorView";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: send `error` to your logging/monitoring service here.
    console.error(error);
  }, [error]);

  return <ServerErrorView onRetry={reset} />;
}
