
document.addEventListener("DOMContentLoaded", () => {
  const messagesDiv = document.getElementById("messages");
  const inputBox = document.getElementById("inputBox");
  const sendBtn = document.getElementById("sendBtn");
  const dodobotButton = document.getElementById("dodobot-button");
  const chatbox = document.getElementById("chatbox");

  sendBtn.addEventListener("click", () => {
    const userText = inputBox.value.trim();
    if (!userText) return;
    addMessage(userText, "user");
    inputBox.value = "";

    let reply = responses["default"];
    const lowerUserText = userText.toLowerCase();
    for (let keyword in responses) {
      if (lowerUserText.includes(keyword.toLowerCase())) {
        reply = responses[keyword];
        break;
      }
    }

    setTimeout(() => {
      addMessage(reply, "bot");
    }, 300);
  });

  dodobotButton.addEventListener("click", () => {
    chatbox.style.display = chatbox.style.display === "none" ? "block" : "none";
  });

  inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendBtn.click();
    }
  });

  function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = sender;
    div.style.margin = "8px 0";
    div.style.textAlign = sender === "user" ? "right" : "left";
    div.style.color = sender === "user" ? "#0066ff" : "#333";
    div.innerText = text;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
});
