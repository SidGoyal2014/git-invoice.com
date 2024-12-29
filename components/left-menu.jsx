import React, { useState, useEffect } from "react";
import { GitFork, ChevronDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PullRequestList } from "./pull-request-list";
import { CommitList } from "./commit-list";

const HARD_CODED_REPOS = [
  
  {
    "id": 2,
    "full_name": "johnsmith/webapp-dashboard",
    "name": "WebApp Dashboard",
    "description": "A modern, customizable dashboard for web applications with real-time data updates.",
    "stargazers_count": 1,
    "forks_count": 2
  },
  {
    "id": 1,
    "full_name": "johnsmith/backend-api",
    "name": "Backend API",
    "description": "A RESTful API built with Node.js and Express for managing user data and authentication.",
    "stargazers_count": 3,
    "forks_count": 2
  },
  {
    "id": 3,
    "full_name": "johnsmith/react-native-chat",
    "name": "React Native Chat",
    "description": "A cross-platform real-time chat app built using React Native and Firebase for mobile freelancers.",
    "stargazers_count": 2,
    "forks_count": 1
  }
]


export function LeftMenuComponent({ repos = [], onSelectionChange }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [pullRequests, setPullRequests] = useState([]);
  const [commitsByPR, setCommitsByPR] = useState({});
  const [unrelatedCommits, setUnrelatedCommits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPRs, setSelectedPRs] = useState(new Set());
  const [selectedUnrelatedCommits, setSelectedUnrelatedCommits] = useState(
    new Set(),
  );

  useEffect(() => {
    if (selectedRepo) {
      fetchData();
    }
    // Reset selection states when the selectedRepo changes
    setSelectedPRs(new Set());
    setSelectedUnrelatedCommits(new Set());
  }, [selectedRepo]);

  useEffect(() => {
    const selectedPRData = Array.from(selectedPRs).map((id) =>
      pullRequests.find((pr) => pr.id === id),
    );
    const selectedUnrelatedCommitData = Array.from(
      selectedUnrelatedCommits,
    ).map((sha) => unrelatedCommits.find((commit) => commit.sha === sha));

    // Pass additional data to parent
    onSelectionChange({
      selectedPRs: selectedPRData,
      selectedUnrelatedCommits: selectedUnrelatedCommitData,
      pullRequests, // Pass all pull requests
      commitsByPR, // Pass commits by PR
      unrelatedCommits, // Pass unrelated commits
    });
  }, [selectedPRs, selectedUnrelatedCommits, onSelectionChange]);

  const fetchData = async () => {
    setLoading(true);

    // Reset previous data
    setPullRequests([]);
    setCommitsByPR({});
    setUnrelatedCommits([]);

    try {
      if (session) {
        const pullRequestsData = await fetchFromGitHub(
          `repos/${selectedRepo.full_name}/pulls?state=all&per_page=100`,
        );
        setPullRequests(pullRequestsData);
        await Promise.all(pullRequestsData.map(fetchCommitsForPR));
      }

      // Fetch unrelated commits from the main branch if the user is not authenticated
      await fetchUnrelatedCommitsFromMain();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFromGitHub = async (endpoint) => {
    const response = await fetch(`https://api.github.com/${endpoint}`, {
      headers: session
        ? { Authorization: `Bearer ${session.accessToken}` }
        : {},
    });
    if (!response.ok)
      throw new Error(`Error fetching data: ${response.statusText}`);
    return await response.json();
  };

  const fetchCommitsForPR = async (pr) => {
    const commits = await fetchFromGitHub(
      `repos/${selectedRepo.full_name}/pulls/${pr.number}/commits`,
    );
    setCommitsByPR((prev) => ({ ...prev, [pr.id]: commits }));
  };

  const fetchUnrelatedCommitsFromMain = async () => {
    if (!session) {
      // Fetch only commits from the main branch when the user is not authenticated
      const branchCommits = await fetchFromGitHub(
        `repos/${selectedRepo.full_name}/commits?sha=main&per_page=100`,
      );
      setUnrelatedCommits(branchCommits);
    } else {
      // If authenticated, fetch all branches and their commits
      const branches = await fetchFromGitHub(
        `repos/${selectedRepo.full_name}/branches`,
      );
      await Promise.all(branches.map(fetchCommitsFromBranch));
    }
  };

  const fetchCommitsFromBranch = async (branch) => {
    const branchCommits = await fetchFromGitHub(
      `repos/${selectedRepo.full_name}/commits?sha=${branch.name}&per_page=100`,
    );
    setUnrelatedCommits((prev) => [...prev, ...branchCommits]);
  };

  const toggleSelection = (id, isPR) => {
    const setState = isPR ? setSelectedPRs : setSelectedUnrelatedCommits;
    setState((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        if (isPR) {
          const commits = commitsByPR[id] || [];
          setSelectedUnrelatedCommits(
            (prevCommits) =>
              new Set(
                [...prevCommits].filter(
                  (sha) => !commits.some((commit) => commit.sha === sha),
                ),
              ),
          ); // remove related commits
        }
      } else {
        newSet.add(id);
        if (isPR) {
          const commits = commitsByPR[id] || [];
          setSelectedUnrelatedCommits(
            (prevCommits) =>
              new Set([...prevCommits, ...commits.map((commit) => commit.sha)]),
          ); // add related commits
        }
      }
      return newSet;
    });
  };

  const renderCommandItems = (repositoryList) =>
    repositoryList.map((repo) => (
      <CommandItem
        key={repo.id}
        onSelect={() => {
          setSelectedRepo(repo);
          setOpen(false);
        }}
        className="flex flex-col items-start hover:cursor-pointer pb-1 shadow-sm"
      >
        <div className="flex items-center w-full">
          <span className="font-medium">{repo.full_name}</span>
        </div>
        <p className="text-sm text-muted-foreground ml-6">{repo.description}</p>
        <div className="flex items-center mt-1 ml-6">
          <span className="text-xs mr-2">{repo.stargazers_count} stars</span>
          <span className="text-xs">{repo.forks_count} forks</span>
        </div>
      </CommandItem>
    ));

  return (
    <div className="md:h-screen lg:w-80 w-full h-[66vh] bg-white border-r border-b border-border flex flex-col">
      <div className="py-4 px-2 border-b border-border ">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between border-2"
            >
              <GitFork className="mr-2 h-4 w-4" />
              {selectedRepo ? selectedRepo.full_name : "Select a repository"}
              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command className="max-h-[300px] overflow-auto">
              <CommandEmpty>No repository found.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-[240px]">
                  {renderCommandItems(session ? repos : HARD_CODED_REPOS)}
                </ScrollArea>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <ScrollArea className="flex-grow border-x md:border-0 bg-slate-50 border-primary">
        <div className="p-4 space-y-4">
          {loading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : (
            <>
              <PullRequestList
                pullRequests={pullRequests}
                commitsByPR={commitsByPR}
                selectedPRs={selectedPRs}
                selectedUnrelatedCommits={selectedUnrelatedCommits}
                toggleSelection={toggleSelection}
              />

              {!loading && pullRequests.length === 0 && !session && (
                <div className="text-center">
                  Login needed for Pull Requests.{" "}
                </div>
              )}
            </>
          )}

          <CommitList
            commits={unrelatedCommits}
            selectedCommits={selectedUnrelatedCommits}
            toggleSelection={toggleSelection}
            messageMaxLength={200}
          />

          {!loading && unrelatedCommits.length === 0 && !session && (
            <div className="text-center">Select a repository </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
