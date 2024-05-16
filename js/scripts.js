document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burgermenu');
    const sideMenu = document.querySelector('.navsidemenu');
    const closeButton = document.querySelector('.closebutton2');

    const apodLink = document.querySelector('.apodLink');
    const roverImagesLink = document.querySelector('.roverImagesLink');
    const issLocatorLink = document.querySelector('.issLocatorLink');
    const aboutLink = document.querySelector('.aboutLink');
    const homeLink = document.querySelector('.homeLink');
    const aboutNavLink = document.querySelector('.aboutnavlink');
    const aboutPage = document.querySelector('.aboutpage');
    const aboutCloseButton = document.querySelector('.aboutpage .closebutton');

    const headings = document.querySelectorAll('.heading-13');

    headings.forEach(heading => {
        heading.addEventListener('mouseenter', function() {
            heading.textContent = '> ' + heading.textContent;
        });

        heading.addEventListener('mouseleave', function() {
            heading.textContent = heading.textContent.replace('> ', '');
        });
    });

    function addHoverEffect(element) {
        element.addEventListener('mouseenter', function() {
            element.style.color = '#FF4500'; // Change to your desired hover color
            element.style.transform = 'scale(1.1) rotate(5deg)';
            element.style.transition = 'color 0.3s, transform 0.3s';
        });

        element.addEventListener('mouseleave', function() {
            element.style.color = '';
            element.style.transform = '';
        });
    }

    addHoverEffect(closeButton);
    addHoverEffect(aboutCloseButton);

    // Toggle side menu
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            sideMenu.classList.toggle('open');
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', function() {
            sideMenu.classList.toggle('open');
        });
    }

    // Event listeners for navigation links
    if (apodLink) {
        apodLink.addEventListener('click', function() {
            sideMenu.classList.remove('open');
            console.log("we are in apodLink menu");
            window.location.href = 'index.html#apodHeading';
        });
    }

    if (roverImagesLink) {
        roverImagesLink.addEventListener('click', function() {
            console.log("we are in rover images menu");
            window.location.href = 'roverimages.html';
        });
    }

    if (issLocatorLink) {
        issLocatorLink.addEventListener('click', function() {
            sideMenu.classList.remove('open');
            window.location.href = 'index.html#issHeading';
        });
    }

    if (aboutLink) {
        aboutLink.addEventListener('click', function() {
            sideMenu.classList.remove('open');
            aboutPage.style.display = 'block';
        });
    }

    if (aboutCloseButton) {
        aboutCloseButton.addEventListener('click', function() {
            aboutPage.style.display = 'none';
        });
    }

    if (homeLink) {
        homeLink.addEventListener('click', function() {
            console.log("we are in homeLink menu");
            window.location.href = 'index.html';
        });
    }

    if (aboutNavLink) {
        aboutNavLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default navigation
            aboutPage.style.display = 'block';
        });
    }
});




document.addEventListener('DOMContentLoaded', function() {
    const astro = document.querySelector('.astro');
    let direction = 1;
    let position = 0;
    const speed = 0.3; // Adjust this to control the speed
    const maxPosition = 10; // Adjust this to control the distance of the bobbing
    const frameRate = 60; // Number of frames per second

    function bobbing() {
        position += direction * speed;

        if (position >= maxPosition || position <= -maxPosition) {
            direction *= -1;
        }

        astro.style.transform = `translateY(${position}px)`;

        setTimeout(() => {
            requestAnimationFrame(bobbing);
        }, 1000 / frameRate);
    }

    bobbing();
});



document.addEventListener('DOMContentLoaded', function() {
    const issImage = document.querySelector('.issimage');
    const apodImage = document.querySelector('.bgimage');
    const apodOverlay = document.querySelector('.apodoverlay');
    const overlayImage = document.querySelector('.apodoverlay .image-37');
    const overlayDescription = document.querySelector('.apodoverlay .paragraph-5');
    const closeButton = document.querySelector('.closeButton2');

    console.log('Elements:', {
        issImage,
        apodImage,
        apodOverlay,
        overlayImage,
        overlayDescription,
        closeButton
    });

    const apiKey = 'UFHJGBOLW3NL4crKFWnUo1hD4wOlpAdFeJdjCKJo'; // Replace with your actual NASA API key
    const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    // Fetch and display APOD
    fetch(apodUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('APOD Data:', data);
            
            // Verify that image URLs are correct
            if (data.url) {
                console.log('APOD URL:', data.url);
            } else {
                console.error('No URL in APOD data');
            }

            // Verify elements exist before updating
            if (apodImage) {
                console.log('Updating bgimage src:', data.url);
                apodImage.src = data.url;
                apodImage.alt = data.title;
            } else {
                console.error('bgimage element not found');
            }

            if (overlayImage) {
                console.log('Updating overlay image src:', data.url);
                overlayImage.src = data.url;
                overlayImage.alt = data.title;
            } else {
                console.error('Overlay image element not found');
            }

            // Update the overlay description
            overlayDescription.textContent = data.explanation;
        })
        .catch(error => console.error('Error fetching APOD:', error));

    // Add click event to ISS image to show the overlay
    issImage.addEventListener('click', function() {
        console.log('ISS image clicked');
        apodOverlay.style.display = 'flex';
    });

    // Add click event to close button to hide the overlay
    closeButton.addEventListener('click', function() {
        console.log('Close button clicked');
        apodOverlay.style.display = 'none';
    });
});



function updateIssLocation() {
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
        .then(response => response.json())
        .then(data => {
            const mapWidth = document.getElementById('map').offsetWidth;
            const mapHeight = document.getElementById('map').offsetHeight;

            const x = (data.longitude + 180) * (mapWidth / 360);
            const latRad = data.latitude * Math.PI / 180;
            const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
            const y = (mapHeight / 2) - (mapWidth * mercN / (2 * Math.PI));

            const iss = document.getElementById('iss');
            iss.style.left = `${x}px`;
            iss.style.top = `${y}px`;

            // Update the latitude and longitude text values
            document.querySelector('.latitude').textContent = `${data.latitude.toFixed(2)}`;
            document.querySelector('.longitude').textContent = `${data.longitude.toFixed(2)}`;

            // Handle hover events for the ISS dot
            iss.onmouseover = function() {
                document.getElementById('iss-tooltip').style.display = 'block';
            }
            iss.onmouseout = function() {
                document.getElementById('iss-tooltip').style.display = 'none';
            }

            return fetch(`https://api.wheretheiss.at/v1/coordinates/${data.latitude},${data.longitude}`);
        })
        .then(response => response.json())
        .then(locationData => {
            const tooltip = document.getElementById('iss-tooltip');
            tooltip.innerHTML = `
                <strong>Latitude:</strong> ${parseFloat(locationData.latitude).toFixed(2)}<br>
                <strong>Longitude:</strong> ${parseFloat(locationData.longitude).toFixed(2)}<br>
                <strong>Location:</strong> ${locationData.timezone_id}`;

            // Update the location text value
            document.querySelector('.location').textContent = `${locationData.timezone_id}`;
        })
        .catch(error => console.error('Error fetching ISS data:', error));
}

setInterval(updateIssLocation, 5000);



document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'UFHJGBOLW3NL4crKFWnUo1hD4wOlpAdFeJdjCKJo'; // Replace with your actual NASA API key
    const roverSelect = document.getElementById('roverSelect');
    const latestDateElement = document.querySelector('.latestdate');
    const thumbnailsContainer = document.querySelector('.div-block-17');
    const loadingOverlay = document.querySelector('.div-block-39');
    const zoomedImageContainer = document.querySelector('.zoomedimage');
    const zoomedImage = document.querySelector('.zoomedimg');
    const closeZoomedImageBtn = document.querySelector('.closebutton3');

    roverSelect.addEventListener('change', () => {
        loadLatestImages(roverSelect.value);
    });

    function loadLatestImages(rover) {
        const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${apiKey}`;

        // Show loading overlay
        loadingOverlay.style.display = 'flex';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const latestPhotos = data.latest_photos;
                if (latestPhotos.length > 0) {
                    const latestDate = latestPhotos[0].earth_date;
                    latestDateElement.textContent = latestDate;

                    // Clear previous thumbnails if any
                    thumbnailsContainer.innerHTML = '';

                    // Create thumbnails
                    latestPhotos.forEach(photo => {
                        const thumbnail = document.createElement('img');
                        thumbnail.src = photo.img_src;
                        thumbnail.alt = 'Mars Rover Image';
                        thumbnail.classList.add('thumbnail');
                        thumbnail.style.marginRight = '10px'; // Add some spacing between thumbnails
                        thumbnail.style.cursor = 'pointer';
                        thumbnailsContainer.appendChild(thumbnail);

                        // Add click event to show zoomed image
                        thumbnail.addEventListener('click', () => {
                            zoomedImage.src = photo.img_src;
                            zoomedImageContainer.style.display = 'flex';
                        });
                    });

                    // Hide loading overlay
                    loadingOverlay.style.display = 'none';
                } else {
                    latestDateElement.textContent = 'No data available';
                    loadingOverlay.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error fetching data from NASA API:', error);
                latestDateElement.textContent = 'Error loading data';
                loadingOverlay.style.display = 'none';
            });
    }

    // Load initial data for Perseverance
    loadLatestImages(roverSelect.value);

    // Add event listener to close the zoomed image
    closeZoomedImageBtn.addEventListener('click', () => {
        zoomedImageContainer.style.display = 'none';
    });
});






