import Gallery from "../Gallery";

import { ActivityProps } from "@/types";

const ActivityItem = ({ name, period, description, gallery }: ActivityProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-0">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h3>{name}</h3>
          <span>{`${period[0]}${period[1] ? " - " + period[1] : ""}`}</span>
        </div>
        <span className="whitespace-pre-wrap">{`${description}`}</span>
        <Gallery images={gallery} />
      </div>
    </div>
  );
};

export default ActivityItem;
