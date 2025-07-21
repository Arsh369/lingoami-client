import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import {useNavigate } from "react-router-dom"
const FAQPage = () => {
    const navigate = useNavigate();
  // State to manage which FAQ item is currently open
  const [openFAQ, setOpenFAQ] = useState(null);

  // Sample FAQ data
  const faqs = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'You can reset your password by navigating to the "Settings" page, then "Account Security," and selecting "Change Password." Follow the prompts to set a new password.',
    },
    {
      id: 2,
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay for all transactions.',
    },
    {
      id: 3,
      question: 'How can I contact customer support?',
      answer: 'Our customer support team is available 24/7. You can reach us via the "Report an Issue" section in the app, or by emailing support@example.com.',
    },
    {
      id: 4,
      question: 'Is my personal data secure?',
      answer: 'Yes, we take data security very seriously. All your personal data is encrypted and stored on secure servers. We adhere to strict privacy policies.',
    },
    {
      id: 5,
      question: 'How do I update my profile information?',
      answer: 'To update your profile, go to your "Profile" section from the main menu. You can then edit your name, email, and other details.',
    },
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center">
        <button 
        onClick={() => navigate("/setting/settingoptions")}
        className="p-2 cursor-pointer rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 ml-4">FAQ</h1>
      </header>

      <main className="p-4">
        <section className="bg-white rounded-lg shadow-sm overflow-hidden">
          {faqs.map((faq, index) => (
            <div key={faq.id} className={`${index < faqs.length - 1 ? 'border-b border-gray-200' : ''}`}>
              <button
                className="flex cursor-pointer items-center justify-between w-full p-4 text-left text-gray-800 font-medium hover:bg-gray-50 focus:outline-none"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={openFAQ === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span>{faq.question}</span>
                {openFAQ === faq.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
                )}
              </button>
              {openFAQ === faq.id && (
                <div
                  id={`faq-answer-${faq.id}`}
                  className="px-4 pb-4 text-gray-700 text-base leading-relaxed animate-fade-in"
                  // Add a simple animation for smooth reveal
                  style={{ animationDuration: '0.3s' }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default FAQPage;
