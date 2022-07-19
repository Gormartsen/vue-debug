# vue-debug
Vue3 plugin to define global $debug with log,warn,error and info options


Usage:
```
import Debug from "@gormartsen/vue-debug";

var APP = createApp(App);
APP.use(Debug, true);
```

Where second argument is enable/disable debug print to console by default

TODO:
provide floating dynamic popup with errors or smth.
