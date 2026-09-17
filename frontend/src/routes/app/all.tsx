// library
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

// component
import { HeaderApp } from "../../components/app/HeaderApp";
import { TabSection } from "../../components/app/TabSection";
import { PopupAddSourse } from "../../components/popup/PopupAddSourse";

export const Route = createFileRoute("/app/all")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    document.title = "StudyStack | all";
  });

  return (
    <div className="flex w-dvw flex-col items-center">
      <HeaderApp />

      <TabSection tab="all" />

      <PopupAddSourse />
    </div>
  );
}
