import React, { useState, useEffect, useCallback } from "react";

const totalSteps = 15;

const MarketingFunnel = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState({
    currentRevenue: 33000,
    targetRevenue: 100000,
    websiteUrl: "",
    noWebsite: false,
  });

  const updateUserNameDisplay = useCallback(() => {
    const nameDisplayElements = document.querySelectorAll(".userNameDisplay");
    nameDisplayElements.forEach((element) => {
      element.textContent = userName;
    });
  }, [userName]);

  useEffect(() => {
    updateProgressBar(currentStep);
    updateUserNameDisplay();
  }, [currentStep, userName, updateUserNameDisplay]);

  const updateProgressBar = (stepNumber) => {
    const progressSteps = document.querySelectorAll(".progress-step");
    const progressLines = document.querySelectorAll(".progress-line");

    progressSteps.forEach((step, index) => {
      step.classList.toggle("completed", index + 1 <= stepNumber);
    });

    progressLines.forEach((line, index) => {
      line.classList.toggle("active", index < stepNumber - 1);
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNextStep = () => {
    if (currentStep === 2) {
      setUserName(formData.name || "");
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    alert("Form submitted!");
  };

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

      <form onSubmit={handleSubmit}>
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
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              required
            />
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
              <span className="userNameDisplay">{userName}</span>! 👍 Now, let&apos;s
              see if we&apos;re the perfect match to skyrocket your business. 🚀💼
              We&apos;ve got a quick quiz to make sure we can serve up that secret
              sauce for your success. Ready to dive in? It&apos;ll be painless, we
              promise! 😉
            </p>
            <h3>What type of home-based service do you offer?</h3>

            <select
              className="light_text text-left"
              name="sell_type"
              value={formData.sell_type || ""}
              onChange={handleInputChange}
              required
            >
              <option value="">
                🏠 Choose the option that best describes your business:
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
              Let&apos;s talk marketing magic! 🎩✨ What strategies are you currently
              using to attract local customers?
            </h3>
            <p className="light_text">Check all that apply</p>
            <div className="m_types_container icons">
              <div className="infusion-checkbox">
                <input
                  id="inf_option_FacebookAds"
                  name="marketing_facebook"
                  type="checkbox"
                  checked={formData.marketing_facebook || false}
                  onChange={handleInputChange}
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
                  name="marketing_adwords"
                  type="checkbox"
                  checked={formData.marketing_adwords || false}
                  onChange={handleInputChange}
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
                  name="marketing_seo"
                  type="checkbox"
                  checked={formData.marketing_seo || false}
                  onChange={handleInputChange}
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
                  name="marketing_tv"
                  type="checkbox"
                  checked={formData.marketing_tv || false}
                  onChange={handleInputChange}
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
                  name="marketing_radio"
                  type="checkbox"
                  checked={formData.marketing_radio || false}
                  onChange={handleInputChange}
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
                  name="marketing_print"
                  type="checkbox"
                  checked={formData.marketing_print || false}
                  onChange={handleInputChange}
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
                  name="marketing_other"
                  type="checkbox"
                  checked={formData.marketing_other || false}
                  onChange={handleInputChange}
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
                  name="marketing_none"
                  type="checkbox"
                  checked={formData.marketing_none || false}
                  onChange={handleInputChange}
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
              Let&apos;s pin your business on the map! 🗺️ Where do you work your home
              service magic?
            </h3>

            <select
              name="country"
              value={formData.country || ""}
              onChange={handleInputChange}
              required
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
              Let&apos;s talk treasure chests! 💰 What&apos;s your monthly budget for
              attracting those valuable local customers?
            </h3>
            <p className="light_text">
              Choose the range that best fits your marketing piggy bank
            </p>

            <div className="options-container list">
              <span className="infusion-option">
                <input
                  id="inf_option_Howmuchisyourmonthlymarketingbudget_4332"
                  name="monthly_budget"
                  type="radio"
                  value="Under $5k"
                  checked={formData.monthly_budget === "Under $5k"}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="inf_option_Howmuchisyourmonthlymarketingbudget_4332">
                  Under $5k
                </label>
              </span>
              <span className="infusion-option">
                <input
                  id="inf_option_Howmuchisyourmonthlymarketingbudget_4336"
                  name="monthly_budget"
                  type="radio"
                  value="$5k - $10k"
                  checked={formData.monthly_budget === "$5k - $10k"}
                  onChange={handleInputChange}
                />
                <label htmlFor="inf_option_Howmuchisyourmonthlymarketingbudget_4336">
                  $5k - $10k
                </label>
              </span>
              <span className="infusion-option">
                <input
                  id="inf_option_Howmuchisyourmonthlymarketingbudget_4338"
                  name="monthly_budget"
                  type="radio"
                  value="$10k - $20k"
                  checked={formData.monthly_budget === "$10k - $20k"}
                  onChange={handleInputChange}
                />
                <label htmlFor="inf_option_Howmuchisyourmonthlymarketingbudget_4338">
                  $10k - $20k
                </label>
              </span>
              <span className="infusion-option">
                <input
                  id="inf_option_Howmuchisyourmonthlymarketingbudget_4340"
                  name="monthly_budget"
                  type="radio"
                  value="$20k - $35k"
                  checked={formData.monthly_budget === "$20k - $35k"}
                  onChange={handleInputChange}
                />
                <label htmlFor="inf_option_Howmuchisyourmonthlymarketingbudget_4340">
                  $20k - $35k
                </label>
              </span>
              <span className="infusion-option">
                <input
                  id="inf_option_Howmuchisyourmonthlymarketingbudget_4342"
                  name="monthly_budget"
                  type="radio"
                  value="$35k - $50k"
                  checked={formData.monthly_budget === "$35k - $50k"}
                  onChange={handleInputChange}
                />
                <label htmlFor="inf_option_Howmuchisyourmonthlymarketingbudget_4342">
                  $35k - $50k
                </label>
              </span>
              <span className="infusion-option">
                <input
                  id="inf_option_Howmuchisyourmonthlymarketingbudget_4344"
                  name="monthly_budget"
                  type="radio"
                  value="$50k+"
                  checked={formData.monthly_budget === "$50k+"}
                  onChange={handleInputChange}
                />
                <label htmlFor="inf_option_Howmuchisyourmonthlymarketingbudget_4344">
                  $50k+
                </label>
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

        {currentStep === 7 && (
          <div className="step">
            <h3>
              <span className="userNameDisplay">{userName}</span>, what is your
              website URL?
            </h3>
            <p className="light_text">
              If you don&apos;t have one, check the box below
            </p>

            <div id="websiteInputContainer">
              <input
                type="url"
                id="websiteUrl"
                name="websiteUrl"
                placeholder="https://example.com"
                value={formData.websiteUrl || ""}
                onChange={handleInputChange}
                disabled={formData.noWebsite}
                required={!formData.noWebsite} // Required only if the user does not check "no website"
              />
            </div>

            <div className="no-website-container">
              <input
                type="checkbox"
                id="noWebsite"
                name="noWebsite"
                checked={formData.noWebsite || false}
                onChange={handleInputChange}
              />
              <label htmlFor="noWebsite">I don&apos;t have a website</label>
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

        {currentStep === 8 && (
          <div className="step">
            <h3>Paint Us a Picture of Your Home Service Empire! 🏠🎨</h3>
            <p className="light_text">
              We&apos;re excited to learn about your unique business! Give us the
              inside scoop:
            </p>
            <div className="text-center">
              <ol className="light_text text-left inline-block">
                <li>What magical home services do you offer? 🧙‍♂️</li>
                <li>Who are your ideal customers? 🎯</li>
                <li>What&apos;s your typical price range for services? 💲</li>
              </ol>
            </div>
            <p className="light_text">
              Don&apos;t hold back - the more we know, the better we can help you
              dominate your local market!
            </p>

            <textarea
              name="business_description"
              rows="4"
              value={formData.business_description || ""}
              onChange={handleInputChange}
              required
            ></textarea>

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
              Let&apos;s Celebrate Your Success! 🎉 What&apos;s Your Monthly Money Magic?
            </h3>
            <p className="light_text">
              Understanding your current revenue helps us tailor our strategies
              to supercharge your growth. Don&apos;t worry - we&apos;re not here to judge,
              only to help you reach new heights!
            </p>

            <div className="revenue-input-container">
              <input
                type="text"
                id="currentRevenue"
                name="current_revenue"
                value={`$${(formData.current_revenue || 0).toLocaleString()}`} // Ensure it&apos;s a valid number
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ""); // Keep only numeric values
                  setFormData({
                    ...formData,
                    current_revenue: parseInt(value) || 0,
                  });
                }}
                required
              />
            </div>

            <div className="slider-container">
              <input
                type="range"
                id="currentRevenueSlider"
                name="current_revenue"
                min="0"
                max="1000000"
                step="1000"
                value={formData.current_revenue || 0} // Ensure it&apos;s a valid number
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setFormData({ ...formData, current_revenue: value });
                }}
              />
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

        {currentStep === 10 && (
          <div className="step">
            <h3>Dream Big! 🌠 What&apos;s Your Target Monthly Revenue?</h3>
            <p className="light_text">
              Let&apos;s set your sights on the stars! We&apos;re asking this so we can
              craft a stellar growth plan to rocket your business to your dream
              destination. 🚀
            </p>

            <div className="revenue-input-container">
              <input
                type="text"
                id="targetRevenue"
                name="target_revenue"
                value={`$${(formData.target_revenue || 0).toLocaleString()}`} // Ensure it&apos;s a valid number
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ""); // Keep only numeric values
                  setFormData({
                    ...formData,
                    target_revenue: parseInt(value) || 0,
                  });
                }}
                required
              />
            </div>

            <div className="slider-container">
              <input
                type="range"
                id="targetRevenueSlider"
                name="target_revenue"
                min="0"
                max="2000000"
                step="1000"
                value={formData.target_revenue || 0} // Ensure it&apos;s a valid number
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setFormData({ ...formData, target_revenue: value });
                }}
              />
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

        {currentStep === 11 && (
          <div className="step">
            <h3>
              Time for Some Real Talk,{" "}
              <span className="userNameDisplay">{userName}</span>! 🤔 What&apos;s the
              #1 Roadblock Standing Between You and Your Revenue Dreams?
            </h3>
            <p className="light_text">
              We all face challenges. Let&apos;s identify yours so we can knock it
              down together! 💪
            </p>

            <textarea
              name="revenue_obstacle"
              rows="4"
              value={formData.revenue_obstacle || ""}
              onChange={handleInputChange}
              required
            ></textarea>

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
              The Growth Clock is Ticking! ⏰ When Are You Ready to Launch?
            </h3>
            <p className="light_text">
              <span className="userNameDisplay">{userName}</span>, your journey
              to local market domination is about to begin. Let&apos;s pinpoint your
              take-off time!
            </p>

            <div className="options-container list">
              <span className="infusion-option">
                <input
                  id="start_immediately"
                  name="start_time"
                  type="radio"
                  value="Immediately"
                  checked={formData.start_time === "Immediately"}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="start_immediately">Immediately</label>
              </span>
              <span className="infusion-option">
                <input
                  id="within1month"
                  name="start_time"
                  type="radio"
                  value="Within 1 month"
                  checked={formData.start_time === "Within 1 month"}
                  onChange={handleInputChange}
                />
                <label htmlFor="within1month">Within 1 month</label>
              </span>
              <span className="infusion-option">
                <input
                  id="within3month"
                  name="start_time"
                  type="radio"
                  value="Within 3 months"
                  checked={formData.start_time === "Within 3 months"}
                  onChange={handleInputChange}
                />
                <label htmlFor="within3month">Within 3 months</label>
              </span>
              <span className="infusion-option">
                <input
                  id="not_sure"
                  name="start_time"
                  type="radio"
                  value="Not sure"
                  checked={formData.start_time === "Not sure"}
                  onChange={handleInputChange}
                />
                <label htmlFor="not_sure">Not sure</label>
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
              being I&apos;ll do anything to reach my revenue goals.) What number are
              you?
            </h3>

            <div className="options-container options-container_numbers">
              {[...Array(10).keys()].map((number) => (
                <span className="infusion-option" key={number + 1}>
                  <input
                    id={`interest_level_${number + 1}`}
                    name="interest_level"
                    type="radio"
                    value={number + 1}
                    checked={formData.interest_level == number + 1}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor={`interest_level_${number + 1}`}>
                    <span>{number + 1}</span>
                  </label>
                </span>
              ))}
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

        {currentStep === 14 && (
          <div className="step">
            <p className="light_text">
              Alright <span className="userNameDisplay">{userName}</span>,
              you&apos;re at the finish line - one last thing! 🏁
            </p>
            <h3>
              Are you willing to invest in your business growth to reach your
              revenue goals? Ready to Seal the Deal? 🤝
            </h3>

            <div className="options-container list">
              <span className="infusion-option">
                <input
                  id="investment_willingness_yes"
                  name="investment_willingness"
                  type="radio"
                  value="Yes"
                  checked={formData.investment_willingness === "Yes"}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="investment_willingness_yes">Yes</label>
              </span>
              <span className="infusion-option">
                <input
                  id="investment_willingness_no"
                  name="investment_willingness"
                  type="radio"
                  value="No"
                  checked={formData.investment_willingness === "No"}
                  onChange={handleInputChange}
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
              Success, <span className="userNameDisplay">{userName}</span>!
            </h3>
            <p className="light_text">
              Based on your responses, we&apos;re confident we can SUPERCHARGE your
              business growth with our proven funnels and marketing strategies.
              🚀💼
            </p>

            <input
              type="text"
              name="final_name"
              placeholder="Your Name"
              value={formData.final_name || ""}
              onChange={handleInputChange}
              required
              style={{ marginBottom: "15px" }}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone || ""}
              onChange={handleInputChange}
              required
            />

            <div className="cta-direction">
              <button
                type="button"
                className="prev-step"
                onClick={handlePrevStep}
              >
                Previous
              </button>
              <button type="submit" className="next-step" id="submit-form">
                Book My Strategy Session
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default MarketingFunnel;
