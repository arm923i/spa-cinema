var cinemaHall1 = {
    row: [10, 15, 20, 25, 25, 25]
  },
  cinemaHallMap = '',
  cinemaHallCurrentRow = 1;

if (localStorage['ords']){ orders = JSON.parse(localStorage.getItem('ords')); }
else {  
  var orders = {
          date:     [],
          session:  [],
          rows:     [],
          seat:     []
        };
}

$.each(cinemaHall1.row, function(row, numberOfSeats) {
  cinemaHallRow = '';
   cinemaHallRow += '<span class="rw">' + cinemaHallCurrentRow + '</span>';
  for (i = 1; i <= numberOfSeats; i++) {
    cinemaHallRow += '<div class="seat" data-row="' + cinemaHallCurrentRow + '" data-seat="' + i + '">' + i + '</div>';
  }
  cinemaHallMap += cinemaHallRow + '<div class="passageBetween">&nbsp;</div>';
  cinemaHallCurrentRow = cinemaHallCurrentRow + 1;
  
});

$('.zal1').html(cinemaHallMap);
getOrders();

$('.seat').on('click', function(e) {
  if ( $(e.currentTarget).hasClass("orded") ) {
    alert('place is taken');
  }else {
    $(e.currentTarget).toggleClass('bay');
    showBaySeat();
  }
});

$('#sbmt').on('click', function(e) {
  $.each( $('.ticket'), function(key, ord) {
    orders.rows[orders.rows.length] = $(ord).data().crow;
    orders.seat[orders.seat.length] = $(ord).data().cseat;
    console.log('+');
  });
  var ordsObj = JSON.stringify(orders);
  localStorage.setItem('ords', ordsObj);
  getOrders();
  $('.result').html('');
  alert('successfully reserved');
});

function showBaySeat() {
  result = '';
  $.each($('.seat.bay'), function(key, item) {
    result += '<div class="ticket" data-crow="' + $(item).data().row  + '" data-cseat="' + $(item).data().seat + '" >Ряд: ' +  $(item).data().row + ' Место:' + $(item).data().seat + '</div>';
  });
  $('.result').html(result);
}

function getOrders() {
  
  $.each( $('.seat'), function(sts, orded) {
      var ci = $(orded).data().row;
      var cj = $(orded).data().seat;
      for (i = 0; i < orders.rows.length; i++) {
        if((ci == orders.rows[i]) && (cj == orders.seat[i]))
          $(orded).addClass('orded');
          if ( $(orded).hasClass("bay") ) $(orded).removeClass("bay");
      }
  });

}