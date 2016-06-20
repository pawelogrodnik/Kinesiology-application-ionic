<?php
/**
 * testimonial Section
 */
$testimonial_section_title = get_theme_mod('gaga-lite-testimonial_section_title');
$testimonial_category = get_theme_mod('gaga-lite-testimonial_cat');
$testimonial_args = array('post_type' => 'post', 'cat' => $testimonial_category, 'order' => 'DESC');
$testimonial_query = new WP_Query($testimonial_args);

if ($testimonial_query->have_posts() && $testimonial_category) :
    ?>
    <div class="testimonial_section">
        <div class="ak-container">
            <div class="testimonial_view">
            <div class="testimonial-title">   
                <h2 class="wow fadeInDown"><?php echo wp_kses_post($testimonial_section_title); ?></h2>
            </div>
            <div class="testimonial-posts">
                <div class="testimonial-post-wrap wow fadeInUp">
                    <ul class="bxslider_testimonial">
                        <?php
                        while ($testimonial_query->have_posts()) : $testimonial_query->the_post();

                            $img = wp_get_attachment_image_src(get_post_thumbnail_id(), 'thumbnail');
                            $img_src = $img[0];
                            $id = get_the_ID();
                            ?>
                            <li>
                                <div class="slider_capation clearfix">    <div class="image_title">
                                        <div class="image_title_sub clearfix">
                                        <?php if($img_src): ?>
                                            <div class="test_image">
                                                <img src="<?php echo esc_url($img_src); ?>" />
                                            </div>
                                        <?php endif; ?>
                                        <div class="slider_title"><?php the_title(); ?></div>
                                        </div>
                                    </div>                                
                                    <div class="slider_content"> <?php the_content(); ?> </div>
                                    <div class="clearfix"></div>
                                </div>
                            </li>
                        <?php 
                        endwhile; 
                        ?>
                    </ul>   

                </div>

            </div>
            </div>
        </div>
    </div>
<?php 
endif; 
wp_reset_postdata();
?>