"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Layer", "./Utility", "../common/Palette", "../common/Utility", "css!./Pins"], factory);
    } else {
        root.map_Pins = factory(root.d3, root.map_Layer, root.map_Utility, root.common_Palette, root.common_Utility);
    }
}(this, function (d3, Layer, MapUtility, Palette, Utility) {
    function Pins() {
        Layer.call(this);
        Utility.SimpleSelectionMixin.call(this);
        this._geohash = new MapUtility.Geohash();
    }
    Pins.prototype = Object.create(Layer.prototype);
    Pins.prototype.constructor = Pins;
    Pins.prototype._class += " map_Pins";
    Pins.prototype.mixin(Utility.SimpleSelectionMixin);

    Pins.prototype.publish("geohashColumn", null, "set", "Geohash column", function () { return this.columns(); }, { optional: true });
    Pins.prototype.publish("tooltipColumn", null, "set", "Tooltip column", function () { return this.columns(); }, { optional: true });
    Pins.prototype.publish("opacity", 1.0, "number", "Opacity", null, { tags: ["Advanced"] });
    Pins.prototype.publish("fillColor", "#006ccc", "html-color", "Pin Color", null, { optional: true });

    Pins.prototype.pinsData = function () {
        var geohashField = this._db.fieldByLabel(this.geohashColumn());
        var tooltipField = this._db.fieldByLabel(this.tooltipColumn());
        return this.data().map(function (row) {
            var retVal = [row[0], row[1], row[2] instanceof Object ? row[2] : {}];
            retVal[2].origRow = row;
            if (geohashField) {
                try {
                    var pos = this._geohash.bounds(row[geohashField.idx]);
                    retVal[0] = (pos.ne.lat + pos.sw.lat) / 2;
                    retVal[1] = (pos.ne.lon + pos.sw.lon) / 2;
                } catch (e) {
                }
            }
            if (tooltipField) {
                retVal[2].tooltip = row[tooltipField.idx];
            }
            return retVal;
        }, this);
    };

    Pins.prototype.layerEnter = function (base, svgElement, domElement) {
        Layer.prototype.layerEnter.apply(this, arguments);

        this._pinsTransform = svgElement;
        this._selection.widgetElement(this._pinsTransform);
        this.pinsPaths = d3.select(null);
    };

    Pins.prototype.layerUpdate = function (base) {
        Layer.prototype.layerUpdate.apply(this, arguments);

        this._pinsTransform
            .style("opacity", this.opacity())
        ;

        this.pinsPaths = this._pinsTransform.selectAll(".data").data(this.visible() ? this.pinsData() : [], function (d) { return d[0]; });
        var context = this;
        this.pinsPaths.enter().append("path")
            .attr("class", "data")
            .attr("d", function (d) {
                return "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30";
            })
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d[2].origRow), "geohash", context._selection.selected(this));
            })
            .on('mouseover', function (d) {
                this.parentNode.appendChild(this);
            })
            .append("title")
        ;
        this.pinsPaths
            .attr("stroke-width", 1.5 + "px")
            .style("display", function (d) {
                var pos = base.project(d[0], d[1]);
                if (!pos) {
                    return "none";
                }
                return null;
            })
            .style("fill", function (d) {
                return d[2] && d[2].fillColor ? d[2].fillColor : context.fillColor();
            })
        ;
        this.pinsPaths.select("title")
            .text(function (d) {
                return d[2] && d[2].tooltip ? d[2].tooltip : "";
            })
        ;
        this.pinsPaths.exit().remove();
    };

    Pins.prototype.layerZoomed = function (base) {
        Layer.prototype.layerZoomed.apply(this, arguments);
        this.pinsPaths
            .attr("transform", function (d) {
                var pos = base.project(d[0], d[1]);
                if (!pos) {
                    pos = [0, 0];
                }
                return "translate(" + pos[0] + ", " + pos[1] + ")scale(" + 0.5 + ")";
            })
        ;
    };

    //  Events  ---
    Pins.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return Pins;
}));