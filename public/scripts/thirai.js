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
        
        var index = $(this).index();
        console.log(index);
        
        $(this).parent().find('.tab-item').removeClass('active');
          var $tabPanel = $(this).parent().parent().find('.tabs-panel');
          var hiddenTabIndex = parseInt(index - 1);

          $(this).addClass('active');
          $($tabPanel).removeClass('tabs-panel-selected');
          $($tabPanel[hiddenTabIndex]).hide();
          $($tabPanel[index]).addClass('tabs-panel-selected').show();
      });
    }
  };
}(jQuery));

if ($('#movie-card').length) {
  $(thirai.loadCategoryContent.init());
} 
