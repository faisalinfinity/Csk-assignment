"use client";

import { useState, useEffect } from "react";

export default function AboutShare() {
  // Local state to store fetched article paragraphs
  const [articleParagraphs, setArticleParagraphs] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const paragraphsToShow = 3; // Number of paragraphs to show by default

  useEffect(() => {
    // Fetch the article content from the API route
    const fetchArticle = async () => {
      try {
        const res = await fetch("/api/csk-article");
        if (!res.ok) {
          throw new Error("Failed to fetch article");
        }
        const data = await res.json();
        setArticleParagraphs(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, []);

  // Decide which paragraphs to show based on whether the article is expanded
  const visibleParagraphs = isExpanded
    ? articleParagraphs
    : articleParagraphs.slice(0, paragraphsToShow);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8 space-y-4">
      <h2 className="text-xl font-medium">About Share</h2>

      {isLoading ? (
        <p>Loading article...</p>
      ) : (
        <>
          {visibleParagraphs.map((para, idx) => (
            <p key={idx} className="text-gray-500 whitespace-pre-line">
              {para}
            </p>
          ))}

          {articleParagraphs.length > paragraphsToShow && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full rounded-2xl p-2 border border-gray-400 hover:text-white hover:bg-green-500 transition-colors duration-200"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
