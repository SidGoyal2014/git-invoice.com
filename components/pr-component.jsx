"use client";

import React, { useState } from "react";
import { GitPullRequest, GitCommit, Clock, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export function PrComponent({
  id,
  number,
  title,
  description,
  state,
  body,
  createdAt,
  commits = [],
  onLogHours, // Callback to pass hours worked
  session, // Session object from NextAuth
}) {
  const [hoursWorked, setHoursWorked] = useState("");
  const [commitDiffs, setCommitDiffs] = useState({}); // Store diffs here
  const [loadingDiff, setLoadingDiff] = useState(false); // State for loading indicator

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleLogHours = () => {
    const hours = parseFloat(hoursWorked) || 0;
    if (onLogHours) {
      onLogHours(hours); // Pass the hours worked to the parent component
    }
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

      const response = await fetch(
        `https://api.github.com/repos/ezzcodeezzlife/git-invoice/commits/${sha}`,
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

  return (
    <Card className="w-full max-w-4xl mx-auto my-8 shadow-lg">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <GitPullRequest className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-2xl font-bold">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">#{number}</p>
            </div>
          </div>
          <Badge variant={state === "open" ? "default" : "secondary"}>
            {state}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {body || "No description available"}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{session?.user?.name || "Unknown User"}</span>{" "}
              {/* Logged-in user */}
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Commits</h3>
            <Accordion type="single" collapsible className="w-full">
              {commits.map((commit, index) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={commit.sha}
                  onClick={() => fetchCommitDiff(commit.sha)} // Fetch diff on click
                >
                  <AccordionTrigger>
                    <div className="flex items-center space-x-2">
                      <GitCommit className="h-4 w-4" />
                      <span className="font-mono text-sm">
                        {commit.sha.slice(0, 7)}
                      </span>
                      <span className="text-sm">{commit.message}</span>
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
              ))}
            </Accordion>
          </div>

          <div className="mt-6 flex items-center space-x-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <Input
              type="number"
              placeholder="Hours worked"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(e.target.value)}
              className="max-w-[150px]"
            />
            <Button onClick={handleLogHours}>Add Hours</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
