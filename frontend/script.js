document.getElementById("chatForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const question = form.question.value;
  document.getElementById("responseBox").innerText = "답변 생성 중입니다. 잠시만 기다려주세요...";

  const res = await fetch("https://your-backend-url.onrender.com/chat", { // 🔁 Render 배포 주소로 변경
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: question }),
  });

  const result = await res.json();
  document.getElementById("responseBox").innerText = result.reply;
});
