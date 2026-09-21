(function(root,factory){
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ArcIcons=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  var paths={
    dashboard:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-6h5v6"/>',
    students:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    forecast:'<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/><path d="m4 8 6-4 6 6 5-5"/>',
    attendance:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><path d="m8 15 2 2 5-5"/>',
    projects:'<path d="m14.7 6.3 3-3a2.1 2.1 0 0 1 3 3l-3 3"/><path d="m13 8 3 3L7 20H4v-3z"/><path d="m6 14 4 4"/>',
    openshop:'<path d="M12 22c4 0 7-3 7-7 0-3-1.5-5.5-4.5-8.5.2 2-1 3.5-2 4.5.2-4-2-7-5-9 .3 3-2.5 5.5-2.5 9.5C5 17.3 8 22 12 22Z"/>',
    lessonbank:'<path d="M3 5.5A3.5 3.5 0 0 1 6.5 2H11v18H6.5A3.5 3.5 0 0 0 3 23Z"/><path d="M21 5.5A3.5 3.5 0 0 0 17.5 2H13v18h4.5A3.5 3.5 0 0 1 21 23Z"/>',
    projectbank:'<path d="M3 7.5 12 3l9 4.5-9 4.5Z"/><path d="M3 7.5V17l9 4.5 9-4.5V7.5M12 12v9.5"/>',
    standards:'<path d="M6 2h9l4 4v16H6Z"/><path d="M14 2v5h5M9 12h6M9 16h6"/><path d="m9 8 1 1 2-2"/>',
    inventory:'<path d="M4 19h16M5 15h14M6 11h12M7 7h10"/><path d="M8 4h8v3H8Z"/>',
    booths:'<path d="M4 21V7h16v14M2 21h20M7 7V3h10v4"/><path d="M8 12h8v5H8Z"/>',
    notifications:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    help:'<circle cx="12" cy="12" r="10"/><path d="M9.5 9a2.7 2.7 0 1 1 4.2 2.2c-1 .7-1.7 1.2-1.7 2.8M12 18h.01"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
    add:'<path d="M12 5v14M5 12h14"/>',
    focus:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2V0M22 12h2M12 22v2M2 12H0"/>'
  };
  function svg(name,className){
    var body=paths[name]||paths.help;
    return '<svg class="'+(className||'arc-icon')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">'+body+'</svg>';
  }
  return {svg:svg,names:function(){return Object.keys(paths);}};
});
