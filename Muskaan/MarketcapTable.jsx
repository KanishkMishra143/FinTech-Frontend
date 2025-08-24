const { useEffect } = React;

function TabsController() {
  useEffect(() => {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabSections = document.querySelectorAll(".tab-section");

    function show(targetId) {
      // Highlight the active button
      tabButtons.forEach(btn =>
        btn.classList.toggle("active", btn.dataset.target === targetId)
      );

      // Show only the target section
      tabSections.forEach(sec =>
        sec.classList.toggle("hidden", sec.id !== targetId)
      );
    }

    
    // Default: show first button's section
    if (tabButtons.length > 0) {
      show(tabButtons[0].dataset.target);
    }

    // Attach click listeners
    tabButtons.forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const targetId = btn.dataset.target;
        show(targetId);
      });
    });

    // Cleanup on unmount
    return () => {
      tabButtons.forEach(btn => {
        btn.replaceWith(btn.cloneNode(true)); // removes listeners
      });
    };
  }, []);

  return null; // only logic
}

// Mount the controller
const rootDivId = "tabs-controller-root";
let rootEl = document.getElementById(rootDivId);
if (!rootEl) {
  rootEl = document.createElement("div");
  rootEl.id = rootDivId;
  document.body.appendChild(rootEl);
}
ReactDOM.createRoot(rootEl).render(<TabsController />);
