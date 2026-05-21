(function initMap() {
  const el = document.getElementById('location-map');
  if (!el || typeof L === 'undefined') return;

  const CENTER = [49.05664, 20.29512];
  const map = L.map(el, {
    center: CENTER, zoom: 15,
    zoomControl: true, scrollWheelZoom: false
  });
  map.attributionControl.setPrefix('');

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
  }).addTo(map);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 16, opacity: 0.75
  }).addTo(map);

  // Project marker
  L.marker(CENTER, { icon: L.divIcon({
    html: '<div style="width:42px;height:42px;background:#263140;border:2.5px solid #C5876B;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif;font-weight:900;font-size:8px;letter-spacing:0.06em;color:#C5876B;box-shadow:0 3px 18px rgba(38,49,64,0.3);text-transform:uppercase">PD<\/div>',
    className: '', iconSize: [42, 42], iconAnchor: [21, 21]
  }) }).addTo(map);

  // POI markers — reálne súradnice z OpenStreetMap/Nominatim
  [
    ['Lekáreň',      '1 min pešo',  49.05834, 20.29399],  // Victoria, Drevárska
    ['Kostol',       '2 min pešo',  49.05505, 20.30229],  // Evanjelický kostol
    ['Pošta',        '3 min pešo',  49.05505, 20.29735],  // Poprad 1, Mnoheľova
    ['Mestský úrad', '3 min pešo',  49.05402, 20.29850],  // Nám. sv. Egídia
    ['Gymnázium',    '3 min pešo',  49.04722, 20.29827],  // Bilingválne Gymnázium
    ['Billa',        '5 min pešo',  49.05916, 20.28979],  // Jiřího Wolkera
    ['Škôlka',       '5 min pešo',  49.05806, 20.28817],  // Materská škola, Podtatranská
    ['Lidl',         '5 min autom', 49.05900, 20.31048],  // Kukučínova
    ['Divadlo',      '7 min pešo',  49.05080, 20.29630],
    ['OC Fórum',     '9 min pešo',  49.05353, 20.29897]   // Nám. sv. Egídia
  ].forEach(function(p) {
    L.marker([p[2], p[3]], {
      interactive: false,
      icon: L.divIcon({
        html: '<div style="display:flex;align-items:center;gap:5px;white-space:nowrap"><div style="width:8px;height:8px;background:#263140;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.22);flex-shrink:0"><\/div><span style="font-family:Inter,sans-serif;font-size:11.5px;font-weight:600;color:#1A2533">' + p[0] + '<\/span><span style="font-family:Inter,sans-serif;font-size:10px;color:#C5876B"> ' + p[1] + '<\/span><\/div>',
        className: '', iconSize: [240, 18], iconAnchor: [4, 9]
      })
    }).addTo(map);
  });
})();
