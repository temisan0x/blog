import React, { useState, useRef } from "react";

type Props = {
  closeModal: () => void;
};

const NewsletterSignupModal = ({ closeModal }:any) => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage(""); // Clear error message
        setEmail(""); // Clear email input after successful submission
      } else {
        setSuccessMessage("");
        setErrorMessage(data.error || "Failed to subscribe. Please try again later.");
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Failed to subscribe. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className="bg-white p-8 rounded-lg z-10 relative max-w-sm text-center"
        style={{
          width: "500px",
        }}
      >
        <h2 className="text-3xl text-gray-600 mb-4">Stay in the Know</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Stay up to date on the latest and greatest. Get special newsletters
          and lots of inspiration.
        </p>
        <form
          className="flex flex-col sm:flex-row mb-6 border border-black  overflow-hidden"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="rounded-lg p-4 mb-2 sm:mb-0 flex-grow focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className=" about-bg border-subscribe py-4 px-6 sm:ml-2 w-full"
            disabled={isLoading}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <button
          className="text-gray-600 cursor-pointer underline hover:text-[#41360d] transition duration-300 ease-in-out"
          onClick={closeModal}
        >
          No, Thanks, i&apos;m good
        </button>
      </div>
    </div>
  );
};

export default NewsletterSignupModal;
