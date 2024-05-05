import React from "react";
import './App.css';

function BotCollection({ onAddBot, bots }) {
  return (
    <div>
      <h1>My Bot Collection</h1>
      <ul>
        {bots.map((bot) => (
          <li key={bot.id}>
            <h2>{bot.name}</h2>
            <img src={bot.avatar_url} alt={bot.name} />
            <p>{bot.health}</p>
            <p>{bot.damage}</p>
            <p>{bot.armor}</p>
            <p>{bot.bot_class}</p>
            <p>{bot.created_at}</p>
            <p>{bot.updated_at}</p>
            <button onClick={() => onAddBot(bot)}>Add to Army</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BotCollection;
