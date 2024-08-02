<aside id="custom-content" class="widget-area" style="display: none;">
    <ul class="sheets" id="piano">
    </ul>
</aside>

<aside id="sidebar-content" class="widget-area" style="display: none;">
    <?php
    if (is_active_sidebar('sidebar-1')) {
        dynamic_sidebar('sidebar-1');
    } else {
        echo do_shortcode('[all_posts]');
    }
    ?>
</aside>

<script type="text/javascript">
    (function() {
        function toggleSidebarContent() {
            var sidebarContent = document.getElementById('sidebar-content');
            var customContent = document.getElementById('custom-content');
            var postsDropdown = document.getElementById('posts-dropdown');

            if (window.innerWidth <= 640) {
                if (postsDropdown) postsDropdown.style.display = 'block';
                if (sidebarContent) sidebarContent.style.display = 'none';
                if (customContent) customContent.style.display = 'none';
            } else if (window.innerWidth > 640 && window.innerWidth <= 850) {
                if (postsDropdown) postsDropdown.style.display = 'none';
                if (sidebarContent) sidebarContent.style.display = 'block';
                if (customContent) customContent.style.display = 'none';
            } else {
                if (postsDropdown) postsDropdown.style.display = 'none';
                if (sidebarContent) sidebarContent.style.display = 'none';
                if (customContent) customContent.style.display = 'block';
            }
        }

        window.addEventListener('load', toggleSidebarContent);
        window.addEventListener('resize', toggleSidebarContent);
    })();
</script>
