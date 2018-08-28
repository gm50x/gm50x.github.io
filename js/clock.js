/*
 * clock()
 * Função responsável por capturar os valores individuais de um Relógio
 * E atualizá-los na interface gráfica. Utiliza recursos de jQuery.
 */
function clock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  $('#hours').html(hours < 10 ? '0' + hours : hours);
  $('#minutes').html(minutes < 10 ? '0' + minutes : minutes);
  $('#seconds').html(seconds < 10 ? '0' + seconds : seconds);
  setTimeout(clock, 1000);
}
