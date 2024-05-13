
import React from "react";
import BotCard from "./BotCard";



function BotCollection({bots, onSelectBot, onRemoveBot }) { // Step 1
  // Your code here
  // Step 2 and Step 3 will be handled here
  return (
    <div className="ui four column grid">
      <div className="row">
        {bots.map((bot) => (
          <BotCard key={bot.id} bot={bot} 
          onSelect={onSelectBot} // Pass onSelect prop to handle bot selection
          onRemove={onRemoveBot} // Pass onRemove prop to handle bot removal
          />
        ))}
        Collection of all bots
      </div>
    </div>
  );
}

export default BotCollection;
