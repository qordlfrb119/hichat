document.getElementById("chatForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = e.target.question;
  const text = input.value.trim();
  if (!text) return;

  const chatBody = document.getElementById("chatBody");
  const userMsg = document.createElement("div");
  userMsg.className = "message";
  userMsg.innerHTML = `<div class="message-text" style="margin-left:auto;background:#dcf8c6">${text}</div>`;
  chatBody.appendChild(userMsg);
  chatBody.scrollTop = chatBody.scrollHeight;

  input.value = "";

  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3000"; // 로컬 테스트용 fallback
    const res = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const result = await res.json();

    const botMsg = document.createElement("div");
    botMsg.className = "message";
    botMsg.innerHTML = `
      <img src="/mascot.png" alt="AI" />
      <div class="message-text">${result.reply}</div>
    `;
    chatBody.appendChild(botMsg);
  } catch (error) {
    console.error('Fetch error:', error);
    const errorMsg = document.createElement("div");
    errorMsg.className = "message";
    errorMsg.innerHTML = `<div class="message-text" style="color:red">오류 발생: ${error.message}</div>`;
    chatBody.appendChild(errorMsg);
  }
  chatBody.scrollTop = chatBody.scrollHeight;
});