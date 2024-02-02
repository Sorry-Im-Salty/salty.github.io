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
var PortofRocksWood = L.layerGroup();
var CatfishView = L.layerGroup();

var Icons = {
    "Port of Los Santos" :PortofLS,
    "Catfish View" :CatfishView,
    "Port of Roxwood": PortofRocksWood,
	"Coords" :CoordsGroup,
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
    [-2927.439, 777.329],
    [-2907.622, 778.837]

], {color: "#FF8000", weight: 2}).addTo(Icons["Port of Los Santos"])
L.marker([-3044.817,997.527]).addTo(Icons["Port of Los Santos"]).bindPopup("Port of Los Santos Crate");
L.marker([-3342.073,1214.708]).addTo(Icons["Port of Los Santos"]).bindPopup("Port of Los Santos Crate");

// Catfish Docks

L.marker([4479.573,3801.279]).addTo(Icons["Catfish View"]).bindPopup("Port of Los Santos Crate");

// Port of RocksWood
