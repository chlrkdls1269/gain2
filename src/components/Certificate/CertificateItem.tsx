import Gallery from "../Gallery";

import { CertificateProps } from "@/types";

const CertificateItem = ({ name, date, organizer, gallery }: CertificateProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-0">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h3>{name}</h3>
          <span>{date}</span>
        </div>
        <span>{organizer}</span>
        <Gallery images={gallery} />
      </div>
    </div>
  );
};

export default CertificateItem;
