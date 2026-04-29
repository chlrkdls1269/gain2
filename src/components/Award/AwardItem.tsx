import Gallery from "../Gallery";

import { AwardProps } from "@/types";

const AwardItem = ({ name, date, organizer, description, gallery }: AwardProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-0">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h3 className="text-2xl">{name}</h3>
          <span>{date}</span>
        </div>
        <span>{organizer}</span>
        <span className="whitespace-pre-wrap">{`${description}`}</span>
        <Gallery images={gallery} />
      </div>
    </div>
  );
};

export default AwardItem;
