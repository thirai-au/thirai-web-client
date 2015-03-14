var thirai = thirai || {};

(function ($) {
  'use strict';

  thirai.loadCategoryContent = {
    // jsonUrl: 'stubs/movies-details.json',
    jsonUrl: 'http://localhost:4567/movies/VIC',
    rawTemplate1: $('#moviesListItemTemplate').html(),
    rawTemplate2: $('#movieDetailsListItemTemplate').html(),
    $placeHolder1: $('#moviesList'),
    $placeHolder2: $('#movie-details-list'),
    $backButton: $('#backButton'),

    init: function () {
      this.setupTemplates();
    },

    setupTemplates: function () {
      var me = this,
          template1 = Handlebars.compile(me.rawTemplate1),
          template2 = Handlebars.compile(me.rawTemplate2);

      $.get(this.jsonUrl, function(data) {

        var movies_details = JSON.parse(data);
        $.each(movies_details, function(index, element) {
          var html1 = template1(element);
          var html2 = template2(element);
          me.$placeHolder1.append(html1);
          me.$placeHolder2.append(html2);
        });
        
        me.$backButton.hide();
        me.bindMe();
        me.bindBackButton();
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

        $(this).parent().find('.tab-item').removeClass('active');
        var $tabPanel = $(this).parent().parent().find('.tabs-panel');
        var hiddenTabIndex = parseInt(index - 1);

        $(this).addClass('active');
        $($tabPanel).removeClass('tabs-panel-selected');
        $($tabPanel[hiddenTabIndex]).hide();
        $($tabPanel[index]).addClass('tabs-panel-selected').show();
      });
    },

    bindMe: function () {
      var me = this;

      $('.movie-detailz').hide();
      $('.details-list').removeClass('is-visible');
      $('.movie-list-item').on('click', function() {
      	var self = this;

        $('.details-list').addClass('is-visible animated bounceInRight').removeClass('bounceOutRight');
        $.each( $('.movie-detailz'), function() {
          console.log(self, this);
          if( $(self).data('id') == $(this).data('id') ) {
            $(this).show();
          }
        });
        me.$backButton.show().addClass('animated bounceIn').removeClass('bounceOut');
      });
    },
    
    bindBackButton: function () {
      this.$backButton.on('click', function(e) {
        e.preventDefault();

        $('.details-list').addClass('bounceOutRight').removeClass('bounceInRight');
        $('.movie-detailz').hide();
        $(this).addClass('animated bounceOut').removeClass('bounceIn');
      });
    }
  };
}(jQuery));

//if ($('#movie-card').length) {
$(thirai.loadCategoryContent.init());
//} 

