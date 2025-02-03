import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const spinnerStyles = {
  loader: {
    width: '20px',
    height: '20px',
    border: '3px solid #ffffff40',
    borderTop: '3px solid #fff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    display: 'inline-block',
    marginLeft: '8px',
    verticalAlign: 'middle',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

const totalSteps = 15;

// Validation schema
const funnelSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  sell_type: z.string().min(1, "Please select your service type"),
  marketing_facebook: z.boolean().optional(),
  marketing_adwords: z.boolean().optional(),
  marketing_seo: z.boolean().optional(),
  marketing_tv: z.boolean().optional(),
  marketing_radio: z.boolean().optional(),
  marketing_print: z.boolean().optional(),
  marketing_other: z.boolean().optional(),
  marketing_none: z.boolean().optional(),
  country: z.string().min(1, "Please select your country"),
  monthly_budget: z.string().min(1, "Please select your budget range"),
  website_url: z.string().optional(),
  noWebsite: z.boolean().optional(),
  business_description: z.string().min(10, "Please provide more details about your business"),
  current_revenue: z.string().min(1, "Please enter your current revenue"),
  target_revenue: z.string().min(1, "Please enter your target revenue"),
  revenue_obstacle: z.string().optional(),
  start_time: z.string().min(1, "Please select when you want to start"),
  interest_level: z.string().min(1, "Please select your interest level"),
  investment_willingness: z.string().optional(),
  final_name: z.string().min(2, "Name must be at least 2 characters"),
}).refine(
  (data) => {
    // Website validation
    if (!data.website_url && !data.noWebsite) {
      return false;
    }
    return true;
  },
  {
    message: "Please enter your website URL or check &apos;I don&apos;t have a website&apos;",
    path: ["website_url"],
  }
).refine(
  (data) => {
    // Marketing channels validation
    const marketingChannels = [
      'marketing_facebook',
      'marketing_adwords',
      'marketing_seo',
      'marketing_tv',
      'marketing_radio',
      'marketing_print',
      'marketing_other',
      'marketing_none'
    ];
    return marketingChannels.some(channel => data[channel]);
  },
  {
    message: "Please select at least one marketing channel",
    path: ["marketing_facebook"],
  }
);

const MarketingFunnel = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState({
    isSubmitted: false,
    isLoading: false,
    error: null
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
    getValues
  } = useForm({
    resolver: zodResolver(funnelSchema),
    mode: "onChange",
    defaultValues: {
      currentRevenue: 33000,
      targetRevenue: 100000,
      websiteUrl: "",
      noWebsite: false,
      email: "",
      start_time: "Immediately",
      interest_level: "5"
    }
  });

  useEffect(() => {
    // Set initial value for start_time
    setValue("start_time", "Immediately");
  }, [setValue]);

  useEffect(() => {
    console.log("Form errors:", errors);
    console.log("Form is valid:", isValid);
  }, [errors, isValid]);

  const updateUserNameDisplay = useCallback(() => {
    const nameDisplayElements = document.querySelectorAll(".userNameDisplay");
    nameDisplayElements.forEach((element) => {
      element.textContent = watch("name") || "";
    });
  }, [watch]);

  useEffect(() => {
    updateUserNameDisplay();
  }, [updateUserNameDisplay]);

  const [validationError, setValidationError] = useState("");

  const handleNextStep = async () => {
    // Skip validation for the first step (welcome screen)
    if (currentStep === 1) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    // Get the fields that need to be validated for the current step
    const currentFields = getFieldsForStep(currentStep);
    
    // If there are fields to validate
    if (currentFields.length > 0) {
      const currentValues = getValues();
      let hasErrors = false;

      // Check each field
      for (const field of currentFields) {
        if (!currentValues[field] || currentValues[field].toString().trim() === '') {
          setError(field, {
            type: 'required',
            message: `This field is required`
          });
          hasErrors = true;
        }
      }

      if (hasErrors) {
        setValidationError("Please fill in all required fields");
        return;
      }
    }

    // Special validation for marketing channels step
    if (currentStep === 4) {
      const marketingChannels = [
        'marketing_facebook',
        'marketing_adwords',
        'marketing_seo',
        'marketing_tv',
        'marketing_radio',
        'marketing_print',
        'marketing_other',
        'marketing_none'
      ];

      const hasSelectedChannel = marketingChannels.some(channel => getValues()[channel]);

      if (!hasSelectedChannel) {
        setValidationError("Please select at least one marketing channel");
        return;
      }
      setValidationError("");
    }

    // Special validation for website step
    if (currentStep === 7) {
      const values = getValues();
      const hasWebsite = values.website_url && values.website_url.trim() !== "";
      const hasNoWebsiteChecked = values.noWebsite === true;

      if (!hasWebsite && !hasNoWebsiteChecked) {
        setError('website_url', {
          type: 'manual',
          message: "Please enter your website URL or check &apos;I don&apos;t have a website&apos;"
        });
        setValidationError("Please enter your website URL or check &apos;I don&apos;t have a website&apos;");
        return;
      }
      clearErrors('website_url');
      setValidationError("");
    }

    // Clear any previous validation errors
    setValidationError("");
    
    // If all validations pass, proceed to next step
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setValidationError(""); // Clear any validation errors when going back
  };

  const handleRestart = () => {
    setFormState({
      isSubmitted: false,
      isLoading: false,
      error: null
    });
    reset();
    setCurrentStep(1);
  };

  const formatFunnelData = (data) => {
    const marketingChannels = Object.entries(data)
      .filter(([key, value]) => key.startsWith('marketing_') && value)
      .map(([key]) => `- ${key.replace('marketing_', '').toUpperCase()}`)
      .join('\n');

    return {
      name: data.final_name || data.name,
      email: data.email,
      message: `
Business Information:
- Name: ${data.final_name || data.name}
- Service Type: ${data.sell_type || 'Not specified'}
- Country: ${data.country || 'Not specified'}
- Website: ${data.noWebsite ? 'No website' : (data.website_url || 'Not provided')}

Financial Information:
- Current Revenue: $${(data.current_revenue || 0).toLocaleString()}
- Target Revenue: $${(data.target_revenue || 0).toLocaleString()}
- Monthly Marketing Budget: ${data.monthly_budget || 'Not specified'}

Marketing Channels:
${marketingChannels || 'None selected'}

Additional Information:
- Business Description: ${data.business_description || 'Not provided'}
- Main Revenue Obstacle: ${data.revenue_obstacle || 'Not provided'}
- Start Timeline: ${data.start_time || 'Not specified'}
- Interest Level (1-10): ${data.interest_level || 'Not specified'}
- Investment Willingness: ${data.investment_willingness || 'Not specified'}
      `.trim()
    };
  };

  const onSubmit = async (data) => {
    console.log("Form submission started", { data });
    setFormState({ ...formState, isLoading: true, error: null });
    try {
      const { sendEmail } = await import("@/utils/send-email");
      const formattedData = formatFunnelData(data);
      console.log("Formatted data:", formattedData);
      
      // Add retry logic for network issues
      let retries = 3;
      let response;
      
      while (retries > 0) {
        try {
          response = await sendEmail({
            name: formattedData.name,
            email: formattedData.email,
            message: formattedData.message
          });
          break;
        } catch (error) {
          if (retries === 1) throw error;
          retries--;
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      if (response && response.message) {
        setFormState({
          isSubmitted: true,
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error.response?.data?.error || 
        "An error occurred while submitting your information. Please try again.";
      
      setFormState({
        isSubmitted: false,
        isLoading: false,
        error: errorMessage
      });
    }
  };

  // Helper function to get fields for current step
  const getFieldsForStep = (step) => {
    switch (step) {
      case 2:
        return ['name'];
      case 3:
        return ['sell_type'];
      case 4:
        return [];  // Skip validation for marketing step
      case 5:
        return ['country'];
      case 6:
        return ['monthly_budget'];
      case 7:
        return ['website_url'];
      case 8:
        return ['business_description'];
      case 9:
        return ['current_revenue'];
      case 10:
        return ['target_revenue'];
      case 11:
        return ['revenue_obstacle'];
      case 12:
        return ['start_time'];
      case 13:
        return ['interest_level'];
      case 14:
        return ['investment_willingness'];
      case 15:
        return ['final_name', 'email'];
      default:
        return [];
    }
  };

  if (formState.isSubmitted) {
    return (
      <div className="success-container flex flex-col items-center justify-center min-h-[400px] text-center">
        <motion.div 
          className="success-check text-6xl text-green-500 mb-6"
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
          Thank You for Your Interest!
        </motion.h3>
        
        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          We&apos;ve received your information and will be in touch soon.
        </motion.p>
        
        <motion.button 
          onClick={handleRestart}
          className="restart-btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start New Application
        </motion.button>
      </div>
    );
  }

  return (
    <div className="funnel_container">
      <div className="progress-bar-container">
        {[...Array(totalSteps)].map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={`progress-step ${
                index + 1 <= currentStep ? "active" : ""
              }`}
            />
            {index + 1 < totalSteps && <div className="progress-line"></div>}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 1 && (
          <div className="step">
            <h3 className="step_heading">
              FREE 30-MINUTE LEAD EXPLOSION STRATEGY
            </h3>
            <p className="light_text">
              Get Your FREE 30-Minute Local Lead Domination Blueprint!
            </p>
            <div className="cta-direction">
              <button
                type="button"
                className="next-step"
                onClick={handleNextStep}
              >
                Get Started
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step">
            <h3>What&apos;s your name?</h3>
            <input
              type="text"
              {...register("name")}
              className={`w-full p-3 border rounded-lg transition-all duration-200 ${
                errors.name ? 'border-red-500 shake' : 
                dirtyFields.name ? 'border-green-500' : 'border-gray-300'
              }`}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.name.message}
                </motion.p>
              )}
            </AnimatePresence>
            <div className="cta-direction">
              <button
                type="button"
                className="prev-step"
                onClick={handlePrevStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="next-step"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step">
            <p className="light_text">
              Awesome, thanks{" "}
              <span className="userNameDisplay">{watch("name")}</span>! Now,
              let&apos;s see if we&apos;re the perfect match to skyrocket your
              business. We&apos;ve got a quick quiz to make sure we can
              serve up that secret sauce for your success. Ready to dive in?
              It&apos;ll be painless, we promise!
            </p>
            <h3>What type of home-based service do you offer?</h3>

            <select
              // className="light_text text-left"
              {...register("sell_type")}
              className={`w-full p-3 border rounded-lg transition-all duration-200 ${
                errors.sell_type ? 'border-red-500 shake' : 
                dirtyFields.sell_type ? 'border-green-500' : 'border-gray-300'
              }`}
            >
              <option value="">
                Choose the option that best describes your business:
              </option>
              <option value="home_cleaning">Home Cleaning & Maintenance</option>
              <option value="lawn_care">Lawn Care & Landscaping</option>
              <option value="hvac">HVAC & Plumbing</option>
              <option value="electrical_services">Electrical Services</option>
              <option value="renovation">Home Renovation & Remodeling</option>
              <option value="pest_control">Pest Control</option>
              <option value="other">
                Other Home-Based Service (please specify)
              </option>
            </select>

            <AnimatePresence>
              {errors.sell_type && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.sell_type.message}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="cta-direction">
              <button
                type="button"
                className="prev-step"
                onClick={handlePrevStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="next-step"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="step">
            <h3>
              Let&apos;s talk marketing magic! What strategies are you
              currently using to attract local customers?
            </h3>
            <p className="light_text">Check all that apply</p>

            <div className="m_types_container icons">
              <div className="infusion-checkbox">
                <input
                  id="inf_option_FacebookAds"
                  type="checkbox"
                  {...register("marketing_facebook")}
                />
                <label
                  className="infusion-field-label-container infusion-label-checkbox"
                  htmlFor="inf_option_FacebookAds"
                >
                  <i className="icon-facebook"></i>
                  <span>Facebook Ads</span>
                </label>
              </div>

              <div className="infusion-checkbox">
                <input
                  id="inf_option_GoogleAdwords"
                  type="checkbox"
                  {...register("marketing_adwords")}
                />
                <label
                  className="infusion-field-label-container infusion-label-checkbox"
                  htmlFor="inf_option_GoogleAdwords"
                >
                  <i className="icon-adwords"></i>
                  <span>Google Adwords</span>
                </label>
              </div>

              <div className="infusion-checkbox">
                <input
                  id="inf_option_SEO"
                  type="checkbox"
                  {...register("marketing_seo")}
                />
                <label
                  className="infusion-field-label-container infusion-label-checkbox"
                  htmlFor="inf_option_SEO"
                >
                  <i className="icon-seo"></i>
                  <span>SEO</span>
                </label>
              </div>

              <div className="infusion-checkbox">
                <input
                  id="inf_option_Television"
                  type="checkbox"
                  {...register("marketing_tv")}
                />
                <label
                  className="infusion-field-label-container infusion-label-checkbox"
                  htmlFor="inf_option_Television"
                >
                  <i className="icon-tv"></i>
                  <span>Television</span>
                </label>
              </div>

              <div className="infusion-checkbox">
                <input
                  id="inf_option_Radio"
                  type="checkbox"
                  {...register("marketing_radio")}
                />
                <label
                  className="infusion-field-label-container infusion-label-checkbox"
                  htmlFor="inf_option_Radio"
                >
                  <i className="icon-radio"></i>
                  <span>Radio</span>
                </label>
              </div>

              <div className="infusion-checkbox">
                <input
                  id="inf_option_NewspaperPrint"
                  type="checkbox"
                  {...register("marketing_print")}
                />
                <label
                  className="infusion-field-label-container infusion-label-checkbox"
                  htmlFor="inf_option_NewspaperPrint"
                >
                  <i className="icon-print"></i>
                  <span>Newspaper / Print</span>
                </label>
              </div>

              <div className="infusion-checkbox">
                <input
                  id="inf_option_Other"
                  type="checkbox"
                  {...register("marketing_other")}
                />
                <label
                  className="infusion-field-label-container infusion-label-checkbox"
                  htmlFor="inf_option_Other"
                >
                  <i className="icon-other"></i>
                  <span>Others</span>
                </label>
              </div>

              <div className="infusion-checkbox">
                <input
                  id="inf_option_None"
                  type="checkbox"
                  {...register("marketing_none")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setValue("marketing_none", true);  
                      setValue("marketing_facebook", false);
                      setValue("marketing_adwords", false);
                      setValue("marketing_seo", false);
                      setValue("marketing_tv", false);
                      setValue("marketing_radio", false);
                      setValue("marketing_print", false);
                      setValue("marketing_other", false);
                      clearErrors();
                      setValidationError("");
                    }
                  }}
                />
                <label
                  className="infusion-field-label-container infusion-label-checkbox"
                  htmlFor="inf_option_None"
                >
                  <i className="icon-none"></i>
                  <span>None</span>
                </label>
              </div>
            </div>

            {validationError && (
              <div className="text-red-500 text-sm mt-4 text-center">
                {validationError}
              </div>
            )}

            <div className="cta-direction">
              <button
                type="button"
                className="prev-step"
                onClick={handlePrevStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="next-step"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="step">
            <h3>
              Let&apos;s pin your business on the map! Where do you work your
              home service magic?
            </h3>

            <select
              {...register("country")}
              className={`w-full p-3 border rounded-lg transition-all duration-200 ${
                errors.country ? 'border-red-500 shake' : 
                dirtyFields.country ? 'border-green-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select your home base</option>

              {/* Top Countries */}
              <option value="AU">Australia</option>
              <option value="CA">Canada</option>
              <option value="NZ">New Zealand</option>
              <option value="US">United States of America</option>
              <option value="GB">United Kingdom</option>

              {/* Separator */}
              <option disabled>-------</option>
              <option disabled>Choose a country</option>

              {/* All Countries */}
              {[
                { code: "AF", name: "Afghanistan" },
                { code: "AL", name: "Albania" },
                { code: "DZ", name: "Algeria" },
                { code: "AD", name: "Andorra" },
                { code: "AO", name: "Angola" },
                // Add all other countries here
              ].map((country) => (
                <option key={country.code} value={country.code}>
                  {country.code} {country.name}
                </option>
              ))}
            </select>

            <AnimatePresence>
              {errors.country && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.country.message}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="cta-direction">
              <button
                type="button"
                className="prev-step"
                onClick={handlePrevStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="next-step"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="step">
            <h3>
              Let&apos;s talk treasure chests! What&apos;s your monthly
              budget for attracting those valuable local customers?
            </h3>
            <p className="light_text">
              Choose the range that best fits your marketing piggy bank
            </p>

            <div className="options-container list">
              <span className="infusion-option">
                <input
                  id="inf_option_Howmuchisyourmonthlymarketingbudget_4332"
                  {...register("monthly_budget")}
                  type="radio"
                  value="Under $5k"
                />
                <label htmlFor="inf_option_Howmuchisyourmonthlymarketingbudget_4332">
                  Under $5k
                </label>
              </span>
              <span className="infusion-option">
                <input
                  id="inf_option_Howmuchisyourmonthlymarketingbudget_4336"
                  {...register("monthly_budget")}
                  type="radio"
                  value="$5k - $10k"
                />
                <label htmlFor="inf_option_Howmuchisyourmonthlymarketingbudget_4336">
                  $5k - $10k
                </label>
              </span>
              <span className="infusion-option">
                <input
                  id="inf_option_Howmuchisyourmonthlymarketingbudget_4338"
                  {...register("monthly_budget")}
                  type="radio"
                  value="$10k - $20k"
                />
                <label htmlFor="inf_option_Howmuchisyourmonthlymarketingbudget_4338">
                  $10k - $20k
                </label>
              </span>
              <span className="infusion-option">
                <input
                  id="inf_option_Howmuchisyourmonthlymarketingbudget_4340"
                  {...register("monthly_budget")}
                  type="radio"
                  value="$20k - $35k"
                />
                <label htmlFor="inf_option_Howmuchisyourmonthlymarketingbudget_4340">
                  $20k - $35k
                </label>
              </span>
              <span className="infusion-option">
                <input
                  id="inf_option_Howmuchisyourmonthlymarketingbudget_4342"
                  {...register("monthly_budget")}
                  type="radio"
                  value="$35k - $50k"
                />
                <label htmlFor="inf_option_Howmuchisyourmonthlymarketingbudget_4342">
                  $35k - $50k
                </label>
              </span>
              <span className="infusion-option">
                <input
                  id="inf_option_Howmuchisyourmonthlymarketingbudget_4344"
                  {...register("monthly_budget")}
                  type="radio"
                  value="$50k+"
                />
                <label htmlFor="inf_option_Howmuchisyourmonthlymarketingbudget_4344">
                  $50k+
                </label>
              </span>
            </div>

            {errors.monthly_budget && (
              <div className="text-red-500 text-base text-center mb-4">
                {errors.monthly_budget.message}
              </div>
            )}

            <div className="cta-direction">
              <button
                type="button"
                className="prev-step"
                onClick={handlePrevStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="next-step"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 7 && (
          <div className="step">
            <h3>{watch("name")}, what is your website URL?</h3>
            <p className="light_text">
              If you don&apos;t have one, check the box below
            </p>

            {/* Conditionally render the input field if the checkbox is not checked */}
            {!watch("noWebsite") && (
              <div className="revenue-input-container">
                <input
                  type="url"
                  id="websiteUrl"
                  {...register("website_url")}
                  placeholder="https://example.com"
                  className={errors.website_url ? 'error' : ''}
                />
              </div>
            )}

            <div className="no-website-container">
              <input
                type="checkbox"
                id="noWebsite"
                {...register("noWebsite")}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setValue("noWebsite", isChecked);
                  if (isChecked) {
                    setValue("website_url", "No website");
                    clearErrors("website_url");
                  } else {
                    setValue("website_url", "");
                  }
                }}
              />
              <label htmlFor="noWebsite">I don&apos;t have a website</label>
            </div>

            {errors.website_url && !watch("noWebsite") && (
              <div className="text-red-500 text-sm mt-2 text-center">
                Please enter your website URL or check &apos;I don&apos;t have a website&apos;
              </div>
            )}

            <div className="cta-direction">
              <button
                type="button"
                className="prev-step"
                onClick={handlePrevStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="next-step"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 8 && (
          <div className="step">
            <h2>Tell Us About Your Service Empire! 🏠 🎨</h2>
            <p className="light_text">
              We&apos;re excited to learn about your unique business! Give us the inside scoop:
            </p>

            <div className="business-description-prompts">
              <p>🏠 What magical home services do you offer?</p>
              <p>👥 Who are your ideal customers?</p>
              <p>💲 What&apos;s your typical price range for services?</p>
            </div>

            <p className="light_text mt-4">
              Don&apos;t hold back - the more we know, the better we can help you dominate your local market!
            </p>

            <div className="revenue-input-container">
              <textarea
                {...register("business_description")}
                className={`w-full p-4 border rounded-lg min-h-[150px] ${
                  errors.business_description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Tell us about your business..."
              />
            </div>

            {errors.business_description && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {errors.business_description.message}
              </div>
            )}

            <div className="cta-direction">
              <button
                type="button"
                className="prev-step"
                onClick={handlePrevStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="next-step"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 9 && (
          <div className="step">
            <h3>
              Let&apos;s Celebrate Your Success! What&apos;s Your Monthly
              Money Magic?
            </h3>
            <p className="light_text">
              Understanding your current revenue helps us tailor our strategies
              to supercharge your growth. Don&apos;t worry - we&apos;re not here
              to judge, only to help you reach new heights!
            </p>

            <div className="revenue-input-container">
              <input
                type="text"
                id="currentRevenue"
                {...register("current_revenue")}
                value={`$${watch("current_revenue", 33000).toLocaleString()}`}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setValue("current_revenue", parseInt(value) || 0);
                }}
                className="text-center text-[40px] font-light"
                // placeholder="$"
              />
            </div>

            <div className="slider-container mt-8">
              <input
                type="range"
                id="currentRevenueSlider"
                min="0"
                max="1000000"
                step="1000"
                value={watch("current_revenue", 33000)}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setValue("current_revenue", value);
                }}
                className="w-full"
                style={{
                  background: `linear-gradient(to right, #38bdf8 ${
                    (watch("current_revenue", 33000) / 1000000) * 100
                  }%, #d3d3d3 ${(watch("current_revenue", 33000) / 1000000) * 100}%)`,
                }}
              />
            </div>

            {validationError && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {validationError}
              </div>
            )}

            <div className="cta-direction">
              <button
                type="button"
                className="prev-step"
                onClick={handlePrevStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="next-step"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 10 && (
          <div className="step">
            <h3>Dream Big! What&apos;s Your Target Monthly Revenue?</h3>
            <p className="light_text">
              Let&apos;s set your sights on the stars! We&apos;re asking this so
              we can craft a stellar growth plan to rocket your business to your
              dream destination.
            </p>

            <div className="revenue-input-container">
              <input
                type="text"
                id="targetRevenue"
                {...register("target_revenue")}
                value={`$${watch("target_revenue", 100000).toLocaleString()}`}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setValue("target_revenue", parseInt(value) || 0);
                }}
                className="text-center text-[40px] font-light"
              />
            </div>

            <div className="slider-container mt-8">
              <input
                type="range"
                id="targetRevenueSlider"
                min="0"
                max="2000000"
                step="1000"
                value={watch("target_revenue", 100000)}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setValue("target_revenue", value);
                }}
                className="w-full"
                style={{
                  background: `linear-gradient(to right, #38bdf8 ${
                    (watch("target_revenue", 100000) / 2000000) * 100
                  }%, #d3d3d3 ${(watch("target_revenue", 100000) / 2000000) * 100}%)`,
                }}
              />
            </div>

            {validationError && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {validationError}
              </div>
            )}

            <div className="cta-direction">
              <button
                type="button"
                className="prev-step"
                onClick={handlePrevStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="next-step"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 11 && (
          <div className="step">
            <h3>
              Time for Some Real Talk, <span className="userNameDisplay">{watch("name")}</span>! 
              What&apos;s the #1 Roadblock Standing Between You and Your Revenue
              Dreams?
            </h3>
            <p className="light_text">
              We all face challenges. Let&apos;s identify yours so we can knock
              it down together!
            </p>

            <textarea
              {...register("revenue_obstacle")}
              rows="4"
              className={`w-full p-3 border rounded-lg transition-all duration-200 ${
                errors.revenue_obstacle ? 'border-red-500 shake' : 
                dirtyFields.revenue_obstacle ? 'border-green-500' : 'border-gray-300'
              }`}
            ></textarea>

            <AnimatePresence>
              {errors.revenue_obstacle && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errors.revenue_obstacle.message}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="cta-direction">
              <button
                type="button"
                className="prev-step"
                onClick={handlePrevStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="next-step"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 12 && (
          <div className="step">
            <h3>
              The Growth Clock is Ticking! When Are You Ready to Launch?
            </h3>
            <p className="light_text">
              <span className="userNameDisplay">{watch("name")}</span>, your journey
              to local market domination is about to begin. Let&apos;s pinpoint
              your take-off time!
            </p>

            <div className="options-container list" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              width: '100%',
              maxWidth: '600px',
              margin: '2rem auto'
            }}>
              <span className="infusion-option" style={{ 
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                <input
                  id="start_immediately"
                  type="radio"
                  {...register("start_time")}
                  value="Immediately"
                />
                <label htmlFor="start_immediately" style={{ 
                  marginLeft: '0.5rem',
                  cursor: 'pointer',
                  flex: 1
                }}>Immediately</label>
              </span>
              <span className="infusion-option" style={{ 
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                <input
                  id="within1month"
                  type="radio"
                  {...register("start_time")}
                  value="Within 1 month"
                />
                <label htmlFor="within1month" style={{ 
                  marginLeft: '0.5rem',
                  cursor: 'pointer',
                  flex: 1
                }}>Within 1 month</label>
              </span>
              <span className="infusion-option" style={{ 
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                <input
                  id="within3month"
                  type="radio"
                  {...register("start_time")}
                  value="Within 3 months"
                />
                <label htmlFor="within3month" style={{ 
                  marginLeft: '0.5rem',
                  cursor: 'pointer',
                  flex: 1
                }}>Within 3 months</label>
              </span>
              <span className="infusion-option" style={{ 
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                <input
                  id="not_sure"
                  type="radio"
                  {...register("start_time")}
                  value="Not sure"
                />
                <label htmlFor="not_sure" style={{ 
                  marginLeft: '0.5rem',
                  cursor: 'pointer',
                  flex: 1
                }}>Not sure</label>
              </span>
            </div>

            <div className="cta-direction">
              <button
                type="button"
                className="prev-step"
                onClick={handlePrevStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="next-step"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 13 && (
          <div className="step">
            <h3>
              On a scale of 1 to 10... (1 being I am fine where I am, and 10
              being I&apos;ll do anything to reach my revenue goals.) What
              number are you?
            </h3>

            <div className="options-container options-container_numbers">
              {[...Array(10).keys()].map((number) => (
                <span className="infusion-option" key={number + 1}>
                  <input
                    id={`interest_level_${number + 1}`}
                    type="radio"
                    {...register("interest_level")}
                    value={String(number + 1)}
                  />
                  <label htmlFor={`interest_level_${number + 1}`}>
                    <span>{number + 1}</span>
                  </label>
                </span>
              ))}
            </div>

            {errors.interest_level && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {errors.interest_level.message}
              </div>
            )}

            <div className="cta-direction">
              <button
                type="button"
                className="prev-step"
                onClick={handlePrevStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="next-step"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 14 && (
          <div className="step">
            <p className="light_text">
              Alright <span className="userNameDisplay">{watch("name")}</span>,
              you&apos;re at the finish line - one last thing!
            </p>
            <h3>
              Are you willing to invest in your business growth to reach your
              revenue goals? Ready to Seal the Deal?
            </h3>

            <div className="options-container list">
              <span className="infusion-option">
                <input
                  id="investment_willingness_yes"
                  type="radio"
                  {...register("investment_willingness")}
                  value="Yes"
                />
                <label htmlFor="investment_willingness_yes">Yes</label>
              </span>
              <span className="infusion-option">
                <input
                  id="investment_willingness_no"
                  type="radio"
                  {...register("investment_willingness")}
                  value="No"
                />
                <label htmlFor="investment_willingness_no">No</label>
              </span>
            </div>

            <div className="cta-direction">
              <button
                type="button"
                className="prev-step"
                onClick={handlePrevStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="next-step"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === totalSteps && (
          <div className="step">
            <h3>
              🎉 BREAKTHROUGH ALERT! 🎉 We&apos;ve Got the Secret Sauce for Your
              Success, <span className="userNameDisplay">{watch("name")}</span>!
            </h3>
            <p className="light_text">
              Based on your responses, we&apos;re confident we can SUPERCHARGE
              your business growth with our proven funnels and marketing
              strategies. 🚀 💼
            </p>

            <div className="form-group" style={{ marginBottom: "20px" }}>
              <input
                type="text"
                {...register("final_name")}
                placeholder="Your Name"
                className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
                  errors.final_name ? 'border-red-500 bg-red-50' : 
                  watch("final_name") ? 'border-green-500 bg-green-50' : ''
                }`}
              />
              {errors.final_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.final_name.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                {...register("email")}
                placeholder="Your Email"
                className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
                  errors.email ? 'border-red-500 bg-red-50' : 
                  watch("email") ? 'border-green-500 bg-green-50' : ''
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {formState.error && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {formState.error}
              </p>
            )}

            <div className="cta-direction" style={{ marginTop: "25px" }}>
              <button
                type="button"
                className="prev-step"
                onClick={handlePrevStep}
              >
                Previous
              </button>
              <button 
                type="submit"
                className={`next-step ${formState.isLoading ? 'opacity-90 cursor-not-allowed' : ''} inline-flex items-center justify-center`}
                id="submit-form"
                disabled={formState.isLoading}
              >
                <span>{formState.isLoading ? 'Submitting' : 'Submit Application'}</span>
                {formState.isLoading && (
                  <span style={spinnerStyles.loader}></span>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default MarketingFunnel;
