import { reactive } from "vue";

export default {
  install: (app, options) => {
    var debug = {
      enable: false,
      log: function() {},
      error: function() {},
      warn: function() {},
      info: function() {},

    }
    debug._log = window.console.log.bind(window.console);
    debug._error = window.console.error.bind(window.console);
    debug._info = window.console.info.bind(window.console);
    debug._warn = window.console.warn.bind(window.console);

    if (options === true) {
      debug.enable = true;
      debug.log = debug._log
      debug.error = debug._error
      debug.info = debug._info
      debug.warn = debug._warn      
    }

    app._DebugState = false;
    app.config.globalProperties["$debug"] = reactive(debug);
    app.mixin({
      created: function beforeCreate() {
        if (!app._DebugState) {
          app._DebugState = true;
          app.$debug = this.$debug;
          this.$watch("$debug.enable", function(newValue) {
            if (newValue == true) {
              app.$debug.log = app.$debug._log
              app.$debug.error = app.$debug._error
              app.$debug.info = app.$debug._info
              app.$debug.warn = app.$debug._warn
              return
            }
            app.$debug.log = function() {};
            app.$debug.error = function() {};
            app.$debug.info = function() {};
            app.$debug.warn = function() {};
          });
        }
      },
    });
  },
};