// Supabase integration for E-BOOKE landing page
// This file ensures proper integration with Supabase for form submissions

// Initialize Supabase client with the updated credentials
const supabaseUrl = 'https://svyjaititzasagvzrnkj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2eWphaXRpdHphc2FndnpybmtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MjU5NzQsImV4cCI6MjA2MjAwMTk3NH0.s4NYA7Nyt1I4Ssmka_lBNEyVN8cHU8fEvQXwRpIgZGY';

// Function to handle comprehensive form submissions to Supabase
// Making this available in the global scope for the main script to access
window.submitToSupabase = async function(fullName, email, phoneNumber) {
  try {
    console.log('Submitting to Supabase:', { fullName, email, phoneNumber });
    
    // In a real implementation with the Supabase client loaded:
    // const { data, error } = await supabase
    //   .from('leads')
    //   .insert([{ 
    //     fullName: fullName, 
    //     email: email, 
    //     phoneNumber: phoneNumber || null 
    //   }]);
    
    // if (error) throw error;
    
    // For the current implementation (without loading the full Supabase client):
    // We'll simulate a successful submission and log the data that would be sent
    
    // This would be replaced with actual API call in production
    const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber || null
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit to Supabase');
    }
    
    return {
      success: true,
      message: 'Form submitted successfully'
    };
  } catch (error) {
    console.error('Supabase submission error:', error);
    return {
      success: false,
      message: 'Error submitting to database: ' + error.message
    };
  }
};

// For module exports in Node.js environments
if (typeof module !== 'undefined') {
  module.exports = {
    submitToSupabase: window.submitToSupabase
  };
}
