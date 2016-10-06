$(function () {
  //ask the server for songs, then draw them
  getSongs();

  //listen for submit events and send new songs to the server
  $('form').on('submit', function (event) {
    event.preventDefault();
    //serialize will give you raw string, serializeArray puts it in an array
    var formData = $(this).serialize();

    $.ajax({
      type: 'POST',
      url: '/songs',
      data: formData,
      success: getSongs
    });
    $(this).find('input[type=text]').val('');
  });
});//end of document ready function

function getSongs() {
  $.ajax({
    type: 'GET',
    url: '/songs',
    success: function (songs) {
      $('#songs').empty();
      songs.forEach(function (song) {
        var $li = $('<li></li>');
        $li.append('<p>' + song.name + '</p>');
        $li.append('<p>By: ' + song.artist + '</p>');
        $li.append('<p>Date: ' + song.date + '</p>');
        $('#songs').append($li);
      });
    },
  });
}
