import React from 'react';
import { ChevronLeft, Rocket, Lightbulb, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const AboutUsPage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center">
        <button 
        onClick={() => navigate("/setting/settingoptions")}
        className="p-2 cursor-pointer rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 ml-4">About Us</h1>
      </header>

      <main className="p-4">
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Our App!</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We are dedicated to providing you with the best possible experience. Our goal is to create innovative and user-friendly solutions that simplify your daily tasks and enhance your digital life.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Founded in [Year], we have grown into a passionate team committed to excellence and continuous improvement. We believe in the power of technology to make a positive impact.
          </p>
        </section>

        {/* Our Mission Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-3">
            <Rocket className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to empower individuals and businesses by building intuitive, powerful, and reliable software that solves real-world problems and fosters creativity. We strive to deliver exceptional value and a seamless user experience.
          </p>
        </section>

        {/* Our Vision Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-3">
            <Lightbulb className="h-6 w-6 text-yellow-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Our Vision</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We envision a future where technology is accessible, simple, and enriching for everyone. We aim to be a leading innovator in the industry, constantly pushing boundaries to create meaningful and impactful digital products.
          </p>
        </section>

        {/* Our Team Section (Optional, can be expanded) */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-3">
            <Users className="h-6 w-6 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Our Team</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We are a diverse group of designers, developers, and strategists united by a common passion for technology and a commitment to our users. Our collaborative spirit and dedication drive us to build products we are proud of.
          </p>
          {/* You could add team member cards here */}
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;
