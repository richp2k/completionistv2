import CompletionFilter from "./_partials/CompletionFilter";
import MissCountFilter from "./_partials/MissCountFilter";
import RankFilter from "./_partials/RankFilter";
import StarRatingFilter from "./_partials/StarRatingFilter";

const BeatmapsetsFilters = () => {
  return (
    <div className="d-flex my-2" style={{ gap: 20 }}>
      <CompletionFilter />
      <RankFilter />
      <MissCountFilter />
      <StarRatingFilter />
    </div>
  );
};

export default BeatmapsetsFilters;
