define('ember-models-table/components/models-table', ['exports', 'ember-models-table/utils/better-compare', 'ember-models-table/themes/bootstrap3', 'ember-models-table/templates/components/models-table', 'ember-models-table/utils/column'], function (exports, _betterCompare, _bootstrap, _modelsTable, _column) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  /**
   * @typedef {object} groupedHeader
   * @property {string} title header for grouped columns
   * @property {number} colspan HTML colspan attr
   * @property {number} rowspan HTML rowspan attr
   */

  const {
    keys
  } = Object; /* eslint ember/closure-actions: 0 */


  const NOT_SORTED = -1;

  /**
   * @ignore
   * @param {ModelsTableColumn} column
   * @returns {boolean}
   */
  function isSortedByDefault(column) {
    return column.sortPrecedence > NOT_SORTED;
  }

  /**
   * Default filter-function used in the filter by columns
   *
   * @param {string} cellValue value in the table cell
   * @param {string} filterString needed substring
   * @returns {boolean}
   * @ignore
   */
  function defaultFilter(cellValue, filterString) {
    return -1 !== cellValue.indexOf(filterString);
  }

  /**
   * Convert some string to the human readable one
   *
   * @param {string} name value to convert
   * @returns {string}
   * @ignore
   */
  function propertyNameToTitle(name) {
    return Ember.String.capitalize(Ember.String.dasherize(name).replace(/-/g, ' '));
  }

  /**
   * @ignore
   * @param {string} option
   * @returns {{value: *, label: *}}
   */
  function optionStrToObj(option) {
    return { value: option, label: option };
  }

  /**
   * Updates <code>filterOptions</code> for column which use <code>filterWithSelect</code>
   * and don't have <code>predefinedFilterOptions</code>
   * <code>filterOptions</code> are calculated like <code>data.mapBy(column.propertyName).uniq()</code>,
   * where data is component's <code>data</code>
   *
   * @param {string} propertyName
   * @returns {object[]}
   * @ignore
   */
  function getFilterOptionsCP(propertyName) {
    return Ember.computed(`data.@each.${propertyName}`, function () {
      let data = Ember.get(this, 'data');
      let predefinedFilterOptions = Ember.get(this, 'predefinedFilterOptions');
      let filterWithSelect = Ember.get(this, 'filterWithSelect');
      if (filterWithSelect && 'array' !== Ember.typeOf(predefinedFilterOptions)) {
        let _data = Ember.A(Ember.A(data).compact());
        let options = Ember.A(_data.mapBy(propertyName)).compact();
        if (Ember.get(this, 'sortFilterOptions')) {
          options = options.sort();
        }
        return Ember.A(Ember.A(['', ...options]).uniq().map(optionStrToObj));
      }
      return [];
    });
  }

  function chunkBy(collection, propertyName, sortOrder) {
    const doSort = arguments.length === 3;
    const chunks = Ember.A([]);
    const values = [];
    if (!Ember.isArray(collection)) {
      return chunks;
    }
    collection.forEach(item => {
      const value = Ember.get(item, propertyName);
      if (values.indexOf(value) === -1) {
        values.push(value);
        chunks.push(Ember.A([]));
      }
      const index = values.indexOf(value);
      chunks[index].pushObject(item);
    });
    if (doSort) {
      const sortedValues = values.slice().sort((v1, v2) => {
        let result = (0, _betterCompare.default)(v1, v2);
        if (result !== 0) {
          return sortOrder === 'desc' ? -1 * result : result;
        }
        return 0;
      });
      return sortedValues.map(v => chunks[values.indexOf(v)]);
    }
    return chunks;
  }

  function objToArray(map) {
    let ret = [];
    if (Ember.isArray(map)) {
      map.forEach(m => {
        ret = [...ret, ...m];
      });
      return ret;
    }
    keys(map).forEach(k => {
      if (Ember.isArray(map[k])) {
        ret = [...ret, ...map[k]];
      }
    });
    return ret;
  }

  /**
   * Table-component with pagination, sorting and filtering.
   *
   * It should be used when whole dataset is already loaded. For server-side pagination, filtering and sorting
   * [models-table-server-paginated](Components.ModelsTableServerPaginated.html) should be used.
   *
   * Basic usage example:
   *
   * ```hbs
   * {{models-table data=model columns=columns}}
   * ```
   *
   * Usage with block context:
   *
   * ```hbs
   * {{#models-table data=data columns=columns as |mt|}}
   *   {{mt.global-filter}}
   *   {{mt.data-group-by-select}}
   *   {{mt.columns-dropdown}}
   *   {{mt.table}}
   *   {{mt.footer}}
   * {{/models-table}}
   * ```
   *
   * ModelsTable yields references to the following contextual components:
   *
   * * [models-table/global-filter](Components.ModelsTableGlobalFilter.html) - global filter used for table data
   * * [models-table/columns-dropdown](Components.ModelsTableColumnsDropdown.html) - dropdown with list of options to toggle columns and column-sets visibility
   * * [models-table/data-group-by-select](Components.ModelsTableDataGroupBySelect.html) - dropdown to select property for table-rows grouping
   * * [models-table/table](Components.ModelsTableTable.html) - table with a data
   * * [models-table/footer](Components.ModelsTableFooter.html) - summary and pagination
   *
   * Check own docs for each component to get detailed info.
   *
   * ModelsTable has a lot of options you may configure, but there are two required properties called `data` and `columns`. First one contains data (e.g. list of records from the store). Second one is a list of table's columns (check [models-table-column](Utils.ModelsTableColumn.html) for available options).
   *
   * @namespace Components
   * @class ModelsTable
   * @extends Ember.Component
   */
  exports.default = Ember.Component.extend({

    layout: _modelsTable.default,

    classNames: ['models-table-wrapper'],

    /**
     * Number of records shown on one table-page
     *
     * @type number
     * @property pageSize
     * @default 10
     */
    pageSize: 10,

    /**
     * Currently shown page number. It may be set initially
     *
     * @type number
     * @property currentPageNumber
     * @default 1
     */
    currentPageNumber: 1,

    /**
     * List of properties to sort table rows
     *
     * Each value is like 'propertyName:sortDirection'
     *
     * @type string[]
     * @property sortProperties
     * @default []
     * @private
     */
    sortProperties: Ember.computed(function () {
      return Ember.A([]);
    }),

    /**
     * @type string[]
     * @default ['processedColumns.@each.filterString', 'filterString', 'pageSize']
     * @private
     * @readonly
     */
    forceToFirstPageProps: Ember.computed(function () {
      return Ember.A(['processedColumns.@each.filterString', 'filterString', 'pageSize']);
    }).readOnly(),

    /**
     * Determines if multi-columns sorting should be used
     *
     * @type boolean
     * @property multipleColumnsSorting
     * @default false
     */
    multipleColumnsSorting: true,

    /**
     * Determines if component footer should be shown on the page
     *
     * @type boolean
     * @property showComponentFooter
     * @default true
     */
    showComponentFooter: true,

    /**
     * Determines if numeric pagination should be used
     *
     * @type boolean
     * @property useNumericPagination
     * @default false
     */
    useNumericPagination: false,

    /**
     * Determines if columns-dropdown should be shown
     *
     * @type boolean
     * @property showColumnsDropdown
     * @default true
     */
    showColumnsDropdown: true,

    /**
     * Determines if filtering by columns should be available to the user
     *
     * @type boolean
     * @property useFilteringByColumns
     * @default true
     */
    useFilteringByColumns: true,

    /**
     * Global filter value
     *
     * @type string
     * @property filterString
     * @default ''
     */
    filterString: '',

    /**
     * Determines if filtering (global and by column) should ignore case
     *
     * @type boolean
     * @property filteringIgnoreCase
     * @default false
     */
    filteringIgnoreCase: false,

    /**
     * Determines if filtering should be done by hidden columns
     *
     * **Notice:** after changing this value filtering results will be updated only after filter options are changed
     *
     * @type boolean
     * @property doFilteringByHiddenColumns
     * @default true
     */
    doFilteringByHiddenColumns: true,

    /**
     * Determines if 'Global filter'-field should be shown
     *
     * @type boolean
     * @property showGlobalFilter
     * @default true
     */
    showGlobalFilter: true,

    /**
     * Determines if focus should be on the 'Global filter'-field on component render
     *
     * @type boolean
     * @property focusGlobalFilter
     * @default false
     */
    focusGlobalFilter: false,

    /**
     * Determines if <code>processedColumns</code> will be updated if <code>columns</code> are changed (<code>propertyName</code> and
     * <code>template</code> are observed)
     * <b>IMPORTANT</b> All filter, sort and visibility options will be dropped to the default values while updating
     *
     * @type boolean
     * @property columnsAreUpdateable
     * @default false
     */
    columnsAreUpdateable: false,

    /**
     * Determines if rows should be grouped for some property
     *
     * Grouped value may be shown in the separated row on the top of the group or in the first column (in the cell with rowspan) in the each group (see {{#crossLink 'Components.ModelsTable/displayGroupedValueAs:property'}}displayGroupedValueAs{{/crossLink}})
     *
     * Generally you should not show column with property which is used for grouping (but it's up to you)
     *
     * @property useDataGrouping
     * @type boolean
     * @default false
     */
    useDataGrouping: false,

    /**
     * Property name used now for grouping rows
     *
     * **IMPORTANT** It should be set initially if {{#crossLink 'Components.ModelsTable/useDataGrouping:property'}}useDataGrouping{{/crossLink}} is set to `true`
     *
     * @property currentGroupingPropertyName
     * @type string
     * @default null
     */
    currentGroupingPropertyName: null,

    /**
     * Sort direction for grouped property values
     *
     * @property sortByGroupedFieldDirection
     * @type string
     * @default 'asc'
     * @private
     */
    sortByGroupedFieldDirection: 'asc',

    /**
     * Determines how grouped value will be displayed - as a row or column
     *
     * Allowed values are `row` and `column`
     *
     * @property displayGroupedValueAs
     * @type string
     * @default 'row'
     */
    displayGroupedValueAs: 'row',

    /**
     * <code>columns</code> fields which are observed to update shown table-columns
     * It is used only if <code>columnsAreUpdateable</code> is <code>true</code>
     *
     * @type string[]
     * @property columnFieldsToCheckUpdate
     * @default ['propertyName', 'component']
     */
    columnFieldsToCheckUpdate: Ember.computed(function () {
      return Ember.A(['propertyName', 'component']);
    }),

    /**
     * `themeInstance` is an instance of [DefaultTheme](Themes.Default.html) or it's children.
     * By default `models-table` uses [BootstrapTheme](Themes.Bootstrap.html) instance.
     *
     * You may create your own theme-class and set `themeInstance` to it's instance. Check Theme properties you may define in your own theme.
     *
     * @type Themes.Default
     * @property themeInstance
     */
    themeInstance: Ember.computed(function () {
      return _bootstrap.default.create();
    }),

    /**
     * All table records
     *
     * It's a first of the two attributes you must set to the component
     *
     * @type object[]
     * @property data
     * @default []
     */
    data: Ember.computed(function () {
      return Ember.A([]);
    }),

    /**
     * Table columns. Check [ModelsTableColumn](Utils.ModelsTableColumn.html) for available properties
     *
     * It's a second of the two attributes you must set to the component
     *
     * @type object[]
     * @property columns
     * @default []
     */
    columns: Ember.computed(function () {
      return Ember.A([]);
    }),

    /**
     * Hash of components to be used for columns.
     *
     * See [ModelsTableColumn](Utils.ModelsTableColumn.html), property component
     *
     * @type Object
     * @property columnComponents
     * @default {}
     */
    columnComponents: Ember.computed({
      get() {
        return {};
      },
      set(k, v) {
        return v;
      }
    }),

    /**
     * Sets of columns that can be toggled together.
     * Each object should have:
     *  * `label` (string) - The label for the set. This will be displayed in the columns dropdown.
     *  * `showColumns` (array|Function) - This should either be an array of `propertyNames` to show, or a function. If it is a function, the function will be called with the `processedColumns` as attribute.
     *  * `hideOtherColumns` (boolean) -  If this is true (default), all columns not specified in <code>showColumns</code> will be hidden. If this is set to false, other columns will be left at whatever visibility they were before.
     *  * `toggleSet` (boolean) - If this is true (default is false), the set columns will be shown if one of them is currently hidden,
     else they will all be hidden. Settings this will result in a default of `hideOtherColumns=false`
     *
     * @type Object[]
     * @property columnSets
     * @default []
     */
    columnSets: Ember.computed(function () {
      return Ember.A([]);
    }),

    /**
     * List of columns shown in the table. It's created from the {{#crossLink 'Components.ModelsTable/columns:property'}}columns{{/crossLink}} provided to the component
     *
     * @type Object[]
     * @property processedColumns
     * @default []
     * @private
     */
    processedColumns: Ember.computed(function () {
      return Ember.A([]);
    }),

    /**
     * List of the additional headers. Used to group columns.
     *
     * Each object may have such fields:
     *
     * * `title` (string) - Header for grouped column
     * * `colspan` (number) - HTML colspan attr
     * * `rowspan` (number) - HTML rowspan attr
     *
     * @property groupedHeaders
     * @type groupedHeader[][]
     * @default []
     */
    groupedHeaders: Ember.computed(function () {
      return Ember.A([]);
    }),

    /**
     * Determines if page size should be shown
     *
     * @type boolean
     * @property showPageSize
     * @default true
     */
    showPageSize: true,

    /**
     * Expanded row items.
     *
     * It's set to the initial value when current page or page size is changed
     *
     * @type object[]
     * @property expandedItems
     * @default null
     */
    expandedItems: Ember.computed({
      get() {
        return Ember.A([]);
      },
      set(k, v) {
        if (!Ember.isArray(v)) {
          (true && Ember.warn('`expandedItems` must be an array.', false, { id: '#emt-expandedItems-array' }));
        }
        return Ember.A(v);
      }
    }),

    /**
     * true - allow to expand more than 1 row,
     * false - only 1 row may be expanded in the same time
     *
     * @type boolean
     * @property multipleExpand
     * @default false
     */
    multipleExpand: false,

    /**
     * List of grouped property values where the groups are collapsed
     *
     * @type array
     * @property collapsedGroupValues
     * @default []
     */
    collapsedGroupValues: Ember.computed({
      get() {
        return Ember.A([]);
      },
      set(k, v) {
        if (!Ember.isArray(v)) {
          (true && Ember.warn('`collapsedGroupValues` must be an array.', false, { id: '#emt-collapsedGroupValues-array' }));
        }
        return Ember.A(v);
      }
    }),

    /**
     * Allow or disallow to select rows on click.
     * If `false` - no row can be selected
     *
     * @type boolean
     * @property selectRowOnClick
     * @default true
     */
    selectRowOnClick: true,

    /**
     * Allow or disallow to select multiple rows.
     * If `false` - only one row may be selected in the same time
     *
     * @type boolean
     * @property multipleSelect
     * @default false
     */
    multipleSelect: false,

    /**
     * Component used in the 'expanded' row
     *
     * It will receive several options:
     * * `record` - current row value
     * * `processedColumns` - current column (one of the {{#crossLink 'Components.ModelsTable/processedColumns:property'}}processedColumns{{/crossLink}})
     * * `index` - current row index
     * * `selectedItems` - bound from {{#crossLink 'Components.ModelsTable/selectedItems:property'}}selectedItems{{/crossLink}}
     * * `visibleProcessedColumns` - bound from {{#crossLink 'Components.ModelsTable/visibleProcessedColumns:property'}}visibleProcessedColumns{{/crossLink}}
     * * `clickOnRow` - closure action {{#crossLink 'Components.ModelsTable/actions.clickOnRow:method'}}ModelsTable.actions.clickOnRow{{/crossLink}}
     * * `sendAction` - closure action {{#crossLink 'Components.ModelsTable/actions.sendAction:method'}}ModelsTable.actions.sendAction{{/crossLink}}
     * * `themeInstance` - bound from {{#crossLink 'Components.ModelsTable/themeInstance:property'}}themeInstance{{/crossLink}}
     *
     * Usage:
     *
     * ```hbs
     * {{models-table data=model columns=columns expandedRowComponent=(component "expanded-row")}}
     * ```
     *
     * @type object
     * @property expandedRowComponent
     * @default null
     */
    expandedRowComponent: null,

    /**
     * Component used in the row with a grouped value
     *
     * This component won't be used if {{#crossLink 'Component.ModelsTable/useDataGrouping:property'}}useDataGrouping{{/crossLink}} is not `true`
     *
     * Component will receive several options:
     *
     * * `groupedValue` - grouped property value
     * * `currentGroupingPropertyName` - bound from {{#crossLink 'Components.ModelsTable/currentGroupingPropertyName:property'}}currentGroupingPropertyName{{/crossLink}}
     * * `displayGroupedValueAs` - bound from {{#crossLink 'Components.ModelsTable/displayGroupedValueAs:property'}}ModelsTable.displayGroupedValueAs{{/crossLink}}
     * * `toggleGroupedRows` - closure action {{#crossLink 'Components.ModelsTable/actions.toggleGroupedRows:method'}}ModelsTable.actions.toggleGroupedRows{{/crossLink}}
     * * `toggleGroupedRowsExpands` - closure action {{#crossLink 'Components.ModelsTable/actions.toggleGroupedRowsExpands:method'}}ModelsTable.actions.toggleGroupedRowsExpands{{/crossLink}}
     * * `toggleGroupedRowsSelection` - closure action {{#crossLink 'Components.ModelsTable/actions.toggleGroupedRowsSelection:method'}}ModelsTable.actions.toggleGroupedRowsSelection{{/crossLink}}
     * * `visibleProcessedColumns` - bound from {{#crossLink 'Components.ModelsTable/visibleProcessedColumns:property'}}ModelsTable.visibleProcessedColumns{{/crossLink}}
     * * `themeInstance` - bound from {{#crossLink 'Components.ModelsTable/themeInstance:property'}}ModelsTable.themeInstance{{/crossLink}}
     * * `sendAction` - closure action {{#crossLink 'Components.ModelsTable/actions.sendAction:method'}}ModelsTable.actions.sendAction{{/crossLink}}
     * * `groupedItems` - list of all rows group items
     * * `visibleGroupedItems` - list of rows group items shown on the current table page
     * * `selectedGroupedItems` - list of selected rows group items
     * * `expandedGroupedItems` - list of expanded rows group items
     *
     * Usage:
     *
     * ```hbs
     * {{models-table data=model columns=columns groupingRowComponent=(component "grouping-row")}}
     * ```
     *
     * @type object
     * @property groupingRowComponent
     * @default null
     */
    groupingRowComponent: null,

    /**
     * This component won't be used if {{#crossLink 'Component.ModelsTable/useDataGrouping:property'}}useDataGrouping{{/crossLink}} is not `true`
     *
     * Component will receive several options:
     *
     * * `visibleProcessedColumns` - bound from {{#crossLink 'Components.ModelsTable/visibleProcessedColumns:property'}}ModelsTable.visibleProcessedColumns{{/crossLink}}
     * * `themeInstance` - bound from {{#crossLink 'Components.ModelsTable/themeInstance:property'}}ModelsTable.themeInstance{{/crossLink}}
     * * `sendAction` - closure action {{#crossLink 'Components.ModelsTable/actions.sendAction:method'}}ModelsTable.actions.sendAction{{/crossLink}}
     * * `groupedItems` - list of all rows group items
     * * `visibleGroupedItems` - list of rows group items shown on the current table page
     * * `selectedGroupedItems` - list of selected rows group items
     * * `expandedGroupedItems` - list of expanded rows group items
     *
     * Usage:
     *
     * ```hbs
     * {{models-table data=model columns=columns groupSummaryRowComponent=(component "group-summary-row")}}
     * ```
     *
     * @type object
     * @property groupSummaryRowComponent
     * @default null
     */
    groupSummaryRowComponent: null,

    /**
     * Closure action sent on user interaction
     *
     * Action will send one parameter - object with fields:
     *
     * * `sort` - list with sort value `propertyName:sortDirection`
     * * `currentPageNumber` - currently shown page number
     * * `pageSize` - current page size
     * * `filterString` - global filter value
     * * `filteredContent` - filtered data
     * * `selectedItems` - list with selected row items
     * * `expandedItems` - list with expanded row items
     * * `columnFilters` - hash with fields equal to filtered propertyName and values equal to filter values
     *
     * Usage:
     *
     * ```hbs
     * {{models-table data=model columns=columns displayDataChangedAction=(action "someAction")}}
     * ```
     *
     * @event displayDataChangedAction
     */
    displayDataChangedAction: null,

    /**
     * Action sent on init to give access to the Public API
     *
     * @default null
     * @property registerAPI
     * @type closureFunction
     */
    registerAPI: null,

    /**
     * Closure action sent on change of visible columns
     *
     * The action will receive an array of objects as parameter, where every object looks like this: `{ propertyName: 'firstName', isHidden: true, mayBeHidden: false }`
     *
     * * Usage:
     *
     * ```hbs
     * {{models-table data=model columns=columns columnsVisibilityChangedAction=(action "someAction")}}
     * ```
     *
     * @event columnsVisibilityChangedAction
     */
    columnsVisibilityChangedAction: null,

    /**
     * Closure action sent on row double-click
     *
     * Usage
     *
     * ```hbs
     * {{models-table data=model columns=columns rowDoubleClickAction=(action "someAction")}}
     * ```
     *
     * @event rowDoubleClickAction
     */
    rowDoubleClickAction: null,

    /**
     * Closure action sent on row hover
     *
     * Usage
     *
     * ```hbs
     * {{models-table data=model columns=columns rowHoverAction=(action "someAction")}}
     * ```
     *
     * @event rowHoverAction
     */
    rowHoverAction: null,

    /**
     * Closure action sent on row out
     *
     * Usage
     *
     * ```hbs
     * {{models-table data=model columns=columns rowOutAction=(action "someAction")}}
     * ```
     *
     * @event rowOutAction
     */
    rowOutAction: null,

    /**
     * List of currently selected row items
     *
     * Row may be selected by clicking on it, if {{#crossLink 'Components.ModelsTable/selectRowOnClick:property'}}selectRowOnClick{{/crossLink}} is set to `true`
     *
     * @default null
     * @property selectedItems
     * @type object[]
     */
    selectedItems: Ember.computed({
      get() {
        return Ember.A([]);
      },
      set(k, v) {
        if (!Ember.isArray(v)) {
          (true && Ember.warn('`selectedItems` must be an array.', false, { id: '#emt-selectedItems-array' }));
        }
        return Ember.A(v);
      }
    }),

    /**
     * List of the currently visible columns
     *
     * @type Object[]
     * @property visibleProcessedColumns
     * @default []
     * @private
     */
    visibleProcessedColumns: Ember.computed.filterBy('processedColumns', 'isVisible', true),

    /**
     * True if all processedColumns are hidden by <code>isHidden</code>
     *
     * @type boolean
     * @property allColumnsAreHidden
     * @readonly
     * @private
     */
    allColumnsAreHidden: Ember.computed('processedColumns.@each.isHidden', function () {
      const processedColumns = Ember.get(this, 'processedColumns');
      return Ember.get(processedColumns, 'length') > 0 && processedColumns.isEvery('isHidden', true);
    }).readOnly(),

    /**
     * List of property names can be used for grouping
     *
     * It may be a list of strings of list of objects. In first case label and value in the select-box will be the same.
     * In the second case you must set `label` and `value` properties for each list item
     *
     * **IMPORTANT** It must contain {{#crossLink 'Components.ModelsTable/currentGroupingPropertyName:property'}}currentGroupingPropertyName{{/crossLink}}-value
     *
     * @property dataGroupProperties
     * @type string[]|object[]
     * @default []
     */
    dataGroupProperties: Ember.computed(function () {
      return Ember.A([]);
    }),

    /**
     * @property dataGroupOptions
     * @type object[]
     * @private
     * @readonly
     */
    dataGroupOptions: Ember.computed('dataGroupProperties.[]', function () {
      return Ember.get(this, 'dataGroupProperties').map(item => {
        return 'object' === Ember.typeOf(item) || 'instance' === Ember.typeOf(item) ? item : { label: propertyNameToTitle(item), value: item };
      });
    }).readOnly(),

    /**
     * `true` if some value is set to the global filter
     *
     * @type boolean
     * @property globalFilterUsed
     * @readonly
     * @private
     */
    globalFilterUsed: Ember.computed.notEmpty('filterString'),

    /**
     * `true` if global filter or filter by any column is used
     *
     * @type boolean
     * @property anyFilterUsed
     * @readonly
     * @private
     */
    anyFilterUsed: Ember.computed('globalFilterUsed', 'processedColumns.@each.filterUsed', function () {
      return Ember.get(this, 'globalFilterUsed') || Ember.get(this, 'processedColumns').isAny('filterUsed');
    }).readOnly(),

    /**
     * `true` if all processedColumns don't use filtering and sorting
     *
     * @type boolean
     * @property noHeaderFilteringAndSorting
     * @readonly
     * @private
     */
    noHeaderFilteringAndSorting: Ember.computed('processedColumns.@each.{useSorting,useFilter}', function () {
      const processedColumns = Ember.get(this, 'processedColumns');
      return processedColumns.isEvery('useFilter', false) && processedColumns.isEvery('useSorting', false);
    }).readOnly(),

    /**
     * Number of pages
     *
     * @type number
     * @property pagesCount
     * @readonly
     * @private
     */
    pagesCount: Ember.computed('arrangedContent.[]', 'pageSize', function () {
      const pagesCount = Ember.get(this, 'arrangedContent.length') / parseInt(Ember.get(this, 'pageSize'), 10);
      return 0 === pagesCount % 1 ? pagesCount : Math.floor(pagesCount) + 1;
    }).readOnly(),

    /**
     * {{#crossLink 'Components.ModelsTable/data:property'}}data{{/crossLink}} filtered with a global filter and columns filters
     *
     * Filtering by columns is ignored if {{#crossLink 'Components.ModelsTable/useFilteringByColumns:property'}}useFilteringByColumns{{/crossLink}} is set to `false`
     *
     * @type Object[]
     * @property filteredContent
     * @readonly
     * @private
     */
    filteredContent: Ember.computed('filterString', 'data.[]', 'useFilteringByColumns', 'processedColumns.@each.filterString', function () {
      const processedColumns = Ember.get(this, 'processedColumns');
      const data = Ember.get(this, 'data');
      const useFilteringByColumns = Ember.get(this, 'useFilteringByColumns');
      const filteringIgnoreCase = Ember.get(this, 'filteringIgnoreCase');
      const doFilteringByHiddenColumns = Ember.get(this, 'doFilteringByHiddenColumns');
      if (!Ember.isArray(data)) {
        return [];
      }
      if (!Ember.get(this, 'anyFilterUsed')) {
        return data.slice();
      }
      let filterString = Ember.get(this, 'filterString');
      if (filteringIgnoreCase) {
        filterString = filterString.toLowerCase();
      }

      let _processedColumns = Ember.A(processedColumns.filterBy('useFilter'));
      if (!doFilteringByHiddenColumns) {
        _processedColumns = Ember.A(_processedColumns.filterBy('isHidden', false));
      }
      if (!Ember.get(_processedColumns, 'length')) {
        return data.slice();
      }

      // global search
      const filtersFor = Ember.A(Ember.A(_processedColumns.mapBy('filterField')).compact());
      let globalSearch = data.filter(function (row) {
        return filtersFor.any(filterFor => {
          let cellValue = '' + Ember.get(row, filterFor);
          if (filteringIgnoreCase) {
            cellValue = cellValue.toLowerCase();
          }
          return -1 !== cellValue.indexOf(filterString);
        });
      });

      if (!useFilteringByColumns) {
        return globalSearch;
      }

      // search by each column
      _processedColumns = _processedColumns.filterBy('filterField').filter(c => !(Ember.get(c, 'filterWithSelect') && '' === Ember.get(c, 'filterString')));
      return globalSearch.filter(row => {
        return _processedColumns.every(c => {
          const filterFor = Ember.get(c, 'filterField');
          let cellValue = '' + Ember.get(row, filterFor);
          let filterString = Ember.get(c, 'filterString');
          if (filteringIgnoreCase) {
            cellValue = Ember.typeOf(cellValue) === 'string' ? cellValue.toLowerCase() : cellValue;
            filterString = Ember.typeOf(filterString) === 'string' ? filterString.toLowerCase() : filterString;
          }
          return 'function' === Ember.typeOf(c.filterFunction) ? c.filterFunction(cellValue, filterString, row) : 0 === Ember.compare(cellValue, filterString);
        });
      });
    }),

    /**
     * {{#crossLink 'Components.ModelsTable/filteredContent:property'}}filteredContent{{/crossLink}} sorted by needed properties
     *
     * @type Object[]
     * @property arrangedContent
     * @readonly
     * @private
     */
    arrangedContent: Ember.computed('filteredContent.[]', 'sortProperties.[]', function () {
      const filteredContent = Ember.get(this, 'filteredContent');
      let sortProperties = Ember.get(this, 'sortProperties').map(p => {
        let [prop, direction] = p.split(':');
        direction = direction || 'asc';

        return [prop, direction];
      });

      let _filteredContent = filteredContent.slice();
      const sortedPropsLength = Ember.get(sortProperties, 'length');
      return sortedPropsLength ? _filteredContent.sort((row1, row2) => {
        for (let i = 0; i < sortedPropsLength; i++) {
          let [prop, direction] = sortProperties[i];
          let result = prop ? (0, _betterCompare.default)(Ember.get(row1, prop), Ember.get(row2, prop)) : 0;
          if (result !== 0) {
            return direction === 'desc' ? -1 * result : result;
          }
        }

        return 0;
      }) : _filteredContent;
    }),

    filteredContentObserver() {
      Ember.run.once(this, this.filteredContentObserverOnce);
    },

    filteredContentObserverOnce() {
      this.updateState({ recordsCount: this.get('filteredContent.length') });
    },

    /**
     * {{#crossLink 'Components.ModelsTable/filteredContent:property'}}filteredContent{{/crossLink}} grouped by {{#crossLink 'Components.ModelsTable/currentGroupingPropertyName:property'}}currentGroupingPropertyName{{/crossLink}} sorted by needed properties
     *
     * @property groupedArrangedContent
     * @type object[]
     * @private
     * @readonly
     */
    groupedArrangedContent: Ember.computed('filteredContent.[]', 'sortProperties.[]', 'useDataGrouping', 'currentGroupingPropertyName', 'sortByGroupedFieldDirection', function () {
      const useDataGrouping = Ember.get(this, 'useDataGrouping');
      const currentGroupingPropertyName = Ember.get(this, 'currentGroupingPropertyName');
      const filteredContent = Ember.get(this, 'filteredContent');
      const sortByGroupedFieldDirection = Ember.get(this, 'sortByGroupedFieldDirection');
      let grouped = {};
      if (!useDataGrouping || !Ember.isArray(filteredContent)) {
        return grouped;
      }
      let sortProperties = Ember.get(this, 'sortProperties').map(p => {
        let [prop, direction] = p.split(':');
        direction = direction || 'asc';
        return [prop, direction];
      });

      grouped = chunkBy(filteredContent, currentGroupingPropertyName, sortByGroupedFieldDirection);

      const sortPropsLength = Ember.get(sortProperties, 'length');
      grouped = grouped.map(group => {
        return sortPropsLength ? Ember.A(group.sort((row1, row2) => {
          for (let i = 0; i < sortPropsLength; i++) {
            let [prop, direction] = sortProperties[i];
            let result = prop ? (0, _betterCompare.default)(Ember.get(row1, prop), Ember.get(row2, prop)) : 0;
            if (result !== 0) {
              return direction === 'desc' ? -1 * result : result;
            }
          }
          return 0;
        })) : group;
      });
      return grouped.reduce((result, group) => Ember.A([...result, ...group]), []);
      /*return keys(grouped).sort((v1, v2) => {
        let result = betterCompare(v1, v2);
        if (result !== 0) {
          return (sortByGroupedFieldDirection === 'desc') ? (-1 * result) : result;
        }
        return 0;
      }).reduce((result, key) => A([...result, ...grouped[key]]), A([]));*/
    }),

    /**
     * Content of the current table page
     *
     * {{#crossLink 'Components.ModelsTable/arrangedContent:property'}}arrangedContent{{/crossLink}} sliced for currently shown page
     *
     * @type Object[]
     * @property visibleContent
     * @readonly
     * @private
     */
    visibleContent: Ember.computed('arrangedContent.[]', 'pageSize', 'currentPageNumber', function () {
      const arrangedContent = Ember.get(this, 'arrangedContent');
      const pageSize = parseInt(Ember.get(this, 'pageSize'), 10);
      const currentPageNumber = Ember.get(this, 'currentPageNumber');
      const startIndex = pageSize * (currentPageNumber - 1);
      if (Ember.get(arrangedContent, 'length') < pageSize) {
        return arrangedContent;
      }
      return arrangedContent.slice(startIndex, startIndex + pageSize);
    }),

    /**
     * Content of the current table page when rows grouping is used
     *
     * {{#crossLink 'Components.ModelsTable/groupedVisibleContent:property'}}groupedVisibleContent{{/crossLink}} sliced for currently shown page
     *
     * @property groupedVisibleContent
     * @default {}
     * @type object
     * @private
     * @readonly
     */
    groupedVisibleContent: Ember.computed('groupedArrangedContent', 'pageSize', 'currentPageNumber', 'useDataGrouping', 'currentGroupingPropertyName', function () {
      const useDataGrouping = Ember.get(this, 'useDataGrouping');
      const currentGroupingPropertyName = Ember.get(this, 'currentGroupingPropertyName');
      const groupedArrangedContent = Ember.get(this, 'groupedArrangedContent');
      const pageSize = parseInt(Ember.get(this, 'pageSize'), 10);
      const currentPageNumber = Ember.get(this, 'currentPageNumber');
      if (!useDataGrouping) {
        return [];
      }
      const startIndex = pageSize * (currentPageNumber - 1);
      return Ember.get(groupedArrangedContent, 'length') < pageSize ? chunkBy(groupedArrangedContent, currentGroupingPropertyName) : chunkBy(groupedArrangedContent.slice(startIndex, startIndex + pageSize), currentGroupingPropertyName);
    }),

    /**
     * List of grouped property values in order to show groups in the table
     *
     * @type array
     * @property groupedVisibleContentValuesOrder
     * @private
     * @readonly
     */
    groupedVisibleContentValuesOrder: Ember.computed('groupedVisibleContent.[]', 'currentGroupingPropertyName', function () {
      const currentGroupingPropertyName = Ember.get(this, 'currentGroupingPropertyName');
      return Ember.get(this, 'groupedVisibleContent').map(group => Ember.get(group, `firstObject.${currentGroupingPropertyName}`));
    }),

    /**
     * Is user on the last page
     *
     * @type boolean
     * @property isLastPage
     * @readonly
     * @private
     */
    isLastPage: Ember.computed('currentPageNumber', 'pagesCount', function () {
      return Ember.get(this, 'currentPageNumber') >= Ember.get(this, 'pagesCount');
    }).readOnly(),

    /**
     * Alias to <code>arrangedContent.length</code>
     *
     * @type number
     * @property arrangedContentLength
     * @readonly
     * @private
     */
    arrangedContentLength: Ember.computed.alias('arrangedContent.length'),

    /**
     * Index of the first currently shown record
     *
     * @type number
     * @property firstIndex
     * @private
     * @readonly
     */
    firstIndex: Ember.computed('arrangedContentLength', 'pageSize', 'currentPageNumber', function () {
      return 0 === Ember.get(this, 'arrangedContentLength') ? 0 : parseInt(Ember.get(this, 'pageSize'), 10) * (Ember.get(this, 'currentPageNumber') - 1) + 1;
    }).readOnly(),

    /**
     * Index of the last currently shown record
     *
     * @type number
     * @property lastIndex
     * @readonly
     * @private
     */
    lastIndex: Ember.computed('isLastPage', 'arrangedContentLength', 'currentPageNumber', 'pageSize', function () {
      return Ember.get(this, 'isLastPage') ? Ember.get(this, 'arrangedContentLength') : Ember.get(this, 'currentPageNumber') * parseInt(Ember.get(this, 'pageSize'), 10);
    }).readOnly(),

    /**
     * List of possible <code>pageSize</code> values. Used to change size of <code>visibleContent</code>
     *
     * @type number[]
     * @default [10, 25, 50]
     * @property pageSizeValues
     */
    pageSizeValues: Ember.computed(function () {
      return Ember.A([10, 25, 50]);
    }),

    /**
     * List of options for pageSize-selectBox
     * It's mapped from <code>pageSizeValues</code>
     * This value should not be set manually!
     *
     * @type {value: string|number, label: string|number}
     * @property pageSizeOptions
     * @default []
     * @private
     */
    pageSizeOptions: Ember.computed(function () {
      return Ember.A([]);
    }),

    /**
     * These are options for the columns dropdown.
     * By default, the 'Show All', 'Hide All' and 'Restore Defaults' buttons are displayed.
     *
     * @type { showAll: boolean, hideAll: boolean, restoreDefaults: boolean, columnSets: object[] }
     * @property columnDropdownOptions
     * @readonly
     * @private
     */
    columnDropdownOptions: Ember.computed('columnSets.{label,showColumns,hideOtherColumns}', function () {
      return Ember.Object.create({
        showAll: true,
        hideAll: true,
        restoreDefaults: true,
        columnSets: Ember.A(Ember.get(this, 'columnSets') || [])
      });
    }),

    /**
     * Public API that allows for programmatic interaction with the component
     *
     * {
     *  refilter() - Invalidates the filteredContent property, causing the table to be re-filtered.
     *  recordsCount - Size of the current arranged content
     * }
     *
     * @type object
     * @property publicAPI
     *
     */
    publicAPI: null,

    updateState(changes) {
      let newState = Ember.set(this, 'publicAPI', Ember.assign({}, this.get('publicAPI'), changes));
      let registerAPI = this.get('registerAPI');
      if (registerAPI) {
        registerAPI(newState);
      }
      return newState;
    },

    /**
     * Show first page if for some reasons there is no content for current page, but table data exists
     *
     * @method visibleContentObserver
     * @returns {undefined}
     * @private
     */
    visibleContentObserver() {
      Ember.run.once(this, this.visibleContentObserverOnce);
    },

    /**
     * @method visibleContentObserverOnce
     * @returns {undefined}
     * @private
     */
    visibleContentObserverOnce() {
      let visibleContentLength = Ember.get(this, 'visibleContent.length');
      let dataLength = Ember.get(this, 'data.length');
      let currentPageNumber = Ember.get(this, 'currentPageNumber');
      if (!visibleContentLength && dataLength && currentPageNumber !== 1) {
        Ember.set(this, 'currentPageNumber', 1);
      }
    },

    init() {
      this._super(...arguments);
      this.setup();
    },

    didReceiveAttrs() {
      this.updateColumns();
    },

    didInsertElement() {
      this.focus();
    },

    /**
     * Component init
     *
     * Set visibility and filtering attributes for each column
     *
     * @method setup
     * @returns {undefined}
     */
    setup() {
      this._setupSelectedRows();
      this._setupColumns();
      this._setupPageSizeOptions();

      if (Ember.get(this, 'columnsAreUpdateable')) {
        let columnFieldsToCheckUpdate = Ember.get(this, 'columnFieldsToCheckUpdate');
        (true && !('array' === Ember.typeOf(columnFieldsToCheckUpdate)) && Ember.assert('`columnFieldsToCheckUpdate` should be an array of strings', 'array' === Ember.typeOf(columnFieldsToCheckUpdate)));

        columnFieldsToCheckUpdate.forEach(propertyName => this.addObserver(`columns.@each.${propertyName}`, this, this._setupColumnsOnce));
      }
      this.addObserver('visibleContent.length', this, this.visibleContentObserver);
      this.addObserver('filteredContent.length', this, this.filteredContentObserver);

      Ember.set(this, 'publicAPI', {});

      this.updateState({
        recordsCount: this.get('filteredContent.length') || 0,
        refilter: this.refilter.bind(this)
      });
    },

    refilter() {
      this.notifyPropertyChange('filteredContent');
    },

    /**
     * Recalculate processedColumns when the columns attr changes
     *
     * @method updateColumns
     * @returns {undefined}
     */
    updateColumns() {
      if (Ember.get(this, 'columnsAreUpdateable')) {
        this._setupColumns();
      }
    },

    /**
     * Focus on 'Global filter' on component render
     *
     * @method focus
     * @returns {undefined}
     */
    focus() {
      if (Ember.get(this, 'showGlobalFilter') && Ember.get(this, 'focusGlobalFilter')) {
        Ember.$('.filterString').focus();
      }
    },

    /**
     * Preselect table rows if `selectedItems` is provided
     *
     * `multipleSelected` may be set `true` if `selectedItems` has more than 1 item
     *
     * @private _setupSelectedRows
     * @returns {undefined}
     * @method
     */
    _setupSelectedRows() {
      let selectedItems = Ember.get(this, 'selectedItems');
      if (Ember.isArray(selectedItems) && Ember.get(selectedItems, 'length') > 1 && !Ember.get(this, 'multipleSelected')) {
        (true && Ember.warn('`multipleSelected` is set `true`, because you have provided multiple `selectedItems`.', false, { id: '#emt-multipleSelected_autoset' }));

        Ember.set(this, 'multipleSelected', true);
      }
    },

    /**
     * Wrapper for <code>_setupColumns</code> to call it only once when observer is fired
     *
     * @method _setupColumnsOnce
     * @returns {undefined}
     * @private
     */
    _setupColumnsOnce() {
      Ember.run.once(this, this._setupColumns);
    },

    /**
     * Generate hash for column-`extend`
     *
     * @method _createColumnHash
     * @param {object} options
     * @returns {object}
     * @private
     */
    _createColumnHash(options) {
      const hash = {
        __mt: this,
        data: Ember.computed.readOnly('__mt.data')
      };
      const { propertyName } = options;
      if (Ember.get(options, 'filterWithSelect') && (Ember.get(options, 'filteredBy') || Ember.get(options, 'propertyName')) && !Ember.get(options, 'disableFiltering')) {
        let predefinedFilterOptions = Ember.get(options, 'predefinedFilterOptions');
        let usePredefinedFilterOptions = 'array' === Ember.typeOf(predefinedFilterOptions);
        if (usePredefinedFilterOptions && Ember.get(predefinedFilterOptions, 'length')) {
          const types = Ember.A(['object', 'instance']);
          const allObjects = Ember.A(predefinedFilterOptions).every(option => types.includes(Ember.typeOf(option)) && option.hasOwnProperty('label') && option.hasOwnProperty('value'));
          const allPrimitives = Ember.A(predefinedFilterOptions).every(option => !types.includes(Ember.typeOf(option)));
          (true && !(allObjects || allPrimitives) && Ember.assert('`predefinedFilterOptions` should be an array of objects or primitives and not mixed', allObjects || allPrimitives));

          if (allPrimitives) {
            predefinedFilterOptions = predefinedFilterOptions.map(optionStrToObj);
          }
          if ('' !== predefinedFilterOptions[0].value) {
            predefinedFilterOptions = [{ value: '', label: '' }, ...predefinedFilterOptions];
          }
          hash.filterOptions = usePredefinedFilterOptions ? Ember.A(predefinedFilterOptions) : [];
        } else if (usePredefinedFilterOptions) {
          // Empty array as predefined filter
          hash.useFilter = false;
        } else {
          if (propertyName) {
            hash.filterOptions = getFilterOptionsCP(propertyName);
          }
        }
      }
      return hash;
    },

    /**
     * Set values for some column-properties after its creation
     *
     * @method _postProcessColumn
     * @param {object} column
     * @returns {object}
     * @private
     */
    _postProcessColumn(column) {
      const filterOptions = Ember.get(column, 'filterOptions');
      const placeholder = Ember.get(column, 'filterPlaceholder');
      if (Ember.isArray(filterOptions) && placeholder && !filterOptions[0].label) {
        Ember.set(column, 'filterOptions.firstObject.label', placeholder);
      }
      return column;
    },

    /**
     * Create a column.
     * This can be overwritten if you need to use your own column object.
     *
     * Override must something like:
     *
     * ```js
     * _createColumn(options) {
     *   const hash = this._createColumnHash(options);
     *   const column = ModelsTableColumn.extend(hash).create(options);
     *   return this._postProcessColumn(column);
     * }
     * ```
     *
     * @method _createColumn
     * @param {object} options
     * @returns {Object}
     */
    _createColumn(options) {
      const hash = this._createColumnHash(options);
      const column = _column.default.extend(hash).create(options);
      return this._postProcessColumn(column);
    },

    /**
     * Create new properties for `columns`
     *
     * @method _setupColumns
     * @returns {undefined}
     * @private
     */
    _setupColumns() {
      let self = this;

      let nColumns = Ember.A(Ember.get(this, 'columns').map(column => {
        let filterFunction = Ember.get(column, 'filterFunction');
        filterFunction = 'function' === Ember.typeOf(filterFunction) ? filterFunction : defaultFilter;

        let c = this._createColumn(column);

        ['colspanForSortCell', 'colspanForFilterCell'].forEach(prop => {
          const val = Ember.get(c, prop);
          (true && !(Ember.typeOf(val) === 'number' && val >= 1) && Ember.assert(`"${prop}" must be 1 or greater. You passed "${val}"`, Ember.typeOf(val) === 'number' && val >= 1));
        });

        Ember.setProperties(c, {
          filterString: Ember.get(c, 'filterString') || '',
          originalDefinition: column
        });

        this._setupColumnsComponent(c, column);

        Ember.set(c, 'filterFunction', filterFunction);

        if (Ember.isNone(Ember.get(c, 'mayBeHidden'))) {
          Ember.set(c, 'mayBeHidden', true);
        }

        const { sortDirection, sortPrecedence } = column;
        const hasSortPrecedence = !Ember.isNone(sortPrecedence) && sortPrecedence > NOT_SORTED;
        const defaultSortPrecedence = hasSortPrecedence ? sortPrecedence : NOT_SORTED;
        const defaultSorting = sortDirection && sortPrecedence > NOT_SORTED ? sortDirection.toLowerCase() : 'none';

        Ember.setProperties(c, {
          defaultVisible: !Ember.get(c, 'isHidden'),
          sorting: defaultSorting,
          sortPrecedence: defaultSortPrecedence
        });
        return c;
      }));
      nColumns.filterBy('propertyName').forEach(column => {
        let propertyName = Ember.get(column, 'propertyName');
        if (Ember.isNone(Ember.get(column, 'title'))) {
          Ember.set(column, 'title', propertyNameToTitle(propertyName));
        }
      });
      Ember.set(this, 'processedColumns', nColumns);

      // Apply initial sorting
      Ember.set(this, 'sortProperties', Ember.A());
      const filteredOrderedColumns = nColumns.sortBy('sortPrecedence').filter(col => isSortedByDefault(col));
      filteredOrderedColumns.forEach(column => {
        self.send('sort', column);
        const defaultSortedBy = column.sortedBy || column.propertyName;
        let sortingArgs = [column, defaultSortedBy, column.sortDirection.toLowerCase()];
        if (Ember.get(this, 'multipleColumnsSorting')) {
          this._multiColumnsSorting(...sortingArgs);
        } else {
          this._singleColumnSorting(...sortingArgs);
        }
      });
      this.updateHeaderCellsColspanOnce();
    },

    /**
     * Create new properties for `columns` for components
     *
     * @method _setupColumnsComponent
     * @param {ModelsTableColumn} c
     * @param {object} column raw column
     * @returns {undefined}
     * @private
     */
    _setupColumnsComponent(c, column) {
      let columnComponents = Ember.get(this, 'columnComponents');
      if (Ember.isPresent(columnComponents)) {

        // display component
        let componentName = Ember.get(column, 'component');
        if (Ember.isPresent(componentName)) {
          let hashComponent = Ember.get(columnComponents, componentName);
          if (Ember.isPresent(hashComponent)) {
            Ember.set(c, 'component', hashComponent);
          }
        }

        // edit component
        componentName = Ember.get(column, 'componentForEdit');
        if (Ember.isPresent(componentName)) {
          let hashComponent = Ember.get(columnComponents, componentName);
          if (Ember.isPresent(hashComponent)) {
            Ember.set(c, 'componentForEdit', hashComponent);
          }
        }
      }
    },

    /**
     * Provide backward compatibility with <code>pageSizeValues</code> equal to an array with numbers and not objects
     * <code>pageSizeValues</code> is live as is, <code>pageSizeOptions</code> is used in the templates
     *
     * @method _setupPageSizeOptions
     * @returns {undefined}
     * @private
     */
    _setupPageSizeOptions() {
      let pageSizeOptions = Ember.get(this, 'pageSizeValues').map(optionStrToObj);
      Ember.set(this, 'pageSizeOptions', pageSizeOptions);
    },

    /**
     * Set <code>sortProperties</code> when single-column sorting is used
     *
     * @param {ModelsTableColumn} column
     * @param {string} sortedBy
     * @param {string} newSorting 'asc|desc|none'
     * @method _singleColumnSorting
     * @returns {undefined}
     * @private
     */
    _singleColumnSorting(column, sortedBy, newSorting) {
      Ember.get(this, 'processedColumns').setEach('sorting', 'none');
      Ember.set(column, 'sorting', newSorting);
      Ember.set(this, 'sortProperties', 'none' === newSorting ? [] : [`${sortedBy}:${newSorting}`]);
    },

    /**
     * Set <code>sortProperties</code> when multi-columns sorting is used
     *
     * @param {ModelsTableColumn} column
     * @param {string} sortedBy
     * @param {string} newSorting 'asc|desc|none'
     * @method _multiColumnsSorting
     * @returns {undefined}
     * @private
     */
    _multiColumnsSorting(column, sortedBy, newSorting) {
      Ember.set(column, 'sorting', newSorting);
      let sortProperties = Ember.get(this, 'sortProperties');
      let sortPropertiesMap = {};
      sortProperties.forEach(p => {
        let [propertyName, order] = p.split(':');
        sortPropertiesMap[propertyName] = order;
      });
      delete sortPropertiesMap[sortedBy];

      let newSortProperties = Ember.A([]);
      keys(sortPropertiesMap).forEach(propertyName => {
        if (propertyName !== sortedBy) {
          newSortProperties.pushObject(`${propertyName}:${sortPropertiesMap[propertyName]}`);
        }
      });
      if ('none' !== newSorting) {
        newSortProperties.pushObject(`${sortedBy}:${newSorting}`);
      }
      Ember.set(this, 'sortProperties', newSortProperties);
    },

    /**
     * Send `displayDataChangedAction`-action when user does sort of filter.
     * Action is sent if `displayDataChangedAction` is a closure-action
     *
     * @method userInteractionObserver
     * @returns {undefined}
     * @private
     */
    userInteractionObserver() {
      Ember.run.once(this, this.userInteractionObserverOnce);
    },

    /**
     * @method userInteractionObserverOnce
     * @returns {undefined}
     * @private
     */
    userInteractionObserverOnce() {
      let action = Ember.get(this, 'displayDataChangedAction');
      let actionIsFunction = typeof action === 'function';

      if (actionIsFunction) {
        let columns = Ember.get(this, 'processedColumns');
        let settings = Ember.Object.create({
          sort: Ember.get(this, 'sortProperties'),
          currentPageNumber: Ember.get(this, 'currentPageNumber'),
          pageSize: parseInt(Ember.get(this, 'pageSize'), 10),
          filterString: Ember.get(this, 'filterString'),
          filteredContent: Ember.get(this, 'filteredContent'),
          selectedItems: Ember.get(this, 'selectedItems'),
          expandedItems: Ember.get(this, 'expandedItems'),
          columns: columns.map(c => Ember.getProperties(c, ['filterString', 'filterField', 'sortField', 'sorting', 'propertyName'])),
          columnFilters: {}
        });
        columns.forEach(column => {
          if (!Ember.isBlank(Ember.get(column, 'filterString'))) {
            settings.columnFilters[Ember.get(column, 'propertyName')] = Ember.get(column, 'filterString');
          }
        });
        action(settings);
      }
    },

    /**
     * Send `columnsVisibilityChangedAction`-action when user changes which columns are visible.
     * Action is sent if `columnsVisibilityChangedAction` is a closure action
     *
     * @returns {undefined}
     * @method _sendColumnsVisibilityChangedAction
     * @private
     */
    _sendColumnsVisibilityChangedAction() {
      let action = Ember.get(this, 'columnsVisibilityChangedAction');
      let actionIsFunction = typeof action === 'function';

      if (actionIsFunction) {
        let columns = Ember.get(this, 'processedColumns');
        let columnsVisibility = columns.map(column => {
          let options = Ember.getProperties(column, 'isHidden', 'mayBeHidden', 'propertyName');
          options.isHidden = !!options.isHidden;
          return options;
        });
        action(columnsVisibility);
      }
    },

    /**
     * Handler for global filter and filter by each column
     *
     * @method forceToFirstPage
     * @returns {undefined}
     * @private
     */
    forceToFirstPage() {
      Ember.set(this, 'currentPageNumber', 1);
      this.userInteractionObserver();
    },

    /**
     * Collapse open rows when user change page size or moved to the another page
     *
     * @method collapseRowOnNavigate
     * @returns {undefined}
     * @private
     */
    collapseRowOnNavigate: Ember.observer('currentPageNumber', 'pageSize', function () {
      Ember.get(this, 'expandedItems').clear();
    }),

    /**
     * Rebuild the whole table.
     * This can be called to force a complete re-render of the table.
     *
     * @method rebuildTable
     * @returns {undefined}
     */
    rebuildTable() {
      Ember.set(this, 'currentPageNumber', 1);
      this._clearFilters();
      this.setup();
    },

    /**
     * Update colspans for table header cells
     *
     * @method updateHeaderCellsColspan
     * @returns {undefined}
     * @private
     */
    updateHeaderCellsColspan: Ember.observer('processedColumns.@each.{isVisible,colspanForSortCell,colspanForFilterCell}', function () {
      Ember.run.once(this, this.updateHeaderCellsColspanOnce);
    }),

    /**
     * @method updateHeaderCellsColspanOnce
     * @returns {undefined}
     * @private
     */
    updateHeaderCellsColspanOnce() {
      Ember.get(this, 'processedColumns').forEach((column, index, columns) => {
        const colspanForSortCell = Ember.get(column, 'colspanForSortCell');
        const colspanForFilterCell = Ember.get(column, 'colspanForFilterCell');
        const nextColumnsForSortCell = columns.slice(index, index + colspanForSortCell).filter(c => Ember.get(c, 'isHidden'));
        const nextColumnsForFilterCell = columns.slice(index, index + colspanForFilterCell).filter(c => Ember.get(c, 'isHidden'));
        Ember.set(column, 'realColspanForSortCell', colspanForSortCell - Ember.get(nextColumnsForSortCell, 'length'));
        Ember.set(column, 'realColspanForFilterCell', colspanForFilterCell - Ember.get(nextColumnsForFilterCell, 'length'));
      });
    },

    /**
     * Clear all filters.
     *
     * @method _clearFilters
     * @returns {undefined}
     * @private
     */
    _clearFilters() {
      Ember.set(this, 'filterString', '');
      Ember.get(this, 'processedColumns').setEach('filterString', '');
    },

    willInsertElement() {
      Ember.get(this, 'forceToFirstPageProps').forEach(propertyName => this.addObserver(propertyName, this.forceToFirstPage));
      return this._super(...arguments);
    },

    willDestroyElement() {
      Ember.get(this, 'forceToFirstPageProps').forEach(propertyName => this.removeObserver(propertyName, this.forceToFirstPage));
      const registerAPI = Ember.get(this, 'registerAPI');
      if (registerAPI) {
        registerAPI(null);
      }
      return this._super(...arguments);
    },

    /**
     * @type Object
     */
    actions: {

      /**
       * Send action to the outside context
       *
       * `sendAction` signature is the same as `Ember.Component#sendAction`
       *
       * @method actions.sendAction
       * @returns {undefined}
       */
      sendAction() {
        this.sendAction(...arguments);
      },

      /**
       * Toggle visibility for provided column
       *
       * It doesn't do nothing if column can't be hidden (see {{#crossLink 'Utils.ModelsTableColumn/mayBeHidden:property'}}mayBeHidden{{/crossLink}}). May trigger sending {{#crossLink 'Components.ModelsTable/columnsVisibilityChangedAction:property'}}columnsVisibilityChangedAction{{/crossLink}}
       *
       * @method actions.toggleHidden
       * @param {ModelsTableColumn} column
       * @returns {undefined}
       */
      toggleHidden(column) {
        if (Ember.get(column, 'mayBeHidden')) {
          column.toggleProperty('isHidden');
          this._sendColumnsVisibilityChangedAction();
        }
      },

      /**
       * Show all columns
       *
       * Set each column `isHidden` value to `false`. May trigger sending {{#crossLink 'Components.ModelsTable/columnsVisibilityChangedAction:property'}}columnsVisibilityChangedAction{{/crossLink}}
       *
       * @method actions.showAllColumns
       * @returns {undefined}
       */
      showAllColumns() {
        Ember.get(this, 'processedColumns').setEach('isHidden', false);
        this._sendColumnsVisibilityChangedAction();
      },

      /**
       * Hide all columns that may be hidden (see {{#crossLink 'Utils.ModelsTableColumn/mayBeHidden:property'}}mayBeHidden{{/crossLink}})
       *
       * May trigger sending {{#crossLink 'Components.ModelsTable/columnsVisibilityChangedAction:property'}}columnsVisibilityChangedAction{{/crossLink}}
       *
       * @method actions.hideAllColumns
       * @returns {undefined}
       */
      hideAllColumns() {
        Ember.A(Ember.get(this, 'processedColumns').filterBy('mayBeHidden')).setEach('isHidden', true);
        this._sendColumnsVisibilityChangedAction();
      },

      /**
       * Restore columns visibility values according to their default visibility settings (see {{#crossLink 'Utils.ModelsTableColumn/defaultVisible:property'}}defaultVisible{{/crossLink}})
       *
       * May trigger sending {{#crossLink 'Components.ModelsTable/columnsVisibilityChangedAction:property'}}columnsVisibilityChangedAction{{/crossLink}}
       *
       * @method actions.restoreDefaultVisibility
       * @returns {undefined}
       */
      restoreDefaultVisibility() {
        Ember.get(this, 'processedColumns').forEach(c => {
          Ember.set(c, 'isHidden', !Ember.get(c, 'defaultVisible'));
          this._sendColumnsVisibilityChangedAction();
        });
      },

      /**
       * Toggle visibility for every column in the selected columns set
       *
       * It ignore columns that can't be hidden (see {{#crossLink 'Utils.ModelsTableColumn/mayBeHidden:property'}}mayBeHidden{{/crossLink}}). May trigger sending {{#crossLink 'Components.ModelsTable/columnsVisibilityChangedAction:property'}}columnsVisibilityChangedAction{{/crossLink}}
       *
       * @method actions.toggleColumnSet
       * @returns {undefined}
       */
      toggleColumnSet({ showColumns = [], hideOtherColumns, toggleSet = false } = {}) {
        let columns = Ember.get(this, 'processedColumns');

        // If hideOtherColumns is not set, default to true if toggleSet=false, else to false
        hideOtherColumns = Ember.isNone(hideOtherColumns) ? !toggleSet : hideOtherColumns;

        // If showColumns is a function, call it
        if (Ember.typeOf(showColumns) === 'function') {
          return Ember.run(this, showColumns, columns);
        }

        let setColumns = Ember.A([]);
        let otherColumns = Ember.A([]);

        columns.forEach(column => {
          let columnId = Ember.get(column, 'propertyName');

          if (!columnId || !Ember.get(column, 'mayBeHidden')) {
            return;
          }

          showColumns = Ember.A(showColumns);
          if (showColumns.includes(columnId)) {
            setColumns.pushObject(column);
          } else {
            otherColumns.pushObject(column);
          }
        });

        // By default, all columns should always be set to visible
        // However, if `toggleSet=true`, then the set should be toggled between visible/hidden
        // In this case, if one of the set columns is hidden, make them all visible, else hide them
        let targetVisibility = true;
        if (toggleSet) {
          targetVisibility = !!setColumns.findBy('isVisible', false);
        }

        setColumns.forEach(column => {
          let columnId = Ember.get(column, 'propertyName');
          if (showColumns.includes(columnId) && Ember.get(column, 'isVisible') !== targetVisibility) {
            this.send('toggleHidden', column);
          }
        });

        if (hideOtherColumns) {
          otherColumns.forEach(column => {
            let columnId = Ember.get(column, 'propertyName');

            if (!showColumns.includes(columnId) && Ember.get(column, 'isVisible')) {
              this.send('toggleHidden', column);
            }
          });
        }
      },

      /**
       * Pagination click-handler
       *
       * It moves user to the selected page. Check [models-table/pagination-numeric](Components.ModelsTablePaginationNumeric.html) and [models-table/pagination-simple](Components.ModelsTablePaginationSimple.html) for usage examples. May trigger sending {{#crossLink 'Components.ModelsTable/displayDataChangedAction:property'}}displayDataChangedAction{{/crossLink}}
       *
       * @param {number} pageNumber
       * @method actions.gotoCustomPage
       * @returns {undefined}
       */
      gotoCustomPage(pageNumber) {
        Ember.set(this, 'currentPageNumber', pageNumber);
        this.userInteractionObserver();
      },

      /**
       * Sort selected column by {{#crossLink 'Utils.ModelsTableColumn/sortedBy:property'}}sortedBy{{/crossLink}} or {{#crossLink 'Utils.ModelsTableColumn/propertyName:property'}}propertyName{{/crossLink}}
       *
       * It will drop sorting for other columns if {{#crossLink 'Components.ModelsTable/multipleColumnsSorting:property'}}multipleColumnsSorting{{/crossLink}} is set to `false`. It will add new sorting if {{#crossLink 'Components.ModelsTable/multipleColumnsSorting:property'}}multipleColumnsSorting{{/crossLink}} is set to `true`. May trigger sending {{#crossLink 'Components.ModelsTable/displayDataChangedAction:property'}}displayDataChangedAction{{/crossLink}}. Table will be dropped to the first page if sorting is done
       *
       * For multiColumns-sorting calling sort will change sort-order. E.g.:
       *
       * ```js
       * sortProperties = ['a:asc', 'b:asc', 'c:desc'];
       * sort({propertyName: 'b'}); // sortProperties now is ['a:asc', 'c:desc', 'b:desc']
       * ```
       *
       * @method actions.sort
       * @param {ModelsTableColumn} column
       * @returns {undefined}
       */
      sort(column) {
        const sortMap = {
          none: 'asc',
          asc: 'desc',
          desc: 'none'
        };
        let sortedBy = Ember.get(column, 'sortedBy') || Ember.get(column, 'propertyName');
        if (!sortedBy) {
          return;
        }
        let currentSorting = Ember.get(column, 'sorting') || 'none';
        let newSorting = sortMap[currentSorting.toLowerCase()];
        if (sortedBy === Ember.get(this, 'currentGroupingPropertyName')) {
          const sortByGroupedFieldDirection = Ember.get(this, 'sortByGroupedFieldDirection');
          newSorting = sortByGroupedFieldDirection === 'asc' ? 'desc' : 'asc';
          Ember.set(this, 'sortByGroupedFieldDirection', newSorting);
          return;
        }
        let sortingArgs = [column, sortedBy, newSorting];
        if (Ember.get(this, 'multipleColumnsSorting')) {
          this._multiColumnsSorting(...sortingArgs);
        } else {
          this._singleColumnSorting(...sortingArgs);
        }
        Ember.set(this, 'currentPageNumber', 1);
        this.userInteractionObserver();
      },

      /**
       * Expand selected row
       *
       * It will cause expandedRowComponent to be used for it. It will collapse already expanded row if {{#crossLink 'Components.ModelsTable/multipleExpand:property'}}multipleExpand{{/crossLink}} is set to `false`. Expanding is assigned to the record itself and not their index. So, if page #1 has first row expanded and user is moved to any another page, first row on new page won't be expanded. But when user will be back to the first page, first row will be expanded. May trigger sending {{#crossLink 'Components.ModelsTable/displayDataChangedAction:property'}}displayDataChangedAction{{/crossLink}}
       *
       * @param {number} index
       * @param {object} dataItem
       * @returns {undefined}
       * @method actions.expandRow
       */
      expandRow(index, dataItem) {
        (true && !(Ember.typeOf(index) === 'number') && Ember.assert('row index should be numeric', Ember.typeOf(index) === 'number'));

        let multipleExpand = Ember.get(this, 'multipleExpand');
        let expandedItems = Ember.get(this, 'expandedItems');
        if (!multipleExpand && Ember.get(expandedItems, 'length') === 1) {
          expandedItems.clear();
        }
        expandedItems.pushObject(dataItem);
        this.userInteractionObserver();
      },

      /**
       * Collapse selected row
       *
       * May trigger sending {{#crossLink 'Components.ModelsTable/displayDataChangedAction:property'}}displayDataChangedAction{{/crossLink}}
       *
       * @param {number} index
       * @param {object} dataItem
       * @returns {undefined}
       * @method actions.collapseRow
       */
      collapseRow(index, dataItem) {
        (true && !(Ember.typeOf(index) === 'number') && Ember.assert('row index should be numeric', Ember.typeOf(index) === 'number'));

        Ember.get(this, 'expandedItems').removeObject(dataItem);
        this.userInteractionObserver();
      },

      /**
       * Expand all rows in the current page
       *
       * It works only if {{#crossLink 'Components.ModelsTable/multipleExpand:property'}}multipleExpand{{/crossLink}} is set to `true`. May trigger sending {{#crossLink 'Components.ModelsTable/displayDataChangedAction:property'}}displayDataChangedAction{{/crossLink}}
       *
       * @method actions.expandAllRows
       * @returns {undefined}
       */
      expandAllRows() {
        let multipleExpand = Ember.get(this, 'multipleExpand');
        let visibleContent = Ember.get(this, 'visibleContent');
        if (multipleExpand) {
          if (Ember.get(this, 'useDataGrouping')) {
            Ember.get(this, 'expandedItems').pushObjects(Ember.A(objToArray(Ember.get(this, 'groupedVisibleContent'))));
          } else {
            Ember.get(this, 'expandedItems').pushObjects(Ember.A(visibleContent.slice()));
          }
          this.userInteractionObserver();
        }
      },

      /**
       * Collapse all rows in the current page
       *
       * May trigger sending {{#crossLink 'Components.ModelsTable/displayDataChangedAction:property'}}displayDataChangedAction{{/crossLink}}
       *
       * @method actions.collapseAllRows
       * @returns {undefined}
       */
      collapseAllRows() {
        Ember.get(this, 'expandedItems').clear();
        this.userInteractionObserver();
      },

      /**
       * Handler for row-click
       *
       * Toggle <code>selected</code>-state for row. Select only one or multiple rows depends on {{#crossLink 'Components.ModelsTable/multipleSelect:property'}}multipleSelect{{/crossLink}} value. May trigger sending {{#crossLink 'Components.ModelsTable/displayDataChangedAction:property'}}displayDataChangedAction{{/crossLink}}
       *
       * @param {number} index
       * @param {object} dataItem
       * @returns {undefined}
       * @method actions.clickOnRow
       */
      clickOnRow(index, dataItem) {
        (true && !(Ember.typeOf(index) === 'number') && Ember.assert('row index should be numeric', Ember.typeOf(index) === 'number'));

        if (Ember.get(this, 'selectRowOnClick')) {
          let multipleSelect = Ember.get(this, 'multipleSelect');
          let selectedItems = Ember.get(this, 'selectedItems');
          if (selectedItems.includes(dataItem)) {
            selectedItems.removeObject(dataItem);
          } else {
            if (!multipleSelect && Ember.get(selectedItems, 'length') === 1) {
              Ember.get(this, 'selectedItems').clear();
            }
            Ember.get(this, 'selectedItems').pushObject(dataItem);
          }
        }
        this.userInteractionObserver();
      },

      /**
       * Handler for double-click on row
       *
       * May trigger sending {{#crossLink 'Components.ModelsTable/rowDoubleClickAction:property'}}rowDoubleClickAction{{/crossLink}}
       *
       * @param {number} index
       * @param {object} dataItem
       * @returns {undefined}
       * @method actions.doubleClickOnRow
       */
      doubleClickOnRow(index, dataItem) {
        (true && !(Ember.typeOf(index) === 'number') && Ember.assert('row index should be numeric', Ember.typeOf(index) === 'number'));

        let action = Ember.get(this, 'rowDoubleClickAction');
        let actionIsFunction = typeof action === 'function';
        if (actionIsFunction) {
          action(index, dataItem);
        }
      },

      /**
       * Handler for row-hover
       *
       * May trigger sending {{#crossLink 'Components.ModelsTable/rowHoverAction:property'}}rowHoverAction{{/crossLink}}
       *
       * @param {number} index
       * @param {object} dataItem
       * @returns {undefined}
       * @method actions.hoverOnRow
       */
      hoverOnRow(index, dataItem) {
        (true && !(Ember.typeOf(index) === 'number') && Ember.assert('row index should be numeric', Ember.typeOf(index) === 'number'));

        let action = Ember.get(this, 'rowHoverAction');
        let actionIsFunction = typeof action === 'function';
        if (actionIsFunction) {
          action(index, dataItem);
        }
      },

      /**
       * Handler for row-hover
       *
       * May trigger sending {{#crossLink 'Components.ModelsTable/rowHoverAction:property'}}rowOutAction{{/crossLink}}
       *
       * @param {number} index
       * @param {object} dataItem
       * @returns {undefined}
       * @method actions.outRow
       */
      outRow(index, dataItem) {
        (true && !(Ember.typeOf(index) === 'number') && Ember.assert('row index should be numeric', Ember.typeOf(index) === 'number'));

        let action = Ember.get(this, 'rowOutAction');
        let actionIsFunction = typeof action === 'function';
        if (actionIsFunction) {
          action(index, dataItem);
        }
      },

      /**
       * Clear all column filters and global filter
       *
       * May trigger sending {{#crossLink 'Components.ModelsTable/displayDataChangedAction:property'}}displayDataChangedAction{{/crossLink}}
       *
       * @returns {undefined}
       * @method actions.clearFilters
       */
      clearFilters() {
        this._clearFilters();
      },

      /**
       * Select/deselect all rows
       *
       * May trigger sending {{#crossLink 'Components.ModelsTable/displayDataChangedAction:property'}}displayDataChangedAction{{/crossLink}}
       *
       * @method actions.toggleAllSelection
       * @returns {undefined}
       */
      toggleAllSelection() {
        let selectedItems = Ember.get(this, 'selectedItems');
        let data = Ember.get(this, 'data');
        const allSelectedBefore = Ember.get(selectedItems, 'length') === Ember.get(data, 'length');
        Ember.get(this, 'selectedItems').clear();
        if (!allSelectedBefore) {
          Ember.get(this, 'selectedItems').pushObjects(data);
        }
        this.userInteractionObserver();
      },

      /**
       * Expand or collapse all rows in the rows group
       *
       * **IMPORTANT** `multipleExpand` should be set to `true` otherwise this action won't do anything
       *
       * @method actions.toggleGroupedRowsExpands
       * @param {*} groupedValue
       * @returns {undefined}
       */
      toggleGroupedRowsExpands(groupedValue) {
        if (!Ember.get(this, 'multipleExpand')) {
          return;
        }
        let expandedItems = Ember.get(this, 'expandedItems');
        const currentGroupingPropertyName = Ember.get(this, 'currentGroupingPropertyName');
        const groupedItems = Ember.get(this, 'groupedArrangedContent').filterBy(currentGroupingPropertyName, groupedValue);
        const notExpandedGroupItems = groupedItems.filter(record => expandedItems.indexOf(record) === -1);
        if (Ember.get(notExpandedGroupItems, 'length')) {
          const toPush = notExpandedGroupItems.filter(record => expandedItems.indexOf(record) === -1);
          Ember.get(this, 'expandedItems').pushObjects(toPush);
        } else {
          groupedItems.forEach(record => expandedItems.removeObject(record));
        }
        this.userInteractionObserver();
      },

      /**
       * Select/deselect rows from the rows group
       *
       * **IMPORTANT** `multipleSelect` should be set to `true` otherwise this action won't do anything
       *
       * May trigger sending {{#crossLink 'Components.ModelsTable/displayDataChangedAction:property'}}displayDataChangedAction{{/crossLink}}
       *
       * @method actions.toggleGroupedRowsSelection
       * @param {*} groupedValue
       * @returns {undefined}
       */
      toggleGroupedRowsSelection(groupedValue) {
        if (!Ember.get(this, 'multipleSelect')) {
          return;
        }
        let selectedItems = Ember.get(this, 'selectedItems');
        const currentGroupingPropertyName = Ember.get(this, 'currentGroupingPropertyName');
        const groupedItems = Ember.get(this, 'groupedArrangedContent').filterBy(currentGroupingPropertyName, groupedValue);
        const notSelectedGroupItems = groupedItems.filter(record => selectedItems.indexOf(record) === -1);
        if (Ember.get(notSelectedGroupItems, 'length')) {
          const toPush = notSelectedGroupItems.filter(record => selectedItems.indexOf(record) === -1);
          Ember.get(this, 'selectedItems').pushObjects(toPush);
        } else {
          groupedItems.forEach(record => selectedItems.removeObject(record));
        }
        this.userInteractionObserver();
      },

      /**
       * Collapse or expand rows group
       *
       * @method actions.toggleGroupedRows
       * @param {*} groupedValue
       * @returns {undefined}
       */
      toggleGroupedRows(groupedValue) {
        let collapsedGroupValues = Ember.get(this, 'collapsedGroupValues');
        if (collapsedGroupValues.includes(groupedValue)) {
          collapsedGroupValues.removeObject(groupedValue);
        } else {
          Ember.get(this, 'collapsedGroupValues').pushObject(groupedValue);
        }
      }
    }

  });
});