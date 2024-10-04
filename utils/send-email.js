export async function sendEmail(data) {
  const apiEndpoint = "/api/email";
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server responded with an error:", response.status, errorData);
      throw new Error(`Server error: ${errorData.error || response.statusText}`);
    }
    
    const result = await response.json();
    console.log("Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error in sendEmail function:", error);
    throw error;
  }
}