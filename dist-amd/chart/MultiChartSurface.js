(function(e,t){typeof define=="function"&&define.amd?define(["d3","../common/ResizeSurface","./MultiChart","../api/INDChart"],t):e.chart_MultiChartSurface=t(e.d3,e.common_ResizeSurface,e.chart_MultiChart,e.api_INDChart)})(this,function(e,t,n,r){function i(){t.call(this),r.call(this),this._title="MultiChartSurface",this._content=new n,this._content.click=function(t,n){e.click(t,n)};var e=this;this._menu.click=function(t){e._content.chartType(t).render()},this.content(this._content),this.mode("all")}return i.prototype=Object.create(t.prototype),i.prototype._class+=" chart_MultiChartSurface",i.prototype.implements(r.prototype),i.prototype.testData=r.prototype.testData,i.prototype.publishProxy("chartType","_content"),i.prototype.columns=function(e){return arguments.length?(this.content().columns(e),this):this.content().columns()},i.prototype.data=function(e){return arguments.length?(this.content().data(e),this):this.content().data()},i.prototype.mode=function(e){if(!arguments.length)return this._mode;this._mode=e;switch(this._mode){case"2d":this.menu(this.content()._2dChartTypes.concat(this.content()._anyChartTypes).map(function(e){return e.display}).sort());break;case"multi":this.menu(this.content()._multiChartTypes.concat(this.content()._anyChartTypes).map(function(e){return e.display}).sort());break;case"all":default:this.menu(this.content()._allChartTypes.map(function(e){return e.display}).sort())}return this},i});