async function sendMessage(message) {
  const res = await fetch("https://ai-chat-worker.csrynaldifusototo.workers.dev/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: message }] }),
  });
  const data = await res.json();
  return data.choices[0].message.content;
}
