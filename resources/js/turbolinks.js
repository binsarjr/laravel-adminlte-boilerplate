var Turbolinks = require("turbolinks")
Turbolinks.location = {
    anchor: ''
}

Turbolinks.reload = (function() {
    var scrollPosition;
    var focusId;

    function reload() {
        Turbolinks.visit(window.location.toString(), { action: 'replace' })
    }

    document.addEventListener('turbolinks:before-render', function() {
        scrollPosition = [window.scrollX, window.scrollY];
        focusId = document.activeElement.id;
    });
    document.addEventListener('turbolinks:load', function() {
        if (scrollPosition) {
            window.scrollTo.apply(window, scrollPosition);
            scrollPosition = null
        }
        if (focusId) {
            document.getElementById(focusId).focus();
            focusId = null;
        }
    });
    return reload;
})();


// check if the browser supports turbolinks
if (Turbolinks.supported) {
    Turbolinks.start()


    // Animasi ketika berpindah halaman
    // document.addEventListener('turbolinks:click', function(event) {
    //     document.getElementsByClassName('lds-spinner')[0].classList.add('show')

    // })
    // document.addEventListener('turbolinks:render', function(event) {
    //     if (typeof event.data.newBody !== 'undefined') {
    //         document.getElementsByClassName('lds-spinner')[0].classList.add('show')
    //     }
    // })
    // document.addEventListener('turbolinks:load', function(event) {
    //     if (typeof event.data.timing.visitStart !== 'undefined') {
    //         document.getElementsByClassName('lds-spinner')[0].classList.remove('show')
    //     }
    // })

    // fixed Back key functionality broken when updating hash dynamically with replaceState
    // window.addEventListener("popstate", function(event) {
    //     this.turbolinks_location = Turbolinks.Location.wrap(window.location);


    //     if (
    //         Turbolinks.controller.location.requestURL ===
    //         this.turbolinks_location.requestURL
    //     ) {
    //         return;
    //     }
    //     if (event.state != null ? event.state.turbolinks : undefined) {
    //         return;
    //     }
    //     if (
    //         (this.window_turbolinks =
    //             window.history.state != null ?
    //             window.history.state.turbolinks :
    //             undefined)
    //     ) {
    //         return Turbolinks.controller.historyPoppedToLocationWithRestorationIdentifier(
    //             this.turbolinks_location,
    //             this.window_turbolinks.restorationIdentifier
    //         );
    //     } else {
    //         return Turbolinks.controller.historyPoppedToLocationWithRestorationIdentifier(
    //             this.turbolinks_location,
    //             Turbolinks.uuid()
    //         );
    //     }
    // });

    // Fixed same page anchor link without reloading the page
    document.addEventListener('turbolinks:click', function(event) {
        var anchorElement = event.target
        var isSamePageAnchor = (
            anchorElement.hash &&
            anchorElement.origin === window.location.origin &&
            anchorElement.pathname === window.location.pathname
        )

        if (isSamePageAnchor) {
            event.preventDefault()
            let identifier = new URL(event.data.url).hash.substring(1)
            document.getElementById(identifier).scrollIntoView()
        }
    })

    // Added page anchor when moving pages
    document.addEventListener('turbolinks:render', function(e) {
        Turbolinks.location.anchor = window.location.hash.substring(1)
    });

    // Added page anchor when moving pages
    document.addEventListener('turbolinks:load', function(e) {
        if (Turbolinks.location.anchor !== '') {
            window.location.hash = Turbolinks.location.anchor
        }
    });


}
// check if the browser doesn't support turbolinks
else {
    console.warn('Your browser doesn\'t support turbolinks')
}