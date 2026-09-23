// library
import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

// main component
import { HeaderApp } from "../../components/app/HeaderApp";
import { TabSection } from "../../components/app/TabSection";

// component
import { PopupAddSource } from "../../components/popup/pop-add-source/PopupAddSource";

// context
import useOpenPopup from "../../context/useOpenPopup";

export const Route = createFileRoute("/app/recommend")({
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

  return (
    <>
      <div className="flex w-dvw flex-col items-center">
        <HeaderApp />

        <TabSection tab="recommend" />
      </div>

      <PopupAddSource />
    </>
  );
}
