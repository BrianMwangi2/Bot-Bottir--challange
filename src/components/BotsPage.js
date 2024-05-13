import React, {useState, useEffect} from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotSpecs from "./BotSpecs";


function BotsPage() {
  const [bots, setBots] = useState([]) // Initializing it as an empty array
  // Step 4
  const [yourBotArmy, setYourBotArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [showBotSpecs, setShowBotSpecs] = useState(false);

  
  // Using the useEffect hook for GET request
  useEffect(() => {
    fetch("http://localhost:8002/bots")
    .then(res => res.json())
    .then(data => setBots(data)) // Updating the state variable with the fetched data
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []) // Remember the empty dependency array so that the fetch only runs once on mount

  // Step 5
  // Function to handle selecting a bot
const handleBotSelect = (bot) => {
  setSelectedBot(bot);
  setShowBotSpecs(true);
};

// Function to handle enlisting a bot
const handleEnlistBot = () => {
   if (selectedBot) { // We start by checking to see if a bot has been selected
   
    if (!yourBotArmy.some(bot => bot.id === selectedBot.id)) {
      setYourBotArmy([...yourBotArmy, selectedBot]);
    }

  // Clearing the selected bot and hide the BotSpecs once we select a bot so that it shows the botcollection
  setSelectedBot(null);
  setShowBotSpecs(false);
   }
};
// Function to handle go back
const handleGoBack = () => {
  setSelectedBot(null);
  setShowBotSpecs(false);
};
// Function to remove bot from the army
const handleRemoveBot = (botId) => {
  const updatedBots = yourBotArmy.filter(bot => bot.id !== botId);
  setYourBotArmy(updatedBots);
};


  
  // Passing the bots as props to the BotCollection component

  return (
    <div>
      <YourBotArmy bots={yourBotArmy} onRemoveBot={handleRemoveBot} />
      {showBotSpecs ? (
        <BotSpecs bot={selectedBot} onGoBack={handleGoBack} onEnlist={handleEnlistBot} />
      ) : (
        <BotCollection bots={bots} onSelectBot={handleBotSelect} />
    )}
    </div>
      
  )
}

export default BotsPage;