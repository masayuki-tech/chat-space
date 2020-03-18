$(function(){
  // let addImage = "";
  function buildHTML(message) {
    let addImage = message.image ? `<img class="message__text__image" src="${message.image}">` : ""
    // if (message.image) {
    //   let addImage = `<img class="message__text__image" src="${message.image}">` 
    
      let html =
      `<div class="message" data-message-id=${message.id}
        <div class="user">
          <div class="user__name">
            ${message.user_name}
          </div>
          <div class="user__at">
            ${message.created_at}
          </div>
        </div>
        <div class="message__text">
          <p class="message__text__content">
          ${message.content}
          </p>
          ${addImage}
        </div>
      </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-contents__chatmessage-list').append(html);
      $('form')[0].reset();
      $('.main-contents__chatmessage-list').animate({ scrollTop: $('.main-contents__chatmessage-list')[0].scrollHeight});
      $('input').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('input').prop('disabled', false);
    })
  });
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        
        $('.main-contents__chatmessage-list').append(insertHTML);
        $('.main-contents__chatmessage-list').animate({ scrollTop: $('.main-contents__chatmessage-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});