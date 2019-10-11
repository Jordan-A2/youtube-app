let nextPage = "",
  prevPage = "";

function watchForm() {
    $('#search').on('submit', function (event) {
        event.preventDefault();
        let srch = document.getElementById("searchbar");
        let srchv = srch.value;
        if ($("#searchbar").val() === "") {
            return;
        };

        $('#searchbar').val('');
        $('#ytvids').empty();

        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search',
            data: { part: "snippet", key: "AIzaSyA6K2KPjp5fs0kdJEN9MrO5hxkiJMKZA_s", q: srchv, maxResults: 10 },
            method: "GET",
            dataType: "json",
            success: function (responseJSON) {
                console.log(responseJSON)
                prevPage = responseJSON.prevPageToken;
                nextPage = responseJSON.nextPageToken;
                responseJSON.items.forEach(function (item) {
                    $('#ytvids').append(`<li>
                                            <a class="img" href="https://youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                            <div> ${item.snippet.title} </div>
                                            </a>
                                            <a class="img" href="https://youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                            <img src="${item.snippet.thumbnails.default.url}" />
                                            </a>
                                        </li>`
                    );
                })
                let buttonsText;
                if (!prevPage && !nextPage) {
                    buttonsText = `<div>No more pages.</div>`
                } else if (!prevPage) {
                    buttonsText = `<div>
                            <input type="submit" value="next" id="forward"/>
                        </div>`

                } else if (!nextPage) {
                    buttonsText = `<div>
                            <input type="submit" value="previous" id="backward"/>
                        </div>`

                } else {
                    `<div>
              <input type="submit" value="previous" id="backward"/>
              <input type="submit" value="next" id="forward"/>
          </div>`
                }

                $('#ytvids').append(buttonsText);
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
            $.ajax({
                url: 'https://www.googleapis.com/youtube/v3/search',
                data: { part: "snippet", key: "AIzaSyA6K2KPjp5fs0kdJEN9MrO5hxkiJMKZA_s", q: srchv, maxResults: 10, pageToken: nextPage },
                method: "GET",
                dataType: "json",
                success: function (responseJSON) {
                    console.log(responseJSON)
                    prevPage = responseJSON.prevPageToken;
                    nextPage = responseJSON.nextPageToken;
                    responseJSON.items.forEach(function (item) {
                        $('#ytvids').append(`<li>
                                            <a class="img" href="https://youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                            <div> ${item.snippet.title} </div>
                                            </a>
                                            <a class="img" href="https://youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                            <img src="${item.snippet.thumbnails.default.url}" />
                                            </a>
                                        </li>`
                        );
                    })
                    let buttonsText;

                    if (!prevPage && !nextPage) {
                        buttonsText = `<div>No more pages.</div>`
                    } else if (!prevPage) {
                        buttonsText = `<div>
                          <input type="submit" value="next" id="forward"/>
                        </div>`

                    } else if (!nextPage) {
                        buttonsText = `<div>
                            <input type="submit" value="previous" id="backward"/>
                        </div>`

                    } else {
                        buttonsText = `<div>
                            <input type="submit" value="previous" id="backward"/>
                            <input type="submit" value="next" id="forward"/>
                        </div>`
                    }
                    $('#ytvids').append(buttonsText);
                },
                error: function (err) {
                    $('#ytvids').html(`<li>
                                        Unexpected error.
                                       </li>`);
                },
            });
        });
        $('#ytvids').on("click", "#backward", function (event) {
            event.preventDefault();
            console.log("backward")
            $('#ytvids').empty();

            $.ajax({
                url: 'https://www.googleapis.com/youtube/v3/search',
                data: { part: "snippet", key: "AIzaSyA6K2KPjp5fs0kdJEN9MrO5hxkiJMKZA_s", q: srchv, maxResults: 10, pageToken: prevPage },
                method: "GET",
                dataType: "json",
                success: function (responseJSON) {
                    console.log(responseJSON)
                    prevPage = responseJSON.prevPageToken;
                    nextPage = responseJSON.nextPageToken;
                    responseJSON.items.forEach(function (item) {
                        $('#ytvids').append(`<li>
                                            <a class="img" href="https://youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                            <div> ${item.snippet.title} </div>
                                            </a>
                                            <a class="img" href="https://youtube.com/watch?v=${item.id.videoId}" target="_blank">
                                            <img src="${item.snippet.thumbnails.default.url}" />
                                            </a>
                                        </li>`
                        );
                    })
                    let buttonsText;
                    if (!prevPage && !nextPage) {
                        buttonsText = `<div>No more pages.</div>`
                    } else if (!prevPage) {
                        buttonsText = `<div>
                            <input type="submit" value="next" id="forward"/>
                        </div>`

                    } else if (!nextPage) {
                        buttonsText = `<div>
                            <input type="submit" value="previous" id="backward"/>
                        </div>`

                    } else {
                        buttonsText = `<div>
                            <input type="submit" value="previous" id="backward"/>
                            <input type="submit" value="next" id="forward"/>
                        </div>`
                    }

                    $('#ytvids').append(buttonsText);
                },

                error: function (err) {
                    $('#ytvids').html(`<li>
                                        Unexpected error.
                                       </li>`);
                },
            });
        });
    });
}

watchForm();