!function(o,t){"function"==typeof define&&define.amd?define(["d3","topojson","./Choropleth","../common/Utility","require"],t):o.map_TopoJSONChoropleth=t(o.d3,o.topojson,o.map_Choropleth,o.common_Utility,o.require)}(this,function(o,t,e,n,r){function i(){e.call(this),this.projection("mercator")}return i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.prototype._class+=" map_TopoJSONChoropleth",i.prototype.publish("region","GB","set","Region Data",["AT","BE","BG","CHLI","CY","CZ","DE","DK","EE","ES","FI","FR","GB","GE","GR","HR","HU","IE","IS","IT","KS","LT","LU","LV","MD","MK","MT","ND","NL","NO","PL","PT","RO","RS","SE","SI","SK","UA"]),i.prototype.layerEnter=function(t,r,i){e.prototype.layerEnter.apply(this,arguments),this._topoJSONChoropleth=this._choroplethTransform.insert("g",".mesh"),this._selection=new n.SimpleSelection(this._topoJSONChoropleth),this.choroPaths=o.select(null)},i.prototype.layerUpdate=function(o){var n=this;return new Promise(function(i,p){n._prevRegion!==n.region()?(n._prevRegion=n.region(),r(["json!src/map/TopoJSON/"+n.region()+".json"],function(p){function c(t){n._choroTopologyIndex=t,e.prototype.layerUpdate.call(n,o,!0),i()}n._choroTopology=p,n._choroTopologyObjects=p.objects.PolbndA,n._choroTopologyFeatures=t.feature(n._choroTopology,n._choroTopologyObjects).features,r(["json!src/map/TopoJSON/"+n.region()+"_idx.json"],c,function(o){c({})})})):(e.prototype.layerUpdate.call(n,o),i())}).then(function(){var t=[];n.data().forEach(function(o){if(isNaN(o[0]))for(var e in n._choroTopologyIndex)for(var r in n._choroTopologyIndex[e])r===o[0]&&n._choroTopologyIndex[e][r].forEach(function(e){t.push([e].concat(o.filter(function(o,t){return t>0})))});else t.push(o)}),n.choroPaths=n._topoJSONChoropleth.selectAll(".data").data(n.visible()?t:[],function(o){return o[0]}),n.choroPaths.enter().append("path").attr("class","data").call(n._selection.enter.bind(n._selection)).on("click",function(o){n._dataMap[o[0]]&&n.click(n.rowToObj(n._dataMap[o[0]]),"weight",n._selection.selected(n))}).on("mouseover.tooltip",function(o){n.tooltipShow([o[0],o[1]],n.columns(),1)}).on("mouseout.tooltip",function(o){n.tooltipShow()}).on("mousemove.tooltip",function(o){n.tooltipShow([o[0],o[1]],n.columns(),1)}),n.choroPaths.attr("d",function(t){var e=o._d3GeoPath(n._choroTopologyFeatures[t[0]]);return e||console.log("Unknown Country:  "+t),e}).style("fill",function(o){var t=n._palette(o[1],n._dataMinWeight,n._dataMaxWeight);return t}),n.choroPaths.exit().remove()})},i});