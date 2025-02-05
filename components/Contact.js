"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
      const { sendEmail } = await import("@/utils/send-email");
      const response = await sendEmail(data);
      if (response && response.message) {
        setResponseMessage("Thank you for your message! We'll get back to you soon.");
        setIsSent(true);
        reset();
        setTimeout(() => {
          setIsSent(false);
          setResponseMessage("");
        }, 5000);
      } else {
        setResponseMessage("Email sent, but no message returned from the server.");
      }
    } catch (error) {
      setIsError(true);
      setResponseMessage(error.message || "An error occurred while sending the email.");
    }
    setIsLoading(false);
  }

  const handleRestart = () => {
    setIsSent(false);
    setIsLoading(false);
    setIsError(false);
    setResponseMessage("");
    reset();
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const inlineStyle = {
    paddingTop: blok?.paddingTop,
    paddingBottom: blok?.paddingBottom,
  };

  if (!isClient || !blok) {
    return null;
  }

  if (isSent && !isError) {
    return (
      <div className="contact_us container max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-5 md:p-12 shadow-2xl rounded-lg">
          <motion.div 
            className="text-6xl text-green-500 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            ✓
          </motion.div>
          
          <motion.h3
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Message Sent Successfully!
          </motion.h3>
          
          <motion.p
            className="text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {responseMessage}
          </motion.p>
          
          <motion.button 
            onClick={handleRestart}
            className="primary_btn primary_btn--small"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Another Message
          </motion.button>
        </div>
      </div>
    );
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
                {...register("message", { 
                  required: "Message is required",
                  minLength: { value: 10, message: "Message must be at least 10 characters" },
                  maxLength: { value: 1000, message: "Message must not exceed 1000 characters" }
                })}
              ></textarea>
              <div>
                {errors?.message && (
                  <p className="text-poppy-900 text-sm mt-2">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  <p className="ml-2">Sending your message...</p>
                </div>
              ) : isError ? (
                <div className="p-4 rounded-md bg-red-50">
                  <p className="text-sm text-red-600">
                    {responseMessage}
                  </p>
                </div>
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
