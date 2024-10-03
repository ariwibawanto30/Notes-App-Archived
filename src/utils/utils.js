export function emptyElement(element) {
  element.innerHTML = "";
}

export function showElement(element) {
  element.style.display = "block";
}

export function hideElement(element) {
  element.style.display = "none";
}

export function sleep(element) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(element);
    }, 3000),
  );
}

export function showResponMessage(message) {
  alert(message);
}

export function reload() {
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}
