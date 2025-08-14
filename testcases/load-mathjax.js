window.MathJax = {
  tex: {
    inlineMath: {'[+]': [['$', '$']]},
    packages: {
             '[+]': ['arabic-extension']
    }
  },
  svg: {
    fontCache: 'global'
  },
   loader: {
                load: ['[custom]/arabic.js', 'input/tex', 'output/chtml'],
                paths: {
                    custom: '../dist'
                }
   }
};

(function () {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@4/tex-svg.js';
  script.defer = true;
  document.head.appendChild(script);
})();