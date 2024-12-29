import React, { useState } from "react";
import { PrComponent } from "./pr-component";
import { DownloadButton } from "@/components/download-button";
import { CustomInputFormComponent } from "./custom-input-form";
import CommitHoursComponent from "./commit-component";

const MainContentComponent = ({
  selectedPRs,
  selectedCommits,
  commitsByPR,
  session,
}) => {
  const [hoursWorkedData, setHoursWorkedData] = useState([]);
  const [commitHoursData, setCommitHoursData] = useState([]);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: session?.email || "",
    paymentType: "bank transfer",
    costPerHour: 100,
  });

  const getCommitsForPR = (prId) => commitsByPR[prId] || [];

  const selectedCommitShas = new Set(
    selectedCommits.map((commit) => commit.sha),
  );

  const prCommitShas = new Set(
    selectedPRs.flatMap((pr) =>
      getCommitsForPR(pr.id).map((commit) => commit.sha),
    ),
  );

  const unrelatedCommits = selectedCommits.filter(
    (commit) => !prCommitShas.has(commit.sha),
  );

  const handleLogHoursForPR = (prId, hours) => {
    setHoursWorkedData((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((entry) => entry.prId === prId);

      if (index !== -1) {
        updated[index].hours = hours;
      } else {
        const pr = selectedPRs.find((pr) => pr.id === prId);
        updated.push({
          prId,
          title: pr?.title || "Unknown PR", // Add PR title
          body: pr?.body || "", // Add PR body
          author: pr?.user?.login || "Unknown Author", // Add PR author
          createdAt: pr?.created_at || "Unknown Date", // Add PR creation date
          state: pr?.state || "Unknown State", // Add PR state
          hours,
        });
      }

      return updated;
    });
  };

  const handleLogHoursForCommit = (commitSha, hours) => {
    setCommitHoursData((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((entry) => entry.commitSha === commitSha);

      if (index !== -1) {
        updated[index].hours = hours;
      } else {
        const commit = selectedCommits.find((c) => c.sha === commitSha);
        updated.push({
          commitSha,
          title: commit?.commit?.message || "Unknown Commit", // Add commit message
          author: commit?.commit?.author?.name || "Unknown Author", // Add commit author
          date: commit?.commit?.author?.date || "Unknown Date", // Add commit date
          hours,
        });
      }

      return updated;
    });
  };

  const handleFormChange = (updatedFormData) => {
    setFormData(updatedFormData);
    console.log("updatedFormData", updatedFormData);
  };

  return (
    <div>
      {selectedPRs.length > 0 &&
        selectedPRs.map((pr) => {
          const commitsForPR = getCommitsForPR(pr.id);
          const filteredCommits = commitsForPR.filter((commit) =>
            selectedCommitShas.has(commit.sha),
          );

          return (
            <div key={pr.id}>
              <PrComponent
                id={pr.id}
                number={pr.number}
                state={pr.state}
                body={pr.body}
                title={pr.title}
                author={pr.user.login}
                createdAt={pr.created_at}
                commits={filteredCommits}
                onLogHours={(hours) => handleLogHoursForPR(pr.id, hours)}
                session={session}
              />
            </div>
          );
        })}

      {/*<h2>Non PR Commits:</h2>*/}
      {unrelatedCommits.length > 0 &&
        unrelatedCommits.map((commit) => (
          <CommitHoursComponent
            key={commit.sha}
            commit={commit}
            handleLogHoursForCommit={handleLogHoursForCommit}
            session={session}
          />
        ))}

      <CustomInputFormComponent
        session={session}
        onFormChange={handleFormChange}
      />

      <div className="py-4">
        <DownloadButton
          hoursData={{ prHours: hoursWorkedData, commitHours: commitHoursData }}
          customFormData={formData}
        />
      </div>
    </div>
  );
};

export default MainContentComponent;
