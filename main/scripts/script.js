const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.LonLat,
  scale: function (zoom) {
    return Math.pow(2, zoom);
  },
  zoom: function (sc) {
    return Math.log(sc) / 0.6931471805599453;
  },
  distance: function (pos1, pos2) {
    var x_difference = pos2.lng - pos1.lng;
    var y_difference = pos2.lat - pos1.lat;
    return Math.sqrt(x_difference * x_difference + y_difference * y_difference);
  },
  transformation: new L.Transformation(scale_x, center_x, -scale_y, center_y),
  infinite: true,
});

var SateliteStyle = L.tileLayer("mapStyles/styleSatelite/{z}/{x}/{y}.jpg", {
    minZoom: 0,
    maxZoom: 8,
    noWrap: true,
    continuousWorld: false,
    attribution: "Online map GTA V",
    id: "SateliteStyle map",
  }),
  AtlasStyle = L.tileLayer("mapStyles/styleAtlas/{z}/{x}/{y}.jpg", {
    minZoom: 0,
    maxZoom: 5,
    noWrap: true,
    continuousWorld: false,
    attribution: "Online map GTA V",
    id: "styleAtlas map",
  }),
  GridStyle = L.tileLayer("mapStyles/styleGrid/{z}/{x}/{y}.png", {
    minZoom: 0,
    maxZoom: 5,
    noWrap: true,
    continuousWorld: false,
    attribution: "Online map GTA V",
    id: "styleGrid map",
  });

var CoordsGroup = L.layerGroup();
var PortofLS = L.layerGroup();
var WestLSDocks = L.layerGroup();
var DutchLondonBay = L.layerGroup();
var LSMarine = L.layerGroup();
var PalominoBay = L.layerGroup();
var Grapeseed = L.layerGroup();
var Paleto = L.layerGroup();
var PaletoForest = L.layerGroup();
var CatfishView = L.layerGroup();
var VespucciBeach = L.layerGroup();
var AltaStreet = L.layerGroup();
var WarehouseLocations = L.layerGroup();
var OldWarehouseLocations = L.layerGroup();

var Icons = {
  "Port of Los Santos": PortofLS,
  "West LS Docks": WestLSDocks,
  "Dutch London Bay": DutchLondonBay,
  "Los Santos Marine": LSMarine,
  "Palomino Bay": PalominoBay,
  "Grapeseed": Grapeseed,
  "Paleto": Paleto,
  "Paleto Forest": PaletoForest,
  "Catfish View": CatfishView,
  "Vespucci Beach": VespucciBeach,
  "Alta Street": AltaStreet,
  Coords: CoordsGroup,
  Warehouses: WarehouseLocations,
  "Warehouses - Old": OldWarehouseLocations,

};

var mymap = L.map("map", {
  crs: CUSTOM_CRS,
  minZoom: 1,
  maxZoom: 5,
  Zoom: 5,
  maxNativeZoom: 5,
  preferCanvas: true,
  layers: [SateliteStyle],
  center: [0, 0],
  zoom: 3,
});

var layersControl = L.control
  .layers(
    { Satelite: SateliteStyle, Atlas: AtlasStyle, Grid: GridStyle },
    Icons
  )
  .addTo(mymap);

function customIcon(icon) {
  return L.icon({
    iconUrl: `blips/${icon}.png`,
    iconSize: [20, 20],
    iconAnchor: [20, 20],
    popupAnchor: [-10, -27],
  });
}

var marker;
mymap.on("click", function (e) {
  if (marker) {
    // check
    mymap.removeLayer(marker);
  }
  var coord = e.latlng;
  var lat = coord.lat;
  var lng = coord.lng;
  var zoom = 16;
  marker = new L.marker([lat, lng])
    .addTo(Icons["Coords"])
    .bindPopup("<b>X: " + lng.toFixed(3) + " | Y: " + lat.toFixed(3) + "</b>");
  mymap.setView([lat, lng], zoom);
  mymap.removeLayer(azurirajmarker);
});

// Warehouse Locations
L.marker([-1811.585, -542.350])
  .addTo(Icons["Warehouses"])
  .bindPopup("Brothers MC Warehouse");
L.polygon(
  [
    [-1747.561, -583.072],
    [-1793.293, -513.694],
    [-1826.829, -531.793],
    [-1782.622, -631.334],
  ],
  { color: "#ff0000", weight: 4 }
)
  .addTo(Icons["Warehouses"])

L.marker([2822.561, -88.381])
  .addTo(Icons["Warehouses"])
  .bindPopup("Slovaks Warehouse");
  L.polygon(
    [
      [2843.902, -124.578],
      [2821.037, -71.791],
      [2792.073, -77.823],
      [2801.220, -127.594],
    ],
    { color: "#818589", weight: 4 }
  )
    .addTo(Icons["Warehouses"])

L.marker([-2304.726, 1086.028])
  .addTo(Icons["Warehouses"])
  .bindPopup("Sinners Warehouse");
  L.polygon(
    [
      [-2279.573, 1054.838],
      [-2281.098, 1088.019],
      [-2326.829, 1083.494],
      [-2319.207, 1051.822],
    ],
    { color: "#800080", weight: 4 }
  )
    .addTo(Icons["Warehouses"])

L.marker([-1284.146, -322.153])
  .addTo(Icons["Warehouses"])
  .bindPopup("Ufasele Warehouse");
  L.polygon(
    [
      [-1268.902, -320.644],
      [-1270.427, -288.972],
      [-1307.012, -290.480],
      [-1307.012, -322.153],
    ],
    { color: "#00FF00", weight: 4 }
  )
    .addTo(Icons["Warehouses"])

L.marker([4278.354, -2181.769])
  .addTo(Icons["Warehouses"])
  .bindPopup("Possible Saints Warehouse");
  L.polygon(
    [
      [4336.280, -2175.736],
      [4305.793, -2136.523],
      [4228.049, -2187.802],
      [4257.012, -2225.507],
    ],
    { color: "#DAF7A6", weight: 4 }
  )
    .addTo(Icons["Warehouses"])

L.polygon(
  [
    [4241.768, 2872.225],
    [4426.22, 2817.93],
    [4453.659, 2893.34],
    [4269.207, 2952.16],
  ],
  { color: "#00FFFF", weight: 4 }
)
  .addTo(Icons["Warehouses"])
  .bindPopup("Possible Area of Underdogs Warehouse");

L.polygon(
    [
      [3728.049, 3428.752],
      [3696.037, 3587.114],
      [3627.439, 3576.556],
      [3662.500, 3395.572],
    ],
    { color: "#00FFFF", weight: 4 }
  )
    .addTo(Icons["Warehouses"])
    .bindPopup("Possible Area of Underdogs Warehouse");

L.marker([1593.902, 2448.419])
  .addTo(Icons["Warehouses"])
  .bindPopup("Possible Outlaws Warehouse");
  L.polygon(
    [
      [1618.293, 2415.239],
      [1616.768, 2486.125],
      [1569.512, 2489.141],
      [1569.512, 2416.747],
    ],
    { color: "#7EC8E3", weight: 4 }
  )
    .addTo(Icons["Warehouses"])

// Old Warehouse Locations
L.marker([6299.925, 0.648])
  .addTo(Icons["Warehouses - Old"])
  .bindPopup("Old - Blackhand Warehouse (03/02/2024)");
  L.polygon(
    [
      [6322.561, -17.495],
      [6359.146, 56.407],
      [6334.756, 72.997],
      [6289.024, -5.430],
    ],
    { color: "#006400", weight: 4 }
  )
    .addTo(Icons["Warehouses - Old"])


L.marker([-332.927, -1819.8])
  .addTo(Icons["Warehouses - Old"])
  .bindPopup("Old - Brothers MC Warehouse (26/02/2024)");
L.polygon(
  [
    [-275, -1878.620],
    [-351.220, -1791.144],
    [-396.951, -1812.259],
    [-332.927, -1889.177],
  ],
  { color: "#ff0000", weight: 4 }
)
  .addTo(Icons["Warehouses - Old"])

// Port of Los Santos Crate Locations
L.polygon(
  [
    [-2910.671, 1220.741],
    [-3069.207, 1213.2],
    [-3073.78, 1294.643],
    [-3361.89, 1294.643],
    [-3361.89, 807.493],
    [-3314.634, 738.115],
    [-3198.78, 682.312],
    [-3034.146, 677.787],
    [-3035.671, 623.492],
    [-3217.073, 623.492],
    [-3218.598, 608.41],
    [-3268.902, 605.393],
    [-3307.012, 593.328],
    [-3310.061, 516.409],
    [-3404.573, 514.901],
    [-3403.049, 466.639],
    [-3133.232, 459.097],
    [-3128.659, 440.999],
    [-2938.11, 444.015],
    [-2933.537, 573.721],
    [-2880.183, 570.705],
    [-2802.439, 439.491],
    [-2715.549, 442.507],
    [-2665.244, 751.689],
    [-2925.915, 756.214],
    [-2927.439, 777.329],
    [-2907.622, 778.837],
  ],
  { color: "#FF2D00", weight: 4 }
)
  .addTo(Icons["Port of Los Santos"])
  .bindPopup("Port of Los Santos");
L.marker([-3044.817, 997.527])
  .addTo(Icons["Port of Los Santos"])
  .bindPopup("Port of Los Santos Crate");
L.marker([-3342.073, 1214.708])
  .addTo(Icons["Port of Los Santos"])
  .bindPopup("Port of Los Santos Crate");
  L.marker([-2988.415, 448.540])
  .addTo(Icons["Port of Los Santos"])
  .bindPopup("Port of Los Santos Crate");

// Alta Street Crate Locations
L.polygon(
  [
    [-1685.061, -394.546],
    [-1666.768, -444.317],
    [-1692.683, -469.957],
    [-1709.451, -497.104],
    [-1727.744, -530.285],
    [-1736.890, -552.908],
    [-1759.756, -518.219],
    [-1776.524, -468.448],
    [-1765.854, -423.202],
  ],
  { color: "#FF2D00", weight: 4 }
)
  .addTo(Icons["Alta Street"])
  .bindPopup("Alta Street");
L.marker([-1701.829, -459.399])
  .addTo(Icons["Alta Street"])
  .bindPopup("Alta Street Crate");

// Dutch London Bay
L.polygon(
  [
    [-1523.476, -768.581],
    [-1525.000, -758.024],
    [-1543.293, -750.483],
    [-1526.524, -712.778],
    [-1508.232, -706.745],
    [-1483.841, -693.171],
    [-1448.780, -664.515],
    [-1335.976, -661.499],
    [-1343.598, -682.613],
    [-1470.122, -792.712],
  ],
  { color: "#FF2D00", weight: 4 }
)
  .addTo(Icons["Dutch London Bay"])
  .bindPopup("Dutch London Bay");
L.marker([-1482.317, -770.089])
  .addTo(Icons["Dutch London Bay"])
  .bindPopup("Dutch London Bay Crate");

// Palomino Bay
L.polygon(
  [
    [-878.659, 2751.569],
    [-828.354, 2825.471],
    [-621.037, 2837.536],
    [-488.415, 2882.782],
    [-464.024, 2662.584],
    [-828.354, 2546.453],
  ],
  { color: "#FF2D00", weight: 4 }
)
  .addTo(Icons["Palomino Bay"])
  .bindPopup("Palomino Bay");
L.marker([-578.354, 2799.831])
  .addTo(Icons["Palomino Bay"])
  .bindPopup("Palomino Bay Crate");

// West LS Docks
L.polygon(
  [
    [-2707.859, 385.828],
    [-2808.175, 389.97],
    [-2857.01, 336.709],
    [-2858.674, 323.141],
    [-2965.688, 321.6],
    [-3277.832, 314.107],
    [-3279.42, 302.032],
    [-3352.543, 303.524],
    [-3354.019, 104.377],
    [-2820.461, 107.436],
    [-2773.384, 154.133],
    [-2773.237, 185.805],
    [-2683.29, 187.429],
    [-2692.425, 301.99],
  ],
  { color: "#FF2D00", weight: 4 }
)
  .addTo(Icons["West LS Docks"])
  .bindPopup("West LS Docks");

// Paleto
L.polygon(
  [
    [6697.561, 1572.153],
    [6686.890, 1540.480],
    [6670.122, 1511.824],
    [6670.122, 1475.627],
    [6659.451, 1465.070],
    [6673.171, 1434.906],
    [6660.976, 1359.496],
    [6670.122, 1332.348],
    [6673.171, 1288.610],
    [6639.634, 1184.544],
    [6667.073, 1066.904],
    [6712.805, 828.608],
    [6697.561, 726.050],
    [6744.817, 646.115],
    [6761.585, 560.147],
    [6891.159, 415.360],
    [6915.549, 434.966],
    [6982.622, 386.704],
    [7087.805, 261.523],
    [7133.537, 195.162],
    [7130.488, 155.948],
    [7229.573, 89.587],
    [7253.963, 101.653],
    [7292.073, 51.882],
    [7209.756, 24.735],
    [7106.098, 30.767],
    [7016.159, -32.577],
    [6927.744, -40.118],
    [6769.207, -124.578],
    [6729.573, -183.398],
    [6692.988, -267.857],
    [6656.402, -290.480],
    [6632.012, -285.956],
    [6567.988, -355.333],
    [6409.451, -611.728],
    [6348.476, -656.974],
    [6205.183, -664.515],
    [6043.598, -794.221],
    [6214.329, -884.713],
    [6301.220, -999.336],
    [6202.134, -972.189],
    [6045.122, -939.008],
    [5906.402, -874.155],
    [5868.293, -391.530],
    [6077.134, -196.972],
    [6054.268, -168.316],
    [6221.951, 12.669],
    [6221.951, 47.358],
    [6261.585, 62.440],
    [6310.366, 134.833],
    [6371.341, 192.145],
    [6453.659, 406.310],
    [6446.037, 1244.872],
    [6388.110, 1327.823],
    [6388.110, 1361.004],
    [6433.841, 1398.709],
    [6378.963, 1600.808],
  ],
  { color: "#FF2D00", weight: 4 }
)
  .addTo(Icons["Paleto"])
  .bindPopup("Paleto");

L.marker([6487.195, 433.458])
  .addTo(Icons["Paleto"])
  .bindPopup("Paleto Crates");

// Paleto Forest
L.polygon(
  [
    [5862.195, -394.546],
    [5883.537, -690.154],
    [5752.439, -751.991],
    [5752.439, -795.729],
    [5764.634, -872.647],
    [5642.683, -868.123],
    [5552.744, -901.303],
    [5328.659, -1043.074],
    [4932.317, -584.580],
    [5160.976, -456.383],
  ],
  { color: "#FF2D00", weight: 4 }
)
  .addTo(Icons["Paleto Forest"])
  .bindPopup("Paleto Forest");

L.marker([5301.220, -561.957])
  .addTo(Icons["Paleto Forest"])
  .bindPopup("Paleto Forest Crates");

// Los Santos Marine
L.polygon(
  [
    [-2679.726, 141.06],
    [-2710.976, 139.551],
    [-2768.902, 80.696],
    [-2765.854, 2.259],
    [-2753.659, -0.677],
    [-2753.659, -98.801],
    [-2726.601, -98.28],
    [-2727.744, -157.537],
    [-2736.89, -159.098],
    [-2733.841, -196.742],
    [-2697.256, -195.31],
    [-2698.78, -246.581],
    [-2765.854, -315.968],
    [-2872.942, -405.721],
    [-2874.085, -420.005],
    [-2956.402, -502.992],
    [-2944.207, -513.583],
    [-2826.448, -566.698],
    [-2779.573, -521.024],
    [-2768.902, -530.06],
    [-2566.159, -329.529],
    [-2445.732, -463.769],
    [-2424.39, -444.118],
    [-2559.299, -281.911],
    [-2537.195, -263.092],
    [-2456.402, -353.608],
    [-2416.768, -321.923],
    [-2627.896, -8.171],
    [-2663.72, 77.756],
  ],
  { color: "#FF2D00", weight: 4 }
)
  .addTo(Icons["Los Santos Marine"])
  .bindPopup("Los Santos Marine");

L.marker([-2621.037, -313.103])
  .addTo(Icons["Los Santos Marine"])
  .bindPopup("Los Santos Marine Crate");

  // Catfish Docks
L.polygon(
  [
    [4546.646, 3801.279],
    [4436.89, 3828.427],
    [4423.171, 3750.0],
    [4528.354, 3743.967],
  ],
  { color: "#FF2D00", weight: 4 }
)
  .addTo(Icons["Catfish View"])
  .bindPopup("Catfish View Docks");

L.marker([4479.573, 3801.279])
  .addTo(Icons["Catfish View"])
  .bindPopup("Catfish View Docks Crate");

  L.polygon(
    [
      [5154.878, 3253.801],
      [5148.780, 3329.211],
      [5199.085, 3348.818],
      [5234.146, 3243.243],
    ],
    { color: "#FF2D00", weight: 4 }
  )
    .addTo(Icons["Catfish View"])
    .bindPopup("Catfish View Lighthouse");

  L.marker([5171.646, 3299.047])
    .addTo(Icons["Catfish View"])
    .bindPopup("Catfish View Lighthouse Crate");

// Grapeseed
L.polygon(
  [
    [5139.634, 2585.666],
    [5125.915, 2525.338],
    [5138.110, 2478.583],
    [5194.512, 2392.616],
    [5246.341, 2383.567],
    [5264.634, 2351.894],
    [5217.378, 2279.500],
    [5253.963, 2185.992],
    [5257.012, 2095.500],
    [5232.622, 2036.680],
    [5171.646, 1961.269],
    [5183.841, 1934.122],
    [5011.585, 1716.940],
    [4978.049, 1662.645],
    [4950.610, 1650.579],
    [4924.695, 1629.464],
    [4676.220, 1647.563],
    [4651.829, 1686.776],
    [4601.524, 1733.530],
    [4531.402, 1748.612],
    [4528.354, 1777.268],
    [4558.841, 1811.957],
    [4592.378, 1837.597],
    [4555.793, 1860.220],
    [4539.024, 1902.449],
    [4564.939, 1994.450],
    [4590.854, 2093.991],
    [4624.390, 2116.614],
    [4665.549, 2125.664],
    [4668.598, 2267.435],
    [4642.683, 2265.927],
    [4604.573, 2208.615],
    [4584.756, 2216.156],
    [4618.293, 2324.747],
    [4628.963, 2397.140],
    [4682.317, 2455.960],
    [4882.012, 2650.519],
  ],
  { color: "#FF2D00", weight: 4 }
)
  .addTo(Icons["Grapeseed"])
  .bindPopup("Grapeseed");

L.marker([4796.646, 2125.664])
  .addTo(Icons["Grapeseed"])
  .bindPopup("Grapeseed Airfield");

L.marker([5042.073, 2407.698])
  .addTo(Icons["Grapeseed"])
  .bindPopup("O'Neil Ranch");


// Vespucci Beach
L.polygon(
  [
    [-1143.902, -1623.733],
    [-1159.146, -1598.094],
    [-1191.149, -1595.077],
    [-1220.122, -1576.979],
    [-1265.954, -1542.290],
    [-1428.963, -1489.503],
    [-1467.073, -1481.962],
    [-1453.354, -1495.536],
    [-1460.976, -1507.601],
    [-1532.622, -1469.896],
    [-1525.000, -1459.339],
    [-1505.183, -1465.372],
    [-1515.854, -1448.781],
    [-1656.098, -1380.912],
    [-1802.439, -1278.354],
    [-1874.085, -1240.649],
    [-1860.366, -1204.425],
    [-1114.939, -1601.110],
  ],
  { color: "#FF2D00", weight: 4 }
)
  .addTo(Icons["Vespucci Beach"])
  .bindPopup("Vespucci Beach");
