"use client";

import React from "react";
import { format } from "date-fns";
import { GitCommit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { marked } from "marked";

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

export function CommitList({
  commits = [],
  selectedCommits = new Set(),
  toggleSelection = () => {},
  messageMaxLength = 200,
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold mb-4">Commits</h2>

      {commits.length == 0 && (
        <p className="text-muted-foreground">No commits selected yet.</p>
      )}

      {commits.map((commit, index) => (
        <Card
          key={`${commit.sha}-${index}`}
          className={`overflow-hidden cursor-pointer transition-colors ${
            selectedCommits.has(commit.sha)
              ? "border-primary"
              : "border-gray-200"
          }`}
          onClick={() => toggleSelection(commit.sha, false)}
        >
          <CardHeader className="p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={`commit-checkbox-${commit.sha}`}
                checked={selectedCommits.has(commit.sha)}
                onCheckedChange={() => toggleSelection(commit.sha, false)}
                onClick={(e) => e.stopPropagation()}
              />
              <GitCommit className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="font-mono text-sm text-muted-foreground">
                {commit.sha.slice(0, 7)}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-auto">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={commit.author?.avatar_url}
                          alt={commit.commit.author.name}
                        />
                        <AvatarFallback>
                          {commit.commit.author.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Badge variant="outline">
                        {format(
                          new Date(commit.commit.author.date),
                          "MMM d, yyyy",
                        )}
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{commit.commit.author.name}</p>
                    <p>{commit.commit.author.email}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardTitle className="text-base">
              <a
                href={commit.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {truncateText(commit.commit.message.split("\n")[0], 100)}
              </a>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: marked(
                  truncateText(commit.commit.message, messageMaxLength),
                ),
              }}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
