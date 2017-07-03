(function() {

  $('#loginForm').submit((event) => {
    event.preventDefault();

    const name = $('#name').val().trim();
    const password = $('#password').val();

    if (!name) {
      console.log('Name cannot be blank');
    }

    if (!password) {
      console.log('Password cannot be blank');
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ name, password }),
      dataType: 'json',
      type: 'POST',
      url: '/session'
    };

    $.ajax(options)
      .done(() => {
        window.location.href = '/';
      })
      .fail(($xhr) => {
        console.log($xhr.responseText);
      });
  });
})();
