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

  // POI markers
  [
    ['Lekáreň',     '1 min',  49.05664, 20.29732],
    ['Kostol',      '2 min',  49.05434, 20.30112],
    ['Pošta',       '3 min',  49.06014, 20.30132],
    ['Gymnázium',   '3 min',  49.05394, 20.30312],
    ['Mestský úrad','3 min',  49.05264, 20.29912],
    ['Billa',       '5 min',  49.05994, 20.28312],
    ['Škôlka',      '5 min',  49.05734, 20.28212],
    ['Lidl',        '5 min',  49.05594, 20.33032],
    ['Divadlo',     '7 min',  49.04964, 20.29582],
    ['OC Fórum',    '9 min',  49.04734, 20.30132]
  ].forEach(([name, time, lat, lng]) => {
    L.marker([lat, lng], {
      interactive: false,
      icon: L.divIcon({
        html: '<div style="display:flex;align-items:center;gap:5px;white-space:nowrap"><div style="width:8px;height:8px;background:#263140;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.22);flex-shrink:0"><\/div><span style="font-family:Inter,sans-serif;font-size:11.5px;font-weight:600;color:#1A2533">' + name + '<\/span><span style="font-family:Inter,sans-serif;font-size:10px;color:#C5876B"> ' + time + ' pešo<\/span><\/div>',
        className: '', iconSize: [240, 18], iconAnchor: [4, 9]
      })
    }).addTo(map);
  });
})();