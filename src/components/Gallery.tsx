import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { GalleryItem } from "@/types";

type Group = { images: string[]; url?: string };

const normalize = (item: GalleryItem): Group => {
  if (typeof item === "string") return { images: [item] };
  if ("images" in item) return { images: item.images, url: item.url };
  return { images: [item.src], url: item.url };
};

const VIDEO_EXT = /\.(mp4|webm|mov|m4v|ogg)$/i;
const isVideo = (src: string) => VIDEO_EXT.test(src);

const Gallery = ({ images }: { images?: GalleryItem[] }) => {
  const [active, setActive] = useState<{
    group: number;
    image: number;
    dir: "prev" | "next" | null;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const groups: Group[] = images?.map(normalize) ?? [];
  const total = groups.length;

  const currentGroup = active !== null ? groups[active.group] : null;
  const currentCount = currentGroup?.images.length ?? 0;

  const showPrev = () =>
    setActive((a) =>
      a === null
        ? null
        : { ...a, image: (a.image - 1 + currentCount) % currentCount, dir: "prev" },
    );
  const showNext = () =>
    setActive((a) =>
      a === null ? null : { ...a, image: (a.image + 1) % currentCount, dir: "next" },
    );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, currentCount]);

  if (total === 0) return null;

  const currentSrc = currentGroup?.images[active?.image ?? 0];

  const modal = active && currentGroup && currentSrc && (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_.15s_ease-out]"
      onClick={() => setActive(null)}
    >
      <div
        className="relative w-full max-w-[460px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between h-12 px-3 border-b border-gray-100 shrink-0">
          <span className="text-[13px] text-gray-500 font-medium tabular-nums pl-2">
            {currentCount > 1 ? `${active.image + 1} / ${currentCount}` : ""}
          </span>
          <button
            type="button"
            onClick={() => setActive(null)}
            className="w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-full transition"
            aria-label="닫기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative bg-gray-50 overflow-hidden">
          {isVideo(currentSrc) ? (
            <video
              key={`${active.group}-${active.image}`}
              src={currentSrc}
              controls
              autoPlay
              playsInline
              className="block w-full h-auto max-h-[60vh] object-contain mx-auto bg-black"
              style={
                active.dir
                  ? {
                      animation: `${
                        active.dir === "next" ? "slideInRight" : "slideInLeft"
                      } .25s ease-out`,
                    }
                  : undefined
              }
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${active.group}-${active.image}`}
              src={currentSrc}
              alt=""
              className="block w-full h-auto max-h-[60vh] object-contain mx-auto"
              style={
                active.dir
                  ? {
                      animation: `${
                        active.dir === "next" ? "slideInRight" : "slideInLeft"
                      } .25s ease-out`,
                    }
                  : undefined
              }
            />
          )}

          {currentCount > 1 && (
            <>
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/95 hover:bg-white shadow-md text-gray-700"
                aria-label="이전 이미지"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/95 hover:bg-white shadow-md text-gray-700"
                aria-label="다음 이미지"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {currentGroup.url && (
          <div className="px-5 py-5 shrink-0 bg-white">
            <a
              href={currentGroup.url}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: "#3182F6",
                color: "#FFFFFF",
                fontFamily:
                  "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
                fontSize: "16px",
                fontWeight: 700,
                padding: "16px 0",
                borderRadius: "12px",
                width: "100%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                textDecoration: "none",
                transition: "background-color .15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1B64DA")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3182F6")}
            >
              사이트로 이동하기
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-wrap gap-2 mt-3">
        {groups.map((group, i) => {
          const firstSrc = group.images[0];
          const extra = group.images.length - 1;
          const video = isVideo(firstSrc);
          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive({ group: i, image: 0, dir: null })}
              className="relative w-24 h-24 rounded-md overflow-hidden border border-GRAY_LIGHT dark:border-GRAY_HEAVY hover:opacity-80 transition cursor-zoom-in"
              aria-label={video ? "동영상 재생" : "이미지 확대"}
            >
              {video ? (
                <>
                  <video
                    src={firstSrc}
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover bg-black"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <span className="w-7 h-7 rounded-full bg-white/95 flex items-center justify-center shadow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-gray-800 ml-[2px]"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </>
              ) : (
                <Image src={firstSrc} alt="" fill sizes="96px" className="object-cover" />
              )}
              {extra > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-black/75 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full backdrop-blur-sm leading-none">
                  +{extra}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {mounted && modal && createPortal(modal, document.body)}
    </>
  );
};

export default Gallery;
