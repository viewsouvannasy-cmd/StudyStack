// library
import { useState } from "react";

// components
import { IconYouTube } from "../icon/icon-static/IconBrand";
import { IconX } from "../icon/icon-static/IconX";
import { IconFile } from "../icon/icon-static/IconFile";
import { Switch } from "../button/Switch";

// hook
import useMediaQuery from "../../hook/useMediaQuery";

// context
import useOpenPopup from "../../context/useOpenPopup";

export function PopupAddSourse() {
  const { isOpen, handlerClosePopup, isAnimation } = useOpenPopup();

  const [aiOptions, setAiOptions] = useState({
    generateImage: true,
    nameing: true,
  });

  const media = useMediaQuery("(min-width: 640px)");

  return (
    <div
      className={`${isOpen ? "flex" : "hidden"} ${isAnimation === "close" ? `${media ? "animate-opacity-down" : ""}` : "animate-opacity-up"} fixed top-0 right-0 bottom-0 left-0 z-999 items-end justify-center bg-(--color-overlay) backdrop-blur-xs sm:items-center sm:p-4`}
    >
      <div
        className={`${isAnimation === "close" ? `${media ? "animate-scale-down" : "animate-to-bottom"}` : `${media ? "animate-scale-up" : "animate-from-bottom"}`} flex h-[90%] w-full translate-y-full flex-col gap-6 overflow-scroll rounded-t-2xl bg-(--color-background) px-6 py-6 sm:h-auto sm:max-w-235 sm:translate-y-0 sm:rounded-lg sm:px-10 sm:py-10`}
      >
        <div className="flex flex-col justify-center gap-1">
          <IconX
            onClick={() => handlerClosePopup()}
            className="cursor-pointer self-end sm:hidden"
          />
          <div className="flex flex-1 justify-center sm:justify-between">
            <div></div>
            <h1 className="text-body sm:text-subsection text-center font-medium">
              Turn any YouTube Video or Docs into an <br />
              active learning experience.
            </h1>
            <IconX
              className="hidden cursor-pointer sm:flex"
              onClick={() => handlerClosePopup(media)}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-8 sm:flex-row">
          <div className="flex border border-(--color-border-strong) sm:flex-1 sm:flex-col">
            <div className="relative flex min-h-45 flex-1 cursor-pointer flex-col items-start border-r-[0.5px] border-(--color-border-strong) bg-(--color-background) bg-linear-to-b from-(--color-primary) to-(--color-primary-soft) p-3 before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-(--color-background) before:transition-all before:duration-200 hover:before:blur-sm sm:flex-col sm:border-b-[0.5px]">
              <IconYouTube />
              <h1 className="z-1 mt-2 font-medium">Watch & Learn</h1>
              <p className="text-small z-1 font-light text-(--color-text-muted)">
                Paste a YouTube link and turn the video into an active lesson
                with questions along the way.
              </p>
            </div>
            <div className="relative flex min-h-45 flex-1 cursor-pointer flex-col items-start border-l-[0.5px] border-(--color-border-strong) bg-(--color-background) bg-linear-to-t from-(--color-primary) to-(--color-primary-soft) p-3 before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-(--color-background) before:transition-all before:duration-200 hover:before:blur-sm sm:border-t-[0.5px]">
              <IconFile />
              <h1 className="z-1 mt-2 font-medium">Bring your File</h1>
              <p className="text-small z-1 font-light text-(--color-text-muted)">
                Upload a PDF, slide deck, or doc and build a lesson straight
                from your own material.
              </p>
            </div>
          </div>

          <div className="flex flex-1 grow flex-col justify-between">
            <div>
              <div className="mb-1.5 flex items-center gap-1">
                <h1 className="text-large-body font-medium">AI Options</h1>
                <img src="/image/ai-star.png" className="h-5 w-5" />
              </div>

              <div className="flex justify-between gap-3 border-b border-(--color-border-strong) pb-2">
                <div>
                  <p className="font-medium">AI Generateing Image</p>
                  <span className="text-small mt-0.5 block font-light text-(--color-text-muted)">
                    Generate an image the related about the core content of the
                    source
                  </span>
                </div>
                <Switch
                  state={aiOptions.generateImage}
                  onChange={() => {
                    const update = { ...aiOptions };
                    update.generateImage = !update.generateImage;
                    setAiOptions(update);
                  }}
                />
              </div>

              <div className="mt-2 flex justify-between gap-3 border-b border-(--color-border-strong) pb-2">
                <div>
                  <p className="font-medium">AI Nameing</p>
                  <span className="text-small mt-0.5 block leading-[1.3] font-light text-(--color-text-muted)">
                    Turn your core source content to short clarity name
                  </span>
                </div>
                <Switch
                  state={aiOptions.nameing}
                  onChange={() => {
                    const update = { ...aiOptions };
                    update.nameing = !update.nameing;
                    setAiOptions(update);
                  }}
                />
              </div>
            </div>

            <div className="flex min-h-25 items-end justify-center sm:justify-end">
              <span className="text-caption block text-center leading-4 font-light text-(--color-text-muted) sm:text-end">
                AI Option can use
                <br className="hidden sm:flex" /> your credit more in the
                process
                <br /> creating notebook especially
                <br className="hidden sm:flex" /> generate image ,so use it
                carefully.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
