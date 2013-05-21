Package.describe({
  summary: 'Meteorite package for nvd3 charts, based on D3 library.'
});

Package.on_use(function (api) {
  api.add_files([
    'd3.v2.js',
    'd3.v3.js',
    'nv.d3.css',
    'nv.d3.js'
  ], 'client'
  );
});