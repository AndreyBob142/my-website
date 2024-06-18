document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const parentItem = this.parentElement;

        if (parentItem.classList.contains('active')) {
            parentItem.classList.remove('active');
        } else {
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            parentItem.classList.add('active');
        }
    });
});

document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-item')) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
    }
});
});

