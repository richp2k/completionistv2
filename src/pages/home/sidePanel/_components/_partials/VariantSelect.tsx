import YesNoButton from "../../../../../components/_partials/YesNoButton";
import { useUserSelectStore } from "../../../../../store/store";
import { useShallow } from "zustand/react/shallow";
import { ScoresVariant } from "../../../../../interfaces/Enums";
import RadioGroupButtons from "../../../../../components/RadioGroupButtons";
import RadioGroupButton from "../../../../../components/_partials/RadioGroupButton";

const VariantSelect = () => {
  const [variant, setVariant] = useUserSelectStore(
    useShallow((state) => [state.variant, state.setVariant])
  );

  return (
    <div className="d-flex justify-content-center my-2">
      {/* <div className="d-flex my-2"> */}
      <RadioGroupButtons name="main-convertsSelect">
        <RadioGroupButton
          value={ScoresVariant.SPECIFIC}
          selectedValue={variant}
          setValue={setVariant}
        >
          Specifics
        </RadioGroupButton>
        <RadioGroupButton
          value={ScoresVariant.CONVERT}
          selectedValue={variant}
          setValue={setVariant}
        >
          Converts
        </RadioGroupButton>
        <RadioGroupButton
          value={ScoresVariant.SPECIFICCONVERT}
          selectedValue={variant}
          setValue={setVariant}
        >
          Specifics + Converts
        </RadioGroupButton>
      </RadioGroupButtons>
    </div>
  );
};

export default VariantSelect;
