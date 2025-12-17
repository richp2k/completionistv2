import Spacer from "../../../components/_partials/Spacer";
import ScoresFetching from "./_components/ScoresFetching";
import UserCompletion from "./_components/UserCompletion";
import UserPanel from "./_components/UserPanel";

const HomeSidePanel = () => {
  return (
    <div
      id="admin-statistics"
      className="col-3 no-gutters"
      style={{ height: "fit-content", position: "sticky" }}
    >
      <UserPanel />
      <Spacer />
      <UserCompletion />
      <Spacer />
      <ScoresFetching />
    </div>
  );
};

export default HomeSidePanel;
