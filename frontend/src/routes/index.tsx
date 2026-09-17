// library
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

// component
import { HeaderSection } from "../components/index/HeaderSection";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    document.title = "StudyStack";
  });

  return (
    <div className="flex w-dvw justify-center">
      <HeaderSection />
    </div>
  );
}
