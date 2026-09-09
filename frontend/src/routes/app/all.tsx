import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/all")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/all"!</div>;
}
