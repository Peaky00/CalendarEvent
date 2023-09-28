function convertMilitaryToRegularTime(militaryTime) {
    // Split the military time into hours and minutes
    const [hours, minutes] = militaryTime.split(':').map(Number);

    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const regularHours = hours % 12 === 0 ? 12 : hours % 12;

    // Format the regular time as "hh:mm AM/PM"
    const regularTime = `${regularHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;

    return regularTime;
}


document.addEventListener('DOMContentLoaded', function () {
    // Function to display current date at the top
    function displayCurrentDate() {
        const currentDayElement = document.getElementById('currentDay');
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDayElement.textContent = currentDate.toLocaleDateString('en-US', options);
    }

    // Function to create time blocks for 9am to 5pm
    function createTimeBlocks() {
        const timeBlocksElement = document.querySelector('.time-blocks');
        const currentTime = new Date().getHours();
    
        for (let i = 9; i <= 17; i++) {
            const timeBlock = document.createElement('div');
            timeBlock.classList.add('time-block');
    
            // Convert military time to regular time here
            const militaryTime = `${i < 10 ? '0' : ''}${i}:00`;
            const regularTime = convertMilitaryToRegularTime(militaryTime);
    
            const hour = document.createElement('div');
            hour.classList.add('hour');
            hour.textContent = regularTime;
            

            const eventInput = document.createElement('textarea');
            eventInput.classList.add('event-input');
            if (i < currentTime) {
                eventInput.classList.add('past');
            } else if (i === currentTime) {
                eventInput.classList.add('present');
            } else {
                eventInput.classList.add('future');
            }

            

            const saveButton = document.createElement('button');
            saveButton.classList.add('save-button');
            saveButton.textContent = 'Save';

            timeBlock.appendChild(hour);
            timeBlock.appendChild(eventInput);
            timeBlock.appendChild(saveButton);
            timeBlocksElement.appendChild(timeBlock);
        
        }
    }

    // Function to save events to local storage
    function saveEvent(hour, eventText) {
        localStorage.setItem(hour, eventText);
    }

    // Function to load events from local storage
    function loadEvents() {
        const timeBlocks = document.querySelectorAll('.time-block');
        timeBlocks.forEach(function (timeBlock) {
            const hour = timeBlock.querySelector('.hour').textContent.split(':')[0];
            const eventInput = timeBlock.querySelector('.event-input');
            eventInput.value = localStorage.getItem(hour) || '';
        });
    }

    // Event listener for save buttons
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('save-button')) {
            const timeBlock = event.target.parentElement;
            const hour = timeBlock.querySelector('.hour').textContent.split(':')[0];
            const eventInput = timeBlock.querySelector('.event-input').value;
            saveEvent(hour, eventInput);
        }
    });

    // Initialize the planner
    displayCurrentDate();
    createTimeBlocks();
    loadEvents();
});