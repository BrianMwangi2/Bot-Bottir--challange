import React from "react";

// Algorithm
// In this component we only need an event listener for when someone clicks on the card of a particular bot
// When it is clicked on, it will render the BotSpecs component for that particular bot

const botTypeClasses = {
  Assault: "icon military",
  Defender: "icon shield",
  Support: "icon plus circle",
  Medic: "icon ambulance",
  Witch: "icon magic",
  Captain: "icon star",
};

function BotCard({ bot, onSelect, onRemove, isRendered }) {
// sending a DELETE request when someone clicks on the x button
const handleDeleteBot = (botId) => {
  // Send a delete request to remove the bot
  fetch(`http://localhost:8002/bots/${botId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // If the request is successful, call the onRemoveBot function
        onRemove(botId);
      } else {
        throw new Error("Failed to remove bot");
      }
    })
    .catch((error) => {
      console.error("Error removing bot:", error);
    });
};

  return (
    <div className="ui column">
      <div
        className="ui card"
        key={bot.id}
        onClick={() => (isRendered ? onRemove(bot.id) : onSelect(bot))}
      >
        <div className="image">
          <img alt="oh no!" src={bot.avatar_url} />
        </div>
        <div className="content">
          <div className="header">
            {bot.name}
            <i className={botTypeClasses[bot.bot_class]} />
          </div>
          <div className="meta text-wrap">
            <small>{bot.catchphrase}</small>
          </div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat" />
            {bot.health}
          </span>

          <span>
            <i className="icon lightning" />
            {bot.damage}
          </span>
          <span>
            <i className="icon shield" />
            {bot.armor}
          </span>
          <span>
            <div className="ui center aligned segment basic">
              <button
                className="ui mini red button"
                onClick={() => handleDeleteBot(bot.id)} //calling the handledelete function
              >
                x
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default BotCard;