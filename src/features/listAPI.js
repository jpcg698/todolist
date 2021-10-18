// A mock function to mimic making an async request for data
export function fetchList(text) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: text }), 500)
  );
}
