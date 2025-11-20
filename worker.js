addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const HF_TOKEN = "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"
const MODEL = "meta-llama/Llama-3.2-3B-Instruct:novita"

async function handleRequest(request) {
  if (request.method === "POST") {
    try {
      const body = await request.json();

      const hfResponse = await fetch("https://router.huggingface.co/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: MODEL,
          messages: body.messages // terima messages dari frontend
        })
      });

      const data = await hfResponse.json();

      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  } else {
    return new Response("Cloudflare Worker AI Proxy", { status: 200 });
  }
}
