"use client";

import React, { useState, useEffect } from "react";
import { GitCommit, Clock, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CommitHoursComponent = ({ commit, handleLogHoursForCommit, session }) => {
  const [localHours, setLocalHours] = useState(0);
  const [commitDetails, setCommitDetails] = useState(null);
  const [commitDiffs, setCommitDiffs] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDiff, setLoadingDiff] = useState(false);

  const handleInputChange = (e) => {
    setLocalHours(e.target.value);
  };

  const handleSaveHours = () => {
    const hours = parseFloat(localHours) || 0;
    handleLogHoursForCommit(commit.sha, hours);
  };

  // Function to fetch commit diff using GitHub OAuth token from session
  const fetchCommitDiff = async (sha) => {
    if (commitDiffs[sha]) return; // If diff is already fetched, no need to fetch again

    setLoadingDiff(true);
    try {
      const token = session?.accessToken; // Extract GitHub access token from session

      if (!token) {
        throw new Error("GitHub token not available in session");
      }

      const repoOwner = commit.repoOwner || commit.author.login;
      const repoName = commit.repoName || "git-invoice"; // Provide a fallback if necessary

      const response = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/commits/${sha}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use OAuth token for authentication
            Accept: "application/vnd.github.v3+json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch commit diff");
      }

      const data = await response.json();
      const diff = data.files.map((file) => file.patch).join("\n");

      setCommitDiffs((prevDiffs) => ({
        ...prevDiffs,
        [sha]: diff, // Save the diff data
      }));
    } catch (error) {
      console.error("Error fetching commit diff:", error);
    } finally {
      setLoadingDiff(false);
    }
  };

  useEffect(() => {
    const fetchCommitDetails = async () => {
      try {
        setLoading(true);
        const token = session?.accessToken; // Assuming token is available here
        if (!token) {
          throw new Error("Please login to see commit details.");
        }

        const repoOwner = commit.repoOwner || commit.author.login;
        const repoName = commit.repoName || "git-invoice"; // Provide a fallback if necessary

        const response = await fetch(
          `https://api.github.com/repos/${repoOwner}/${repoName}/commits/${commit.sha}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch commit details: ${response.statusText}`,
          );
        }

        const data = await response.json();
        setCommitDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommitDetails();
  }, [commit, session]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto my-8 shadow-lg">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <GitCommit className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl font-bold">
                {commitDetails?.commit?.message || "Commit"}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {commit.sha.slice(0, 7)}
              </p>
            </div>
          </div>
          <Badge variant="default">Commit</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {error && <p className="text-red-500">Error: {error}</p>}
          {commitDetails && (
            <>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{commitDetails.commit.author.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(commitDetails.commit.author.date)}</span>
                </div>
              </div>

              <div>
                <p className="text-sm">
                  <strong>Files Changed:</strong>{" "}
                  {commitDetails.files?.length || 0}
                </p>
                <ul className="list-disc ml-4 text-sm">
                  {commitDetails.files?.map((file) => (
                    <li key={file.filename}>
                      {file.filename} ({file.status})
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Commits</h3>
            {commitDetails?.files?.map((file, index) => (
              <Accordion
                type="single"
                collapsible
                className="w-full"
                key={file.filename}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger
                    onClick={() => fetchCommitDiff(commit.sha)} // Fetch diff on click
                  >
                    <div className="flex items-center space-x-2">
                      <GitCommit className="h-4 w-4" />
                      <span className="font-mono text-sm">
                        {commit.sha.slice(0, 7)}
                      </span>
                      <span className="text-sm">{file.filename}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {commitDiffs[commit.sha] ? (
                      <div className="bg-muted p-4 rounded-md overflow-x-auto">
                        <pre className="text-sm">{commitDiffs[commit.sha]}</pre>
                      </div>
                    ) : (
                      <p>
                        {loadingDiff ? "Loading diff..." : "No diff available."}
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>

          <div className="mt-6 flex items-center space-x-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <Input
              type="number"
              placeholder="Hours worked"
              value={localHours}
              onChange={handleInputChange}
              className="max-w-[150px]"
            />
            <Button onClick={handleSaveHours}>Add Hours</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommitHoursComponent;
