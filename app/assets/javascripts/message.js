$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = 
        `<div class="message">
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
            <img src=${message.image} >
          </div>
        </div>`   
      return html;
    } else {
      var html = 
        `<div class="message">
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
          </div>
        </div>`
      return html;
    };
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
    })
  });
});