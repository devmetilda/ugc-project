import type { Project } from "../types";
import { Loader2Icon } from "lucide-react";

type ProjectCardProps = {
  gen: Project;
  setGenerations: React.Dispatch<React.SetStateAction<Project[]>>;
  forCommunity?: boolean;
};

const ProjectCard = ({
  gen,
  setGenerations,
  forCommunity = false,
}: ProjectCardProps) => {
  return (
    <div className="mb-4 break-inside-avoid">
      <div className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20">
        {/* Preview */}
        <div
          className={`relative overflow-hidden ${
            gen.aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video"
          }`}
        >
          {/* Generated Image */}
          {gen.generatedImage && (
            <img
              src={gen.generatedImage}
              alt={gen.productName}
              className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${
                gen.generatedVideo
                  ? "group-hover:opacity-0"
                  : "group-hover:scale-105"
              }`}
            />
          )}

          {/* Generated Video */}
          {gen.generatedVideo && (
            <video
              src={gen.generatedVideo}
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
          )}

          {/* Loading */}
          {!gen.generatedImage && !gen.generatedVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Loader2Icon className="h-7 w-7 animate-spin text-white" />
            </div>
          )}

          {/* Status */}
          <div className="absolute left-3 top-3 flex gap-2">
            {gen.isGenerating && (
              <span className="rounded-full bg-yellow-600/30 px-2 py-1 text-xs text-white">
                Generating
              </span>
            )}

            {gen.isPublished && (
              <span className="rounded-full bg-green-600/30 px-2 py-1 text-xs text-white">
                Published
              </span>
            )}
          </div>

          {/* Source Images */}
          <div className="absolute bottom-3 right-3 flex items-center">
            {gen.uploadedImages?.[0] && (
              <img
                src={gen.uploadedImages[0]}
                alt="Product"
                className="h-16 w-16 rounded-full object-cover"
              />
            )}

            {gen.uploadedImages?.[1] && (
              <img
                src={gen.uploadedImages[1]}
                alt="Model"
                className="-ml-6 h-16 w-16 rounded-full border-2 border-white/20 object-cover"
                style={{ animationDelay: "3s" }}
              />
            )}
          </div>
        </div>

        {/* Details */}
        <div className="p-4">
          {/* product name, date, aspect ratio */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-medium text-lg mb-1">
                {gen.productName}
              </h3>

              <p className="text-sm text-gray-400">
                Created:{" "}
                {gen.createdAt
                  ? new Date(gen.createdAt).toLocaleString()
                  : "N/A"}
              </p>

              {gen.updatedAt && (
                <p className="text-xs text-gray-500 mt-1">
                  Updated: {new Date(gen.updatedAt).toLocaleString()}
                </p>
              )}
            </div>

            <div className="text-right">
              <div className="mt-2 flex flex-col items-end gap-1">
                <span className="text-xs px-2 py-1 bg-white/5 rounded-full">
                  Aspect: {gen.aspectRatio}
                </span>
              </div>
            </div>
          </div>

          {/* product description */}
          {gen.productDescription && (
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-1">Description</p>
              <div className="text-sm text-gray-300 bg-white/3 p-2 rounded-md break-words">
                {gen.productDescription}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;