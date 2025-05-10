document.getElementById("chatForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const question = form.question.value;
  document.getElementById("responseBox").innerText = "답변 생성 중입니다. 잠시만 기다려주세요...";

const backendUrl = process.env.BACKEND_URL || "https://start-now-chat.onrender.com"; // fallback URL
const res = await fetch(`${backendUrl}/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: text }),
});
  
  });

  const result = await res.json();
  document.getElementById("responseBox").innerText = result.reply;
});
