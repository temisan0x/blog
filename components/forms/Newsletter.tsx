import React, { useState, useRef } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setErrorMessage("");
      } else {
        setSuccessMessage("");
        setErrorMessage(data.error);
      }

      setEmail("");
    } catch (error) {
      setSuccessMessage("Failed to subscribe. Please try again later.");
    }
  };
  return (
    <div className="m-20 mx-auto sm:w-[35%] w-[80%] text-white">
      <p className="mb-5 subscribe text-center">
        Subscribe to our newsletter and stay up to date on the latest blog
        posts, news, and special offers!
      </p>
      <form
        ref={formRef}
        className="flex flex-col subscribe justify-center"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          className="rounded py-4 px-4 sm:mb-0 w-full sm:w-auto bg-focus:outline-none focus:border-gray-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="rounded mt-3 text-white bg-gray-800 border-white py-4 px-6 w-full sm:w-auto"
        >
          Subscribe
        </button>
      </form>
      <div className="text-center mt-5">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </div>
    </div>
  );
}

export default Newsletter;
