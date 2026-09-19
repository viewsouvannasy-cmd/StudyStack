import { useState } from "react";

// components
import { IconYouTube } from "../icon/icon-static/IconBrand";
import { IconX } from "../icon/icon-static/IconX";
import { IconFile } from "../icon/icon-static/IconFile";
import { IconArrow } from "../icon/icon-static/IconArrow";

// hook
import useMediaQuery from "../../hook/useMediaQuery";

// context
import useOpenPopup from "../../context/useOpenPopup";
import useTheme from "../../theme/useTheme";

export function PopupAddSourse() {
  const { isOpen, handlerClosePopup, isAnimation } = useOpenPopup();

  const [currrentPage, setCurrentPage] = useState<"default" | "video" | "file">(
    "default",
  );

  const { theme } = useTheme();

  const media = useMediaQuery("(min-width: 640px)");

  function handlerClose() {
    handlerClosePopup(media);
    setCurrentPage("default");
  }

  return (
    <div
      className={`${isOpen ? "flex" : "hidden"} ${isAnimation === "close" ? `${media ? "animate-opacity-down" : ""}` : "animate-opacity-up"} fixed top-0 right-0 bottom-0 left-0 z-999 items-end justify-center bg-(--color-overlay) backdrop-blur-xs sm:items-center sm:p-4`}
    >
      <div
        className={`${isAnimation === "close" ? `${media ? "animate-scale-down" : "animate-to-bottom"}` : `${media ? "animate-scale-up" : "animate-from-bottom"}`} h-[80%] ${currrentPage === "default" ? "overflow-scroll" : "overflow-hidden"} w-full translate-y-full rounded-t-2xl bg-(--color-background) px-6 py-6 sm:h-auto sm:max-w-200 sm:translate-y-0 sm:rounded-lg sm:px-8 sm:py-8`}
      >
        {/* select way to create notebook */}
        {currrentPage === "default" && (
          <div className="flex min-h-98 flex-col gap-6">
            <div className="flex flex-col justify-center">
              <IconX
                onClick={() => handlerClosePopup()}
                className="mb-1 cursor-pointer self-end sm:hidden"
              />
              <div className="flex flex-1 justify-center sm:justify-between">
                <div></div>
                <h1 className="text-body sm:text-subsection text-center font-medium">
                  Turn any YouTube Video or Docs into an <br />
                  active learning experience.
                </h1>
                <IconX
                  color={theme === "dark" ? "#fff" : "#000"}
                  className="hidden cursor-pointer sm:flex"
                  onClick={() => handlerClosePopup(media)}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <label className="text-body w-full">Name Your NoteBook</label>
              <input className="text-small w-full border p-4 focus:outline-(--color-focus-ring)" />
            </div>

            <div className="flex border border-(--color-border-strong) sm:flex-1">
              <div
                role="button"
                onClick={() => setCurrentPage("video")}
                className="relative flex min-h-45 flex-1 cursor-pointer flex-col items-start border-r-[0.5px] border-(--color-border-strong) bg-(--color-background) bg-linear-to-t from-(--color-primary) to-(--color-primary-soft) p-3 before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-(--color-background) before:transition-all before:duration-200 hover:before:blur-sm sm:flex-col sm:border-b-[0.5px]"
              >
                <IconYouTube />
                <h1 className="z-1 mt-2 font-medium">Watch & Learn</h1>
                <p className="text-small z-1 font-light text-(--color-text-muted)">
                  Paste a YouTube link and turn the video into an active lesson
                  with questions along the way.
                </p>
              </div>
              <div
                role="button"
                onClick={() => setCurrentPage("file")}
                className="relative flex min-h-45 flex-1 cursor-pointer flex-col items-start border-l-[0.5px] border-(--color-border-strong) bg-(--color-background) bg-linear-to-t from-(--color-primary) to-(--color-primary-soft) p-3 before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-(--color-background) before:transition-all before:duration-200 hover:before:blur-sm sm:border-t-[0.5px]"
              >
                <IconFile />
                <h1 className="z-1 mt-2 font-medium">Bring your File</h1>
                <p className="text-small z-1 font-light text-(--color-text-muted)">
                  Upload a PDF, slide deck, or doc and build a lesson straight
                  from your own material.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* for youtube video */}
        {currrentPage === "video" && (
          <form className="relative flex h-full flex-col justify-between gap-5 sm:min-h-98">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between">
                <div className="mb-1 flex w-full justify-between sm:hidden">
                  <IconArrow
                    className="rotate-270 cursor-pointer"
                    color={theme === "dark" ? "#fff" : "#000"}
                    onClick={() => setCurrentPage("default")}
                  />
                  <IconX
                    color={theme === "dark" ? "#fff" : "#000"}
                    className="cursor-pointer"
                    onClick={handlerClose}
                  />
                </div>
                <IconArrow
                  className="hidden rotate-270 cursor-pointer sm:flex"
                  color={theme === "dark" ? "#fff" : "#000"}
                  onClick={() => setCurrentPage("default")}
                />
                <h1 className="text-body sm:text-subsection w-80 text-center font-medium sm:w-100">
                  Create a Notebook Using a YouTube Video as Source
                </h1>
                <IconX
                  color={theme === "dark" ? "#fff" : "#000"}
                  className="hidden cursor-pointer sm:flex"
                  onClick={handlerClose}
                />
              </div>
              <div className="flex flex-col items-center">
                <div className="flex w-full flex-col gap-2 sm:w-100">
                  <label className="flex items-center gap-3">
                    <IconYouTube size={22} w="w-8" h="h-8" r="rounded-[11px]" />
                    <p className="text-body font-medium">Youtube URL</p>
                  </label>
                  <textarea
                    className="text-caption h-25 resize-none rounded-md border border-(--color-border-strong) bg-(--color-background) p-2 focus:outline-(--color-focus-ring)"
                    placeholder="Pasts your url here"
                    required
                  />
                </div>
                <ul className="text-caption mt-2 w-full list-disc rounded-md bg-(--color-background) pl-4 sm:w-100">
                  <li>Paid articles are not supported</li>
                  <li>
                    The system currently imports only YouTube transcripts
                    (captions)
                  </li>
                  <li>The system only supports public YouTube videos</li>
                  <li>
                    Recently uploaded videos may not yet be available for import
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="group relative w-full cursor-pointer justify-self-end overflow-hidden rounded-lg p-2.5 shadow-lg sm:w-100"
              >
                <span className="absolute inset-0 bg-linear-to-b from-(--color-primary) to-(--color-primary-soft)" />
                <span className="absolute inset-0 bg-linear-to-b from-(--color-primary) from-[-50%] to-(--color-primary-soft) opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <span className="text-small relative">Create</span>
              </button>
            </div>

            {/* card image */}
            <div className="absolute -bottom-15 -left-50 z-[-1] h-50 w-80 rotate-20 rounded-[10px] bg-white p-2.5 shadow-lg shadow-gray-400">
              <img
                src="/image/python_thumbnail.png"
                loading="lazy"
                className="h-full w-full rounded-[9px] object-cover"
              />
            </div>
            <div className="absolute bottom-2 -left-60 z-[-2] h-50 w-80 rotate-2 rounded-[10px] bg-white p-2.5 shadow-lg shadow-gray-400">
              <img
                loading="lazy"
                src="/image/linear_regression_course_thumbnail_final.png"
                className="h-full w-full rounded-[9px] object-cover"
              />
            </div>
            <div className="absolute -bottom-45 -left-40 z-[-3] h-50 w-80 rotate-8 rounded-[10px] bg-white p-2.5 shadow-md shadow-gray-400">
              <img
                loading="lazy"
                src="/image/supply_demand.png"
                className="h-full w-full rounded-[9px] object-cover"
              />
            </div>
          </form>
        )}

        {/* for file */}
        {currrentPage === "file" && <div>File</div>}
      </div>
    </div>
  );
}
