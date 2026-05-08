import {
  SponsorshipFormSubmission,
  generateSubmissionId,
} from "./sponsorship-form-types";

const STORAGE_KEY = "sponsorship_submissions";

/**
 * Save a sponsorship submission to localStorage
 */
export function saveSponsorshipSubmission(
  data: Omit<SponsorshipFormSubmission, "submissionId" | "submittedAt">
): SponsorshipFormSubmission {
  try {
    const submission: SponsorshipFormSubmission = {
      ...data,
      submissionId: generateSubmissionId(),
      submittedAt: new Date().toISOString(),
    };

    const existing = getSponsorshipHistory();
    const updated = [submission, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return submission;
  } catch (error) {
    console.error("Failed to save sponsorship submission:", error);
    throw new Error("Failed to save sponsorship submission to local storage");
  }
}

/**
 * Retrieve all sponsorship submissions from localStorage
 */
export function getSponsorshipHistory(): SponsorshipFormSubmission[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to retrieve sponsorship history:", error);
    return [];
  }
}

/**
 * Get a specific sponsorship submission by ID
 */
export function getSponsorshipById(
  submissionId: string
): SponsorshipFormSubmission | null {
  const history = getSponsorshipHistory();
  return history.find((s) => s.submissionId === submissionId) || null;
}

/**
 * Get all sponsorships for a specific child
 */
export function getChildSponsorships(
  childId: string
): SponsorshipFormSubmission[] {
  const history = getSponsorshipHistory();
  return history.filter((s) => s.childId === childId);
}

/**
 * Delete a sponsorship submission
 */
export function deleteSponsorshipSubmission(submissionId: string): boolean {
  try {
    const history = getSponsorshipHistory();
    const filtered = history.filter((s) => s.submissionId !== submissionId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Failed to delete sponsorship submission:", error);
    return false;
  }
}

/**
 * Clear all sponsorship submissions
 */
export function clearSponsorshipHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear sponsorship history:", error);
  }
}

/**
 * Format a date for display
 */
export function formatSubmissionDate(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
