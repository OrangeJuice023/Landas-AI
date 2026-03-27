const apiKey = "AIzaSyAjl5EFQ2NqJODQgG413KCTzQfxBMTLgN0";

async function list() {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.models) {
      console.log("Models found:", data.models.map(m => m.name));
    } else {
      console.error("List failed:", data);
    }
  } catch (e) {
    console.error("List failed:", e.message);
  }
}

list();
