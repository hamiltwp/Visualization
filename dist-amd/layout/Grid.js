!function(t,e){"function"==typeof define&&define.amd?define(["d3","../common/HTMLWidget","./Cell","../common/TextBox","../common/Utility","css!./Grid"],e):t.layout_Grid=e(t.d3,t.common_HTMLWidget,t.layout_Cell,t.common_TextBox,t.common_Utility)}(this,function(t,e,i,r,o){function l(){e.call(this),this._tag="div",this._colCount=0,this._rowCount=0,this._colSize=0,this._rowSize=0,this._selectionBag=new o.Selection,this.content([])}return l.prototype=Object.create(e.prototype),l.prototype.constructor=l,l.prototype._class+=" layout_Grid",l.prototype.publish("designMode",!1,"boolean","Design Mode",null,{tags:["Basic"]}),l.prototype.publish("designModeOpacity",1,"number","Opacity of Cells and drag handles in Design Mode",null,{tags:["Basic"]}),l.prototype.publish("hideDragHandles",!1,"boolean","Hide Drag Handles in Design Mode",null,{tags:["Basic"]}),l.prototype.publish("hideDesignGrid",!1,"boolean","Hide Design Mode Grid",null,{tags:["Basic"]}),l.prototype.publish("disableCellSelection",!1,"boolean","Disable the ability to 'select' cells while in designMode",null,{tags:["Basic"]}),l.prototype.publish("restrictDraggingOut",!1,"boolean","Restrict Cell dragging to the bounds of the Grid",null,{tags:["Basic"]}),l.prototype.publish("gutter",4,"number","Gap Between Widgets",null,{tags:["Basic"]}),l.prototype.publish("fitTo","all","set","Sizing Strategy",["all","width"],{tags:["Basic"]}),l.prototype.publish("designGridColor","#dddddd","html-color","Color of grid lines in Design Mode",null,{tags:["Private"]}),l.prototype.publish("designGridColorExtra","#333333","html-color","Color of excess grid lines in Design Mode",null,{tags:["Private"]}),l.prototype.publish("surfacePadding",null,"string","Cell Padding (px)",null,{tags:["Intermediate"]}),l.prototype.publish("surfaceBorderWidth",1,"number","Width (px) of Cell Border",null,{tags:["Intermediate"]}),l.prototype.publish("extraDesignModeWidth",0,"number","Number of additional columns added when in Design Mode.",null,{tags:["Private"]}),l.prototype.publish("extraDesignModeHeight",0,"number","Number of additional rows added when in Design Mode.",null,{tags:["Private"]}),l.prototype.publish("cellDensity",3,"string","Increase the cell density with this multiplier (Ex: 3 results in 3 cols per col and 3 rows per row)",null,{tags:["Intermediate"]}),l.prototype.publish("content",[],"widgetArray","widgets",null,{tags:["Basic"]}),l.prototype.getDimensions=function(){var t={width:0,height:0};return this.content().forEach(function(e){t.width<e.gridCol()+e.gridColSpan()&&(t.width=e.gridCol()+e.gridColSpan()),t.height<e.gridRow()+e.gridRowSpan()&&(t.height=e.gridRow()+e.gridRowSpan())},this),t},l.prototype.clearContent=function(t){this.content(this.content().filter(function(e){if(!t)return e.target(null),!1;for(var i=e;i;){if(t===i)return e.target(null),!1;i=i.widget?i.widget():null}return!0}))},l.prototype.setContent=function(t,e,r,o,l,n){l=l||1,n=n||1,o=o||"";var s=this.cellDensity();if(this.content(this.content().filter(function(i){return i.gridRow()===t*s&&i.gridCol()===e*s?(i.target(null),!1):!0})),r){var d=(new i).gridRow(t*s).gridCol(e*s).widget(r).title(o).gridRowSpan(l*s).gridColSpan(n*s);this.prevDensity=s,this.content().push(d)}return this},l.prototype.getCell=function(t,e){var i=null;return this.content().some(function(r){return t>=r.gridRow()&&t<r.gridRow()+r.gridRowSpan()&&e>=r.gridCol()&&e<r.gridCol()+r.gridColSpan()?(i=r,!0):!1}),i},l.prototype.getWidgetCell=function(t){var e=null;return this.content().some(function(i){return i.widget()._id===t?(e=i,!0):!1}),e},l.prototype.getContent=function(t){var e=null;return this.content().some(function(i){return i.widget()._id===t?(e=i.widget(),!0):!1}),e},l.prototype.updateCellMultiples=function(){var t=this;this.prevDensity!==this.cellDensity()&&(this.content().forEach(function(e){if(t.prevDensity&&t.cellDensity()){var i=t.prevDensity,r=t.cellDensity();e.gridRow(Math.floor(e.gridRow()*r/i)),e.gridCol(Math.floor(e.gridCol()*r/i)),e.gridRowSpan(Math.floor(e.gridRowSpan()*r/i)),e.gridColSpan(Math.floor(e.gridColSpan()*r/i))}}),this.prevDensity=this.cellDensity())},l.prototype.childMoved=l.prototype.debounce(function(t,e){this.render()},250),l.prototype.enter=function(t,i){e.prototype.enter.apply(this,arguments),i.style("position","relative"),this.dropDiv=i.append("div"),this.contentDiv=i.append("div"),this._scrollBarWidth=this.getScrollbarWidth()},l.prototype.findCurrentLocation=function(t){this._currLoc=[Math.floor((t.clientX-this._offsetX)/this._colSize),Math.floor((t.clientY-this._offsetY)/this._rowSize)]},l.prototype.overHandle=function(t){var e="",i=this._dragCell.handleSize(),r=this._dragCell.gridRowSpan()===this._currLoc[1]-this._dragCell.gridRow()+1,o=this._dragCell.gridRow()===this._currLoc[1],l=this._dragCell.gridColSpan()===this._currLoc[0]-this._dragCell.gridCol()+1,n=this._dragCell.gridCol()===this._currLoc[0],s=this._offsetY+this._currLoc[1]*this._rowSize,d=this._offsetX+this._currLoc[0]*this._colSize,a=this._colSize-this.gutter(),g=this._rowSize-this.gutter();return Math.ceil(s+g)>=t.clientY&&Math.floor(s+g-i)<=t.clientY&&r?e="s":Math.floor(s)<=t.clientY&&Math.ceil(s+i)>=t.clientY&&o&&(e="n"),Math.ceil(d+a)>=t.clientX&&Math.floor(d+a-i)<=t.clientX&&l?e+="e":Math.floor(d)<=t.clientX&&Math.ceil(d+i)>=t.clientX&&n&&(e+="w"),e},l.prototype.createDropTarget=function(t,e){var i=t[0]-this._dragCellOffsetX,r=t[1]-this._dragCellOffsetY,o=this._dragCell.gridColSpan(),l=this._dragCell.gridRowSpan(),n=document.createElement("div");n.id="grid-drop-target"+this.id(),n.className="grid-drop-target grid-drag-handle-"+e,this._element.node().appendChild(n),this.updateDropTarget(i,r,o,l)},l.prototype.setGridOffsets=function(){this._offsetX=this._element.node().getBoundingClientRect().left+this.gutter()/2,this._offsetY=this._element.node().getBoundingClientRect().top+this.gutter()/2},l.prototype.updateDropTarget=function(t,e,i,r){if(this.restrictDraggingOut()){var o=0>e,l=t+i>this._colCount,n=e+r>this._rowCount,s=0>t;if(l){var d=t+i-this._colCount;t-=d}if(n){var a=e+r-this._rowCount;e-=a}s&&(t=0),o&&(e=0)}var g,h,c,u;g=this._offsetY+e*this._rowSize,h=this._offsetX+t*this._colSize,c=i*this._colSize-this.gutter(),u=r*this._rowSize-this.gutter();var p=document.getElementById("grid-drop-target"+this.id());p.style.top=g+"px",p.style.left=h+"px",p.style.width=c+"px",p.style.height=u+"px"},l.prototype.moveDropTarget=function(t){if(this.restrictDraggingOut()&&(t[0]=t[0]>this._colCount-1?this._colCount-1:t[0],t[0]=t[0]<0?0:t[0],t[1]=t[1]>this._rowCount-1?this._rowCount-1:t[1],t[1]=t[1]<0?0:t[1]),this._handle){var e=[];switch(this._handle){case"nw":e=[this._dragCell.gridCol()+this._dragCell.gridColSpan()-1,this._dragCell.gridRow()+this._dragCell.gridRowSpan()-1];break;case"n":case"ne":e=[this._dragCell.gridCol(),this._dragCell.gridRow()+this._dragCell.gridRowSpan()-1];break;case"e":case"se":case"s":e=[this._dragCell.gridCol(),this._dragCell.gridRow()];break;case"sw":case"w":e=[this._dragCell.gridCol()+this._dragCell.gridColSpan()-1,this._dragCell.gridRow()]}switch(this._handle){case"e":case"w":this._locY=e[1];break;default:this._locY=t[1]<=e[1]?t[1]:e[1]}switch(this._handle){case"n":case"s":this._locX=e[0];break;default:this._locX=t[0]<=e[0]?t[0]:e[0]}switch(this._handle){case"n":case"s":this._sizeX=this._dragCell.gridColSpan();break;default:this._sizeX=Math.abs(t[0]-e[0])+1}switch(this._handle){case"e":case"w":this._sizeY=this._dragCell.gridRowSpan();break;default:this._sizeY=Math.abs(t[1]-e[1])+1}}else if(null!==document.getElementById("grid-drop-target"+this.id())){var i=this.getCell(t[1],t[0]);null!==i&&this._dragCell._id!==i._id?(document.getElementById("grid-drop-target"+this.id()).className="grid-drop-target drop-target-over",this._locX=i.gridCol(),this._locY=i.gridRow(),this._sizeX=i.gridColSpan(),this._sizeY=i.gridRowSpan()):(document.getElementById("grid-drop-target"+this.id()).className="grid-drop-target",this._locX=t[0]-this._dragCellOffsetX,this._locY=t[1]-this._dragCellOffsetY,this._sizeX=this._dragCell.gridColSpan(),this._sizeY=this._dragCell.gridRowSpan())}this.updateDropTarget(this._locX,this._locY,this._sizeX,this._sizeY)},l.prototype.updateCells=function(e,i){var r=this;this.updateCellMultiples();var o=this.contentDiv.selectAll(".cell_."+this._id).data(this.content(),function(t){return t._id});o.enter().append("div").attr("class","cell_ "+this._id).style("position","absolute").each(function(t){t.target(this),t.__grid_watch=t.monitor(function(t,e,i){r._renderCount&&0===t.indexOf("grid")&&e!==i&&r.childMoved()})});var l=t.behavior.drag().on("dragstart",function(e){t.event.sourceEvent.stopPropagation(),r._dragCell=e,r.setGridOffsets(),r.findCurrentLocation(t.event.sourceEvent),r._startLoc=[r._currLoc[0],r._currLoc[1]],r._element.selectAll(".dragHandle").style("visibility","hidden"),r._handle=r.overHandle(t.event.sourceEvent),-1===r._dragCell._dragHandles.indexOf(r._handle)&&(r._handle=void 0),r._dragCellOffsetX=r._currLoc[0]-e.gridCol(),r._dragCellOffsetY=r._currLoc[1]-e.gridRow(),r.createDropTarget(r._currLoc,r._handle),setTimeout(function(){r.contentDiv.selectAll(".cell_."+r._id).classed("dragItem",function(t){return e._id===t._id}).classed("notDragItem",function(t){return e._id!==t._id})},0),r._initSelection=!0}).on("drag",function(e){r._initSelection=!1,r._dragCell=e,r.findCurrentLocation(t.event.sourceEvent),("undefined"==typeof r._currLocation||r._currLocation[0]!==r._currLoc[0]||r._currLocation[1]!==r._currLoc[1])&&(r._currLocation=r._currLoc,r.moveDropTarget(r._currLoc))}).on("dragend",function(){if(t.event.sourceEvent.stopPropagation(),(r._initSelection||r._startLoc[0]===r._currLoc[0]||r._startLoc[1]===r._currLoc[1])&&(r.disableCellSelection()||r.selectionBagClick(r.getCell(r._currLoc[1],r._currLoc[0]))),r._element.selectAll(".dragHandle").style("visibility",null),r._handle)if(r.restrictDraggingOut()){var e=r._locY>0?r._locY:0,i=r._locX>0?r._locX:0;e=r._locY+r._sizeY<r._rowCount?r._locY:r._rowCount-r._sizeY,i=r._locX+r._sizeX<r._colCount?r._locX:r._colCount-r._sizeX,r._dragCell.gridRow(e),r._dragCell.gridRowSpan(r._sizeY),r._dragCell.gridCol(i),r._dragCell.gridColSpan(r._sizeX)}else r._dragCell.gridRow(r._locY),r._dragCell.gridRowSpan(r._sizeY),r._dragCell.gridCol(r._locX),r._dragCell.gridColSpan(r._sizeX);else{var o=r._currLoc[1],l=r._currLoc[0],n=r._dragCell.gridRowSpan(),s=r._dragCell.gridColSpan(),d=r.getCell(r._currLoc[1],r._currLoc[0]);d===r._dragCell&&(n=d.gridRowSpan(),s=d.gridColSpan(),d=null);var a,g;if(d)o=d.gridRow(),l=d.gridCol(),n=d.gridRowSpan(),s=d.gridColSpan(),d.gridCol(r._dragCell.gridCol()).gridColSpan(r._dragCell.gridColSpan()).gridRow(r._dragCell.gridRow()).gridRowSpan(r._dragCell.gridRowSpan()),a=l,g=o;else if(a=l-r._dragCellOffsetX,g=o-r._dragCellOffsetY,r.restrictDraggingOut()){n=r._dragCell.gridRowSpan(),s=r._dragCell.gridColSpan();var h=a+s-r._colCount,c=g+n-r._rowCount;a-=h>0?h:0,g-=c>0?c:0,a=a>0?a:0,g=g>0?g:0}r._dragCell.gridCol(a).gridRow(g).gridColSpan(s).gridRowSpan(n)}var u=document.getElementById("grid-drop-target"+r.id());u.parentNode.removeChild(u),setTimeout(function(){r.contentDiv.selectAll(".cell_."+r._id).classed("dragItem",!1).classed("notDragItem",!1)},0),r._dragCell=null});this.designMode()?(this.contentDiv.selectAll(".cell_."+this._id).call(l),t.select(r._target).on("click",function(){r._selectionBag.clear(),r.postSelectionChange()})):(this.contentDiv.selectAll(".cell_."+this._id).on(".drag",null),this._selectionBag.clear()),o.style("left",function(t){return t.gridCol()*e+r.gutter()/2+"px"}).style("top",function(t){return t.gridRow()*i+r.gutter()/2+"px"}).style("width",function(t){return t.gridColSpan()*e-r.gutter()+"px"}).style("height",function(t){return t.gridRowSpan()*i-r.gutter()+"px"}).each(function(t){t._parentElement.attr("draggable",r.designMode()).selectAll(".dragHandle").attr("draggable",r.designMode()),t.surfacePadding(r.surfacePadding()).surfaceBorderWidth(r.surfaceBorderWidth()).resize()}),o.exit().each(function(t){t.target(null),t.__grid_watch&&t.__grid_watch.remove()}).remove()},l.prototype.postSelectionChange=function(){},l.prototype.updateDropCells=function(t,e,i){function r(t){return parseInt(t)-.5}function o(t,e,i,r,o){g.beginPath(),g.strokeStyle=o,g.moveTo(t,i),g.lineTo(e,r),g.stroke()}function l(){var r=!1;return"undefined"==typeof n.prevDimensions?r=!0:n.prevDimensions.width!==t.width||n.prevDimensions.height!==t.height?r=!0:n.prevCellWidth!==e||n.prevCellHeight!==i?r=!0:""===n._target.style.backgroundImage&&n.designMode()&&!n.hideDesignGrid()?r=!0:""===n._target.style.backgroundImage||n.designMode()?""!==n._target.style.backgroundImage&&n.hideDesignGrid()&&(r=!0):r=!0,r}var n=this;if(l())if(this.designMode()&&!this.hideDesignGrid()){var s=document.createElement("canvas");s.width=t.width*e,s.height=t.height*i;for(var d=(t.width-this.extraDesignModeWidth())*e,a=(t.height-this.extraDesignModeHeight())*i,g=s.getContext("2d"),h=0,c=.5+e;c<s.width;c+=e)h++,h<t.width-this.extraDesignModeWidth()?o(r(c),r(c),0,a,this.designGridColor()):o(r(c),r(c),0,s.height,this.designGridColorExtra());for(var u=0,p=.5+i;p<s.height;p+=i)u++,u<t.height-this.extraDesignModeHeight()?o(0,d,r(p),r(p),this.designGridColor()):o(0,s.width,r(p),r(p),this.designGridColorExtra());h=0;for(var _=.5+e;_<s.width;_+=e)h<t.width-this.extraDesignModeWidth()&&o(r(_),r(_),a,s.height,this.designGridColorExtra());u=0;for(var C=.5+i;C<s.height;C+=i)u<t.height-this.extraDesignModeHeight()&&o(d,s.width,r(C),r(C),this.designGridColorExtra());this._target&&(this._target.style.backgroundImage="url("+s.toDataURL()+")"),this.prevDimensions={width:t.width,height:t.height},this.prevCellWidth=e,this.prevCellHeight=i}else this._target.style.backgroundImage=""},l.prototype.update=function(t,i){e.prototype.update.apply(this,arguments),this._parentElement.style("overflow-x","width"===this.fitTo()?"hidden":null),this._parentElement.style("overflow-y","width"===this.fitTo()?"scroll":null);var r=this.getDimensions();this.designMode()&&(r.width+=this.extraDesignModeWidth(),r.height+=this.extraDesignModeHeight());var o=(this.width()-("width"===this.fitTo()?this._scrollBarWidth:0))/r.width,l="all"===this.fitTo()?this.height()/r.height:o;this._colCount=r.width,this._rowCount=r.height,this._colSize=o,this._rowSize=l,i.selectAll("#"+this.id()+" > div > div.cell_ > div[draggable=true]").style({opacity:this.designModeOpacity()}),i.selectAll("#"+this.id()+" > div > div.cell_ > div[draggable=true] > div > div.dragHandle").style({opacity:this.designModeOpacity()}),i.selectAll("#"+this.id()+" > div > div.cell_ > div[draggable=false]").style({opacity:1}),i.selectAll("#"+this.id()+" > div > div.cell_ > div[draggable=false] > div > div.dragHandle").style({opacity:1}),this.updateCells(o,l),this.updateDropCells(r,o,l),i.classed("hideHandles",this.hideDragHandles())},l.prototype.exit=function(t,i){e.prototype.exit.apply(this,arguments)},l.prototype._createSelectionObject=function(t){return{_id:t._id,element:function(){return t._element},widget:t}},l.prototype.selection=function(t){return arguments.length?(this._selectionBag.set(t.map(function(t){return this._createSelectionObject(t)},this)),this):this._selectionBag.get().map(function(t){return t._id})},l.prototype.selectionBagClick=function(e){if(null!==e){var i=this._createSelectionObject(e);t.event.sourceEvent.ctrlKey?this._selectionBag.isSelected(i)?(this._selectionBag.remove(i),this.postSelectionChange()):(this._selectionBag.append(i),this.postSelectionChange()):(this._selectionBag.set([i]),this.postSelectionChange())}},l});