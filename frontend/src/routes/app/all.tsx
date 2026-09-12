// library
import { createFileRoute } from "@tanstack/react-router";

// component
import { HeaderApp } from "../../components/app/HeaderApp";

export const Route = createFileRoute("/app/all")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex w-dvw flex-col items-center">
      <HeaderApp />
    </div>
  );
}
