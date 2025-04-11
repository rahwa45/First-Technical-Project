
"use client";
import styles from "../page.module.css";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      setStatus("An error occurred.");
    }
  };
return (
  <div className={`p-6 ${styles.contactPage}`}>
    <div className="flex items-center mb-6">
      {" "}
      {/* No change here, keeps arrow and title aligned */}
      <Link
        href="/"
        className="text-blue-500 hover:text-purple-500 transition-colors duration-200"
      >
        <span className="text-2xl">←</span>
      </Link>
      <h1 className="font-bold text-3xl ml-3">Contact Us</h1>{" "}
      {/* Added margin for spacing */}
    </div>

    <div className="flex flex-col md:flex-row justify-between items-start mt-4">
      <div className="flex-1 mb-4 md:mb-0 pr-4">
        {" "}
        {/* Adjusting padding for spacing */}
        <div className="mb-4">
          <p>
            We’re here to assist you! If you have any questions or need
            assistance, please feel free to reach out to us.
          </p>
          <p className="mt-4">
            Whether you have questions about our products, need support with
            your order, or just want to share your thoughts, we’re always happy
            to hear from you.
          </p>
        </div>
        <div className="mb-4">
          <p>
            <strong>Phone:</strong> +251-939-098-222
          </p>
          <p>
            <strong>Email:</strong> rahwa3113@gmail.com
          </p>
          <p>
            <strong>Location:</strong> Addis Ababa, Ethiopia
          </p>
        </div>
        <p className="mt-4 mb-6">
          Alternatively, fill out the contact form, and we’ll get back to you as
          soon as possible. Your satisfaction is our priority!
        </p>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start ml-auto">
        {" "}
        {/* Keep this unchanged */}
        {status && <p className="mb-4 text-green-600">{status}</p>}
        <form onSubmit={handleSubmit} className="mt-4 w-full md:w-3/4 lg:w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-1">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-white border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-amber-700 to-yellow-300 text-white font-semibold tracking-wide px-7 py-3 rounded-full shadow-md transition-all duration-300 focus:outline-none cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
);

}
