(function(e,t){typeof define=="function"&&define.amd?define(["./Common1D"],t):e.c3chart_Gauge=t(e.c3chart_Common1D)})(this,function(e){function t(t){e.call(this),this._type="gauge";var n=this;this._config.data.onclick=function(e,t){var r={};r[e.id]=e.value,n.click(r,e.id)},this._config.data.color=function(e,t){return n._palette(n._data,n.low(),n.high())}}return t.prototype=Object.create(e.prototype),t.prototype._class+=" c3chart_Gauge",t.prototype.publish("low",0,"number","Gauge Lower Bound",null,{tags:["Intermediate","Shared"]}),t.prototype.publish("high",100,"number","Gauge Higher Bound",null,{tags:["Intermediate","Shared"]}),t.prototype.publish("valueFormat","Percent","set","Value Display Format",["Percent","Value"],{tags:["Basic"]}),t.prototype.publish("arcWidth",10,"number","Gauge Width of Arc",null,{tags:["Basic"]}),t.prototype.publish("showLabels",!0,"boolean","Show Labels",null,{tags:["Basic"]}),t.prototype.publish("showValueLabel",!0,"boolean","Show Value Label",null,{tags:["Basic"]}),t.prototype.update=function(t,n){this.c3Chart.internal.config.gauge_min=this.low(),this.c3Chart.internal.config.gauge_max=this.high(),this.c3Chart.internal.config.gauge_units=this.showValueLabel()?this.columns():"",this.c3Chart.internal.config.gauge_width=this.arcWidth(),this.c3Chart.internal.config.gauge_label_format=this.valueFormat()==="Percent"?null:function(e,t){return e},this.c3Chart.internal.config.gauge_label_show=this.showLabels(),e.prototype.update.apply(this,arguments)},t.prototype.getChartOptions=function(){var t=e.prototype.getChartOptions.apply(this,arguments);return t.columns=[[this._columns,this._data]],t},t});