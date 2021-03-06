// Generated by CoffeeScript 1.6.2
(function() {
  define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
      defaults: {
        key: '',
        title: '',
        xAxisCategories: null,
        yAxisLabel: '',
        valueSuffix: '',
        filter: null
      },
      initialize: function() {
        var _ref, _ref1;

        if ((_ref = this.get('groups')) != null) {
          _ref.bind('change:selected', this.selectChanged, this);
        }
        return (_ref1 = this.get('filter')) != null ? _ref1.bind('change:range', this.setExtremes, this) : void 0;
      },
      selectChanged: function(model, selected) {
        var events, hcSeries;

        hcSeries = this.testGroupToHighchartSeries(model);
        events = ['removeSeries', 'addSeries'];
        return this.trigger(events[+selected], hcSeries);
      },
      testGroupToHighchartSeries: function(model) {
        var key, mean, nameChunks, stdDev, _i, _len, _ref;

        nameChunks = [];
        _ref = ['robot', 'algorithm', 'scenario'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          nameChunks.push(model.get(key));
        }
        mean = model.get('mean.' + this.get('key'));
        stdDev = model.get('stdDev.' + this.get('key'));
        console.log(mean, stdDev);
        return {
          name: nameChunks.join(' / '),
          id: model.id,
          data: [[mean - stdDev, mean + stdDev], [0, 2]]
        };
      },
      extremesChanged: function(min, max) {
        var _ref;

        this._swallowNextExtremesEvent = true;
        return (_ref = this.get('filter')) != null ? _ref.setExtremes(min, max) : void 0;
      },
      setExtremes: function(range) {
        if (this._swallowNextExtremesEvent) {
          return this._swallowNextExtremesEvent = false;
        }
        return this.set('range', this.get('filter').get('range'));
      }
    });
  });

}).call(this);
