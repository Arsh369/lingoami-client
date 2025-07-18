import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

// Data for languages with associated flags/icons (simplified for demonstration)
// Using country flags for languages closely tied to a country, otherwise a generic icon
const languages = [
  { id: 'HI', name: 'Hindi', native: 'हिंदी', code: 'HI', countryCode: 'in', flag: 'https://flagcdn.com/w40/in.png' },
  { id: 'EN', name: 'English', native: 'English', code: 'EN', countryCode: 'gb', flag: 'https://flagcdn.com/w40/gb.png' },
  { id: 'PA', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', code: 'PA', countryCode: 'in', flag: 'https://flagcdn.com/w40/in.png' },
  { id: 'ES', name: 'Spanish', native: 'Española', code: 'ES', countryCode: 'es', flag: 'https://flagcdn.com/w40/es.png' },
  { id: 'FR', name: 'French', native: 'Français', code: 'FR', countryCode: 'fr', flag: 'https://flagcdn.com/w40/fr.png' },
  { id: 'JA', name: 'Japanese', native: '日本語', code: 'JA', countryCode: 'jp', flag: 'https://flagcdn.com/w40/jp.png' },
  { id: 'ZH', name: 'Chinese', native: '汉语', code: 'ZH', countryCode: 'cn', flag: 'https://flagcdn.com/w40/cn.png' },
  { id: 'DE', name: 'German', native: 'Deutsch', code: 'DE', countryCode: 'de', flag: 'https://flagcdn.com/w40/de.png' },
  { id: 'AR', name: 'Arabic', native: 'العربية', code: 'AR', countryCode: 'sa', flag: 'https://flagcdn.com/w40/sa.png' },
  { id: 'RU', name: 'Russian', native: 'Русский', code: 'RU', countryCode: 'ru', flag: 'https://flagcdn.com/w40/ru.png' },
  { id: 'PT', name: 'Portuguese', native: 'Português', code: 'PT', countryCode: 'pt', flag: 'https://flagcdn.com/w40/pt.png' },
  { id: 'IT', name: 'Italian', native: 'Italiano', code: 'IT', countryCode: 'it', flag: 'https://flagcdn.com/w40/it.png' },
  { id: 'KO', name: 'Korean', native: '한국어', code: 'KO', countryCode: 'kr', flag: 'https://flagcdn.com/w40/kr.png' },
  { id: 'BN', name: 'Bengali', native: 'বাংলা', code: 'BN', countryCode: 'bd', flag: 'https://flagcdn.com/w40/bd.png' },
  { id: 'NL', name: 'Dutch', native: 'Nederlands', code: 'NL', countryCode: 'nl', flag: 'https://flagcdn.com/w40/nl.png' },
  { id: 'UR', name: 'Urdu', native: 'اردو', code: 'UR', countryCode: 'pk', flag: 'https://flagcdn.com/w40/pk.png' },
  { id: 'TE', name: 'Telugu', native: 'తెలుగు', code: 'TE', countryCode: 'in', flag: 'https://flagcdn.com/w40/in.png' },
  { id: 'ML', name: 'Malayalam', native: 'മലയാളം', code: 'ML', countryCode: 'in', flag: 'https://flagcdn.com/w40/in.png' },
  { id: 'KN', name: 'Kannada', native: 'ಕನ್ನಡ', code: 'KN', countryCode: 'in', flag: 'https://flagcdn.com/w40/in.png' },
  { id: 'MR', name: 'Marathi', native: 'मराठी', code: 'MR', countryCode: 'in', flag: 'https://flagcdn.com/w40/in.png' },
  { id: 'GU', name: 'Gujarati', native: 'ગુજરાતી', code: 'GU', countryCode: 'in', flag: 'https://flagcdn.com/w40/in.png' },
  { id: 'SD', name: 'Sindhi', native: 'سنڌي‎', code: 'SD', countryCode: 'pk', flag: 'https://flagcdn.com/w40/pk.png' },
  { id: 'TA', name: 'Tamil', native: 'தமிழ்', code: 'TA', countryCode: 'in', flag: 'https://flagcdn.com/w40/in.png' },
  { id: 'SV', name: 'Swedish', native: 'Svenska', code: 'SV', countryCode: 'se', flag: 'https://flagcdn.com/w40/se.png' },
  { id: 'NO', name: 'Norwegian', native: 'Norsk', code: 'NO', countryCode: 'no', flag: 'https://flagcdn.com/w40/no.png' },
  { id: 'DA', name: 'Danish', native: 'Dansk', code: 'DA', countryCode: 'dk', flag: 'https://flagcdn.com/w40/dk.png' },
  { id: 'FI', name: 'Finnish', native: 'Suomi', code: 'FI', countryCode: 'fi', flag: 'https://flagcdn.com/w40/fi.png' },
  { id: 'PL', name: 'Polish', native: 'Polski', code: 'PL', countryCode: 'pl', flag: 'https://flagcdn.com/w40/pl.png' },
  { id: 'TR', name: 'Turkish', native: 'Türkçe', code: 'TR', countryCode: 'tr', flag: 'https://flagcdn.com/w40/tr.png' },
  { id: 'EL', name: 'Greek', native: 'Ελληνικά', code: 'EL', countryCode: 'gr', flag: 'https://flagcdn.com/w40/gr.png' },
  { id: 'HE', name: 'Hebrew', native: 'עברית', code: 'HE', countryCode: 'il', flag: 'https://flagcdn.com/w40/il.png' },
  { id: 'VI', name: 'Vietnamese', native: 'Tiếng Việt', code: 'VI', countryCode: 'vn', flag: 'https://flagcdn.com/w40/vn.png' },
  { id: 'TH', name: 'Thai', native: 'ไทย', code: 'TH', countryCode: 'th', flag: 'https://flagcdn.com/w40/th.png' },
  { id: 'ID', name: 'Indonesian', native: 'Bahasa Indonesia', code: 'ID', countryCode: 'id', flag: 'https://flagcdn.com/w40/id.png' },
  { id: 'MS', name: 'Malay', native: 'Bahasa Melayu', code: 'MS', countryCode: 'my', flag: 'https://flagcdn.com/w40/my.png' },
  { id: 'RO', name: 'Romanian', native: 'Română', code: 'RO', countryCode: 'ro', flag: 'https://flagcdn.com/w40/ro.png' },
  { id: 'HU', name: 'Hungarian', native: 'Magyar', code: 'HU', countryCode: 'hu', flag: 'https://flagcdn.com/w40/hu.png' },
  { id: 'CS', name: 'Czech', native: 'Čeština', code: 'CS', countryCode: 'cz', flag: 'https://flagcdn.com/w40/cz.png' },
  { id: 'SK', name: 'Slovak', native: 'Slovenčina', code: 'SK', countryCode: 'sk', flag: 'https://flagcdn.com/w40/sk.png' },
  { id: 'HR', name: 'Croatian', native: 'Hrvatski', code: 'HR', countryCode: 'hr', flag: 'https://flagcdn.com/w40/hr.png' },
  { id: 'BG', name: 'Bulgarian', native: 'Български', code: 'BG', countryCode: 'bg', flag: 'https://flagcdn.com/w40/bg.png' },
  { id: 'SR', name: 'Serbian', native: 'Cрпски', code: 'SR', countryCode: 'rs', flag: 'https://flagcdn.com/w40/rs.png' },
  { id: 'UA', name: 'Ukrainian', native: 'Українська', code: 'UA', countryCode: 'ua', flag: 'https://flagcdn.com/w40/ua.png' },
  { id: 'FA', name: 'Persian', native: 'فارسی', code: 'FA', countryCode: 'ir', flag: 'https://flagcdn.com/w40/ir.png' },
  { id: 'AF', name: 'Afrikaans', native: 'Afrikaans', code: 'AF', countryCode: 'za', flag: 'https://flagcdn.com/w40/za.png' },
  { id: 'SW', name: 'Swahili', native: 'Kiswahili', code: 'SW', countryCode: 'tz', flag: 'https://flagcdn.com/w40/tz.png' }
];


// CreateAccountLanguage component for selecting language to learn
function LanguageSelectionScreen() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  // Filter languages based on search query
  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    language.native.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle the "Start Learning" button click
  const handleStartLearning = () => {
    navigate("/level");
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg  p-6 sm:p-8 flex flex-col h-screen">
      {/* Back arrow icon */}
      <div className="flex justify-start mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-gray-700 cursor-pointer"
          aria-label="Go back"
          onClick={() => navigate("/location")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-8">
        <span className="text-4xl font-bold text-yellow-500">LB</span>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
        Which language do you want to learn ? 
      </h1>
            {/* Progress Indicator (Steps 1-2-3-4-5) */}
            <div className="flex justify-center items-center mb-8">
              {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                <React.Fragment key={step}>
                  {/* Circle for each step */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold
                      ${
                        step === 6
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {step}
                  </div>
                  {/* Separator line between circles, except for the last one */}
                  {step < 7 && <div className="w-4 h-0.5 bg-gray-300"></div>}
                </React.Fragment>
              ))}
            </div>

      {/* Search Input Field */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
      </div>

      {/* Language List - Scrollable area */}
      <div className="flex-grow overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {filteredLanguages.length > 0 ? (
          filteredLanguages.map((language) => (
            <div
              key={language.code} // Using language code as key for uniqueness
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer
                ${selectedLanguage?.code === language.code
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-300 bg-white hover:bg-gray-50'
                }`}
              onClick={() => setSelectedLanguage(language)}
            >
              <div className="flex items-center space-x-3">
                {/* Flag image for language */}
                <img
                  src={language.flag}
                  alt={`${language.name} flag`}
                  className="w-8 h-6 rounded-sm shadow-sm flex-shrink-0"
                  onError={(e) => {
                    e.target.onerror = null; // Prevents infinite loop
                    e.target.src = `https://placehold.co/32x24/F0F0F0/000000?text=${language.code}`; // Fallback placeholder
                  }}
                />
                <span className="text-gray-800 font-medium">{language.name} / {language.native}</span>
              </div>
              {/* Checkmark icon for selected option */}
              {selectedLanguage?.code === language.code && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No languages found.</p>
        )}
      </div>

      {/* Custom Scrollbar Styling (for demonstration) */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>

      {/* Start Learning Button */}
      <button
        onClick={handleStartLearning}
        className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300 mt-6"
      >
        Next
      </button>
    </div>
  );
}

export default LanguageSelectionScreen;