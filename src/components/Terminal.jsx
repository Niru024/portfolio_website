import { useState, useEffect } from "react";
import { commands } from "../data/command";

const WELCOME_MESSAGE = `
                                            
                ███╗   ██╗██╗██████╗ ██╗ █████╗   
                ████╗  ██║██║██╔══██╗██║██╔══██╗  
                ██╔██╗ ██║██║██████╔╝██║███████║
                ██║╚██╗██║██║██╔══██╗██║██╔══██║
                ██║ ╚████║██║██║  ██║██║██║  ██║
                ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝  
                           N I R X     
                  Backend • Data Science • ML
╔═════════════════════════════════════════════════════════════════╗
         WELCOME TO NIRANJAN'S PORTFOLIO TERMINAL        
                                                        
     Backend & ML Engineer | Data Science | AI Systems Developer         
╚═════════════════════════════════════════════════════════════════╝

Computer Science graduate specializing in Django-based backend development, 
data science, and machine learning, with exposure to modern frontend technologies.

✨ Quick Commands:
   • about      → Learn about me
   • skills     → View my technical skills  
   • projects   → Explore my projects
   • contact    → Get in touch
   • help       → Show all commands
   • clear      → Clear terminal

Type a command and press Enter to get started!

`;

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { cmd: "welcome", output: WELCOME_MESSAGE, isWelcome: true },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cmd = input.trim().toLowerCase();

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = commands[cmd]
      ? commands[cmd]()
      : `Command not found: ${cmd}\nType 'help'`;

    setHistory([...history, { cmd, output }]);
    setInput("");
  };

  return (
    <div className="terminal">
      {history.map((item, index) => (
        <div key={index} className={item.isWelcome ? "welcome-section" : ""}>
          {!item.isWelcome && <div className="prompt">$ {item.cmd}</div>}
          <pre className="output">{item.output}</pre>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <span className="prompt">$</span>
        <input
          className="terminal-input"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
