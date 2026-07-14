import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import { Loader2Icon, PlaySquareIcon, EllipsisIcon, ImageIcon, Share2Icon, Trash2Icon } from "lucide-react";
import { PrimaryButton, GhostButton } from "./Buttons"; // Rectified: Added missing button imports here

const ProjectCard = (
  {
    gen,
    setGenerations,
    forCommunity = false,
  }: {
    gen: Project;
    setGenerations: React.Dispatch<React.SetStateAction<Project[]>>;
    forCommunity?: boolean;
  }
) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDelete = async (id: string)=>{
    const confirm = window.confirm('Are you sure you want to delete this project?');
    if(!confirm) return;
    console.log(id)
  };

  const togglePublish = async (projectId: string)=>{
    console.log(projectId)
  };

  return (
    <div className="mb-4 break-inside-avoid">
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition group relative">
        {/* preview */}
        <div
          className={`${
            gen?.aspectRatio === "9:16"
              ? "aspect-[9/16]"
              : "aspect-video"
          } relative overflow-hidden`}
          onMouseEnter={() => videoRef.current?.play()}
          onMouseLeave={() => {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }}
        >
          {gen.generatedImage && (
            <img
              src={gen.generatedImage}
              alt={gen.productName}
              className={`absolute inset-0 w-full h-full object-cover transition duration-500 ${
                gen.generatedVideo
                  ? "group-hover:opacity-0"
                  : "group-hover:scale-105"
              }`}
            />
          )}

          {gen.generatedVideo && (
            <video
              ref={videoRef}
              src={gen.generatedVideo}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500"
            />
          )}

          {(!gen?.generatedImage && !gen?.generatedVideo) && (
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black/20">
              <Loader2Icon className="size-7 animate-spin text-white"/>
            </div>
          )}

          {/* status badges */}
          <div className="absolute left-3 top-3 flex gap-2 items-center z-20">
            {gen.isGenerating && (
              <span className="text-xs px-2 py-1 bg-yellow-600/30 text-white rounded-full">Generating</span>
            )}

            {gen.isPublished && (
              <span className="text-xs px-2 py-1 bg-green-600/30 text-white rounded-full">Published</span>
            )}
          </div>

          {/* Action Menu for my generations only */}
          {!forCommunity && (
            <div
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
              className="absolute right-3 top-3 z-30 flex flex-col items-end sm:opacity-0 group-hover:opacity-100 transition duration-200"
            >
              <button 
                type="button"
                className="bg-black/60 hover:bg-black/80 text-white rounded-full p-2 backdrop-blur transition border border-white/10 flex items-center justify-center cursor-pointer"
              >
                <EllipsisIcon className="size-5 text-white" />
              </button>

              <ul
                className={`text-xs ${
                  menuOpen ? "block" : "hidden"
                } w-40 bg-black/90 backdrop-blur text-white border border-white/10 rounded-lg shadow-xl mt-1 py-1`}
              >
                {gen.generatedImage && (
                  <li>
                    <a
                      href="#" 
                      download
                      className="flex gap-2 items-center px-4 py-2 hover:bg-white/10 cursor-pointer text-white"
                    >
                      <ImageIcon className="size-3.5" />
                      <span>Download Image</span>
                    </a>
                  </li>
                )}

                {gen.generatedVideo && (
                  <li>
                    <a
                      href="#" 
                      download
                      className="flex gap-2 items-center px-4 py-2 hover:bg-white/10 cursor-pointer text-white"
                    >
                      <PlaySquareIcon className="size-3.5" />
                      <span>Download Video</span>
                    </a>
                  </li>
                )}

                {(gen.generatedVideo && gen.generatedImage) && (
                  <li>
                    <button 
                      onClick={() => navigator.share({url: gen.generatedVideo || gen.generatedImage, title: gen.productName, text: gen.productDescription})}
                      className="w-full flex gap-2 items-center px-4 py-2 hover:bg-white/10 cursor-pointer text-white text-left"
                    >
                      <Share2Icon className="size-3.5"/> <span>Share</span>
                    </button>
                  </li>
                )}

                <li>
                  <button 
                    onClick={() => handleDelete(gen.id)}
                    className="w-full flex gap-2 items-center px-4 py-2 hover:bg-red-950/20 text-red-400 cursor-pointer text-left"
                  >
                    <Trash2Icon className="size-3.5"/> <span>Delete</span>
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* source images */}
          <div className="absolute right-3 bottom-3 z-20">
            <img src={gen.uploadedImages[0]} alt="product" className="w-16 h-16 object-cover rounded-full animate-float "/>
            <img src={gen.uploadedImages[1]} alt="model" className="w-16 h-16 object-cover rounded-full animate-float -ml-8" style={{animationDelay: '3s'}}/>
          </div>
        </div>

        {/* details */}
        <div className="p-4">
          {/* product name, date, aspect ratio */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-medium text-lg mb-1">{gen.productName}</h3>
              <p className="text-sm text-gray-400">Created: {new Date(gen.createdAt).toLocaleString()}</p>
              {gen.updatedAt && (
                <p className="text-xs text-gray-500 mt-1">Updated: {new Date(gen.updatedAt).toLocaleString()}</p>
              )}
            </div>

            <div className="text-right">
              <div className="mt-2 flex flex-col items-end gap-1">
                <span className="text-xs px-2 py-1 bg-white/5 rounded-full">Aspect: {gen.aspectRatio}</span>
              </div>
            </div>
          </div>

          {/* product description */}
          {gen.productDescription && (
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-1">Description</p>
              <div className="text-sm text-gray-300 bg-white/3 p-2 rounded-md wrap-break-word">{gen.productDescription}</div>
            </div>
          )}

          {/* user prompt */}
          {gen.userPrompt && (
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-1">Description</p>
              <div className="text-xs text-gray-300">{gen.userPrompt}</div>
            </div>
          )}

          {/* buttons */}
          {!forCommunity && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <GhostButton
                className="text-xs justify-center"
                onClick={() => {
                  navigate(`/result/${gen.id}`);
                  window.scrollTo(0, 0); // Rectified: Added global window namespace indicator
                }}
              >
                View Details
              </GhostButton>

              <PrimaryButton
                onClick={() => togglePublish(gen.id)}
                className="rounded-md"
              >
                {gen.isPublished ? "Unpublish" : "Publish"}
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;