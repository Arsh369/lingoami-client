import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const TermsAndConditionsPage = () => {
    const navigate = useNavigate();
  // Placeholder for your actual Terms and Conditions content.
  // In a real application, you might fetch this from an API or a static file.
  const termsContent = `
    <h2>1. Introduction</h2>
    <p>Welcome to Our Application ("App"). These Terms and Conditions ("Terms") govern your use of our App and the services provided through it. By accessing or using our App, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you must not use our App.</p>

    <h2>2. Acceptance of Terms</h2>
    <p>By creating an account, accessing, or using the App, you signify your agreement to these Terms. We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting the revised Terms on the App. Your continued use of the App after any such changes constitutes your acceptance of the new Terms.</p>

    <h2>3. User Accounts</h2>
    <p>To access certain features of the App, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for any activities or actions under your account.</p>

    <h2>4. Privacy Policy</h2>
    <p>Your use of the App is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding the collection, use, and disclosure of your personal information.</p>

    <h2>5. Prohibited Conduct</h2>
    <p>You agree not to engage in any of the following prohibited activities:</p>
    <ul>
      <li>Using the App for any illegal purpose or in violation of any local, state, national, or international law.</li>
      <li>Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the App.</li>
      <li>Uploading invalid data, viruses, worms, or other software agents through the App.</li>
      <li>Collecting or harvesting any personally identifiable information, including account names, from the App.</li>
      <li>Impersonating another person or otherwise misrepresenting your affiliation with a person or entity.</li>
    </ul>

    <h2>6. Intellectual Property</h2>
    <p>All content, trademarks, service marks, trade names, logos, and icons are proprietary to Our Application. Nothing contained on the App should be construed as granting any license or right to use any trademark displayed on this App without the written permission of Our Application or such third party that may own the trademarks.</p>

    <h2>7. Disclaimer of Warranties</h2>
    <p>The App is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the operation or availability of the App or the information, content, materials, or products included on the App.</p>

    <h2>8. Limitation of Liability</h2>
    <p>In no event shall Our Application, its affiliates, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the App; (ii) any conduct or content of any third party on the App; (iii) any content obtained from the App; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>

    <h2>9. Governing Law</h2>
    <p>These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.</p>

    <h2>10. Contact Information</h2>
    <p>If you have any questions about these Terms, please contact us at support@example.com.</p>
  `;

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center">
        <button 
        onClick={() => navigate("/setting/settingoptions")}
        className="p-2 cursor-pointer rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 ml-4">Terms and Conditions</h1>
      </header>

      <main className="p-4">
        <section className="bg-white rounded-lg shadow-sm p-6 max-h-[calc(100vh-120px)] overflow-y-auto">
          {/* Using dangerouslySetInnerHTML to render HTML content */}
          <div
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: termsContent }}
          ></div>
        </section>
      </main>
    </div>
  );
};

export default TermsAndConditionsPage;
