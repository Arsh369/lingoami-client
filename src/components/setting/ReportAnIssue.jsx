import React, { useState } from 'react';
import { ChevronLeft, Send } from 'lucide-react';
import {useNavigate} from 'react-router-dom';

const ReportAnIssuePage = () => {
    const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null); // Reset status

    // Simulate API call
    try {
      // In a real application, you would send this data to your backend
      // using fetch or axios.
      console.log('Submitting issue:', { subject, description });

      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      // Simulate success or failure
      const success = Math.random() > 0.1; // 90% chance of success
      if (success) {
        setSubmissionStatus('success');
        setSubject('');
        setDescription('');
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Failed to submit issue:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 font-inter flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center">
        <button 
        onClick={() => navigate("/setting/settingoptions")}
        className="p-2 cursor-pointer rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
          <ChevronLeft 
          className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 ml-4">Report an Issue</h1>
      </header>

      <main className="p-4">
        <section className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="Briefly describe the issue"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-y transition duration-150 ease-in-out"
                placeholder="Provide detailed information about the issue, including steps to reproduce it."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                disabled={isSubmitting}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Submit Issue
                </>
              )}
            </button>

            {submissionStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
                Issue submitted successfully! Thank you for your feedback.
              </div>
            )}
            {submissionStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
                Failed to submit issue. Please try again.
              </div>
            )}
          </form>
        </section>
      </main>
    </div>
  );
};

export default ReportAnIssuePage;
