import React from "react";
import { format } from "date-fns";
import { GitPullRequest, GitCommit, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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

export function CompactPullRequestListJsx({
  pullRequests = [],
  commitsByPR = {},
  selectedPRs = new Set(),
  toggleSelection = () => {},
  descriptionMaxLength = 100,
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold mb-4">Pull Requests</h2>
      {pullRequests.map((pr) => (
        <Card
          key={pr.id}
          className={`overflow-hidden cursor-pointer transition-colors ${
            selectedPRs.has(pr.id) ? "border-primary" : "border-gray-200"
          }`}
          onClick={() => toggleSelection(pr.id, true)}
        >
          <CardHeader className="p-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`pr-checkbox-${pr.id}`}
                checked={selectedPRs.has(pr.id)}
                onCheckedChange={() => toggleSelection(pr.id, true)}
                onClick={(e) => e.stopPropagation()}
              />
              <GitPullRequest className="h-5 w-5 text-primary flex-shrink-0" />
              <CardTitle className="text-base flex-grow truncate">
                <span className="font-normal text-muted-foreground mr-2">
                  #{pr.number}
                </span>
                <a
                  href={`https://github.com/${pr.base.repo.owner.login}/${pr.base.repo.name}/pull/${pr.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {pr.title}
                </a>
              </CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={pr.user.avatar_url}
                          alt={pr.user.login}
                        />
                        <AvatarFallback>
                          {pr.user.login.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Badge
                        variant={pr.state === "open" ? "default" : "secondary"}
                      >
                        {pr.state}
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{pr.user.login}</p>
                    <p>{format(new Date(pr.created_at), "MMM d, yyyy")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div
              className="text-sm text-muted-foreground mb-2"
              dangerouslySetInnerHTML={{
                __html: marked(
                  truncateText(
                    pr.body || "No description provided",
                    descriptionMaxLength,
                  ),
                ),
              }}
            />
            {commitsByPR[pr.id] && commitsByPR[pr.id].length > 0 && (
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between p-0 h-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-xs">
                      Commits ({commitsByPR[pr.id].length})
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="space-y-1 mt-2">
                    {commitsByPR[pr.id].map((commit) => (
                      <li
                        key={commit.sha}
                        className="flex items-start space-x-2 text-xs"
                      >
                        <GitCommit className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                        <div className="flex-grow">
                          <p className="font-medium">
                            {truncateText(commit.commit.message, 50)}
                          </p>
                          <p className="text-muted-foreground">
                            {commit.commit.author.name} on{" "}
                            {format(
                              new Date(commit.commit.author.date),
                              "MMM d, yyyy",
                            )}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
