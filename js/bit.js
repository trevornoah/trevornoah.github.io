$(function () {
  $.getScript("http://widget.bandsintown.com/javascripts/bit_widget.js", function(data, textStatus, jqxhr) {
    console.log("Tour dates loaded.");
    //updateBitTicketLinks();
  });
});

function updateBitTicketLinks() {
  setTimeout(function () {
    $.ajax({
        url: "http://www.trevornoah.com/shows.json",
        dataType: "json",
        context: this,
        success: function(showData) {
            $('a.bit-buy-tix').each(function () {
                var text = $(this).text();
                if (text == 'Sold Out') {
                    $(this).addClass('soldout');
                }
            });
            $('a.bit-buy-tix').on('click', function (e) {
                //console.log("real URL: " + showData[$(e.currentTarget).parent().parent().attr('data-bit-event-id')]);
                if (showData[$(e.currentTarget).parent().parent().attr('data-bit-event-id')] != null) {
                    window.open(showData[$(e.currentTarget).parent().parent().attr('data-bit-event-id')]);
                    return false;
                }
            });
        },
        error: function(err) {
            $.error("Error: " + err);
        }
    });
  }, 5000);
}
