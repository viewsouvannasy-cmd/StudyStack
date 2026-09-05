import { createFileRoute } from "@tanstack/react-router";
import { HeaderSection } from "../components/index/HeaderSection";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex w-dvw justify-center">
      <HeaderSection />
    </div>
  );
}
