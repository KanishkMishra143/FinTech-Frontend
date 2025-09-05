import React from "react";
const { useEffect } = React;

function TabsController() {
  useEffect(() => {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabSections = document.querySelectorAll(".tab-section");

    function show(targetId) {
      tabButtons.forEach(btn =>
        btn.classList.toggle("active", btn.dataset.target === targetId)
      );

 
      tabSections.forEach(sec =>
        sec.classList.toggle("hidden", sec.id !== targetId)
      );
    }

    if (tabButtons.length > 0) {
      show(tabButtons[0].dataset.target);
    }

    tabButtons.forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const targetId = btn.dataset.target;
        show(targetId);
      });
    });

    return () => {
      tabButtons.forEach(btn => {
        btn.replaceWith(btn.cloneNode(true)); 
      });
    };
  }, []);

  return null; 
}

const rootDivId = "tabs-controller-root";
let rootEl = document.getElementById(rootDivId);
if (!rootEl) {
  rootEl = document.createElement("div");
  rootEl.id = rootDivId;
  document.body.appendChild(rootEl);
}
ReactDOM.createRoot(rootEl).render(<TabsController />);

