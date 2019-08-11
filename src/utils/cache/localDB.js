

const observer = {
  // 'name', [ callback ]
};

window.addEventListener('storage', (event) => {
  if (observer[event.key]) {
    observer[event.key].forEach(a => a(event.newValue));
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

/**
 *
 * @param {*} name
 * @param {function} cb return JSON.
 */
export function subscrubeData(name, cb) {
  if (!observer[name]) {
    observer[name] = [];
  }

  observer[name].push(cb);
}

export function unsubscrubeAllData(name) {
  delete observer[name];
}
