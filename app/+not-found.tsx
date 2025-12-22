// app/_not-found.tsx
import { useEffect } from "react";
import { router } from "expo-router";

export default function NotFound() {
  useEffect(() => {
    router.replace("/"); // default fallback page
  }, []);

  return null;
}
