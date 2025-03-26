import React, { useState } from 'react';
import { Zap, Check, ChevronRight, Menu, X } from 'lucide-react';
import { themeOptions } from '../theme-options';

const ThemePreview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with tabs to switch between themes */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Voltify Theme Options</h1>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {themeOptions.map((theme, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeTab === index ? `border-${theme.name.toLowerCase().replace(' ', '-')} text-gray-900` : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                    style={{ borderBottomColor: activeTab === index ? theme.colors[500] : 'transparent' }}
                  >
                    {theme.name}
                  </button>
                ))}
              </nav>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {themeOptions.map((theme, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTab(index);
                    setMobileMenuOpen(false);
                  }}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left ${activeTab === index ? 'border-indigo-500 text-indigo-700 bg-indigo-50' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}`}
                  style={{ 
                    borderLeftColor: activeTab === index ? themeOptions[index].colors[500] : 'transparent',
                    color: activeTab === index ? themeOptions[index].colors[700] : 'inherit',
                    backgroundColor: activeTab === index ? `${themeOptions[index].colors[50]}` : 'inherit'
                  }}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Active theme preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Theme info */}
          <div className="px-4 py-5 sm:px-6" style={{ backgroundColor: themeOptions[activeTab].colors[500], color: '#fff' }}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium">{themeOptions[activeTab].name}</h3>
                <p className="mt-1 max-w-2xl text-sm">{themeOptions[activeTab].description}</p>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-1">Voltify</span>
                <Zap className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Color palette */}
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Color Palette</h3>
            <div className="mt-4 grid grid-cols-5 sm:grid-cols-11 gap-2">
              {Object.keys(themeOptions[activeTab].colors).map((shade) => (
                <div key={shade} className="flex flex-col items-center">
                  <div 
                    className="h-12 w-full rounded shadow-sm" 
                    style={{ backgroundColor: themeOptions[activeTab].colors[shade] }}
                  ></div>
                  <span className="text-xs mt-1 text-gray-500">{shade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* UI Components Preview */}
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">UI Components</h3>
              
              {/* Navigation */}
              <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h4 className="text-sm font-medium text-gray-500">Navigation</h4>
                </div>
                <div className="p-4">
                  <nav className="flex space-x-4">
                    <a 
                      href="#" 
                      className="px-3 py-2 text-sm font-medium rounded-md" 
                      style={{ 
                        backgroundColor: themeOptions[activeTab].colors[500], 
                        color: '#fff' 
                      }}
                    >
                      Dashboard
                    </a>
                    <a 
                      href="#" 
                      className="px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900"
                    >
                      Team
                    </a>
                    <a 
                      href="#" 
                      className="px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900"
                    >
                      Projects
                    </a>
                  </nav>
                </div>
              </div>

              {/* Buttons */}
              <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h4 className="text-sm font-medium text-gray-500">Buttons</h4>
                </div>
                <div className="p-4 flex flex-wrap gap-4">
                  <button 
                    className="px-4 py-2 rounded-md text-white font-medium text-sm"
                    style={{ backgroundColor: themeOptions[activeTab].colors[500] }}
                  >
                    Primary Button
                  </button>
                  <button 
                    className="px-4 py-2 rounded-md font-medium text-sm border"
                    style={{ 
                      borderColor: themeOptions[activeTab].colors[300],
                      color: themeOptions[activeTab].colors[700]
                    }}
                  >
                    Secondary Button
                  </button>
                  <button 
                    className="px-4 py-2 rounded-md font-medium text-sm inline-flex items-center"
                    style={{ color: themeOptions[activeTab].colors[600] }}
                  >
                    <span>Text Button</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Cards */}
              <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h4 className="text-sm font-medium text-gray-500">Cards & Panels</h4>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Feature card */}
                    <div className="border rounded-lg overflow-hidden shadow-sm">
                      <div className="p-4" style={{ backgroundColor: themeOptions[activeTab].colors[50] }}>
                        <div 
                          className="rounded-full w-8 h-8 flex items-center justify-center mb-3"
                          style={{ backgroundColor: themeOptions[activeTab].colors[100] }}
                        >
                          <Zap 
                            className="h-4 w-4" 
                            style={{ color: themeOptions[activeTab].colors[600] }}
                          />
                        </div>
                        <h3 className="text-lg font-medium" style={{ color: themeOptions[activeTab].colors[900] }}>Feature</h3>
                        <p className="mt-2 text-sm text-gray-500">This is a feature description that explains the value.</p>
                      </div>
                    </div>
                    
                    {/* Testimonial card */}
                    <div className="border rounded-lg overflow-hidden shadow-sm p-4">
                      <p className="text-gray-600 italic">"This service transformed our business operations completely."</p>
                      <div className="mt-4 flex items-center">
                        <div 
                          className="w-8 h-8 rounded-full mr-3"
                          style={{ backgroundColor: themeOptions[activeTab].colors[200] }}
                        ></div>
                        <div>
                          <h4 className="text-sm font-medium">Jane Smith</h4>
                          <p className="text-xs" style={{ color: themeOptions[activeTab].colors[600] }}>CEO, Example Co</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pricing card */}
                    <div className="border rounded-lg overflow-hidden shadow-sm">
                      <div 
                        className="p-4 border-b"
                        style={{ backgroundColor: themeOptions[activeTab].colors[500], color: '#fff' }}
                      >
                        <h3 className="text-lg font-medium">Premium Plan</h3>
                        <p className="mt-1 text-sm opacity-90">For growing businesses</p>
                      </div>
                      <div className="p-4">
                        <p className="text-2xl font-bold mb-4">$49<span className="text-sm font-normal text-gray-500">/month</span></p>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <Check 
                              className="h-4 w-4 mr-2" 
                              style={{ color: themeOptions[activeTab].colors[500] }}
                            />
                            <span className="text-sm">Feature one</span>
                          </li>
                          <li className="flex items-center">
                            <Check 
                              className="h-4 w-4 mr-2" 
                              style={{ color: themeOptions[activeTab].colors[500] }}
                            />
                            <span className="text-sm">Feature two</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form elements */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <h4 className="text-sm font-medium text-gray-500">Form Elements</h4>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-3 py-2 border rounded-md" 
                        placeholder="you@example.com"
                        style={{ 
                          borderColor: 'rgb(209, 213, 219)', 
                          outline: 'none',
                          boxShadow: 'none'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = themeOptions[activeTab].colors[500];
                          e.target.style.boxShadow = `0 0 0 1px ${themeOptions[activeTab].colors[500]}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgb(209, 213, 219)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subscription</label>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 rounded" 
                          style={{ 
                            accentColor: themeOptions[activeTab].colors[600],
                            borderColor: 'rgb(209, 213, 219)'
                          }}
                        />
                        <label className="ml-2 text-sm text-gray-700">Subscribe to newsletter</label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button 
                      className="px-4 py-2 rounded-md text-white font-medium text-sm"
                      style={{ backgroundColor: themeOptions[activeTab].colors[600] }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;
