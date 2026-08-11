import Donut from "../reusable/Donut";
import { monthlyTarget } from "../../data/monthlyTarget";

const CrmDonut = () => {
  return (
    <div>
      <Donut
        donutcount="june Goals"
        donutdescription="Target you ve set for each month"
        donutpercentage="$90"
        donutheader="Estimated Revenue"
        donutdata={monthlyTarget}
      />
    </div>
  );
};

export default CrmDonut;
