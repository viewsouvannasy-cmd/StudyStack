// library
import { createFileRoute } from "@tanstack/react-router";

// main component
import { HeaderApp } from "../../../../components/app/HeaderApp";
import { StudySection } from "../../../../components/app/study-card/$sci_id/StudySection";

export const Route = createFileRoute("/app/study-card/$sci_id/overview")({
  component: RouteComponent,
});

function RouteComponent() {
  const { sci_id } = Route.useParams();

  return (
    <div className="flex w-dvw flex-col items-center">
      <HeaderApp />

      <StudySection />
    </div>
  );
}
