import { createFileRoute } from "@tanstack/react-router";

import { HeaderApp } from "../../components/app/HeaderApp";
import { TabSection } from "../../components/app/TabSection";

export const Route = createFileRoute("/app/recommend")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex w-dvw flex-col items-center">
      <HeaderApp />

      <TabSection tab="recommend" />
    </div>
  );
}
