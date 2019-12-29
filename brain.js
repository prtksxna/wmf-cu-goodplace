$(function(){

  var ips = new OO.ui.FieldLayout(
    new OO.ui.TextInputWidget({
      placeholder: 'IP address or range'
    }), {
      align: 'top',
      label: 'IP address'
    }
  )

  var users = new OO.ui.FieldLayout(
    new OO.ui.TagMultiselectWidget( {
      placeholder: 'JohnSmith or 1.1.1.42',
      allowArbitrary: true,
      selected: [ 'Apples', 'Oranges', 'Grapes' ]
    } ), {
      align: 'top',
      label: 'Usernames, IP addresses or  IP ranges',
    }
  );

  var includeIPs = new OO.ui.FieldLayout(
    new OO.ui.CheckboxInputWidget(),
    {
      align: 'inline',
      label: 'Include all users who are using the same IPs as the selected users',
      help: 'This option will bring up all user accounts that have edited or committed any actions from the same IP addresses as the given users.',
      helpInline: true
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

  $('#ip-form').append(
    ips.$element,
    '<br>',    '<br>',
    reason.$element.clone(),
    '<br>',
    submit.$element.clone()
  ).hide();

  $('#look-user').click(function () {
    $('#form').show();
    $('#ip-form').hide();
    $('#look-user').addClass('active');
    $('#look-ip').removeClass('active');
  });

  $('#look-ip').click(function () {
    $('#form').hide();
    $('#ip-form').show();
    $('#look-user').removeClass('active');
    $('#look-ip').addClass('active');
  });

console.log();
  if ( $('#thestuff').length < 1 ) return false;
  $('#thestuff').hide();
  $('.loading-animation').hide();
  submit.$element.click(function () {
    $('.loading-animation').show();
    window.setTimeout(function () {
      $('.loading-animation').hide();
      $('#form').hide();
      $('#thestuff').show();
    }, 2000);
  })
});

$(function () {
  if ( $('#timefilters').length < 1 ) return false;

  // Filter toggle
  $('#filter-toggle').click(function () {
    $('#timefilters-container').slideToggle();

    var $img = $(this).find('img');
    if ($img.attr('src') === 'res/themes/wikimediaui/images/indicators/up.svg' ) {
      $img.attr('src', 'res/themes/wikimediaui/images/indicators/down.svg');
    } else {
      $img.attr('src', 'res/themes/wikimediaui/images/indicators/up.svg');
    }
  });
  $('#timefilters-container').hide();

// Filter form
  var users = new OO.ui.FieldLayout(
    new OO.ui.TagMultiselectWidget( {
      placeholder: 'Usernames',
      allowArbitrary: true,
      selected: [ ]
    } ), {
      align: 'top',
      label: 'Hide the following users'
    }
  );

  var pages = new OO.ui.FieldLayout(
    new OO.ui.TagMultiselectWidget( {
      allowArbitrary: true,
      selected: [],
      placeholder: 'Page name'
    } ), {
      align: 'top',
      label: 'Hide the following pages',
    }
  );

  var activity = new OO.ui.FieldLayout(
    new OO.ui.DropdownInputWidget( {
      options: [
        {
          data: 'a',
          label: 'All'
        },
        {
          data: 'b',
          label: 'Edits'
        },
        {
          data: 'c',
          label: 'Blocks'
        }
      ],
      value: 'b'
    } ),
    {
      align: 'top',
      label: 'Type of activity'
    }
  );

  var fromDate = new OO.ui.FieldLayout(
    new OO.ui.TextInputWidget({icon:'calendar'}),
    {
      align: 'top',
      label: 'From date'
    }
  );

  var toDate = new OO.ui.FieldLayout(
    new OO.ui.TextInputWidget({icon:'calendar'}),
    {
      align: 'top',
      label: 'To date'
    }
  );

  var ua = new OO.ui.FieldLayout(
    new OO.ui.MenuTagMultiselectWidget( {
	     allowArbitrary: false,
	     allowDisplayInvalidTags: true,
	     options: [
         {
           data: 'o',
           label: 'Opera'
         },
         {
           data: 'c',
           label: 'Chrome'
         },
         {
           data: 'ff',
           label: 'Firefox'
         }
       ]
    } ),
    {
     align: 'top',
     label: 'Hide the following browsers'
    }
  );

  $('#timefilters-container').append(
    users.$element,
    pages.$element,
    //fromDate.$element,
    //toDate.$element,
    ua.$element,
    activity.$element
  )

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

$(function () {
  if ( $('#timeline-list').length < 1 ) return false;

  var users = ['Apples', 'Oranges', 'Grapes'];
  var pages = ['Mikhail Bakunin', 'Emma Goldman', 'Noam Chomsky']
  var ips = [
    '1.1.1.1',
    '1.5.3.4',
    '1.1.1.2',
    '1.6.3.4'
  ]
  var uas = [
    'Chrome 65 on Windows 10',
    'HTC Browser on Android 6.0',
    'Firefox 44 on Windows 10',
    'Safari 8.5 on iOS 13'
  ]
  var reason = [
    'Fixing typo',
    'Moving things around',
    '',
    'Reverting possible vandalism',
    ''
  ]

  var pickRandom = function (array) {
    var n = Math.floor( Math.random() * (array.length) );
    return array[n];
  }

  var pickBytes = function () {
    var isPositive = (Math.random() > 0.5) ? true : false;
    var bytes = Math.floor(Math.random() * 1024);
    if (isPositive) {
      return bytes;
    } else {
      return bytes * -1;
    }
  }

  var d = new Date();
  d.setSeconds(d.getSeconds() - 10000);

  for (var i = 0; i < 100; i++) {
    var b = pickBytes();
    var bytesClass = (b > 0) ? 'green' : 'red';
    var u = pickRandom(users);
    var ip = pickRandom(ips);
    var ua = pickRandom(uas)
    var p = pickRandom(pages);
    var t = d.toLocaleTimeString();
    var r = pickRandom(reason);
    d.setSeconds(d.getSeconds() - (Math.random() * 10000));

    var html = '<li>' +
      '(' +
      '<a href="#">diff</a> | <a href="#">hist</a>' +
      ') . . ' +
      '<a href="#" class="hoo" data-data="'+p+'">' + p + '</a>; ' + t + ' . . ' +
      '<span class="'+bytesClass+'">(' + b + ')</span> . . ' +
      '<a href="#" class="hoo" data-data="'+u+'">' + u + '</a> (<a href="#">talk</a> | <a href="#">contribs</a>)' +
      ' . . ' +
      '<a href="#" class="hoo" data-data="'+ip+'">' + ip + '</a>' +
      ' . . ' +
      '<span class="gray hoo" data-data="'+ua+'">(' + ua + ')</span>' +
      ' . . ' +
      '(' + r + ')' +
    '</li>'

    $('#timeline-list').append(html)
  }


  $('#timeline-list .hoo').on('mouseover',function () {
    var className = $(this).attr('data-data');
    var $pills = $('[data-data="' + className + '"]' );

    $pills.addClass('highlight');
    $pills.parent('li').addClass('highlight');
  });

  $('#timeline-list .hoo').on('mouseout',function () {
    var className = $(this).attr('data-data');
    var $pills = $('[data-data="' + className + '"]' );

    $pills.removeClass('highlight');
    $pills.parent('li').removeClass('highlight');
  });

});

$(function(){
  $('.filter').on('mouseover', function () {
    window.setTimeout(function () {
      $('.highlight').addClass('nearfilter');
    },1);
  });

  $('.filter').on('mouseout', function () {
    window.setTimeout(function () {
      $('.nearfilter').removeClass('nearfilter');
    },1);
  });

  $('.pin').on('click', function () {
    $(this).toggleClass('activepin');

    if ( $(this).hasClass('activepin') ) {
      $(this).css("background-color", '#36c');
      $(this).find('img').attr('src', 'res/themes/wikimediaui/images/icons/pushPin-white.svg')
    } else {
      $(this).css("background-color", '#fff');
      $(this).find('img').attr('src', 'res/themes/wikimediaui/images/icons/pushPin-progressive.svg')
    }
  });
})
