"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What is the share price of Chennai Super Kings (CSK)?",
    answer:
      "The current share price of Chennai Super Kings (CSK) is ₹192. This price may fluctuate based on market demand and company performance.",
  },
  {
    question: "Can I buy shares of Chennai Super Kings?",
    answer:
      "Yes, you can buy unlisted shares of Chennai Super Kings through registered intermediaries who deal in unlisted securities. Contact us for more information on how to purchase CSK shares.",
  },
  {
    question: "Why are Chennai Super Kings shares unlisted?",
    answer:
      "Chennai Super Kings shares are unlisted because the company has not gone through an Initial Public Offering (IPO) process to get listed on stock exchanges like NSE or BSE. This is a common situation for many sports franchises.",
  },
  {
    question: "How is Chennai Super Kings performing financially?",
    answer:
      "Chennai Super Kings has shown strong financial performance over the years, with growing revenue streams from IPL tournament participation, merchandise sales, sponsorships, and brand value. Detailed financial statements are available in our financial section.",
  },
  {
    question: "Is it a good idea to invest in CSK shares?",
    answer:
      "Investing in CSK shares can be considered as part of a diversified portfolio. The team's strong brand value, loyal fan base, and consistent performance in IPL make it an interesting investment option. However, as with any investment, it carries risks and should be evaluated according to your financial goals.",
  },
  {
    question: "What makes Chennai Super Kings an attractive investment?",
    answer:
      "Chennai Super Kings is one of the most successful IPL franchises with a massive fan following, strong brand value, consistent performance, and multiple championship wins. These factors contribute to its revenue potential and long-term growth prospects.",
  },
  {
    question: "How can I track the price of CSK shares?",
    answer:
      "Since CSK shares are unlisted, their prices are not readily available on public platforms like stock exchanges. You can track the price through our website, which provides regular updates on CSK share prices and market trends.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">FAQ&apos;s</h2>

        <div className="max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full py-6 text-left font-medium text-gray-900"
              >
                <span>{faq.question}</span>
                <span className="ml-6 flex-shrink-0 text-gray-400 rounded-full border border-gray-300 p-1">
                  <Plus size={18} />
                </span>
              </button>

              {openIndex === index && (
                <div className="pb-6 pr-12">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

