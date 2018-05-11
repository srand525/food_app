define('ember-models-table/components/models-table-server-paginated', ['exports', 'ember-models-table/components/models-table', 'ember-models-table/templates/components/models-table'], function (exports, _modelsTable, _modelsTable2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const { extend } = Ember.$;

  /**
   * Table-component with pagination, sorting and filtering.
   *
   * It should be used when pagination, filtering and sorting are done on the server-side. Otherwise [models-table](Components.ModelsTable.html) should be used.
   *
   * This component extends the base models-table component. For the end user, it can be used (nearly) the same:
   *
   * ```hbs
   * {{models-table-server-paginated data=data columns=columns}}
   * ```
   *
   * Usage with block context:
   *
   * ```hbs
   * {{#models-table-server-paginated data=data columns=columns as |mt|}}
   *   {{mt.global-filter}}
   *   {{mt.columns-dropdown}}
   *   {{mt.table}}
   *   {{mt.footer}}
   * {{/models-table}}
   * ```
   *
   * ModelsTableServerPaginated yields references to the following contextual components:
   *
   * * [models-table/global-filter](Components.ModelsTableGlobalFilter.html) - global filter used for table data
   * * [models-table/columns-dropdown](Components.ModelsTableColumnsDropdown.html) - dropdown with list of options to toggle columns and column-sets visibility
   * * [models-table/table](Components.ModelsTableTable.html) - table with a data
   * * [models-table/footer](Components.ModelsTableFooter.html) - summary and pagination
   *
   * Check own docs for each component to get detailed info.
   *
   * ModelsTableServerPaginated has a lot of options you may configure, but there are two required properties called `data` and `columns`. First one contains data-query:
   *
   * ```js
   * model: function() {
   *  return this.store.query('my-model', {});
   * }
   * ```
   *
   * It will then take this query and extend it with pagination, sorting and filtering information. All other query parameters added in will remain untouched. Everything else works exactly the same - global filters, column filters etc. still use the same properties to control them. A few things to notice:
   *
   * - When using `filterWithSelect` for a column, you must use `predefinedFilterOptions`, because the automatic loading of possible filter values cannot work here.
   * - There is a new optional field `filteredBy` for columns, which works much like `sortedBy`: if set, this field will be used as query parameter, otherwise it will use the `propertyName`.
   * - Sorting will not use multipleColumnSorting, it will only sort by one column.
   * - If you set `sortedBy: false` on a column, sorting will be disabled for this column.
   *
   * There are a couple of things which can be configured to adapt to your API:
   *
   * ``` js
   * // The property on meta to load the pages count from.
   * metaPagesCountProperty: 'pagesCount',
   *
   * // The property on meta to load the total item count from.
   * metaItemsCountProperty: 'itemsCount',
   *
   * // The time to wait until new data is actually loaded.
   * // This can be tweaked to avoid making too many server requests.
   * debounceDataLoadTime: 500,
   *
   * // The query parameters to use for server side filtering / querying.
   * filterQueryParameters: {
   *   globalFilter: 'search',
   *   sort: 'sort',
   *   sortDirection: 'sortDirection',
   *   page: 'page',
   *   pageSize: 'pageSize'
   * },
   ```
   *
   * This default configuration would try to get the total page count from `model.get('meta.pagesCount')` and the total item count from `model.get('meta.itemsCount')`, and would then go on to build the following query:
   *
   * ``` js
   * columns: [
   *   {
   *     propertyName: 'name',
   *     filteredBy: 'model_name'
   *   }
   * ]
   *
   * // after searching globally for "searchtexthere"
   * // and in the name column for "filterforname",
   * // and going to page 2,
   * // the following query would be built:
   * ?page=2&pageSize=50&search=searchtexthere&sort=name&sortDirection=ASC&model_name=filterforname
   * ```
   *
   * @class ModelsTableServerPaginated
   * @namespace Components
   * @extends Components.ModelsTable
   */
  exports.default = _modelsTable.default.extend({

    layout: _modelsTable2.default,

    /**
     * True if data is currently being loaded from the server.
     * Can be used in the template to e.g. display a loading spinner.
     *
     * @type boolean
     * @property isLoading
     * @default false
     * @private
     */
    isLoading: false,

    /**
     * True if last data query promise has been rejected.
     * Can be used in the template to e.g. indicate stale data or to e.g. show error state.
     *
     * @type boolean
     * @property isError
     * @default false
     * @private
     */
    isError: false,

    /**
     * The property on meta to load the pages count from.
     *
     * @type string
     * @property metaPagesCountProperty
     * @default 'pagesCount'
     */
    metaPagesCountProperty: 'pagesCount',
    /**
     * The property on meta to load the total item count from.
     *
     * @type {string}
     * @property metaItemsCountProperty
     * @default 'itemsCount'
     */
    metaItemsCountProperty: 'itemsCount',

    /**
     * The time to wait until new data is actually loaded.
     * This can be tweaked to avoid making too many server requests.
     *
     * @type number
     * @property debounceDataLoadTime
     * @default 500
     */
    debounceDataLoadTime: 500,

    /**
     * The query parameters to use for server side filtering / querying.
     *
     * @type object
     * @property filterQueryParameters
     */
    filterQueryParameters: Ember.computed(function () {
      return {
        globalFilter: 'search',
        sort: 'sort',
        sortDirection: 'sortDirection',
        page: 'page',
        pageSize: 'pageSize'
      };
    }),

    /**
     * @property observedProperties
     * @type string[]
     * @private
     */
    observedProperties: Ember.computed(function () {
      return ['currentPageNumber', 'sortProperties.[]', 'pageSize', 'filterString', 'processedColumns.@each.filterString'];
    }),

    /**
     * This is set during didReceiveAttr and whenever the page/filters change.
     *
     * @override
     * @property filteredContent
     * @default []
     * @private
     * @type object[]
     */
    filteredContent: null,

    /**
     * For server side filtering, visibleContent is same as the filtered content
     *
     * @override
     * @property visibleContent
     * @private
     * @type object[]
     */
    visibleContent: Ember.computed.alias('arrangedContent'),

    /**
     * For server side filtering, arrangedContent is same as the filtered content
     *
     * @override
     * @property arrangedContent
     * @private
     * @type object[]
     */
    arrangedContent: Ember.computed.alias('filteredContent'),

    /**
     * Can't be used within `models-table-server-paginated`. Back-end determines how to filter data
     *
     * @override
     * @property filteringIgnoreCase
     */
    filteringIgnoreCase: Ember.computed({
      set() {
        (true && !(false) && Ember.assert('"filteringIgnoreCase" can\'t be used with "models-table-server-paginated"', false));
      },
      get() {
        return undefined;
      }
    }),

    /**
     * Can't be used within `models-table-server-paginated`. Back-end determines how to filter data
     *
     * @override
     * @property doFilteringByHiddenColumns
     */
    doFilteringByHiddenColumns: Ember.computed({
      set() {
        (true && !(false) && Ember.assert('"doFilteringByHiddenColumns" can\'t be used with "models-table-server-paginated"', false));
      },
      get() {
        return undefined;
      }
    }),

    /**
     * The total content length is get from the meta information.
     * Set metaItemsCountProperty to change from which meta property this is loaded.
     *
     * @override
     * @type number
     * @property arrangedContentLength
     * @private
     */
    arrangedContentLength: Ember.computed('filteredContent.meta', function () {
      let itemsCountProperty = Ember.get(this, 'metaItemsCountProperty');
      let meta = Ember.get(this, 'filteredContent.meta') || {};
      return Ember.get(meta, itemsCountProperty) || 0;
    }),

    /**
     * The pages count is get from the meta information.
     * Set metaPagesCountProperty to change from which meta property this is loaded.
     *
     * @type number
     * @property pagesCount
     * @override
     * @private
     */
    pagesCount: Ember.computed('filteredContent.meta', function () {
      let pagesCountProperty = Ember.get(this, 'metaPagesCountProperty');
      let meta = Ember.get(this, 'filteredContent.meta') || {};
      return Ember.get(meta, pagesCountProperty) || 1;
    }),

    /**
     * The index of the last item that is currently being shown.
     *
     * @type number
     * @property lastIndex
     * @override
     * @private
     */
    lastIndex: Ember.computed('pageSize', 'currentPageNumber', 'arrangedContentLength', function () {
      let pageMax = parseInt(Ember.get(this, 'pageSize'), 10) * Ember.get(this, 'currentPageNumber');
      let itemsCount = Ember.get(this, 'arrangedContentLength');
      return Math.min(pageMax, itemsCount);
    }),

    /**
     * This function actually loads the data from the server.
     * It takes the store, modelName and query from the passed in data-object and adds page, sorting & filtering to it.
     *
     * @returns {Promise}
     * @method _loadData
     * @private
     */
    _loadData: function () {
      let data = Ember.get(this, 'data');
      let currentPageNumber = Ember.get(this, 'currentPageNumber');
      let pageSize = Ember.get(this, 'pageSize');
      let columns = Ember.get(this, 'processedColumns');
      let sortProperties = Ember.get(this, 'sortProperties');
      let filterString = Ember.get(this, 'filterString');

      if (!Ember.get(data, 'query')) {
        (true && Ember.warn('You must use http://emberjs.com/api/data/classes/DS.Store.html#method_query for loading data'));

        return;
      }
      let query = extend({}, Ember.get(data, 'query'));
      let store = Ember.get(data, 'store');
      let modelName = Ember.get(data, 'type.modelName');

      // Add pagination information
      query[Ember.get(this, 'filterQueryParameters.page')] = currentPageNumber;
      query[Ember.get(this, 'filterQueryParameters.pageSize')] = pageSize;
      // Add sorting information
      let sort = sortProperties && Ember.get(sortProperties, 'length') ? sortProperties[0] : null;
      if (sort) {
        let [sortBy, sortDirection] = sort.split(':');
        query = this.sortingWrapper(query, sortBy, sortDirection.toUpperCase());
      } else {
        delete query[[Ember.get(this, 'filterQueryParameters.sort')]];
        delete query[[Ember.get(this, 'filterQueryParameters.sortDirection')]];
      }

      // Add global filter
      let globalFilter = Ember.get(this, 'filterQueryParameters.globalFilter');
      if (filterString) {
        query[globalFilter] = filterString;
      } else {
        delete query[globalFilter];
      }

      // Add per-column filter
      if (Ember.get(this, 'useFilteringByColumns')) {
        columns.forEach(column => {
          let filter = Ember.get(column, 'filterString');
          let filterTitle = this.getCustomFilterTitle(column);
          this._setQueryFilter(query, column, filterTitle, filter);
        });
      }

      Ember.setProperties(this, { isLoading: true, isError: false });
      return this.doQuery(store, modelName, query).then(() => Ember.setProperties(this, { isLoading: false, isError: false })).catch(() => Ember.setProperties(this, { isLoading: false, isError: true }));
    },

    /**
     * Do query-request to load new data
     *
     * You may override this method to add some extra behavior or even additional requests
     *
     * @method doQuery
     * @param {object} store
     * @param {string} modelName
     * @param {object} query
     * @returns {Promise}
     */
    doQuery(store, modelName, query) {
      return store.query(modelName, query).then(newData => Ember.set(this, 'filteredContent', newData));
    },

    /**
     * Actually set the filter on a query.
     * This can be overwritten for special case handling.
     * Note that this will mutate the given query object!
     *
     * @param {object} query the query to mutate
     * @param {object} column the column that is filtering
     * @param {string} filterTitle the query param name for filtering
     * @param {mixed} filter the actual filter value
     * @returns {undefined}
     * @method _setQueryFilter
     * @private
     */
    _setQueryFilter(query, column, filterTitle, filter) {
      if (!Ember.isBlank(filter)) {
        query[filterTitle] = filter;
      } else {
        delete query[filterTitle];
      }
    },

    /**
     * Wrapper for sorting query
     *
     * @param {object} query parameters
     * @param {string} sortBy
     * @param {string} sortDirection
     * @returns {object} query parameters
     * @method sortingWrapper
     */
    sortingWrapper(query, sortBy, sortDirection) {
      query[Ember.get(this, 'filterQueryParameters.sort')] = sortBy;
      query[Ember.get(this, 'filterQueryParameters.sortDirection')] = sortDirection;

      return query;
    },

    /**
     * Customize filter title
     *
     * @method getCustomFilterTitle
     * @param {object} column
     * @returns {string} title
     */
    getCustomFilterTitle(column) {
      return Ember.get(column, 'filteredBy') || Ember.get(column, 'propertyName');
    },

    actions: {

      /**
       * @override
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
        if (Ember.isNone(sortedBy)) {
          return;
        }
        let currentSorting = Ember.get(column, 'sorting');
        let newSorting = sortMap[currentSorting.toLowerCase()];
        let sortingArgs = [column, sortedBy, newSorting];
        this._singleColumnSorting(...sortingArgs);
        this.userInteractionObserver();
      }

    },

    didReceiveAttrs() {
      Ember.set(this, 'filteredContent', Ember.get(this, 'data'));
    },

    _addPropertyObserver() {
      Ember.run.debounce(this, this._loadData, Ember.get(this, 'debounceDataLoadTime'));
    },

    willInsertElement() {
      this._super(...arguments);
      let observedProperties = Ember.get(this, 'observedProperties');
      observedProperties.forEach(propertyName => this.addObserver(propertyName, this._addPropertyObserver));
    },

    willDestroyElement() {
      this._super(...arguments);
      let observedProperties = Ember.get(this, 'observedProperties');
      observedProperties.forEach(propertyName => this.removeObserver(propertyName));
    }
  });
});