$(document).ready(function () {

    // click #go-to-top
    $('#go-to-top').click(function (e) {
        // stop a
        e.preventDefault();
        // find target
        var target = $(e.currentTarget).attr('href');
        // find target offset
        var offset = $(target).offset();
        // scroll target's position
        $('html, body').animate({
            scrollTop: offset.top
        });
    });


    // // scroll fadeIn #go-to-top
    $(window).scroll(function () {
        if ($(this).scrollTop() < 100 || $(this).scrollTop() > $(document).height() - $(window).height() - 100) {
            $('#go-to-top').fadeOut(200);
        } else {
            $('#go-to-top').fadeIn(200);
        }
    });


    // get original background-color
    var originalbgc;
    var originalc;
    // mouseennter, change button background-color
    $('.btn').mouseenter(function (e) {
        //get original background-color
        originalbgc = $(this).css('background-color');
        originalc = $(this).css('color');
        $(this).css({
            'background-color': '#333',
            'color': '#fff'
        });
    })
    // mouseleaver, change to original background-color
    $('.btn').mouseleave(function (e) {
        $(this).css({
            'background-color': originalbgc
        })
        $(this).css({
            'color': originalc
        })
    })


    // mouseenter info
    $('.info').mouseenter(function (e) {
        $(this).stop().animate({
            opacity: 1
        })
    });
    $('.info').mouseleave(function (e) {
        $(this).stop().animate({
            opacity: 0
        })
    });




    // scroll img opactiy
    $(document).scroll(function (e) {
        // console.log($(this).scrollTop());
        if ($(this).scrollTop() > 900) {
            $('.fade-img').addClass('in');
        };
    });

    // tab
    // content{opacity:1} when document have loaded
    $('.tab-content.active').animate({
        opacity: 1
    });
    // addClass active to tab
    $('.tab li').click(function (e) {
        var index = $(e.currentTarget).index();
        $('.tab li').removeClass('active').eq(index).addClass('active');
        $('.tab-content').removeClass('active').removeAttr('style').eq(index).addClass('active').animate({
            'opacity': '1'
        }, 500);
    });

    // todo-list
    // $('#todo-list li').after('<hr>');
    // click @+button
    // show prompt
    // get prompt result
    // clone li
    // replace clone content by new one
    // append to todo-list

    // creat
    $('#add-todo').click(function(e){
        var todoItem = prompt('add todo item');
        // var cloneTodo = $('#todo-list li').eq(0).clone();
        var cloneTodo = $('<li>')
        .append('<input type="checkbox">')
        .append('<span class="content">')
        .append('<input type="text" value="todo item">')
        .append('<button class="todo-btn" data-action="delete">&times;</button>')
        .append('<hr>');

        cloneTodo.find('.content').html(todoItem);
        cloneTodo.find('[type="text"]').val(todoItem);
        $('#todo-list').append(cloneTodo);
    });

    // update
    $('#todo-list').on('dblclick', 'li', function (e) {
        $(this).addClass('editing');
        $(this).find('[type="text"]').focus();
    });
    $('#todo-list').on('blur', '[type="text"]', function (e) {
        var content = $(this).val();
        $(e.currentTarget).siblings('.content').html(content);
        $(e.currentTarget).closest('li').removeClass('editing');
    });

    //delete
    $('#todo-list').on('click', '[data-action="delete"]', function (e) {
        var result = confirm('Are you sure you want to delete this item?');
        if (result) {
            $(e.currentTarget).closest('li').remove();
        }
    });



    // modal
    $('#openmodal').click(function (e) {
        $('.modal-container').fadeIn(200);
    });
    $('#close-modal').click(function (e) {
        $('.modal-container').fadeOut(200);
    });


    // thumbnail lightbox
    $('.practice-lightbox a').click(function (e) {

        e.preventDefault();

        var url = $(this).prop('href');
        var image = $('<img>');
        image.prop('src', url);
        console.log(image)

        $('.img-modal').html(image);
        $('.img-modal-container').fadeIn(200);
    });

    $('.img-modal-container').click(function (e) {
        $('.img-modal-container').fadeOut(200);
    });


    // practice-api-user
    // $.ajax({
    //     url: 'https://randomuser.me/api/',
    //     data: {results: 5},
    //     dataType: 'json',
    //     success: function(data){
    //         // console.log(data);
    //         var user = data.results[0];
    //         //  picture
    //         var picture = user.picture.medium;
    //         //  name
    //         var name = user.name.title+' '+user.name.first+' '+user.name.last;
    //         //  email
    //         var email = user.email;

    //         //  prepare DOM object
    //         var imageTag = $('<img class="user-img">');
    //         imageTag.prop('src',picture);

    //         var nameTag = $('<div class="name">');
    //         nameTag.html(name);

    //         var emailTag = $('<a class="email">');
    //         emailTag.html(email).prop('href','mailto:'+email);

    //         //  insert DOM object into DOM
    //         $('.practice-api-user').append(imageTag).append(nameTag).append(emailTag);
    //     }
    //   });


    // practice-api-(multiple)user
    $.ajax({
        url: 'https://randomuser.me/api/',
        data: {results: 3},
        dataType: 'json',
        success: function (data) {
            $.each(data.results, function (index, user) {
                //   console.log(user);

                //  picture
                var picture = user.picture.medium;
                //  name
                var name = user.name.title + ' ' + user.name.first + ' ' + user.name.last;
                //  email
                var email = user.email;
                //  prepare DOM object
                var imageTag = $('<img class="user-img">');
                imageTag.prop('src', picture);
                var nameTag = $('<div class="name">');
                nameTag.html(name);

                var emailTag = $('<a class="email">');
                emailTag.html(email).prop('href', 'mailto:' + email);

                //  insert DOM object into DOM

                var $item = $('<div class="col-4 no.'+index+'">')
                .append(imageTag)
                .append(nameTag)
                .append(emailTag);

               $('.practice-api-user .row').append($item)
                
            });
        }
    });
});