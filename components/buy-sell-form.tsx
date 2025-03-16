"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface BuySellFormProps {
  type: "buy" | "sell";
}

export default function BuySellForm({ type }: BuySellFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type }),
      });
      if (!res.ok) {
        throw new Error("Failed to submit query");
      }
      const data = await res.json();
      setSuccessMessage(data.message || "Query submitted successfully");
      setFormData({ name: "", email: "", phone: "", quantity: "", message: "" });
    } catch (error: any) {
      setErrorMessage(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-lg font-medium">Chennai Super Kings (CSK) Shares</h2>
        <p className="text-gray-600 mt-1">₹192</p>
      </div>

      <div className="space-y-4">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <Input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Image
            height={50}
            width={60}
              src="/india-flag.jpeg"
              alt="India flag"
              className="w-6 h-4 object-cover"
            />
          </div>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="091234 56789"
            className="pl-12"
          />
        </div>

        <Input
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          type="number"
        />
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          rows={4}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-md"
      >
        {type === "buy" ? "Buy" : "Sell"}
      </Button>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-md text-gray-700"
      >
        <Image
        height={50}
        width={50}
          src="https://cdn.prod.website-files.com/66dab781497d9a528975cd7a/678b78d87140ff853f2c831c_whatsapp-logo-webflow-cloneable-template-brix-templates.svg"
          alt="WhatsApp"
          className="w-6 h-6 object-cover"
        />
        Get Connected Now
      </button>

      {successMessage && (
        <p className="text-green-600 text-center">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-600 text-center">{errorMessage}</p>
      )}
    </form>
  );
}
