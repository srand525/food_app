define('ember-models-table/utils/macros', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shownColumns = shownColumns;


  /**
   * @param {string} colspanKey
   * @returns {Ember.computed}
   */
  function shownColumns(colspanKey) {
    return Ember.computed(`processedColumns.@each.{isVisible,${colspanKey}}`, function () {
      let skipCount = 0;
      return Ember.get(this, 'processedColumns').filter((c, index, columns) => {
        const colspan = Ember.get(c, colspanKey);
        const isVisible = Ember.get(c, 'isVisible');
        const nextHiddenCells = columns.slice(index + 1, index + colspan).filter(c => Ember.get(c, 'isHidden'));
        if (Ember.get(nextHiddenCells, 'length') === colspan - 1 && !isVisible && colspan !== 1) {
          return false;
        }
        if (skipCount) {
          skipCount--;
          return false;
        }
        if (colspan === 1) {
          return isVisible;
        }
        if (colspan > 1) {
          skipCount = colspan - 1;
        }
        return true;
      });
    }).readOnly();
  }
});