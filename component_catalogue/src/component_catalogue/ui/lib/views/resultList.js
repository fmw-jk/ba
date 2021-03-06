// Generated by CoffeeScript 1.6.2
(function() {
  define(['backbone', 'jquery-tipTip', 'templates/resultList'], function(Backbone, tiptip, resultListTmpl, fixedHeaderTable) {
    var ResultList;

    return ResultList = Backbone.View.extend({
      id: 'resultList',
      tagName: 'div',
      events: {
        'click input': 'changeSelected',
        'click tr': 'triggerInputClick'
      },
      options: {
        testGroups: null,
        columns: {
          'count': ['#', 'Total number of tests'],
          'errorsCombined': ['#ERR', 'Total number of all errors combined'],
          'errorsAborted': ['#ABRTD', 'Error: Numer of times the navigation aborted, ' + 'i.e. simple_action_client.get_state() returned ABORTED'],
          'errorsFailed': ['#FLD', 'Error: Numer of times the navigation failed, ' + 'i.e. simple_action_client.get_state() did neither return SUCCEEDED nor ABORTED'],
          'errorsMissed': ['#MISS', 'Error: Number of time the navigation returned success ' + 'but the actual position did not match the goal position'],
          'errorsTimedout': ['#TO', 'Error: Number of times the navigation timed out'],
          'mean.collisions': ['#Col', 'Number of collisions'],
          'robot': ['Roboter', 'The robot used in the simulation'],
          'navigation': ['Navigation', 'The navigation used in the simulation'],
          'scenario': ['Scenario', 'The scenarion used in the simulation'],
          'mean.duration': ['Duration', 'Duration &empty; in s'],
          'mean.distance': ['Distance', 'Distance the robot moved &empty; in m'],
          'mean.rotation': ['Rotation', 'Number of degree the robot rotated &empty; in deg']
        }
      },
      render: function() {
        var data, table;

        data = this.options.testGroups.toJSON();
        data = data.filter(function(row) {
          return row.count > 0;
        });
        table = $(resultListTmpl({
          columns: this.options.columns,
          data: data
        }));
        this.$el.html(table);
        this.$el.find('th div').tipTip();
        return this;
      },
      initialize: function() {
        this.listenTo(this.options.testGroups, 'change:enabled', this.enableChanged.bind(this));
        this.listenTo(this.options.testGroups, 'change:count', this.refreshTable.bind(this));
        return this.setSelectionMode(this.options.selectionMode);
      },
      refreshTable: function() {
        return this.render();
      },
      enableChanged: function(model, enabled) {
        var id;

        id = model.get('id');
        return this.$('#' + id).toggleClass('disabled', !enabled);
      },
      changeSelected: function(e) {
        var checkbox, checked, id, model, row;

        checkbox = $(e.currentTarget);
        checked = checkbox.is(':checked');
        row = checkbox.closest('.row');
        id = row.attr('id');
        model = this.options.testGroups.get(id);
        model.set('selected', checked);
        if (this.options.selectionMode === 'exclusive' && checked) {
          return this.unselectAllGroups({
            except: model
          });
        }
      },
      setSelectionMode: function(mode) {
        var changed;

        if (mode !== 'exclusive' && mode !== 'promiscuous') {
          mode = 'promiscuous';
        }
        changed = mode !== this.options.selectionMode;
        this.options.selectionMode = mode;
        if (!changed) {
          return;
        }
        if (mode === 'promiscuous') {
          return this.selectAllGroups();
        } else {
          return this.unselectAllGroups();
        }
      },
      selectAllGroups: function() {
        this.options.testGroups.each(function(testGroup) {
          return testGroup.set('selected', true);
        });
        return this.updateCheckboxes();
      },
      unselectAllGroups: function(options) {
        this.options.testGroups.each(function(testGroup) {
          if ((options != null ? options.except : void 0) === testGroup) {
            return;
          }
          return testGroup.set('selected', false);
        });
        return this.updateCheckboxes();
      },
      updateCheckboxes: function() {
        var rows,
          _this = this;

        rows = this.$('.row');
        return rows.each(function(i, row) {
          var $row, chkbox, id, model;

          $row = $(row);
          id = $row.attr('id');
          model = _this.options.testGroups.get(id);
          chkbox = $row.find('input:first');
          return chkbox.prop('checked', model.get('selected'));
        });
      },
      triggerInputClick: function(e) {
        var target;

        target = $(e.target);
        if (target.is('input')) {
          return;
        }
        return target.parent().find('input').trigger('click');
      }
    });
  });

}).call(this);
