// план зала по рядам общая вместительность 300 мест
// планов может быть и больше... и разные...
var cinemaHall1 = {
    row: [10, 15, 20, 25, 25, 25]
  },
  cinemaHallMap = '',
  cinemaHallCurrentRow = 1;

var orders = {
      date:     [],
      session:  [],
      rows:     [],
      seat:     []
};

$.each(cinemaHall1.row, function(row, numberOfSeats) {
  cinemaHallRow = '';
  for (i = 1; i <= numberOfSeats; i++) {
    // собираем ряды
    cinemaHallRow += '<div class="seat" data-row="' + cinemaHallCurrentRow + '" data-seat="' + i + '">&nbsp;</div>';
  }
  //собираем зал с проходами между рядами
  cinemaHallMap += cinemaHallRow + '<div class="passageBetween">&nbsp;</div>';
  cinemaHallCurrentRow = cinemaHallCurrentRow + 1;
});

//заполняем в html зал номер 1
$('.zal1').html(cinemaHallMap);
// тут по клику определяем что место выкуплено
$('.seat').on('click', function(e) {
  // если первый раз кликнули билет выкупили, 
  // если повторно значит вернули билет
  $(e.currentTarget).toggleClass('bay');
  //показываем сколько билетов выкуплено
  showBaySeat();
});



function showBaySeat() {
  result = '';
  //ищем все места купленные и показываем список выкупленных мест
  $.each($('.seat.bay'), function(key, item) {
    result += '<div class="ticket" data-crow="' + $(item).data().row  + '" data-cseat="' + $(item).data().seat + '" >Ряд: ' +  $(item).data().row + ' Место:' + $(item).data().seat + '</div>';
  });

  $('.result').html(result);
}

$('#sbmt').on('click', function(e) {
 
  var j = 0;

  if (!localStorage['count']){ var j = 0;  }
  else { j = localStorage['count']; }
 
  if (localStorage['ords']){
    orders = JSON.parse(localStorage.getItem('ords'));
  }

  $.each( $('.ticket'), function(key, ord) {
    orders.rows[j] = $(ord).data().crow;
    orders.seat[j] = $(ord).data().cseat;
    console.log( orders.rows[j]  );
    console.log( orders.seat[j] );
    j = j+1;
  });
  var ordsObj = JSON.stringify(orders);
  localStorage.setItem('ords', ordsObj);
  localStorage.setItem('count', j); 
});