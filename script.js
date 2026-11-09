(() => {
  "use strict";
  const content = window.SITE_CONTENT;
  if (!content) return;
  const byId = (id) => document.getElementById(id);
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const safeURL = (value) => {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value);
      return ["https:", "http:"].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  };
  const link = (label, url) => {
    const node = element("a", label);
    node.href = url;
    return node;
  };
  document.title = content.name;
  byId("name").textContent = content.name;
  const photo = byId("profile-photo");
  const placeholder = byId("photo-placeholder");
  photo.alt = content.photo?.alt || content.name;
  if (content.photo?.src) {
    photo.addEventListener("load", () => { photo.hidden = false; placeholder.hidden = true; });
    photo.addEventListener("error", () => { photo.hidden = true; placeholder.hidden = false; });
    photo.src = content.photo.src;
  }
  // Bio lives in index.html so direct text and link edits are preserved.
  byId("interests").textContent = content.interests.join(" · ");
  const contacts = content.contacts || {};
  const email = typeof contacts.email === "string" ? contacts.email.trim() : "";
  const contactItems = [
    ["Email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? `mailto:${email}` : null],
    ["GitHub", safeURL(contacts.github)],
    ["LinkedIn", safeURL(contacts.linkedin)],
  ];
  byId("contact-links").replaceChildren(...contactItems.map(([label, url]) => {
    const item = element("li");
    if (url) {
      const anchor = link("", url);
      anchor.className = "contact-icon";
      anchor.title = label;
      anchor.setAttribute("aria-label", label);
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("width", "22");
      svg.setAttribute("height", "22");
      svg.setAttribute("aria-hidden", "true");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const paths = {
        Email: "M3 5h18v14H3V5zm0 0 9 8 9-8",
        GitHub: "M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.97 0 0 .95-.3 3.08 1.15A10.7 10.7 0 0 1 12 6.12c.95 0 1.9.13 2.8.38 2.14-1.45 3.08-1.15 3.08-1.15.62 1.54.23 2.69.12 2.97.72.79 1.15 1.79 1.15 3.02 0 4.33-2.63 5.28-5.14 5.56.41.35.77 1.03.77 2.08v3.11c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z",
        LinkedIn: "M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.78 1.2-1.78 2.44v4.73H9.53V9.2h2.83v1.3h.04c.39-.74 1.36-1.53 2.8-1.53 3 0 3.55 1.98 3.55 4.55v5.23Z",
      };
      path.setAttribute("d", paths[label]);
      if (label === "Email") {
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-width", "1.6");
        path.setAttribute("stroke-linejoin", "round");
      } else path.setAttribute("fill", "currentColor");
      svg.append(path);
      anchor.append(svg);
      item.append(anchor);
    }
    else {
      const pending = element("span", label, "unavailable");
      pending.title = `${label} will be added soon`;
      pending.setAttribute("aria-label", `${label} — not yet available`);
      item.append(pending);
    }
    return item;
  }));
  const news = [...(content.news || [])].sort((a, b) => b.date.localeCompare(a.date));
  let expanded = false;
  const newsNodes = news.map((item) => {
    const row = element("li", undefined, "news-item");
    const date = element("time", undefined, "news-date");
    date.dateTime = item.date;
    const isoDate = /^\d{4}-\d{2}$/.test(item.date) ? `${item.date}-01` : item.date;
    const parsed = new Date(`${isoDate}T00:00:00Z`);
    date.textContent = Number.isNaN(parsed.getTime()) ? item.date : new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(parsed);
    const text = element("span");
    const url = safeURL(item.url);
    text.append(url ? link(item.text, url) : document.createTextNode(item.text));
    row.append(date, text);
    return row;
  });
  byId("news-list").replaceChildren(...newsNodes);
  byId("news-empty").hidden = news.length > 0;
  const toggle = byId("news-toggle");
  toggle.hidden = news.length <= 4;
  function updateNews() {
    newsNodes.forEach((node, index) => { node.hidden = !expanded && index >= 4; });
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.textContent = expanded ? "Show less ↑" : "Show more ↓";
  }
  toggle.addEventListener("click", () => { expanded = !expanded; updateNews(); });
  updateNews();
  const publications = content.publications || [];
  byId("publications-empty").hidden = publications.length > 0;
  byId("publication-list").replaceChildren(...publications.map((item) => {
    const entry = element("li", undefined, "publication");
    entry.append(element("h3", item.title));
    if (item.authors?.length) {
      const authors = element("p");
      item.authors.forEach((name, index) => {
        if (index) authors.append(document.createTextNode(", "));
        authors.append((content.authorNames || [content.name]).includes(name) ? element("strong", name) : document.createTextNode(name));
      });
      entry.append(authors);
    }
    if (item.venue) entry.append(element("p", item.venue, "venue"));
    const links = element("div", undefined, "publication-links");
    for (const [label, value] of [["Paper", item.paper], ["Code", item.code]]) {
      const url = safeURL(value);
      if (url) links.append(link(label, url));
    }
    if (links.childElementCount) entry.append(links);
    return entry;
  }));
})();
