!function(t,i){"function"==typeof define&&define.amd?define(["d3","../common/Database","../common/Utility","../other/Comms","../common/Widget","require"],i):t.marshaller_HipieDDL=i(t.d3,t.common_Database,t.common_Utility,t.other_Comms,t.common_Widget,t.require)}(this,function(t,i,e,s,a,o){function n(t,i){for(var e=t.split("."),s=i,a=0;a<e.length;++a){var o=e[a];if(!s||void 0===s[o])return!1;s=s[o]}return!0}function r(t){return t?String.fromCharCode(parseInt(t)):t}function u(t,i){this.visualization=t;var e={};for(var s in i)i[s]instanceof Array?i[s].forEach(function(t,i){e[0===i?s:s+"_"+i]=t}):e[s]=i[s];this.mappings=e,this.hasMappings=!1,this.reverseMappings={},this.columns=[],this.columnsIdx={},this.columnsRHS=[],this.columnsRHSIdx={}}function h(t){switch(t){case"bool":case"boolean":return"boolean";case"integer":case"float":case"double":return"number";case"date":case"time":return"time"}return"string"}function p(t,i){u.call(this,t,i),this.columns=["label","weight"],this.columnsIdx={label:0,weight:1},this.init()}function c(t,i){u.call(this,t,i),i.state?(this.columns=["state","weight"],this.columnsIdx={state:0,weight:1}):i.county?(this.columns=["county","weight"],this.columnsIdx={county:0,weight:1}):i.geohash&&(this.columns=["geohash","weight"],this.columnsIdx={geohash:0,weight:1}),this.init()}function l(t,i){u.call(this,t,i),i.state?(this.columns=["state"],this.columnsIdx={state:0}):i.county?(this.columns=["county"],this.columnsIdx={county:0}):i.geohash&&(this.columns=["geohash"],this.columnsIdx={geohash:0}),i.weight.forEach(function(t,i){this.columns.push(t),this.columnsIdx[0===i?"weight":"weight_"+i]=i+1},this),this.init()}function d(t,i){u.call(this,t,i),this.columns=["x","y","weight"],this.columnsIdx={x:0,y:1,weight:2},this.init()}function f(t,i){var e={label:i.x[0]};i.y.forEach(function(t,i){e[t]=t}),u.call(this,t,e),this.init()}function g(t,i){var e={};for(var s in i)i[s].forEach(function(i,s){e[t.label[s]]=i});u.call(this,t,e),this.init()}function v(t,i,e){u.call(this,t,i),this.icon=t.icon||{},this.fields=t.fields||{},this.columns=["uid","label","weight","flags"],this.columnsIdx={uid:0,label:1,weight:2,flags:3},this.init(),this.link=e,this.visualization=t}function m(t,i){if(this.visualization=t,i){switch(this._id=i.id,this._output=i.output,this.mappings=null,i.mappings||console.log("no mappings for:"+t.id+"->"+i.id),this.visualization.type){case"LINE":this.mappings=new f(this.visualization,i.mappings);break;case"TABLE":this.mappings=new g(this.visualization,i.mappings);break;case"GRAPH":this.mappings=new v(this.visualization,i.mappings,i.link);break;case"CHORO":i.mappings.weight instanceof Array&&i.mappings.weight.length?(this.mappings=new l(this.visualization,i.mappings,i.link),i.mappings.weight.length>1&&(this.visualization.type="LINE")):this.mappings=new c(this.visualization,i.mappings,i.link);break;case"HEAT_MAP":this.mappings=new d(this.visualization,i.mappings,i.link);break;default:this.mappings=new p(this.visualization,i.mappings)}this.first=i.first,this.reverse=i.reverse,this.sort=i.sort}}function y(t,i,e){this.visualization=t,this.eventID=i,e&&(this._updates=e.updates,this.mappings=e.mappings)}function _(t,i){this.visualization=t,this.events={};for(var e in i)this.events[e]=new y(t,e,i[e])}function b(t,i){this.dashboard=t,this.id=i.id,this.label=i.label,this.title=i.title||i.id,this.type=i.type,this.icon=i.icon||{},this.fields=i.fields||{},this.properties=i.properties||(i.source?i.source.properties:null)||{},this.source=new m(this,i.source),this.events=new _(this,i.events);var e=this;switch(this.type){case"CHORO":this.source.mappings.contains("state")?this.loadWidget("src/map/ChoroplethStates",function(t){t.id(i.id).paletteID_default(i.color)}):this.source.mappings.contains("county")?this.loadWidget("src/map/ChoroplethCounties",function(t){t.id(i.id).paletteID_default(i.color)}):this.source.mappings.contains("geohash")&&this.loadWidget("src/map/Layered",function(t){t.id(i.id)});break;case"2DCHART":case"PIE":case"BUBBLE":case"BAR":case"WORD_CLOUD":this.loadWidget("src/composite/MegaChart",function(t){t.id(i.id).legendPosition_default("none").chartType_default(e.properties.chartType||e.properties.charttype||e.type)});break;case"LINE":this.loadWidget("src/composite/MegaChart",function(t){t.id(i.id).legendPosition_default("none").chartType_default(e.properties.chartType||e.properties.charttype||e.type)});break;case"TABLE":this.loadWidget("src/composite/MegaChart",function(t){t.id(i.id).legendPosition_default("none").showChartSelect_default(!1).chartType_default("TABLE").chartTypeDefaults({pagination:!0})});break;case"SLIDER":this.loadWidget("src/form/Slider",function(t){if(t.id(i.id),i.range){var e="";for(var s in i.events.events.mappings){e=s;break}t.low_default(+i.range[0]).high_default(+i.range[1]).step_default(+i.range[2]).selectionLabel_default(e)}});break;case"GRAPH":this.loadWidgets(["src/graph/Graph"],function(t){t.id(i.id).layout_default("ForceDirected2").applyScaleOnLayout_default(!0)});break;case"FORM":this.loadWidgets(["src/form/Form","src/form/Input","src/form/Button","src/form/CheckBox","src/form/ColorInput","src/form/Radio","src/form/Range","src/form/Select","src/form/Slider","src/form/TextArea"],function(t,e){var s=e[1],a=e[3],o=e[5],n=e[7],r=e[9];t.id(i.id).inputs(i.fields.map(function(t){var i,e=[],u=[];switch(t.properties.charttype){case"TEXT":i=(new s).type_default("text");break;case"TEXTAREA":i=new r;break;case"CHECKBOX":i=new a;break;case"RADIO":i=new o;break;case"HIDDEN":i=(new s).type_default("hidden");break;default:if(t.properties.enumvals){i=new n,u=t.properties.enumvals;for(var h in u)e.push([h,u[h]])}else i=(new s).type_default("text")}if(i.name_default(t.id).label_default((t.properties?t.properties.label:null)||t.label).value_default(t.properties["default"]?t.properties["default"]:""),i instanceof a||i instanceof o){var p=Object.keys(t.properties.enumvals);i.selectOptions_default(p)}else e.length&&i.selectOptions_default(e);return i}))});break;case"HEAT_MAP":this.loadWidgets(["src/other/HeatMap"],function(t){t.id(i.id).image_default(e.properties.imageUrl)});break;default:this.loadWidget("src/common/TextBox",function(t){t.id(i.id).text_default(e.id+"\nTODO:  "+e.type)})}}function w(t,i){this.dataSource=t,this.id=i.id,this.from=i.from,this.request={},this.notify=i.notify||[],this.filter=i.filter||[]}function z(t,i,e){this.dashboard=t,this.id=i.id,this.filter=i.filter||[],this.WUID=i.WUID,this.URL=i.URL,this.databomb=i.databomb,this.request={},this._loadedCount=0;var a=this;this.outputs={};var o=[];i.outputs.forEach(function(t){a.outputs[t.id]=new w(a,t),o.push({id:t.id,from:t.from,filter:t.filter||this.filter})},this),this.WUID?this.comms=(new s.HIPIEWorkunit).url(t.marshaller.espUrl._url).proxyMappings(e).hipieResults(o):this.databomb?this.comms=(new s.HIPIEDatabomb).hipieResults(o):this.comms=(new s.HIPIERoxie).url(i.URL).proxyMappings(e)}function D(t,i,e){this.marshaller=t,this.id=i.id,this.title=i.title;var s=this;this.datasources={},this.datasourceTotal=0,i.datasources.forEach(function(t){s.datasources[t.id]=new z(s,t,e),++s.datasourceTotal}),this._visualizations={},this._visualizationArray=[],i.visualizations.forEach(function(t){var i=new b(this,t);this._visualizations[t.id]=i,this._visualizationArray.push(i),this.marshaller._visualizations[t.id]=i,this.marshaller._visualizationArray.push(i)},this),this._visualizationTotal=this._visualizationArray.length}function I(){this._proxyMappings={},this._widgetMappings=t.map(),this._clearDataOnUpdate=!0,this._propogateClear=!1}var x="...loading...";return u.prototype.init=function(){for(var t in this.mappings)this.reverseMappings[this.mappings[t]]=t,void 0===this.columnsIdx[t]&&(this.columns.push(t),this.columnsIdx[t]=this.columns.length-1),this.columnsRHS[this.columnsIdx[t]]=this.mappings[t],this.columnsRHSIdx[this.mappings[t]]=this.columnsIdx[t],this.hasMappings=!0},u.prototype.getFields=function(){return this.visualization.fields?Object.keys(this.mappings).map(function(t){return this.visualization.fields.filter(function(i){return i.id===this.mappings[t]},this).map(function(t){return new i.Field(t.id).type(h(t.properties.type)).label(this.reverseMappings[t.id])},this)[0]},this):null},u.prototype.contains=function(t){return void 0!==this.mappings[t]},u.prototype.doMap=function(t){var i=[];for(var e in this.mappings){var s=this.mappings[e];try{var a=t[s];void 0===a&&(a=t[s.toLowerCase()]),i[this.columnsIdx[e]]=a}catch(o){console.log("Invalid Mapping:  "+this.visualization.id+" ["+s+"->"+t+"]")}}return i},u.prototype.doMapAll=function(t){return t.hipieMappings(this.columnsRHS)},u.prototype.getMap=function(t){return this.mappings[t]},u.prototype.getReverseMap=function(t){return this.reverseMappings[t]},p.prototype=Object.create(u.prototype),c.prototype=Object.create(u.prototype),l.prototype=Object.create(u.prototype),d.prototype=Object.create(u.prototype),f.prototype=Object.create(u.prototype),g.prototype=Object.create(u.prototype),g.prototype.init=function(){this.visualization.label.forEach(function(t,i){this.reverseMappings[this.mappings[t]]=t,this.columns.push(t),this.columnsIdx[t]=i,this.columnsRHS[i]=this.mappings[t],this.columnsRHSIdx[this.mappings[t]]=i,this.hasMappings=!0},this)},v.prototype=Object.create(u.prototype),v.prototype.calcAnnotation=function(t,i,e){function s(t,i){if(t)for(var s in t)switch(s){case"faChar":i.faChar=r(t.faChar);break;case"tooltip":i[s]=t[s];break;case"icon_image_colorFill":case"icon_shape_colorFill":case"icon_shape_colorStroke":e?i[s.split("icon_")[1]]=t[s]:i[s]=t[s];break;case"textbox_image_colorFill":case"textbox_shape_colorFill":case"textbox_shape_colorStroke":e||(i[s]=t[s]);break;case"id":case"valuemappings":case"font":case"charttype":break;default:console.log("Unknown annotation property:  "+s)}}var a={};if(s(t,a),i&&i[t.id]&&t.valuemappings){var o=t.valuemappings[i[t.id]];s(o,a)}for(var n in a)return a;return null},v.prototype.doMapAll=function(t){function i(t,i){var e="uid_"+t[0],u=a[e];if(u||(u=(new n.Vertex).faChar(s.icon&&s.icon.faChar?r(s.icon.faChar):"").text(t[1]?t[1]:""),u.__hpcc_uid=t[0],a[e]=u,o.push(u)),i){t[1]&&u.text(t[1]);var h=s.calcAnnotation(s.visualization.icon,i);if(h)for(var p in h)u[p]&&u[p](h[p]);var c=[];s.fields.forEach(function(t){var e=s.calcAnnotation(t,i,!0);e&&c.push(e)}),u.annotationIcons(c)}return u}var e=t.jsonObj(),s=this,a={},o=[],n=this.visualization.widget,u=[];return e.forEach(function(t){var e=s.doMap(t),a=i(e,t);if(t[s.link.childfile]&&t[s.link.childfile].Row){var o=t[s.link.childfile].Row;o.forEach(function(t,e){var o=s.doMap(t),r=i(o);if(a.id()!==r.id()){var h=(new n.Edge).sourceVertex(a).targetVertex(r).sourceMarker("circleFoot").targetMarker("arrowHead");u.push(h)}})}}),{vertices:o,edges:u,merge:!1}},m.prototype.getQualifiedID=function(){return this.visualization.getQualifiedID()+"."+this.id},m.prototype.exists=function(){return this._id},m.prototype.getDatasource=function(){return this.visualization.dashboard.datasources[this._id]},m.prototype.getOutput=function(){var t=this.getDatasource();return t&&t.outputs?t.outputs[this._output]:null},m.prototype.hasData=function(){return this.getOutput().db?!0:!1},m.prototype.getFields=function(){return this.mappings.getFields()},m.prototype.getColumns=function(){return this.mappings.columns},m.prototype.getData=function(){var t=this.getOutput().db,i=t.data();i.length&&this.sort&&e.multiSort(i,t.hipieMapSortArray(this.sort));var s=this.mappings.doMapAll(t);return this.reverse&&s.reverse(),this.first&&s.length>this.first&&(s.length=this.first),s},m.prototype.getXTitle=function(){return this.mappings.columns[0]},m.prototype.getYTitle=function(){return this.mappings.columns.filter(function(t,i){return i>0}).join(" / ")},y.prototype.exists=function(){return void 0!==this._updates},y.prototype.getUpdates=function(){var t=[];return n("_updates",this)&&this._updates instanceof Array&&this._updates.forEach(function(i,e){var s=this.visualization.dashboard.datasources[i.datasource],a=this.visualization.dashboard.getVisualization(i.visualization);t.push({eventID:this.eventID,datasource:s,visualization:a})},this),t},y.prototype.getUpdatesDatasources=function(){var t={},i=[];return this.getUpdatesVisualizations().forEach(function(e,s){var a=e.source.getDatasource();a&&!t[a.id]&&(t[a.id]=!0,i.push(a))},this),i},y.prototype.getUpdatesVisualizations=function(){var t={},i=[];return n("_updates",this)&&this._updates instanceof Array&&this._updates.forEach(function(e,s){var a=this.visualization.dashboard.getVisualization(e.visualization);t[a.id]||(t[a.id]=!0,i.push(a))},this),i},_.prototype.setWidget=function(t){var i=this;for(var e in this.events)t["vertex_"+e]?t["vertex_"+e]=function(t){i.visualization.onEvent(e,i.events[e],t)}:t[e]&&(t[e]=function(t,s,a){i.visualization.onEvent(e,i.events[e],t,s,a)})},_.prototype.exists=function(){return void 0!==this._updates},_.prototype.getUpdates=function(){var t=[];for(var i in this.events)t=t.concat(this.events[i].getUpdates());return t},_.prototype.getUpdatesDatasources=function(){var t=[];for(var i in this.events)t=t.concat(this.events[i].getUpdatesDatasources());return t},_.prototype.getUpdatesVisualizations=function(){var t=[];for(var i in this.events)t=t.concat(this.events[i].getUpdatesVisualizations());return t},b.prototype.getQualifiedID=function(){return this.id},b.prototype.isLoading=function(t,i){return null===this.widget},b.prototype.isLoaded=function(t,i){return this.widget instanceof a},b.prototype.loadWidget=function(t,i){this.loadWidgets([t],i)},b.prototype.loadWidgets=function(t,i){this.widget=null;var e=this;o(t,function(t){e.dashboard.marshaller._widgetMappings.has(e.id)?e.setWidget(e.dashboard.marshaller._widgetMappings.get(e.id)):e.setWidget(new t),i&&i(e.widget,arguments)})},b.prototype.setWidget=function(t){this.widget=t,this.events.setWidget(t);for(var i in this.properties)switch(t.classID()){case"chart_MultiChart":case"composite_MegaChart":t.chartTypeDefaults()[i]=this.properties[i];break;default:if(this.widget[i+"_default"])try{this.widget[i+"_default"](this.properties[i])}catch(e){console.log("Invalid Property:"+this.id+".properties."+i)}}return this.widget},b.prototype.accept=function(t){t.visit(this)},b.prototype.update=function(t){var i=this.getInputVisualizations(),e=[];i.forEach(function(t){for(var i in t._eventValues)e.push(t._eventValues[i])});for(var s=t||e.join(", "),a=this.widget;a&&!a.title;)a=a.locateParentWidget();if(a){var o=a.title(),n=o.split(" (");a.title(n[0]+(s?" ("+s+")":"")).render()}else this.widget.render()},b.prototype.notify=function(){if(this.source.hasData()&&this.widget){if(!this.widget.fields().length){var t=this.source.getColumns();this.widget.columns(t)}var i=this.source.getData();this.widget.data(i),this.update()}},b.prototype.clear=function(){this.widget&&this.dashboard.marshaller.clearDataOnUpdate()&&(this.widget.data([]),this.source.getOutput().request={}),this.dashboard.marshaller.propogateClear()&&this._eventValues&&(delete this._eventValues,this.events.getUpdatesVisualizations().forEach(function(t){t.clear()})),this.update(x)},b.prototype.onEvent=function(t,i,e,s,a){var o=this;setTimeout(function(){if(a=void 0===a?!0:a,i.exists()){var t={};if(a)for(var s in i.mappings){var n=o.source.mappings&&o.source.mappings.hasMappings?o.source.mappings.getReverseMap(s):s;t[i.mappings[s]]=e[n]}o._eventValues=t;var r={},u=i.getUpdatesVisualizations();u.forEach(function(t){var i=t.source.getDatasource();r[i.id]||(r[i.id]={datasource:i,request:{},updates:[]}),r[i.id].updates.push(t.id),t.getInputVisualizations().forEach(function(t,e){if(t._eventValues)for(var s in t._eventValues)r[i.id].request[s]&&r[i.id].request[s]!==t._eventValues[s]&&console.log("Duplicate Filter, with mismatched value:  "+s+"="+t._eventValues[s]),r[i.id].request[s]=t._eventValues[s],r[i.id].request[s+"_changed"]=t===o}),"GRAPH"!==t.type&&t.clear(),(i.WUID||i.databomb)&&i.fetchData(r[i.id].request,!1,[t.id])});for(var h in r)r[h].datasource.WUID||r[h].datasource.databomb||r[h].datasource.fetchData(r[h].request,!1,r[h].updates)}},0)},b.prototype.getInputVisualizations=function(){return this.dashboard.marshaller.getVisualizationArray().filter(function(t){var i=t.events.getUpdatesVisualizations();return i.indexOf(this)>=0?!0:!1},this)},w.prototype.getQualifiedID=function(){return this.dataSource.getQualifiedID()+"."+this.id},w.prototype.accept=function(t){t.visit(this)},w.prototype.vizNotify=function(t){this.notify.filter(function(i){return!t||t.indexOf(i)>=0}).forEach(function(t){var i=this.dataSource.dashboard.getVisualization(t);i.notify()},this)},w.prototype.setData=function(t,e,s){this.request=e,this.db=(new i.Grid).jsonObj(t),this.vizNotify(s)},z.prototype.getQualifiedID=function(){return this.dashboard.getQualifiedID()+"."+this.id},z.prototype.accept=function(t){t.visit(this);for(var i in this.outputs)this.outputs[i].accept(t)},z.prototype.fetchData=function(t,i,e){if(!e){e=[];for(var s in this.outputs){var a=this.outputs[s];a.notify.forEach(function(t){a.filter&&a.filter.length||e.push(t);var i=this.dashboard.getVisualization(t);i.update(x)},this)}}var o=this;this.request.refresh=i?!0:!1,this.filter.forEach(function(i){this.request[i+"_changed"]=t[i+"_changed"]||!1;var e=void 0===t[i]?null:t[i];this.request[i]!==e&&(this.request[i]=e)},this),window.__hpcc_debug&&console.log("fetchData:  "+JSON.stringify(e)+"("+JSON.stringify(t)+")");for(var n in this.request)null===this.request[n]&&delete this.request[n];var r=Date.now();this.comms.call(this.request).then(function(i){var s=500-(Date.now()-r);setTimeout(function(){o.processResponse(i,t,e),++o._loadedCount},s>0?s:0)})["catch"](function(t){o.dashboard.marshaller.commsError("DataSource.prototype.fetchData",t)})},z.prototype.processResponse=function(t,i,e){var s={};for(var a in t)s[a.toLowerCase()]=t[a];for(var o in this.outputs){var r=this.outputs[o].from;if(r||(r=this.outputs[o].id.toLowerCase()),n(r,t))!n(r+"_changed",t)||n(r+"_changed",t)&&t[r+"_changed"].length&&t[r+"_changed"][0][r+"_changed"]?this.outputs[o].setData(t[r],i,e):this.outputs[o].vizNotify(e);else if(n(r,s))console.log("DDL 'DataSource.From' case is Incorrect"),!n(r+"_changed",s)||n(r+"_changed",s)&&t[r+"_changed"].length&&s[r+"_changed"][0][r+"_changed"]?this.outputs[o].setData(s[r],i,e):this.outputs[o].vizNotify(e);else{var u=[];for(var h in t)u.push(h);console.log("Unable to locate '"+r+"' in response {"+u.join(", ")+"}")}}},D.prototype.getQualifiedID=function(){return this.id},D.prototype.getVisualization=function(t){return this._visualizations[t]||this.marshaller.getVisualization(t)},D.prototype.getVisualizations=function(){return this._visualizations},D.prototype.getVisualizationArray=function(){return this._visualizationArray},D.prototype.getVisualizationTotal=function(){return this._visualizationTotal},D.prototype.accept=function(t){t.visit(this);for(var i in this.datasources)this.datasources[i].accept(t);this._visualizationArray.forEach(function(i){i.accept(t)},this)},D.prototype.allVisualizationsLoaded=function(){var t=this._visualizationArray.filter(function(t){return!t.isLoaded()});return 0===t.length},I.prototype.commsDataLoaded=function(){for(var t=0;t<this.dashboardArray.length;t++)for(var i in this.dashboardArray[t].datasources)if(0===this.dashboardArray[t].datasources[i]._loadedCount)return!1;return!0},I.prototype.getVisualization=function(t){return this._visualizations[t]},I.prototype.accept=function(t){t.visit(this),this.dashboardTotal=0;for(var i in this.dashboards)this.dashboards[i].accept(t),++this.dashboardTotal},I.prototype.url=function(t,i){this.espUrl=(new s.ESPUrl).url(t);var e=null,a="HIPIE_DDL";this.espUrl.isWorkunitResult()?(a=this.espUrl._params.ResultName,e=(new s.HIPIEWorkunit).url(t).proxyMappings(this._proxyMappings)):e=(new s.HIPIERoxie).url(t).proxyMappings(this._proxyMappings);var o={refresh:!1},r=this;e.call(o).then(function(t){return n(a,t)?e.fetchResult(a).then(function(e){var s=e[0][a];r.parse(s,function(){i(t)})})["catch"](function(t){r.commsError("Marshaller.prototype.url",t)}):void 0})["catch"](function(t){r.commsError("Marshaller.prototype.url",t)})},I.prototype.proxyMappings=function(t){return arguments.length?(this._proxyMappings=t,this):this._proxyMappings},I.prototype.widgetMappings=function(t){return arguments.length?(this._widgetMappings=t,this):this._widgetMappings},I.prototype.clearDataOnUpdate=function(t){return arguments.length?(this._clearDataOnUpdate=t,this):this._clearDataOnUpdate},I.prototype.propogateClear=function(t){return arguments.length?(this._propogateClear=t,this):this._propogateClear},I.prototype.parse=function(t,i){var e=this;return this._json=t,this._jsonParsed=JSON.parse(this._json),this.dashboards={},this.dashboardArray=[],this._visualizations={},this._visualizationArray=[],this._jsonParsed.forEach(function(t){var i=new D(e,t,e._proxyMappings);e.dashboards[t.id]=i,e.dashboardArray.push(i)}),this.dashboardTotal=this.dashboardArray.length,this.ready(i),this},I.prototype.getVisualizations=function(){return this._visualizations},I.prototype.getVisualizationArray=function(){return this._visualizationArray},I.prototype.on=function(t,i){if(void 0===this[t])throw"Method:  "+t+" does not exist.";var e=this[t];return this[t]=function(){e.apply(this,arguments),i.apply(this,arguments)},this},I.prototype.allDashboardsLoaded=function(){return 0===this.dashboardArray.filter(function(t){return!t.allVisualizationsLoaded()}).length},I.prototype.ready=function(t){function i(t){e.allDashboardsLoaded()?t():setTimeout(i,100,t)}if(t){var e=this;i(t)}},I.prototype.commsError=function(t,i){console.log("Comms Error:\n"+t+"\n"+i)},{exists:n,Marshaller:I,Dashboard:D,DataSource:z,Output:w,Visualization:b}});