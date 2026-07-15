import React, { useEffect, useState } from "react";
import {
  Loader2Icon,
  RefreshCwIcon,
  ImageIcon,
  VideoIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { Project } from "../types";
import { dummyGenerations } from "../assets/assets";
import { GhostButton } from "../components/Buttons";

const Result = () => {
  const [project, setProjectData] = useState<Project>({} as Project);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchProjectData = async () => {
    setTimeout(() => {
      setProjectData(dummyGenerations[0]);
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  return loading ? (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader2Icon className="size-9 animate-spin text-indigo-500" />
    </div>
  ) : (
    <div className="min-h-screen mt-20 p-6 text-white md:p-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-medium md:text-3xl">
            Generation Result
          </h1>

          <Link
            to="/generate"
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <RefreshCwIcon className="h-4 w-4" />
            <p className="max-sm:hidden">New Generation</p>
          </Link>
        </header>

        {/* Grid */}
        <div className="grid items-start gap-8 lg:grid-cols-3">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            <div className="glass-panel w-fit rounded-2xl p-2">
              <div
                className={`${
                  project?.aspectRatio === "9:16"
                    ? "aspect-[9/16]"
                    : "aspect-video"
                } relative overflow-hidden rounded-xl bg-gray-900 sm:max-h-[800px]`}
              >
                {project.generatedVideo ? (
                  <video
                    src={project.generatedVideo}
                    controls
                    autoPlay
                    loop
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={project.generatedImage}
                    alt="Generated Result"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6 self-start">

            {/* Actions */}
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Actions
              </h3>

              <div className="flex flex-col gap-3">
                <a
                  href={project.generatedImage || "#"}
                  download
                >
                  <GhostButton
                    disabled={!project.generatedImage}
                    className="w-full justify-center rounded-md py-3 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ImageIcon className="size-4.5" />
                    Download Image
                  </GhostButton>
                </a>

                <a
                  href={project.generatedVideo || "#"}
                  download
                >
                  <GhostButton
                    disabled={!project.generatedVideo}
                    className="w-full justify-center rounded-md py-3 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <VideoIcon className="size-4.5" />
                    Download Video
                  </GhostButton>
                </a>
              </div>
            </div>
                        {/* Generate Video */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;