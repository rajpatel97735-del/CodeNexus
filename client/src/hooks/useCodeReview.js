import { useState } from "react";

export default function useCodeReview() {
  const [issues, setIssues] = useState([]);

  const analyze = ({ html, css, javascript }) => {
    const result = [];

    if (html.includes("<img") && !html.includes("alt=")) {
      result.push({
        type: "warning",
        message: "Image is missing alt attribute",
      });
    }

    if (css.includes("!important")) {
      result.push({
        type: "warning",
        message: "Avoid using !important",
      });
    }

    if (javascript.includes("console.log")) {
      result.push({
        type: "info",
        message: "Remove console.log before production",
      });
    }

    setIssues(result);
  };

  return {
    issues,
    analyze,
  };
}