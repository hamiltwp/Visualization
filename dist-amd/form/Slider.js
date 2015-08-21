(function(e,t){typeof define=="function"&&define.amd?define(["d3","../common/SVGWidget","../api/IInput","../common/Icon","css!./Slider"],t):e.form_Slider=t(e.d3,e.common_SVGWidget,e.api_IInput,e.common_Icon)})(this,function(e,t,n,r){function i(){t.call(this),n.call(this),this.selectionLabel(""),this._playing=!1,this._loop=!1,this.xScale=e.scale.linear().clamp(!0);var i=this;this._playIcon=(new r).faChar(""),this._playIcon.click=function(t){e.event.stopPropagation(),i._playing?i.pause():i.play()},this._loopIcon=(new r).faChar("").image_colorFill(this._loop?null:"#bbb").shape_colorFill(this._loop?null:"white").paddingPercent(33),this._loopIcon.click=function(e){i._loop?i._loop=!1:i._loop=!0,i._loopIcon.image_colorFill(i._loop?null:"#bbb").shape_colorFill(i._loop?null:"white").render()},this.brush=e.svg.brush().x(this.xScale).extent([0,0]).on("brushstart",function(e){i.brushstart(e,this)}).on("brush",function(e){i.brushmove(e,this)}).on("brushend",function(e){i.brushend(e,this)}),this.brush.empty=function(){return!1},this.axis=e.svg.axis().scale(this.xScale).orient("bottom").tickValues(null).tickFormat(function(e){return e}).tickSize(0).tickPadding(12)}return i.prototype=Object.create(t.prototype),i.prototype._class+=" form_Slider",i.prototype.implements(n.prototype),i.prototype.publish("padding",16,"number","Outer Padding",null,{tags:["Basic"]}),i.prototype.publish("fontSize",null,"number","Font Size",null,{tags:["Basic"]}),i.prototype.publish("fontFamily",null,"string","Font Name",null,{tags:["Basic"]}),i.prototype.publish("fontColor",null,"html-color","Font Color",null,{tags:["Basic"]}),i.prototype.publish("allowRange",!1,"boolean","Allow Range Selection",null,{tags:["Intermediate"]}),i.prototype.publish("low",0,"number","Low",null,{tags:["Intermediate"]}),i.prototype.publish("high",100,"number","High",null,{tags:["Intermediate"]}),i.prototype.publish("step",10,"number","Step",null,{tags:["Intermediate"]}),i.prototype.publish("selectionLabel","","string","Selection Label",null,{tags:["Intermediate"]}),i.prototype.publish("showPlay",!1,"boolean","Show Play Button"),i.prototype.publish("playInterval",1e3,"number","Play Interval"),i.prototype.publishProxy("playDiameter","_playIcon","diameter",32),i.prototype.publish("playGutter",12,"number","Play Gutter"),i.prototype.publishProxy("loopDiameter","_loopIcon","diameter",24),i.prototype.publish("loopGutter",4,"number","Play Gutter"),i.prototype.name=function(e){return i.prototype.columns.apply(this,arguments)},i.prototype.value=function(e){return i.prototype.data.apply(this,arguments)},i.prototype.testData=function(e){return this.columns("Percent"),this.data(20),this},i.prototype.testData2=function(e){return this.allowRange(!0),this.columns("Percent"),this.data([20,40]),this},i.prototype.play=function(){this._playing=!0,this._playIcon.faChar("").render();var e=this.data();if(e<this.low()||e>=this.high())e=this.low(),this.data(e).render(),this._click();var t=this;this.intervalHandler=setInterval(function(){e+=t.step(),e>t.high()?t._loop===!0?(e=t.low(),t.data(e).render(),t._click()):t.pause():(t.data(e).render(),t._click())},t.playInterval())},i.prototype.pause=function(){this._playing=!1,this._playIcon.faChar("").render(),clearInterval(this.intervalHandler)},i.prototype.data=function(e){var n=t.prototype.data.apply(this,arguments);return arguments.length&&this.brushg&&this.brushg.call(this.brush.extent(this.allowRange()?this._data:[this._data,this._data])),n},i.prototype.enter=function(e,t){this.sliderElement=t.append("g"),this.axisElement=this.sliderElement.append("g").attr("class","x axis"),this.brushg=this.sliderElement.append("g").attr("class","brush").call(this.brush),this.brushg.select(".background").attr("y",-9).attr("height",18),this.brushg.select(".extent").attr("y","-10").attr("height","20"),this.brushg.selectAll(".resize").select("rect").attr("x",function(e){return e==="e"?0:-8}).attr("y","-10").attr("width","8").attr("height","20"),this.handle=this.brushg.selectAll(".resize").append("path").attr("class","handle").attr("transform","translate(0,-27)"),this._playIcon.target(this.sliderElement.node()).render(),this._loopIcon.target(this.sliderElement.node()).render()},i.prototype.calcDelta=function(e,t,n,r){var i=t.append("g").attr("class","x axis").attr("transform","translate(0, -64)").call(this.axis);i.selectAll(".tick > text").style("fill",this.fontColor()).style("font-size",this.fontSize()).style("font-family",this.fontFamily());var s=i.node().getBBox(),o={left:s.x-n,right:s.x-n+s.width-r};return i.remove(),o},i.prototype.update=function(t,n){var r=this,i=-this.width()/2+this.padding(),s=this.width()-this.padding()*2;this._playIcon.pos({x:s/2-(this.loopDiameter()+this.loopGutter()+this.playDiameter()/2),y:0}).diameter(this.playDiameter()).display(this.showPlay()).render(),this._loopIcon.pos({x:s/2-this.loopDiameter()/2,y:0}).diameter(this.loopDiameter()).display(this.showPlay()).render(),(this.high()-this.low())/this.step()<=10?this.axis.tickValues(e.merge([e.range(this.low(),this.high(),this.step()),[this.high()]])):this.axis.tickValues(null),s-=this.showPlay()?this.loopDiameter()+this.loopGutter()+this.playDiameter()+this.playGutter():0,this.xScale.domain([this.low(),this.high()]).range([i,i+s]);var o=this.calcDelta(t,n,i,s);this.xScale.range([i-o.left,i+s-o.right]),this.axisElement.call(this.axis),this.axisElement.selectAll(".tick > text").style("fill",this.fontColor()).style("font-size",this.fontSize()).style("font-family",this.fontFamily());var u=this.xScale.range();this.brushg.select(".background").attr("x",u[0]).attr("width",u[1]-u[0]),this.handle.attr("d",function(e){return r.handlePath(e)}),this.brushg.call(this.brush.extent(this.allowRange()?this._data:[this._data,this._data]));var a=this.sliderElement.node().getBBox();this.sliderElement.attr("transform","translate(0, "+ -(a.y+a.height/2)+")")},i.prototype.brushstart=function(t,n){if(!e.event||!e.event.sourceEvent)return;e.event.sourceEvent.stopPropagation()},i.prototype.brushmove=function(t,n){if(!e.event||!e.event.sourceEvent)return;e.event.sourceEvent.stopPropagation();if(!this.allowRange()){var r=this.xScale.invert(e.mouse(n)[0]);e.select(n).call(this.brush.extent([r,r]))}},i.prototype.brushend=function(t,n){if(!e.event||!e.event.sourceEvent)return;e.event.sourceEvent.stopPropagation();if(!this.allowRange()){var r=this.nearestStep(this.xScale.invert(e.mouse(n)[0]));e.select(n).call(this.brush.extent([r,r])),this._data=r,this._click()}else{var i=this.brush.extent();i[0]=this.nearestStep(i[0]),i[1]=this.nearestStep(i[1]),this._data=i,e.select(n).call(this.brush.extent(i)),this.newSelection(i[0],i[1])}},i.prototype.nearestStep=function(e){return this.low()+Math.round((e-this.low())/this.step())*this.step()},i.prototype.handlePath=function(e,t){var n=+(e==="e"),r=n?1:-1,i=this.allowRange()?.5:0,s=18,o="M"+i*r+","+s+"A6,6 0 0 "+n+" "+6.5*r+","+(s+6)+"V"+(2*s-6)+"A6,6 0 0 "+n+" "+i*r+","+2*s;return this.allowRange()?o+="ZM"+2.5*r+","+(s+8)+"V"+(2*s-8)+"M"+4.5*r+","+(s+8)+"V"+(2*s-8):o+="M"+1*r+","+(s+8)+"V"+(2*s-8),o},i.prototype._click=function(){if(this.selectionLabel()){var e={};e[this.selectionLabel()]=this._data,this.click(e)}else this.click(this._data)},i});