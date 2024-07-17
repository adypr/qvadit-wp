<aside id="custom-content" class="widget-area">
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
            if (window.innerWidth > 850) {
                customContent.style.display = 'block';
                sidebarContent.style.display = 'none';
            } else {
                customContent.style.display = 'none';
                sidebarContent.style.display = 'block';
            }
        }

        window.addEventListener('load', toggleSidebarContent);
        window.addEventListener('resize', toggleSidebarContent);
    })();
</script>
