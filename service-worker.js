self.addEventListener("install", function(event) {
    self.skipWaiting();
});


self.addEventListener("activate", function(event) {
    event.waitUntil(
        self.clients.claim()
    );
});


self.addEventListener("notificationclick", function(event) {

    event.notification.close();

    event.waitUntil(
        self.clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then(function(clientes) {

            for (const cliente of clientes) {

                if ("focus" in cliente) {
                    return cliente.focus();
                }

            }

            if (self.clients.openWindow) {
                return self.clients.openWindow("./");
            }

        })
    );

});
