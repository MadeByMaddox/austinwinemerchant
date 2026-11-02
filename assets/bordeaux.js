const wines = [
  ["right", 2019, "Château Angélus", "Saint-Émilion 1er Grand Cru Classé", 6, 525],
  ["right", 2019, "Croix de Beauséjour Héritiers Duffau-Lagarrosse", "Saint-Émilion 1er Grand Cru Classé", 6, 32.5],
  ["right", 2020, "Château Beauséjour Duffau Lagarrosse", "Saint-Émilion 1er Grand Cru Classé", 6, 187.5],
  ["right", 2021, "Château Beau-Séjour Bécot", "Saint-Émilion 1er Grand Cru Classé", 6, 82.5],
  ["right", 2020, "Château Bélair-Monange", "Saint-Émilion 1er Grand Cru Classé", 6, 275],
  ["pauillac", 2022, "Château Bellegrave", "Pauillac", 12, 42.5],
  ["right", 2020, "Château Bellevue", "Saint-Émilion", 6, 62.5],
  ["right", 2018, "Château Belle-Brise", "Pomerol", 12, 225],
  ["bordeaux", 2020, "Château de Benauge", "Bordeaux Supérieur Cuvée des Seigneurs", 12, 9.99],
  ["julien", 2021, "Château Beychevelle", "Saint-Julien", 6, 112.5],
  ["julien", 2020, "Château Beychevelle", "Saint-Julien", 6, 125],
  ["julien", 2022, "Château Branaire-Ducru", "Saint-Julien", 6, 87.5],
  ["julien", 2021, "Château Branaire-Ducru", "Saint-Julien", 6, 62.5],
  ["margaux", 2021, "Château Brane-Cantenac", "Margaux", 6, 87.5],
  ["estephe", 2022, "Château Calon Ségur", "Saint-Estèphe", 6, 212.5],
  ["estephe", 2021, "Château Calon Ségur", "Saint-Estèphe", 6, 150],
  ["right", 2015, "Château Canon", "Saint-Émilion Grand Cru Classé", 12, 325],
  ["right", 2022, "Château Canon Chaigneau", "Lalande de Pomerol Cuvée 8a Beton", 12, 17.5],
  ["medoc", 2022, "Château Cantemerle", "Haut-Médoc", 12, 47.5],
  ["medoc", 2019, "Château Cantemerle", "Haut-Médoc", 12, 40],
  ["right", 2019, "Château Cap de Faugères", "Castillon Côtes de Bordeaux", 12, 22.5],
  ["estephe", 2022, "Château Capbern", "Saint-Estèphe", 12, 42.5],
  ["estephe", 2020, "Château Capbern", "Saint-Estèphe", 6, 40],
  ["estephe", 2019, "Château Capbern", "Saint-Estèphe", 6, 37.5],
  ["estephe", 2018, "Château Capbern", "Saint-Estèphe", 6, 40]
];
const filterSet = [
  ["all", "All Bordeaux"],
  ["margaux", "Margaux"],
  ["julien", "Saint-Julien"],
  ["pauillac", "Pauillac"],
  ["estephe", "Saint-Estèphe"],
  ["medoc", "Haut-Médoc"],
  ["right", "Saint-Émilion, Pomerol & Satellites"],
  ["bordeaux", "Bordeaux Supérieur"]
];
const sortSet = [["name", "Producer"], ["price", "Price"], ["vintage", "Vintage"]];

const state = { filter: "all", sort: "name" };
const order = {
  name: (a, b) => a[2].localeCompare(b[2]) || b[1] - a[1],
  price: (a, b) => a[5] - b[5] || a[2].localeCompare(b[2]),
  vintage: (a, b) => b[1] - a[1] || a[2].localeCompare(b[2])
};
const burgundy = "#6B1428";

function render() {
  const rows = wines
    .filter((w) => state.filter === "all" || w[0] === state.filter)
    .sort(order[state.sort]);

  document.getElementById("filters").innerHTML = filterSet.map(([id, label]) => {
    const on = state.filter === id;
    return `<button type="button" data-filter="${id}" aria-pressed="${on}" style="background: ${on ? burgundy : "transparent"}; color: #F3ECE3; border: 1px solid ${on ? burgundy : "#6E6062"}; padding: 11px 16px; font: inherit; font-size: 15px; font-weight: 500; line-height: 1.3; cursor: pointer;">${label.replace("&", "&amp;")}</button>`;
  }).join("");

  document.getElementById("sorts").innerHTML = sortSet.map(([id, label]) => {
    const on = state.sort === id;
    return `<button type="button" data-sort="${id}" aria-pressed="${on}" style="background: none; border: 0; color: ${on ? "#F3ECE3" : "#CFC5BC"}; text-decoration: ${on ? "underline" : "none"}; text-underline-offset: 5px; padding: 12px 0; font: inherit; cursor: pointer;">${label}</button>`;
  }).join("");

  document.getElementById("count").textContent =
    rows.length === 1 ? "Showing 1 wine" : `Showing ${rows.length} wines`;

  document.getElementById("rows").innerHTML = rows.map((w) => `
    <article style="border-top: 1px solid #33282B; padding: 16px 0; display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 24px;">
      <span style="flex: 0 0 56px; color: #C9A96E; font-size: 16px; font-weight: 500;">${w[1]}</span>
      <div style="flex: 999 1 300px; min-width: 0;">
        <h3 style="margin: 0; font-family: 'Bodoni Moda', Didot, Georgia, serif; font-weight: 500; font-size: 22px; line-height: 1.25;">${w[2]}</h3>
        <p style="margin: 0; color: #CFC5BC; font-size: 15px;">${w[3]}</p>
      </div>
      <span style="flex: 0 0 96px; color: #CFC5BC; font-size: 15px;">Case of ${w[4]}</span>
      <span style="flex: 1 0 96px; text-align: right; font-family: 'Bodoni Moda', Didot, Georgia, serif; font-size: 23px; font-weight: 500;">$${w[5].toFixed(2)}</span>
    </article>`).join("");
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.filter) { state.filter = b.dataset.filter; render(); document.querySelector("[data-filter='" + state.filter + "']").focus(); }
  if (b.dataset.sort) { state.sort = b.dataset.sort; render(); document.querySelector("[data-sort='" + state.sort + "']").focus(); }
});
render();
