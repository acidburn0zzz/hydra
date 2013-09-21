$(document).ready(function() {

    /*** Tree toggles in logfiles. ***/

    /* Set the appearance of the toggle depending on whether the
       corresponding subtree is initially shown or hidden. */
    $(".tree-toggle").map(function() {
        if ($(this).siblings("ul:hidden").length == 0) {
            $(this).text("-");
        } else {
            $(this).text("+");
        }
    });

    /* When a toggle is clicked, show or hide the subtree. */
    $(".tree-toggle").click(function() {
        if ($(this).siblings("ul:hidden").length != 0) {
            $(this).siblings("ul").show();
            $(this).text("-");
        } else {
            $(this).siblings("ul").hide();
            $(this).text("+");
        }
    });

    /* Implementation of the expand all link. */
    $(".tree-expand-all").click(function() {
        $(".tree-toggle", $(this).parent().siblings(".tree")).map(function() {
            $(this).siblings("ul").show();
            $(this).text("-");
        });
    });

    /* Implementation of the collapse all link. */
    $(".tree-collapse-all").click(function() {
        $(".tree-toggle", $(this).parent().siblings(".tree")).map(function() {
            $(this).siblings("ul").hide();
            $(this).text("+");
        });
    });

    $("table.clickable-rows").click(function(event) {
        if ($(event.target).closest("a").length) return;
        link = $(event.target).parents("tr").find("a.row-link");
        if (link.length == 1)
          window.location = link.attr("href");
    });

    bootbox.animate(false);

    $(".hydra-popover").popover({});

    $(function() {
        if (window.location.hash) {
            $(".nav-tabs a[href='" + window.location.hash + "']").tab('show');
        }

        /* If no tab is active, show the first one. */
        $(".nav-tabs").each(function() {
            if ($("li.active", this).length > 0) return;
            $("a", $("li", this).first()).tab('show');
        });

        /* Ensure that pressing the back button on another page
           navigates back to the previously selected tab on this
           page. */
        $('.nav-tabs').bind('show', function(e) {
            var pattern = /#.+/gi;
            var id = e.target.toString().match(pattern)[0];
            history.replaceState(null, "", id);
        });
    })
});

var tabsLoaded = {};

var makeLazyTab = function(tabName, uri) {
    $('.nav-tabs').bind('show', function(e) {
        var pattern = /#.+/gi;
        var id = e.target.toString().match(pattern)[0];
        if (id == '#' + tabName && !tabsLoaded[id]) {
          tabsLoaded[id] = 1;
          $('#' + tabName).load(uri, function(response, status, xhr) {
            if (status == "error") {
              $('#' + tabName).html("<div class='alert alert-error'>Error loading tab: " + xhr.status + " " + xhr.statusText + "</div>");
            }
          });
        }
    });
}
