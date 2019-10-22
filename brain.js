$(function(){
  var users = new OO.ui.FieldLayout(
    new OO.ui.TagMultiselectWidget( {
      placeholder: 'Add users or IP addresses',
      allowArbitrary: true,
      selected: [ 'Apples', 'Oranges', 'Grapes' ]
    } ), {
      align: 'top',
      label: 'Usernames or IP addresses',
      help: 'Enter users that you want to investigate, alternatively enter an IP address or range to see all users using those addresses.'
    }
  );

  var includeIPs = new OO.ui.FieldLayout(
    new OO.ui.CheckboxInputWidget(),
    {
      align: 'inline',
      label: 'Include all users who are using the above IPs',
      help: 'What does this setting do??'
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


  $('#form').append(
    users.$element,
    includeIPs.$element,
    reason.$element,
    '<br>',
    submit.$element
  );
});

$(function () {
  if ( $('#filter').length < 1 ) return false;

  var filter = new OO.ui.MenuTagMultiselectWidget( {
    inputPosition: 'outline',
    allowArbitrary: false,
    options: [
      {
        data: '',
        label: 'BROWSERS'
      },
      {
        data: 'asd',
        label: 'Firefox'
      },
      {
        data: 'jkl',
        label: 'Chrome'
      },
      {
        data: '',
        label: 'OS'
      },
      {
        data: 'win',
        label: 'Windows'
      },
      {
        data: 'andr',
        label: 'Android'
      }
    ]
  } )

  var daterange = new OO.ui.DropdownInputWidget( {
	options: [
		{
			data: 'a',
			label: '90 days'
		},
		{
			data: 'b',
			label: '30 days'
		},
		{
			data: 'c',
			label: '7 days'
		}
	],
	value: 'a'
} )

  $('#filter').append( filter.$element, '<br><br>',daterange.$element);
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
