$(function(){
  var users = new OO.ui.FieldLayout(
    new OO.ui.TagMultiselectWidget( {
      placeholder: 'Add users',
      allowArbitrary: true,
      selected: [ 'Apples', 'Oranges', 'Grapes' ]
    } ), {
      align: 'top',
      label: 'Users',
      help: 'Enter users that you want to investigate'
    }
  );

  var reason = new OO.ui.FieldLayout(
    new OO.ui.TextInputWidget({
      value: 'Testing the tool'
    }),
    {
      align: 'top',
      label: 'Reason'
    }
  );

  var submit = new OO.ui.ButtonWidget( {
    label: 'Submit',
    flags: [
      'primary',
      'progressive'
    ]
  } );


  $('#form').append(users.$element, reason.$element, '<br>',submit.$element);
});


$(function() {

  function rowHasUser($cell) {
    return ($cell.siblings('.user').length === 1) ? true : false;
  }

  function findUserCell($cell) {
    return $cell.parent().prevAll('tr:has(td.user)').first().find('.user');
  }


  $('.check td').on('mouseover', function () {
    var className = $(this).attr('data-data');
    var $cells = $('[data-data="' + className + '"]' );

    $cells.addClass('highlight');
    $cells.parent('tr').addClass('highlight');

    $cells.each(function () {
      var $cell = $(this);
      if ( !rowHasUser($cell) ) {
        var $userCell = findUserCell($cell);
        $userCell.addClass('highlight-user');
      }
    })
    //if ( !rowHasUser() ) {}
    //$cells.closest('.user').addClass('highlight')
    //$cells.parent('tr:not(tr:has(td.user))').prev('tr:has(td.user)').find('.user').addClass('highlight-user');
  })

  $('.check td').on('mouseout', function () {
    var className = $(this).attr('data-data');
    var $cells = $('[data-data="' + className + '"]' );

    $cells.removeClass('highlight');
    $cells.parent('tr').removeClass('highlight');
    $('td.user').removeClass('highlight-user');
  })
});
