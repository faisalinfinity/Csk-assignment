"use client";

import { useState } from "react";
import Navbar from "./navbar";
import ShareChart from "./share-chart";
import BuySellForm from "./buy-sell-form";
import AboutShare from "./about-share";
import WhatsAppButton from "./whatsapp-button";
import FAQSection from "./faq-section";
import BlogSection from "./blog-section";
import FinancialTables from "./financial-tables";
import { useMediaQuery } from "@/hooks/use-media-query";
import Footer from "./footer";
import Image from "next/image";

export default function SharePage() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="min-h-screen bg-white ">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="w-full p-4 flex items-center justify-center h-[20dvh]">
          <h1 className="text-5xl mx-auto font-bold">
            Chennai Super Kings (CSK) Shares
          </h1>
        </div>
        <div className="container mx-auto px-4 py-6 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left section - Share info and chart */}
            <div className="lg:col-span-7">
              <div className="flex items-start gap-4">
                <Image
                  height={400}
                  width={400}
                  src="https://cdn.prod.website-files.com/66dad9c594a45d74898a5fc6/66e9a5d287ad4d164a1788ae_70521baac89be4d4cb2f223bbf67c974%20(1).avif"
                  alt="Chennai Super Kings Logo"
                  className="w-16 h-16 md:w-20 md:h-20 object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-xl md:text-2xl font-medium text-gray-900">
                    Chennai Super Kings (CSK) Share Price
                  </h1>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl md:text-3xl font-medium">
                      ₹192
                    </span>
                    <span className="text-sm text-green-500">+4</span>
                    <span className="text-sm text-green-500">+21%</span>
                    <span className="text-sm text-gray-500">2M</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <ShareChart />
              </div>

              {isMobile && (
                <div className="mt-6 flex items-center justify-between">
                  <button className="bg-green-500 text-white px-8 py-2 rounded-md font-medium">
                    Buy
                  </button>
                  <WhatsAppButton />
                </div>
              )}

              {!isMobile && (
                <div className="mt-8">
                  <AboutShare />
                </div>
              )}
            </div>

            {/* Right section - Buy/Sell form */}
            {!isMobile && (
              <div className="lg:col-span-5">
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex border-b">
                    <button
                      className={`px-3 py-3 text-center font-medium ${
                        activeTab === "buy"
                          ? "text-green-500 border-b-2 border-green-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveTab("buy")}
                    >
                      Buy
                    </button>
                    <button
                      className={`px-3 py-3 text-center font-medium ${
                        activeTab === "sell"
                          ? "text-green-500 border-b-2 border-green-500"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveTab("sell")}
                    >
                      Sell
                    </button>
                  </div>
                  <div className="p-4">
                    <BuySellForm type={activeTab} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {isMobile && (
            <div className="mt-8">
              <AboutShare />
            </div>
          )}
        </div>

        {/* Financial Tables Section */}
        <FinancialTables />

        {/* FAQ Section */}
        <FAQSection />

        {/* Blog Section */}
        <BlogSection />

        {!isMobile && (
          <div className="fixed bottom-6 right-6">
            <WhatsAppButton />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
