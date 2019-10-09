function watchForm() {
    $('#search').on('submit', function (event) {
        event.preventDefault();
        let srch = document.getElementById("searchbar");
        let srchv = srch.value;
        var count = 0;

        $('#searchbar').val('');
        $('#ytvids').empty();

        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search',
            data: { part: "snippet", key: "AIzaSyA6K2KPjp5fs0kdJEN9MrO5hxkiJMKZA_s", q: srchv, maxResults: 50 },
            method: "GET",
            dataType: "json",
            success: function (responseJSON) {
                console.log(responseJSON)
                for (let i = 0; i < 10; i++) {
                    $('#ytvids').append(`<li>
                                            <a class="img" href="https://youtube.com/watch?v=${responseJSON.items[i].id.videoId}" target="_blank">
                                            <div> ${responseJSON.items[i].snippet.title} </div>
                                            </a>
                                            <a class="img" href="https://youtube.com/watch?v=${responseJSON.items[i].id.videoId}" target="_blank">
                                            <img src="${responseJSON.items[i].snippet.thumbnails.default.url}" />
                                            </a>
                                        </li>`
                    );
                }
                $('#ytvids').append(`<div>
                                        <input type="submit" value="Previous page" id="backward" />
                                        <input type="submit" value="Next page" id="forward" />
                                    </div>`
                );
            },
            error: function (err) {
                $('#ytvids').html(`<li>
                                        Something went wrong. Try again later
                                       </li>`);
            }
        });
        $('#ytvids').on("click", "#forward", function (event) {
            event.preventDefault();
            console.log("forward")
            $('#ytvids').empty();
            count = count + 10;
            if (count < 41) {
                $.ajax({
                    url: 'https://www.googleapis.com/youtube/v3/search',
                    data: { part: "snippet", key: "AIzaSyA6K2KPjp5fs0kdJEN9MrO5hxkiJMKZA_s", q: srchv, maxResults: 50 },
                    method: "GET",
                    dataType: "json",
                    success: function (responseJSON) {
                        console.log(responseJSON)
                        for (let i = count; i < (count + 10); i++) {
                            $('#ytvids').append(`<li>
                                            <a class="img" href="https://youtube.com/watch?v=${responseJSON.items[i].id.videoId}" target="_blank">
                                            <div> ${responseJSON.items[i].snippet.title} </div>
                                            </a>
                                            <a class="img" href="https://youtube.com/watch?v=${responseJSON.items[i].id.videoId}" target="_blank">
                                            <img src="${responseJSON.items[i].snippet.thumbnails.default.url}" />
                                            </a>
                                        </li>`
                            );
                        }
                        $('#ytvids').append(`<div>
                                        <input type="submit" value="Previous page" id="backward" />
                                        <input type="submit" value="Next page" id="forward" />
                                    </div>`
                        );
                    },
                    error: function (err) {
                        $('#ytvids').html(`<li>
                                        Unexpected error.
                                       </li>`);
                    },
                });
            } else {
                $('#ytvids').html(`<li>
                                        You have reached the final page and can't go to next page.
                                       </li>`);
            }
        });
        $('#ytvids').on("click", "#backward", function (event) {
            event.preventDefault();
            console.log("backward")
            $('#ytvids').empty();
            count = count - 10;
            console.log(count)
            if (count > -1) {

                $.ajax({
                    url: 'https://www.googleapis.com/youtube/v3/search',
                    data: { part: "snippet", key: "AIzaSyA6K2KPjp5fs0kdJEN9MrO5hxkiJMKZA_s", q: srchv, maxResults: 50 },
                    method: "GET",
                    dataType: "json",
                    success: function (responseJSON) {
                        console.log(responseJSON)
                        for (let i = count; i < (count + 10); i++) {
                            $('#ytvids').append(`<li>
                                            <a class="img" href="https://youtube.com/watch?v=${responseJSON.items[i].id.videoId}" target="_blank">
                                            <div> ${responseJSON.items[i].snippet.title} </div>
                                            </a>
                                            <a class="img" href="https://youtube.com/watch?v=${responseJSON.items[i].id.videoId}" target="_blank">
                                            <img src="${responseJSON.items[i].snippet.thumbnails.default.url}" />
                                            </a>
                                        </li>`
                            );
                        }
                        $('#ytvids').append(`<div>
                                        <input type="submit" value="Previous page" id="backward" />
                                        <input type="submit" value="Next page" id="forward" />
                                    </div>`
                        );
                    },
                    error: function (err) {
                        $('#ytvids').html(`<li>
                                        Unexpected error.
                                       </li>`);
                    },
                });
            } else {
                $('#ytvids').html(`<li>
                                        You are on the first page and can't go to the previous page.
                                       </li>`);
            }
        });
    });
}

watchForm();