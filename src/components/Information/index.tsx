import Image from "next/image";

import ContactItem from "../ContactItem";
import Introduce from "./Introduce";

import { DataProps } from "@/types";

const Information = ({ information }: Pick<DataProps, "information">) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="relative shrink-0 w-40 h-40 rounded-full overflow-hidden">
          <Image
            src="/id_photo/id.jpg"
            alt={`${information.name} 프로필 사진`}
            fill
            sizes="160px"
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="leading-[1.15] text-4xl lg:text-[45px] relative px-4 z-20 inline-block">
            {/* 포지션에 맞게 문구를 수정해주세요. 혹은, 본인이 원하는 대로 문구를 바꿔주세요. */}
            안녕하세요,
            <br /> 백엔드 개발자{" "}
            <span className="text-PRIMARY font-semibold">{information.name}</span>
            입니다.
          </h1>
          <div className="flex px-4 gap-1">
            {information.contact.map((contact) => (
              <ContactItem
                key={contact.id}
                className="text-BLACK hover:text-PRIMARY_HEAVY dark:hover:text-PRIMARY_HEAVY"
                {...contact}
              >
                {contact.name}
              </ContactItem>
            ))}
          </div>
        </div>
      </div>
      <Introduce markdown={information.markdown} />
    </div>
  );
};

export default Information;
