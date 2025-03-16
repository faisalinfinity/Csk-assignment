"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  url: string;
}

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const res = await fetch("/api/blog-posts");
        if (!res.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const data = await res.json();
        setBlogPosts(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Our Blogs</h2>

        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-12">
          Our blog provides insightful information about unlisted shares,
          offering a deeper understanding of how these assets work, their
          potential benefits, and the risks involved. Whether you&apos;re new to
          unlisted shares or looking to expand your knowledge, we cover topics
          such as investment strategies, valuation methods, market trends, and
          regulatory aspects. Stay updated with expert tips and guides to
          navigate the unlisted share market effectively.
        </p>

        {isLoading ? (
          <p className="text-center">Loading blog posts...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="overflow-hidden rounded-lg">
                <div className="aspect-video overflow-hidden bg-gray-100 rounded-lg">
                  <Image
                  height={500}
                  width={500}
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-4">
                  <Link href={post.url} className="group">
                    <h3 className="text-lg font-semibold flex items-center">
                      {post.title}
                      <ArrowUpRight
                        className="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                        size={18}
                      />
                    </h3>
                  </Link>
                  <p className="mt-2 text-gray-600 text-sm">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
