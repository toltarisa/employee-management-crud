$(document).ready(function(){
    $('.delete-emp').on('click',function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url:'/remove/'+id,
            success:function(res){
                window.location.href='/';
            },
            error:function(err){
                console.log(err);
            }

        });
    });
});