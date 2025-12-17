import ProfilePanel from "../../../../components/ProfilePanel";
import GamemodeSelect from "./_partials/GamemodeSelect";
import VariantSelect from "./_partials/VariantSelect";

const UserPanel = () => {
  return (
    <div className="admin-panel">
      <div className="d-flex flex-column flex-shrink-0 p-2 text-white bg-dark">
        <ProfilePanel />
        <div className="main-page_menu-wrapper d-flex flex-column justify-content-center">
          <GamemodeSelect style={{ justifyContent: "center" }} />
          <VariantSelect />
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
