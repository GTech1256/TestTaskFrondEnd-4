

const observer = {
  // 'name', [ callback ]
};

window.addEventListener('storage', (event) => {
  if (observer[event.key]) {
    observer[event.key].forEach(a => a(
      JSON.parse(event.newValue),
    ));
  }
});

export function setData(name, data) {
  localStorage.setItem(
    name,
    JSON.stringify(data),
  );
}
export function getData(name) {
  return JSON.parse(localStorage.getItem(name));
}
export function subscrubeData(name, cb) {
  if (!observer[name]) {
    observer[name] = [];
  }

  observer[name].push(cb);
}

export function unsubscrubeAllData(name) {
  delete observer[name];
}
