/* ===========================================================
   In-memory store for week 2. Data lives here while the server
   runs and resets on restart. Week 3 swaps this for MySQL.
   =========================================================== */

let opportunities = [
  { id: 1, title: "Gomti riverfront cleanup", organization: "Swachh Gomti Abhiyan", cause: "Environment", location: "Gomti Riverfront, Lucknow", date: "2026-07-05", slots: 30, filled: 18 },
  { id: 2, title: "Evening English class for kids", organization: "Aasra Foundation", cause: "Education", location: "Aishbagh, Lucknow", date: "2026-07-08", slots: 8, filled: 5 },
  { id: 3, title: "Blood donation camp helpers", organization: "Indian Red Cross, Lucknow", cause: "Health", location: "Hazratganj, Lucknow", date: "2026-07-12", slots: 15, filled: 15 },
  { id: 4, title: "Tree plantation drive", organization: "Green Lucknow Collective", cause: "Environment", location: "Janeshwar Mishra Park", date: "2026-07-13", slots: 50, filled: 22 },
  { id: 5, title: "Cook & serve for the homeless", organization: "Roti Bank Lucknow", cause: "Community", location: "Charbagh, Lucknow", date: "2026-07-15", slots: 12, filled: 7 },
];

let nextId = opportunities.length + 1;

export const store = {
  list({ cause, search } = {}) {
    let result = opportunities;
    if (cause && cause !== "all") {
      result = result.filter((o) => o.cause.toLowerCase() === cause.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.organization.toLowerCase().includes(q) ||
          o.location.toLowerCase().includes(q)
      );
    }
    return result;
  },

  find(id) {
    return opportunities.find((o) => o.id === Number(id));
  },

  create(data) {
    const o = {
      id: nextId++,
      title: data.title.trim(),
      organization: data.organization.trim(),
      cause: data.cause,
      location: data.location.trim(),
      date: data.date,
      slots: Number(data.slots),
      filled: 0,
    };
    opportunities.push(o);
    return o;
  },
};
