var thirai = thirai || {};

(function ($) {
  'use strict';

  thirai.loadCategoryContent = {
    jsonUrl: 'stubs/movie-details.json',
    rawTemplate: $('#article-card-item-template').html(),
    $placeHolder: $('#movie-card'),

    init: function () {
      this.setupTemplates();
    },

    setupTemplates: function () {
      var me = this,
          template = Handlebars.compile(me.rawTemplate);

      $.get(this.jsonUrl, function(data) {
        $.each(data, function(index, element) {
          var html = template(element);
          me.$placeHolder.append(html);
          console.log(element);
          me.bindUIEvents();
        });
      });
    },
    
    bindUIEvents: function () {
      $('.movie-card').on('click', function() {
        $(this).toggleClass('flipped');
      });
      
      $('.tab-item').on('click', function(e) {
        e.stopPropagation();
        
        $('.tab-item').removeClass('active');
        $(this).addClass('active');
      });
      
      $(function(){
        $('#featured').tabs({updateHash: true});
      });
    }
  };
}(jQuery));

if ($('#movie-card').length) {
  $(thirai.loadCategoryContent.init());
}
