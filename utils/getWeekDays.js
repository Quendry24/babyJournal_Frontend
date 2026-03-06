export function getWeekDays(offset = 0, options) {
  const today = new Date();
  const day = today.getDay();
  const diffToMonday = (day + 6) % 7;

  const monday = new Date(today);
  monday.setDate(today.getDate() - diffToMonday + offset * 7);

  let week = [];
  let jours = [];

  for (let i = 0; i < 7; i++) {
    let newDay = new Date(monday);
    newDay.setDate(newDay.getDate() + i);

    jours.push(newDay.toLocaleDateString("fr-FR", options));
    week.push(newDay.toISOString().split("T")[0]);
  }

  return { week, jours, monday };
}
