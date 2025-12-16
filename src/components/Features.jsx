import { useState } from 'react';
import axios from 'axios';
// import Groq from 'groq-sdk';

function Features() {
  const [inputValue, setInputValue] = useState('');
  const [getData, setdata] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Legacy Groq function (commented out for future reference)
  
//   async function getGroqChatCompletion(Product) {
//     const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY ,dangerouslyAllowBrowser:true});
//     return groq.chat.completions.create({
//       messages: [
//         {
//           role: "user",
//           content: `Summarize the customer reviews for the following product. The output must be in JSON format and include:
          
// 1) Product name and price (price should only be in INR - make sure the price matches the real price)
// 2) overall_opinion – a concise summary of overall user sentiment

// 3) pros – key positive aspects mentioned

// 4) cons – key negative aspects mentioned

// 5) sentiment_breakdown – counts or percentages of Positive, Negative, and Neutral reviews

// Product Name or Link: ${Product}

// Note: don't give any extra information at top or below json just give the respone in json, the response should only contain a single json

// Example response:
// Success: {
//   "product_name": "Butterfly Rapid Food Processor 750W Juicer Mixer Grinder",
//   "price": "5,599.00",
//   "overall_opinion": "Mixed reviews for this product, with some users praising its performance and others reporting issues with quality and durability.",
//   "pros": ["Easy to clean and maintain", "Good performance for mixing and grinding", "Value for money", "Sturdy construction"],
//   "cons": ["Poor quality and durability", "Noise pollution", "Some users reported issues with the blender", "Customer service is not good"],
//   "sentiment_breakdown": {
//     "Positive": 42,
//     "Negative": 25,
//     "Neutral": 33
//   }
// }
// `,
//         },
//       ],
//       model: "llama-3.1-8b-instant",
//     });
//   }
  
  const handleReviews = async (productName) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/search`, //Also update this URL by keeping it in .env file for production
      { name: productName }
    );

    // Axios already parses JSON
    return response.data;

  } catch (error) {
    console.error("Backend API error:", error);
    throw new Error("Failed to connect to backend service. Please try again.");
  }
};


  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      setError('Please enter a product name or URL');
      return;
    }

    // Clear previous results and show loading state
    setdata({});
    setIsLoading(true);
    setError('');

    try {
      console.log(inputValue);
      // let result = await getGroqChatCompletion(inputValue);
      // result=result.choices[0]?.message?.content || "";
      // let result = await handleReviews(inputValue);
      // const data = JSON.parse(result.data);
      // console.log('Success:', result);
      // setdata(data);
      const result = await handleReviews(inputValue);
    // Backend returns: { source, data }
      setdata(result.data);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to analyze reviews. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 transition-all duration-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-400/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6 animate-fade-in-up">
              Review Analyzer
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Get AI-powered insights from customer reviews. Discover what people really think about any product.
            </p>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-3 px-6">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Enter product name or URL..."
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        if (error) setError(''); // Clear error when user starts typing
                      }}
                      onKeyPress={handleKeyPress}
                      className="flex-1 bg-transparent border-0 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg py-4"
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Analyze</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-fade-in">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {getData?.overall_opinion && (
          <div className="max-w-6xl mx-auto px-4 pb-20 animate-fade-in-up">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Product Info Card */}
              <div className="lg:col-span-1">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Product Details</h2>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                      {getData?.product_name || "Product name not available"}
                    </h3>
                    {/* <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {getData?.price  || "N/A"}
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Analysis Cards */}
              <div className="lg:col-span-2 space-y-6">
                {/* Overall Opinion */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Overall Opinion</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    {getData.overall_opinion}
                  </p>
                </div>

                {/* Pros and Cons */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pros */}
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">Pros</h3>
                    </div>
                    <ul className="space-y-3">
                      {getData.pros?.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-red-700 dark:text-red-400">Cons</h3>
                    </div>
                    <ul className="space-y-3">
                      {getData.cons?.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sentiment Analysis */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sentiment Analysis</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Positive */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 text-center border border-green-200 dark:border-green-800">
                      <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                        {getData.sentiment_breakdown?.Positive || 0}
                      </div>
                      <div className="text-green-700 dark:text-green-300 font-semibold">Positive Reviews</div>
                      <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2 mt-3">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(getData.sentiment_breakdown?.Positive / (getData.sentiment_breakdown?.Positive + getData.sentiment_breakdown?.Negative + getData.sentiment_breakdown?.Neutral)) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Negative */}
                    <div className="bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl p-6 text-center border border-red-200 dark:border-red-800">
                      <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                        {getData.sentiment_breakdown?.Negative || 0}
                      </div>
                      <div className="text-red-700 dark:text-red-300 font-semibold">Negative Reviews</div>
                      <div className="w-full bg-red-200 dark:bg-red-800 rounded-full h-2 mt-3">
                        <div
                          className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(getData.sentiment_breakdown?.Negative / (getData.sentiment_breakdown?.Positive + getData.sentiment_breakdown?.Negative + getData.sentiment_breakdown?.Neutral)) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Neutral */}
                    <div className="bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-slate-800/50 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700">
                      <div className="text-4xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                        {getData.sentiment_breakdown?.Neutral || 0}
                      </div>
                      <div className="text-gray-700 dark:text-gray-300 font-semibold">Neutral Reviews</div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                        <div
                          className="bg-gray-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(getData.sentiment_breakdown?.Neutral / (getData.sentiment_breakdown?.Positive + getData.sentiment_breakdown?.Negative + getData.sentiment_breakdown?.Neutral)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!getData?.overall_opinion && !isLoading && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Analyze Reviews?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enter a product name or URL above to get AI-powered insights from customer reviews.
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );

}

export default Features;
