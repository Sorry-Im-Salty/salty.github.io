const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
    projection: L.Projection.LonLat,
    scale: function(zoom) {

        return Math.pow(2, zoom);
    },
    zoom: function(sc) {

        return Math.log(sc) / 0.6931471805599453;
    },
	distance: function(pos1, pos2) {
        var x_difference = pos2.lng - pos1.lng;
        var y_difference = pos2.lat - pos1.lat;
        return Math.sqrt(x_difference * x_difference + y_difference * y_difference);
    },
	transformation: new L.Transformation(scale_x, center_x, -scale_y, center_y),
    infinite: true
});

var SateliteStyle = L.tileLayer('mapStyles/styleSatelite/{z}/{x}/{y}.jpg', {minZoom: 0,maxZoom: 8,noWrap: true,continuousWorld: false,attribution: 'Online map GTA V',id: 'SateliteStyle map',}),
	AtlasStyle	= L.tileLayer('mapStyles/styleAtlas/{z}/{x}/{y}.jpg', {minZoom: 0,maxZoom: 5,noWrap: true,continuousWorld: false,attribution: 'Online map GTA V',id: 'styleAtlas map',}),
	GridStyle	= L.tileLayer('mapStyles/styleGrid/{z}/{x}/{y}.png', {minZoom: 0,maxZoom: 5,noWrap: true,continuousWorld: false,attribution: 'Online map GTA V',id: 'styleGrid map',});

var CoordsGroup = L.layerGroup();
var PortofLS = L.layerGroup();
var WestLSDocks = L.layerGroup();
var LSMarine = L.layerGroup();
var PortofRocksWood = L.layerGroup();
var CatfishView = L.layerGroup();
var WarehouseLocations = L.layerGroup();

var Icons = {
    "Port of Los Santos" :PortofLS,
    "West LS Docks" :WestLSDocks,
    "Los Santos Marine" :LSMarine,
    "Catfish View" :CatfishView,
    "Port of Roxwood": PortofRocksWood,
	"Coords" :CoordsGroup,
    "Warehouses" :WarehouseLocations,
};

var mymap = L.map('map', {
    crs: CUSTOM_CRS,
    minZoom: 1,
    maxZoom: 5,
    Zoom: 5,
    maxNativeZoom: 5,
    preferCanvas: true,
    layers: [SateliteStyle, Icons["Coords"]],
    center: [0, 0],
    zoom: 3,
});

var layersControl = L.control.layers({ "Satelite": SateliteStyle,"Atlas": AtlasStyle,"Grid":GridStyle}, Icons).addTo(mymap);


function customIcon(icon){
	return L.icon({
		iconUrl: `blips/${icon}.png`,
		iconSize:     [20, 20],
		iconAnchor:   [20, 20], 
		popupAnchor:  [-10, -27]
	});
}

var marker;
mymap.on('click', function (e) {
    if (marker) { // check
        mymap.removeLayer(marker); 
    }
    var coord = e.latlng;
  var lat = coord.lat;
  var lng = coord.lng;
  var zoom = 16;
    marker = new L.marker([lat,lng]).addTo(Icons["Coords"]).bindPopup("<b>X: "+lng.toFixed(3)+" | Y: "+lat.toFixed(3)+"</b>");
    mymap.setView([lat, lng], zoom);
    mymap.removeLayer(azurirajmarker);
    
});

// Warehouse Locations

L.marker([2822.561, -88.381]).addTo(Icons["Warehouses"]).bindPopup("Slovaks Warehouse");
L.marker([-2304.726, 1086.028]).addTo(Icons["Warehouses"]).bindPopup("Sinners Warehouse");
L.marker([6299.925, 0.648]).addTo(Icons["Warehouses"]).bindPopup("Blackhand Warehouse");
L.marker([-1287.195, -335.726]).addTo(Icons["Warehouses"]).bindPopup("Ufasele Warehouse");

// Port of Los Santos Crate Locations
L.polygon([
    [-2910.671, 1220.741],
    [-3069.207, 1213.200],
    [-3073.780, 1294.643],
    [-3361.890, 1294.643],
    [-3361.890, 807.493],
    [-3314.634, 738.115],
    [-3198.780, 682.312],
    [-3034.146, 677.787],
    [-3035.671, 623.492],
    [-3217.073, 623.492],
    [-3218.598, 608.410],
    [-3268.902, 605.393],
    [-3307.012, 593.328],
    [-3310.061, 516.409],
    [-3404.573, 514.901],
    [-3403.049, 466.639],
    [-3133.232, 459.097],
    [-3128.659, 440.999],
    [-2938.110, 444.015],
    [-2933.537, 573.721],
    [-2880.183, 570.705],
    [-2802.439, 439.491],
    [-2715.549, 442.507],
    [-2665.244, 751.689],
    [-2925.915, 756.214],
    [-2927.439, 777.329],
    [-2907.622, 778.837]
], {color: "#FF8000", weight: 2}).addTo(Icons["Port of Los Santos"]).bindPopup("Port of Los Santos");
L.marker([-3044.817,997.527]).addTo(Icons["Port of Los Santos"]).bindPopup("Port of Los Santos Crate");
L.marker([-3342.073,1214.708]).addTo(Icons["Port of Los Santos"]).bindPopup("Port of Los Santos Crate");

// West LS Docks
L.polygon([
    [-2707.859, 385.828],
    [-2808.175, 389.970],
    [-2857.010, 336.709],
    [-2858.674, 323.141],
    [-2965.688, 321.600],
    [-3277.832, 314.107],
    [-3279.420, 302.032],
    [-3352.543, 303.524],
    [-3354.019, 104.377],
    [-2820.461, 107.436],
    [-2773.384, 154.133],
    [-2773.237, 185.805],
    [-2683.290, 187.429],
    [-2692.425, 301.990]
], {color: "#FF8000", weight: 2}).addTo(Icons["West LS Docks"]).bindPopup("West LS Docks")

// Los Santos Marine
L.polygon([
    [-2679.726, 141.060],
    [-2710.976, 139.551],
    [-2768.902, 80.696],
    [-2765.854, 2.259],
    [-2753.659, -0.677],
    [-2753.659, -98.801],
    [-2726.601, -98.280],
    [-2727.744, -157.537],
    [-2736.890, -159.098],
    [-2733.841, -196.742],
    [-2697.256, -195.310],
    [-2698.780, -246.581],
    [-2765.854, -315.968],
    [-2872.942, -405.721],
    [-2874.085, -420.005],
    [-2956.402, -502.992],
    [-2944.207, -513.583],
    [-2826.448, -566.698],
    [-2779.573, -521.024],
    [-2768.902, -530.060],
    [-2566.159, -329.529],
    [-2445.732, -463.769],
    [-2424.390, -444.118],
    [-2559.299, -281.911],
    [-2537.195, -263.092],
    [-2456.402, -353.608],
    [-2416.768, -321.923],
    [-2627.896, -8.171],
    [-2663.720, 77.756]
], {color: "#FF8000", weight: 2}).addTo(Icons["Los Santos Marine"]).bindPopup("Los Santos Marine");

// Catfish Docks

L.polygon([
    [4546.646, 3801.279],
    [4436.890, 3828.427],
    [4423.171, 3750.000],
    [4528.354, 3743.967]
], {color: "#FF8000", weight: 2}).addTo(Icons["Catfish View"]).bindPopup("Catfish View Docks");

L.marker([4479.573,3801.279]).addTo(Icons["Catfish View"]).bindPopup("Port of Los Santos Crate");

// Port of RocksWood
