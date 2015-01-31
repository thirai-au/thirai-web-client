var thirai = thirai || {};

(function ($) {
  'use strict';

  thirai.loadCategoryContent = {
    jsonUrl: 'stubs/movies-details.json',
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
        });
      });

      me.bindUIEvents();
    },
    
    bindUIEvents: function () {
      $(document).on('click', '.movie-card', function() {
        $(this).toggleClass('flipped');
      });
      
     $(document).on('click', '.tab-item', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        $(this).parent().find('.tab-item').removeClass('active');
          $(this).addClass('active');
      });
    }
  };
}(jQuery));

if ($('#movie-card').length) {
  $(thirai.loadCategoryContent.init());
} 
