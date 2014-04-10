interactive("next-buffer-same-host",
            "Switch to the next buffer that's on the same host as the current buffer",
            function (I) { next_buffer_same_host(I.window, I.buffer); });

function next_buffer_same_host(window, current_buffer) {
    // asciiHost is used instead of host because it returns "" for
    // about:config whereas host raises an exception
    var current_host = current_buffer.current_uri.asciiHost;
    var buffer_list =  window.buffers.buffer_list;
    var buffer_length = buffer_list.length;
    var starting_index = window.buffers.selected_index;

    for(var i = 1; i < buffer_length; i++) {
        var test_buffer = buffer_list[(starting_index+i) % buffer_length];
        var test_host = make_uri(test_buffer.display_uri_string).asciiHost;
        if (test_host == current_host) {
            return switch_to_buffer(window, test_buffer);
        }
    }
    window.minibuffer.message("No other windows with this host");
}

define_key(default_global_keymap, "C-x n", "next-buffer-same-host");
