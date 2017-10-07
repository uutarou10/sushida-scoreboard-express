$.when($.ready).then(function () {
  // 読み込み時にスコアデータを描画
  refreshScoreTable()

  $('#add-button').click(function () {
    $('#modal').modal('show')
  })

  $('#save-button').click(function () {
    saveScore($('#name').val(), parseInt($('#score').val()))
    refreshScoreTable()
  })

})

function refreshScoreTable() {
  var tableBody = $('#table-body')
  tableBody.empty()
  $.getJSON('/api/score', function (data) {
    data.forEach(function (row, index) {
      var tableRow = $('<tr>')
      tableRow.append($('<td>').text(index + 1))
      tableRow.append($('<td>').text(row.name))
      tableRow.append($('<td>').text(row.score))
      tableBody.append(tableRow)
    })
  })
}

function saveScore(name, score) {
  // $.post('/api/score', {name: name, score: score}, success, 'json')
  $.ajax(
    {
      type: 'post',
      url: '/api/score',
      data: JSON.stringify({name: name, score: score}),
      contentType: 'application/JSON',
      dataType: 'JSON',
      scriptCharset: 'utf-8',
      success: function (data) {
        console.log('success')
      },
      error: function (data) {
        console.error('error')
      }
    }
  )
}
