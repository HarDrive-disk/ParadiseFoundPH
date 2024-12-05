
            function initMap() {
                // Saud Beach, Pagudpud, Ilocos Norte
                const saudBeach = { lat: 18.581338241862877, lng: 120.78399814011799 };
                const saudMap = new google.maps.Map(document.getElementById("map1"), {
                    zoom: 17,
                    center: saudBeach,
                });
                const saudBeachMarker = new google.maps.Marker({
                    position: saudBeach,
                    map: saudMap,
                    title: "Saud Beach, Pagudpud, Ilocos Norte",
                });
        
                // White Beach, Boracay, Aklan
                const boracayBeach = { lat: 11.9673732, lng: 121.9259181 };
                const boracayMap = new google.maps.Map(document.getElementById("map2"), {
                    zoom: 17,
                    center: boracayBeach,
                });
                const boracayMarker = new google.maps.Marker({
                    position: boracayBeach,
                    map: boracayMap,
                    title: "White Beach, Boracay, Aklan",
                });
        
                // Alegria Beach, Siargao Island, Surigao del Norte
                const alegriaBeach = { lat: 10.0553773551873, lng: 126.07119590231676 };
                const alegriaMap = new google.maps.Map(document.getElementById("map3"), {
                    zoom: 17,
                    center: alegriaBeach,
                });
                const alegriaMarker = new google.maps.Marker({
                    position: alegriaBeach,
                    map: alegriaMap,
                    title: "Alegria Beach, Santa Monica, Surigao del Norte",
                });
        
                const alegriaInfoWindow = new google.maps.InfoWindow({
                    content: "<h3>Alegria Beach</h3><p>A serene and unspoiled beach in Santa Monica, Surigao del Norte.</p>",
                });
                alegriaMarker.addListener("click", () => alegriaInfoWindow.open(alegriaMap, alegriaMarker));
        
                // New Map (map4)
                const newMapLocation = { lat: 14.599512, lng: 120.984222 }; // Default location
                const newMap = new google.maps.Map(document.getElementById("map4"), {
                    zoom: 15,
                    center: newMapLocation,
                });
                const newMarker = new google.maps.Marker({
                    position: newMapLocation,
                    map: newMap,
                    title: "New Map Location",
                });
        
                // Create a search bar inside the map
                const input = document.createElement("input");
                input.type = "text";
                input.id = "map4-search-bar";
                input.placeholder = "Search for a location...";
                input.style.cssText =
                    "position: absolute; top: 10px; left: 10px; z-index: 5; width: calc(100% - 20px); max-width: 400px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: white;";
                newMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        
                // Initialize Places Autocomplete
                const autocomplete = new google.maps.places.Autocomplete(input);
                autocomplete.bindTo("bounds", newMap);
        
                // Directions service and renderer
                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer();
                directionsRenderer.setMap(newMap);
        
                // Handle search bar input
                autocomplete.addListener("place_changed", function () {
                    const place = autocomplete.getPlace();
                    if (!place.geometry || !place.geometry.location) {
                        alert("Please select a valid location.");
                        return;
                    }
        
                    // Center map and update marker for the selected location
                    newMap.setCenter(place.geometry.location);
                    newMap.setZoom(15);
        
                    newMarker.setPosition(place.geometry.location);
                    newMarker.setTitle(place.name || "Selected Location");
        
                    // Calculate route to the selected location from the user's current position
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            function (position) {
                                const userLocation = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude,
                                };
        
                                directionsService.route(
                                    {
                                        origin: userLocation,
                                        destination: place.geometry.location,
                                        travelMode: google.maps.TravelMode.DRIVING,
                                    },
                                    function (response, status) {
                                        if (status === google.maps.DirectionsStatus.OK) {
                                            directionsRenderer.setDirections(response);
                                        } else {
                                            alert("Directions request failed due to " + status);
                                        }
                                    }
                                );
                            },
                            function () {
                                alert("Error: The Geolocation service failed.");
                            }
                        );
                    } else {
                        alert("Error: Your browser does not support geolocation.");
                    }
                });
        
                // Existing Routes Calculation (for map 1, map 2, map 3)
                function calculateRoute(map, destination) {
                    const directionsService = new google.maps.DirectionsService();
                    const directionsRenderer = new google.maps.DirectionsRenderer();
                    directionsRenderer.setMap(map);
        
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            function (position) {
                                const userLocation = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude,
                                };
        
                                directionsService.route(
                                    {
                                        origin: userLocation,
                                        destination: destination,
                                        travelMode: google.maps.TravelMode.DRIVING,
                                    },
                                    (response, status) => {
                                        if (status === google.maps.DirectionsStatus.OK) {
                                            directionsRenderer.setDirections(response);
                                        } else {
                                            if (destination === alegriaBeach) {
                                                alert(
                                                    "Driving routes to Alegria Beach are unavailable. This location may only be accessible by alternative transport methods."
                                                );
                                                map.setCenter(alegriaBeach);
                                            } else {
                                                alert("Directions request failed due to " + status);
                                            }
                                        }
                                    }
                                );
                            },
                            function () {
                                alert("Error: The Geolocation service failed.");
                            }
                        );
                    } else {
                        alert("Error: Your browser does not support geolocation.");
                    }
                }
        
            }