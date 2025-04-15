chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: removePaywall
    });
  });
  
  function removePaywall() {
    // Mesma função do content.js
    // (Pode ser mantida aqui para execução manual via clique no ícone)
  }