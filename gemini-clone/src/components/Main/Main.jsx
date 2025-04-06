import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const cardData = [
  { text: "Suggest some beautiful places...", icon: assets.compass_icon, alt: "Compass Icon" },
  { text: "Brief this concept...", icon: assets.bulb_icon, alt: "Bulb Icon" },
  { text: "Brainstorm team bonding ideas...", icon: assets.message_icon, alt: "Message Icon" },
  { text: "Improve readability of code...", icon: assets.code_icon, alt: "Code Icon" },
];

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleSend = () => {
    if (input.trim() !== '') {
      onSent(input);
    }
  };

  return (
    <div className='main'>
      {/* Top Navbar */}
      <div className="nav">
        <p>Gemini Ai </p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>

      {/* Main Content */}
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="geet">
              <p><span>Hello, Sir.</span></p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              {cardData.map((card, index) => (
                <div className="card" key={index}>
                  <p>{card.text}</p>
                  <img src={card.icon} alt={card.alt} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className='result'>
            <div className="result-title">
              <img src={assets.code_icon} alt="Prompt Icon" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        {/* Input and Bottom Section */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder='Enter your question here'
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              <img onClick={handleSend} src={assets.send_icon} alt="Send Icon" />
            </div>
          </div>

          {loading && <p className="loading">Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default Main;
