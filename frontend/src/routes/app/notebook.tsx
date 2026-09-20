// library
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

// component
import { HeaderApp } from "../../components/app/HeaderApp";
import { TabSection } from "../../components/app/TabSection";
import { DisplayItemSection } from "../../components/app/DisplayItemSection";
import { PopupAddSource } from "../../components/popup/pop-add-source/PopupAddSource";

// context
import useOpenPopup from "../../context/useOpenPopup";

export const Route = createFileRoute("/app/notebook")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isOpen } = useOpenPopup();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    document.title = "StudyStack | My Learning";
  });

  return (
    <>
      <div className="flex w-dvw flex-col items-center">
        <HeaderApp />

        <TabSection tab="my-learning" />
        <DisplayItemSection tab="my-learning" title="My Notebook" />
      </div>

      <PopupAddSource />
    </>
  );
}
