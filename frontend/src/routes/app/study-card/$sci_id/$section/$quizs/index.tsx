import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/study-card/$sci_id/$section/$quizs/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/study-card/$sci_id/$quizs/"!</div>;
}
