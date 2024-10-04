"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Image from "next/image";

const Contact = ({ blok }) => {
  const [isClient, setIsClient] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function onSubmit(data) {
    setIsLoading(true);
    setIsError(false);
    try {
      // Dynamically import the sendEmail function
      const { sendEmail } = await import("@/utils/send-email");
      const response = await sendEmail(data);
      if (response && response.message) {
        setResponseMessage(response.message);
        setIsSent(true);
        reset(); // Reset the form fields
        setTimeout(() => {
          setIsSent(false); // Remove the success message after a delay
          setResponseMessage(""); // Clear the response message
        }, 5000); // 5 seconds delay
      } else {
        setResponseMessage(
          "Email sent, but no message returned from the server."
        );
      }
    } catch (error) {
      setIsError(true);
      setResponseMessage(
        error.message || "An error occurred while sending the email."
      );
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  const inlineStyle = {
    paddingTop: blok?.paddingTop,
    paddingBottom: blok?.paddingBottom,
  };

  if (!isClient || !blok) {
    return null; // or a loading placeholder if preferred
  }

  return (
    <div className="contact_us container max-w-3xl mx-auto">
      <h1 className="pt-5 mb-7 mt-6">{blok?.title}</h1>

      <div>
        {/* Form */}
        <div className="p-5 md:p-12 shadow-2xl rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} style={inlineStyle}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-black"
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-black focus:shadow-md"
                {...register("name", { required: true })}
              />
              <div>
                {errors?.name && (
                  <p className="text-poppy-900 text-sm mt-2">
                    Full name is required!
                  </p>
                )}
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-black"
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@domain.com"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-black focus:shadow-md"
                {...register("email", { required: true })}
              />
              <div>
                {errors?.email && (
                  <p className="text-poppy-900 text-sm mt-2">
                    Email is required!
                  </p>
                )}
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="message"
                className="mb-3 block text-base font-medium text-black"
              >
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Type your message"
                className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-black focus:shadow-md"
                {...register("message", { required: true })}
              ></textarea>
            </div>
            <div>
              {isLoading ? (
                <p>Loading...</p>
              ) : isSent ? (
                <p
                  className={`text-green-500 ${
                    isError ? "text-poppy-900" : ""
                  }`}
                >
                  {responseMessage}
                </p>
              ) : (
                <button className="primary_btn primary_btn--small w-full">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
        {/* Image */}
        {blok?.image && (
          <div className="relative hidden md:block">
            <Image
              src={`${blok?.image?.filename}`}
              alt="Image Description"
              fill
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full absolute top-0 left-0 object-cover object-center rounded-xl"
              priority={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
