import React, { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import type { Project } from "../types";
import { dummyGenerations } from "../assets/assets";
import { useNavigate, useParams } from "react-router-dom";

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
    <div>
    </div>
  );
};

export default Result;
