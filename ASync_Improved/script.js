const scriptBase = document.currentScript.src;
const featureScripts = [
  "js/data.js",
  "js/communities.js",
  "js/messages.js",
  "js/discovery.js",
  "js/signup.js",
  "js/navigation.js",
];

featureScripts
  .reduce(
    (loading, file) =>
      loading.then(
        () =>
          new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = new URL(file, scriptBase).href;
            script.onload = resolve;
            script.onerror = () =>
              reject(new Error(`Unable to load page script: ${file}`));
            document.head.appendChild(script);
          }),
      ),
    Promise.resolve(),
  )
  .catch((error) => {
    console.error("Unable to initialize the ASync page.", error);
  });
