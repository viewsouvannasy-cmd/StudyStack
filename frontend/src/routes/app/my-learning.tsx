// library
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

// component
import { HeaderApp } from "../../components/app/HeaderApp";
import { TabSection } from "../../components/app/TabSection";
import { DisplayItemSection } from "../../components/app/DisplayItemSection";
import { PopupAddSourse } from "../../components/popup/PopupAddSourse";

export const Route = createFileRoute("/app/my-learning")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    document.title = "StudyStack | My Learning";
  });

  return (
    <>
      <div className="flex w-dvw flex-col items-center">
        <HeaderApp />

        <TabSection tab="my-learning" />
        <DisplayItemSection tab="my-learning" title="My Learning" />
      </div>

      <PopupAddSourse />
    </>
  );
}
