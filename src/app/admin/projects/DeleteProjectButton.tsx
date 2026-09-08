"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProject } from "@/lib/actions/project.actions";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteProjectButton({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${projectName}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const res = await deleteProject(projectId);
      if (res.success) {
        router.refresh();
      } else {
        alert(res.error || "Failed to delete project.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting the project.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label={`Delete ${projectName}`}
      title="Delete project"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "5px 10px",
        borderRadius: 6,
        border: "1px solid rgba(239, 68, 68, 0.2)",
        background: "rgba(254, 242, 242, 0.6)",
        color: "#DC2626",
        fontSize: 12.5,
        fontWeight: 600,
        cursor: isDeleting ? "not-allowed" : "pointer",
        transition: "all 0.15s ease",
        opacity: isDeleting ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (!isDeleting) {
          e.currentTarget.style.background = "#FEE2E2";
          e.currentTarget.style.borderColor = "#F87171";
        }
      }}
      onMouseLeave={(e) => {
        if (!isDeleting) {
          e.currentTarget.style.background = "rgba(254, 242, 242, 0.6)";
          e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.2)";
        }
      }}
    >
      {isDeleting ? (
        <Loader2 size={13} className="animate-spin" />
      ) : (
        <Trash2 size={13} />
      )}
      <span>{isDeleting ? "Deleting..." : "Delete"}</span>
    </button>
  );
}
