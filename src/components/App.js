// App.js
import React, { useState, useEffect } from 'react';
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy';
import './App.css';

function App() {
  const [bots, setBots] = useState([]);
  const [botArmy, setBotArmy] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('health'); // State to track sorting criteria

  useEffect(() => {
    fetch("http://localhost:8002/bots")
      .then((response) => response.json())
      .then((data) => setBots(data))
      .catch((error) => console.error(error));
  }, []);

  // Function to handle sorting
  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  // Sort bots based on the selected criteria
  const sortedBots = [...bots].sort((a, b) => b[sortCriteria] - a[sortCriteria]);

  const handleAddBot = (bot) => {
    if (!botArmy.some((b) => b.bot_class === bot.bot_class)) {
      setBotArmy([...botArmy, bot]);
    }
  };

  const handleReleaseBot = (bot) => {
    const newBotArmy = botArmy.filter((b) => b.id !== bot.id);
    setBotArmy(newBotArmy);
  };

  const handleDischargeBot = (bot) => {
    fetch(`http://localhost:8002/bots/${bot.id}`, { method: 'DELETE' })
      .then(() => {
        const newBots = bots.filter((b) => b.id !== bot.id);
        setBots(newBots);
        handleReleaseBot(bot);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteBot = (bot) => {
    fetch(`http://localhost:8002/bots/${bot.id}`, { method: 'DELETE' })
      .then(() => {
        const newBots = bots.filter((b) => b.id !== bot.id);
        setBots(newBots);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <select onChange={(e) => handleSort(e.target.value)}>
        <option value="health">Sort by Health</option>
        <option value="damage">Sort by Damage</option>
        <option value="armor">Sort by Armor</option>
      </select>
      <BotCollection bots={sortedBots} onAddBot={handleAddBot} onDeleteBot={handleDeleteBot} />
      <YourBotArmy bots={botArmy} onReleaseBot={handleReleaseBot} onDischargeBot={handleDischargeBot} />
      <YourBotArmy bots={botArmy} onReleaseBot={handleReleaseBot} onDischargeBot={handleDischargeBot} onDeleteBot={handleDeleteBot} />

    </div>
  );
}

export default App;
