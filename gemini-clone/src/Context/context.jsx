import { createContext, useState } from "react";
import runChat from "../config/gemini";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [responseArray, setResponseArray] = useState([]);

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData(prev => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (promptText) => {
    const prompt = promptText?.trim();
    if (!prompt) return;

    setInput("");
    setLoading(true);
    setRecentPrompt(prompt);
    setPrevPrompts(prev=>[...prev,input])
    setResultData(""); // Clear old data before typing effect


    try {
      const response = await runChat(prompt);

      if (!response) {
        setResultData("⚠️ Sorry, something went wrong or quota was reached.");
        setResponseArray([]);
        return;
      }

      // Formatting response
      const parts = response.split("**").map((part) => part.trim());
      let newResponse = "";

      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 1) {
          newResponse += `<b>${parts[i]}</b>`;
        } else {
          newResponse += parts[i];
        }
      }

      newResponse = newResponse.split("*").join("<br />");
      const newResponseArray = newResponse.split(" ");

      //typing effect
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
      }

      setResponseArray(parts.filter(Boolean));
      setPrevPrompts((prev) => [...prev, prompt]);
      setShowResult(true);
    } catch (error) {
      console.error("❌ Error during API call:", error);
      setResultData("❌ Error: Unable to get a response.");
      setResponseArray([]);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    prevPrompts,
    showResult,
    loading,
    resultData,
    responseArray,
    onSent,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
