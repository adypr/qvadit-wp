export default () => {
  document.addEventListener('DOMContentLoaded', function() {
    var dropdown = document.querySelector('.dropdown');
    var toggle = document.querySelector('.dropdown-toggle');

    if (dropdown && toggle) {
        toggle.addEventListener('click', function() {
            dropdown.classList.toggle('open');
            var expanded = dropdown.classList.contains('open');
            toggle.setAttribute('aria-expanded', expanded);
        });

        document.addEventListener('click', function(event) {
            if (!dropdown.contains(event.target) && dropdown.classList.contains('open')) {
                dropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', false);
            }
        });
    }
});


}