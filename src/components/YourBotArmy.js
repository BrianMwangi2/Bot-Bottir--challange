import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({bots, onRemoveBot, onSelectBot}) {
  //your bot army code here...

  const isBotRendered = (botId) => {
    // Iterate through the bots array to check if the bot with the given ID is already rendered
    return bots.some((bot) => bot.id === botId);
  };
  

  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
        {bots.map((bot) => (
            <BotCard key={bot.id} bot={bot} onRemove={onRemoveBot} onSelect={onSelectBot} isRendered={isBotRendered(bot.id)} />
          ))}
          Your Bot Army
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;