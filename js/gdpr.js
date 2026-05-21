  document.getElementById('gdpr-year').textContent = new Date().getFullYear();

  /* Cookie settings redirect — open cookie modal on return to index.html */
  var settingsBtn = document.getElementById('open-cookie-settings');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      /* Store intent and redirect to main page */
      try { sessionStorage.setItem('openCookieModal', '1'); } catch(err) {}
      window.location.href = 'index.html';
    });
  }
</script>