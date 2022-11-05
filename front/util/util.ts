export function formatNum(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function calculateDiscount(price: number, discount: number) {
  return formatNum(price * (discount / 100));
}

export function generateSortUrl(filter: string, route: string) {
  const url =
    route.indexOf("sort") === -1
      ? route + filter
      : route.substring(0, route.indexOf("sort")) + filter;

  return url;
}

export function sortNumbers(numbers: number[]) {
  numbers.sort(function (a, b) {
    if (a === Infinity) return 1;
    else if (isNaN(a)) return -1;
    else return a - b;
  });
  return numbers;
}

export function uniq(a: any[]) {
  return [...new Set(a.map((p: any) => p))];
}

export const color = {
  prelude: [
    "#e3dff4",
    "#dfd9f2",
    "#dad4f1",
    "#d6ceef",
    "#d1c9ed",
    "#bcb5d5",
    "#bcb5d5",
    "#a7a1be",
    "#928da6",
    "#7d798e",
  ],
  marguerite: [
    "#ada0e2",
    "#a090dd",
    "#9280d8",
    "#8570d3",
    "#7760ce",
    "#6b56b9",
    "#5f4da5",
    "#534390",
    "#473a7c",
    "#3c3067",
  ],
  wine: [
    "#3e2832",
    "#523643",
    "#d89fb9",
    "#d393b0",
    "#ce87a7",
    "#b97a96",
    "#a56c86",
    "#905f75",
    "#7c5164",
    "#674454",
  ],
  babyBlue: [
    "#c6e4f8",
    "#bde0f7",
    "#b3dbf5",
    "#aad7f4",
    "#a0d2f3",
    "#90bddb",
    "#80a8c2",
    "#7093aa",
    "#607e92",
    "#50697a",
  ],
  light: [
    "#fefaf9",
    "#fefaf9",
    "#fefaf9",
    "#fefaf9",
    "#fefaf9",
    "#e5e1e0",
    "#cbc8c7",
    "#b2afae",
    "#989695",
    "#7f7d7d",
  ],
  dark: [
    "#bdb5b3",
    "#7e7978",
    "#726c6d",
    "#675f62",
    "#5b5257",
    "#4f454c",
    "#443941",
    "#392d36",
    "#2e222a",
    "#23161f",
  ],
  pastel_red: [
    "#ffc6c7",
    "#ffb8b9",
    "#ffaaaa",
    "#ff9c9c",
    "#ff8d8e",
    "#ff7f80",
    "#ff7172",
    "#e66667",
    "#cc5a5b",
    "#b34f50",
  ],
  yolk: [
    "#ffe1b1",
    "#ffd99e",
    "#ffd18a",
    "#ffca77",
    "#ffc263",
    "#ffbb50",
    "#ffb33c",
    "#e6a136",
    "#cc8f30",
    "#b37d2a",
  ],
};
