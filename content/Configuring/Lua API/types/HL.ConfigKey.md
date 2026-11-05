# HL.ConfigKey

#### *class* HL.ConfigKey

Alias type.

## Configuration hierarchy

The following example shows the structure accepted by [`hl.config()`](../../hl/config#hlconfig).

Values shown are the default values used by Hyprland. The comment after each
entry indicates the expected type.

```lua
{
    general = {
        gaps_in                  = 5,          -- integer | HL.CssGap
        gaps_out                 = 20,         -- integer | HL.CssGap
        border_size             = 2,          -- integer

        resize_on_border        = false,      -- boolean
        extend_border_grab_area = 15,         -- integer
        hover_icon_on_border    = true,       -- boolean

        allow_tearing           = false,      -- boolean
        layout                  = "dwindle", -- string
    },

    decoration = {
        rounding           = 10,    -- integer
        active_opacity     = 1.0,   -- number
        inactive_opacity   = 1.0,   -- number
        fullscreen_opacity = 1.0,   -- number

        dim_inactive       = false, -- boolean
        dim_strength       = 0.5,   -- number

        shadow = {
            enabled       = true,  -- boolean
            range         = 4,     -- integer
            render_power  = 3,     -- integer
            sharp         = false, -- boolean
        },

        blur = {
            enabled             = true,  -- boolean
            size                = 8,     -- integer
            passes              = 1,     -- integer
            ignore_opacity      = false, -- boolean
            new_optimizations   = true,  -- boolean
        },
    },

    animations = {
        enabled = true, -- boolean
    },

    input = {
        kb_layout     = "us", -- string
        kb_variant    = "",   -- string
        kb_model      = "",   -- string
        kb_options    = "",   -- string
        kb_rules      = "",   -- string

        follow_mouse  = 1,    -- integer
        sensitivity   = 0.0,  -- number

        repeat_rate   = 25,   -- integer
        repeat_delay  = 600,  -- integer
    },

    cursor = {
        no_hardware_cursors  = false, -- boolean
        sync_gsettings_theme = true,  -- boolean
    },

    misc = {
        force_default_wallpaper  = -1,    -- integer | boolean
        disable_hyprland_logo    = false, -- boolean
        disable_splash_rendering = false, -- boolean

        focus_on_activate        = false, -- boolean

        mouse_move_enables_dpms = false, -- boolean
        key_press_enables_dpms  = false, -- boolean

        disable_autoreload      = false, -- boolean
    },

    binds = {
        pass_mouse_when_bound    = false, -- boolean
        scroll_event_delay       = 300,   -- integer
        workspace_back_and_forth = false, -- boolean
    },

    render = {
        explicit_sync      = 1,    -- integer
        explicit_sync_kms  = 1,    -- integer
        direct_scanout     = true, -- boolean
    },

    xwayland = {
        force_zero_scaling     = false, -- boolean
        use_nearest_neighbor   = false, -- boolean
        create_abstract_socket = true,  -- boolean
    },

    opengl = {
        nvidia_anti_flicker = false, -- boolean
    },

    ecosystem = {
        no_update_news  = false, -- boolean
        no_donation_nag = false, -- boolean
    },
}
```

## Accepted values

value
: One of the following values:
  <br/>
  * `animations.enabled`
  * `animations.workspace_wraparound`
  * `binds.allow_pin_fullscreen`
  * `binds.allow_workspace_cycles`
  * `binds.disable_keybind_grabbing`
  * `binds.drag_threshold`
  * `binds.focus_preferred_method`
  * `binds.hide_special_on_workspace_change`
  * `binds.ignore_group_lock`
  * `binds.movefocus_cycles_fullscreen`
  * `binds.movefocus_cycles_groupfirst`
  * `binds.pass_mouse_when_bound`
  * `binds.scroll_event_delay`
  * `binds.window_direction_monitor_fallback`
  * `binds.workspace_back_and_forth`
  * `binds.workspace_center_on`
  * `cursor.default_monitor`
  * `cursor.enable_hyprcursor`
  * `cursor.hide_on_key_press`
  * `cursor.hide_on_tablet`
  * `cursor.hide_on_touch`
  * `cursor.hotspot_padding`
  * `cursor.inactive_timeout`
  * `cursor.invisible`
  * `cursor.min_refresh_rate`
  * `cursor.no_break_fs_vrr`
  * `cursor.no_hardware_cursors`
  * `cursor.no_warps`
  * `cursor.persistent_warps`
  * `cursor.sync_gsettings_theme`
  * `cursor.use_cpu_buffer`
  * `cursor.warp_back_after_non_mouse_input`
  * `cursor.warp_on_change_workspace`
  * `cursor.warp_on_toggle_special`
  * `cursor.zoom_detached_camera`
  * `cursor.zoom_disable_aa`
  * `cursor.zoom_factor`
  * `cursor.zoom_rigid`
  * `debug.colored_stdout_logs`
  * `debug.damage_blink`
  * `debug.damage_tracking`
  * `debug.disable_logs`
  * `debug.disable_scale_checks`
  * `debug.disable_time`
  * `debug.ds_handle_same_buffer`
  * `debug.ds_handle_same_buffer_fifo`
  * `debug.enable_stdout_logs`
  * `debug.error_limit`
  * `debug.error_position`
  * `debug.fifo_pending_workaround`
  * `debug.full_cm_proto`
  * `debug.gl_debugging`
  * `debug.invalidate_fp16`
  * `debug.log_damage`
  * `debug.manual_crash`
  * `debug.overlay`
  * `debug.pass`
  * `debug.render_solitary_wo_damage`
  * `debug.suppress_errors`
  * `debug.vfr`
  * `decoration.active_opacity`
  * `decoration.blur.brightness`
  * `decoration.blur.contrast`
  * `decoration.blur.enabled`
  * `decoration.blur.ignore_opacity`
  * `decoration.blur.input_methods`
  * `decoration.blur.input_methods_ignorealpha`
  * `decoration.blur.new_optimizations`
  * `decoration.blur.noise`
  * `decoration.blur.passes`
  * `decoration.blur.popups`
  * `decoration.blur.popups_ignorealpha`
  * `decoration.blur.size`
  * `decoration.blur.special`
  * `decoration.blur.vibrancy`
  * `decoration.blur.vibrancy_darkness`
  * `decoration.blur.xray`
  * `decoration.border_part_of_window`
  * `decoration.dim_around`
  * `decoration.dim_inactive`
  * `decoration.dim_modal`
  * `decoration.dim_special`
  * `decoration.dim_strength`
  * `decoration.fullscreen_opacity`
  * `decoration.glow.color`
  * `decoration.glow.color_inactive`
  * `decoration.glow.enabled`
  * `decoration.glow.range`
  * `decoration.glow.render_power`
  * `decoration.inactive_opacity`
  * `decoration.rounding`
  * `decoration.rounding_power`
  * `decoration.screen_shader`
  * `decoration.shadow.color`
  * `decoration.shadow.color_inactive`
  * `decoration.shadow.enabled`
  * `decoration.shadow.offset`
  * `decoration.shadow.range`
  * `decoration.shadow.render_power`
  * `decoration.shadow.scale`
  * `decoration.shadow.sharp`
  * `dwindle.default_split_ratio`
  * `dwindle.force_split`
  * `dwindle.permanent_direction_override`
  * `dwindle.precise_mouse_move`
  * `dwindle.preserve_split`
  * `dwindle.smart_resizing`
  * `dwindle.smart_split`
  * `dwindle.special_scale_factor`
  * `dwindle.split_bias`
  * `dwindle.split_width_multiplier`
  * `dwindle.use_active_for_splits`
  * `ecosystem.enforce_permissions`
  * `ecosystem.no_donation_nag`
  * `ecosystem.no_update_news`
  * `experimental.wp_cm_1_2`
  * `general.allow_tearing`
  * `general.border_size`
  * `general.col.active_border`
  * `general.col.inactive_border`
  * `general.col.nogroup_border`
  * `general.col.nogroup_border_active`
  * `general.extend_border_grab_area`
  * `general.float_gaps`
  * `general.gaps_in`
  * `general.gaps_out`
  * `general.gaps_workspaces`
  * `general.hover_icon_on_border`
  * `general.layout`
  * `general.locale`
  * `general.modal_parent_blocking`
  * `general.no_focus_fallback`
  * `general.resize_corner`
  * `general.resize_on_border`
  * `general.snap.border_overlap`
  * `general.snap.enabled`
  * `general.snap.monitor_gap`
  * `general.snap.respect_gaps`
  * `general.snap.window_gap`
  * `gestures.close_max_timeout`
  * `gestures.scrolling.move_snap_cursor`
  * `gestures.scrolling.move_snap_to_grid`
  * `gestures.workspace_swipe_cancel_ratio`
  * `gestures.workspace_swipe_create_new`
  * `gestures.workspace_swipe_direction_lock`
  * `gestures.workspace_swipe_direction_lock_threshold`
  * `gestures.workspace_swipe_distance`
  * `gestures.workspace_swipe_forever`
  * `gestures.workspace_swipe_invert`
  * `gestures.workspace_swipe_min_speed_to_force`
  * `gestures.workspace_swipe_touch`
  * `gestures.workspace_swipe_touch_invert`
  * `gestures.workspace_swipe_use_r`
  * `group.auto_group`
  * `group.col.border_active`
  * `group.col.border_inactive`
  * `group.col.border_locked_active`
  * `group.col.border_locked_inactive`
  * `group.drag_into_group`
  * `group.focus_removed_window`
  * `group.group_on_movetoworkspace`
  * `group.groupbar.blur`
  * `group.groupbar.col.active`
  * `group.groupbar.col.inactive`
  * `group.groupbar.col.locked_active`
  * `group.groupbar.col.locked_inactive`
  * `group.groupbar.enabled`
  * `group.groupbar.font_family`
  * `group.groupbar.font_size`
  * `group.groupbar.font_weight_active`
  * `group.groupbar.font_weight_inactive`
  * `group.groupbar.gaps_in`
  * `group.groupbar.gaps_out`
  * `group.groupbar.gradient_round_only_edges`
  * `group.groupbar.gradient_rounding`
  * `group.groupbar.gradient_rounding_power`
  * `group.groupbar.gradients`
  * `group.groupbar.height`
  * `group.groupbar.indicator_gap`
  * `group.groupbar.indicator_height`
  * `group.groupbar.keep_upper_gap`
  * `group.groupbar.middle_click_close`
  * `group.groupbar.priority`
  * `group.groupbar.render_titles`
  * `group.groupbar.round_only_edges`
  * `group.groupbar.rounding`
  * `group.groupbar.rounding_power`
  * `group.groupbar.scrolling`
  * `group.groupbar.stacked`
  * `group.groupbar.text_color`
  * `group.groupbar.text_color_inactive`
  * `group.groupbar.text_color_locked_active`
  * `group.groupbar.text_color_locked_inactive`
  * `group.groupbar.text_offset`
  * `group.groupbar.text_padding`
  * `group.insert_after_current`
  * `group.merge_floated_into_tiled_on_groupbar`
  * `group.merge_groups_on_drag`
  * `group.merge_groups_on_groupbar`
  * `input.accel_profile`
  * `input.emulate_discrete_scroll`
  * `input.float_switch_override_focus`
  * `input.focus_on_close`
  * `input.follow_mouse`
  * `input.follow_mouse_shrink`
  * `input.follow_mouse_threshold`
  * `input.force_no_accel`
  * `input.kb_file`
  * `input.kb_layout`
  * `input.kb_model`
  * `input.kb_options`
  * `input.kb_rules`
  * `input.kb_variant`
  * `input.left_handed`
  * `input.mouse_refocus`
  * `input.natural_scroll`
  * `input.numlock_by_default`
  * `input.off_window_axis_events`
  * `input.repeat_delay`
  * `input.repeat_rate`
  * `input.resolve_binds_by_sym`
  * `input.rotation`
  * `input.scroll_button`
  * `input.scroll_button_lock`
  * `input.scroll_factor`
  * `input.scroll_method`
  * `input.scroll_points`
  * `input.sensitivity`
  * `input.special_fallthrough`
  * `input.tablet.absolute_region_position`
  * `input.tablet.active_area_position`
  * `input.tablet.active_area_size`
  * `input.tablet.left_handed`
  * `input.tablet.output`
  * `input.tablet.region_position`
  * `input.tablet.region_size`
  * `input.tablet.relative_input`
  * `input.tablet.transform`
  * `input.touchdevice.enabled`
  * `input.touchdevice.output`
  * `input.touchdevice.transform`
  * `input.touchpad.clickfinger_behavior`
  * `input.touchpad.disable_while_typing`
  * `input.touchpad.drag_3fg`
  * `input.touchpad.drag_lock`
  * `input.touchpad.flip_x`
  * `input.touchpad.flip_y`
  * `input.touchpad.middle_button_emulation`
  * `input.touchpad.natural_scroll`
  * `input.touchpad.scroll_factor`
  * `input.touchpad.tap_and_drag`
  * `input.touchpad.tap_button_map`
  * `input.touchpad.tap_to_click`
  * `input.virtualkeyboard.release_pressed_on_close`
  * `input.virtualkeyboard.share_states`
  * `layout.single_window_aspect_ratio`
  * `layout.single_window_aspect_ratio_tolerance`
  * `master.allow_small_split`
  * `master.always_keep_position`
  * `master.center_ignores_reserved`
  * `master.center_master_fallback`
  * `master.drop_at_cursor`
  * `master.mfact`
  * `master.new_on_active`
  * `master.new_on_top`
  * `master.new_status`
  * `master.orientation`
  * `master.slave_count_for_center_master`
  * `master.smart_resizing`
  * `master.special_scale_factor`
  * `misc.allow_session_lock_restore`
  * `misc.always_follow_on_dnd`
  * `misc.animate_manual_resizes`
  * `misc.animate_mouse_windowdragging`
  * `misc.anr_missed_pings`
  * `misc.background_color`
  * `misc.close_special_on_empty`
  * `misc.col.splash`
  * `misc.disable_autoreload`
  * `misc.disable_hyprland_guiutils_check`
  * `misc.disable_hyprland_logo`
  * `misc.disable_scale_notification`
  * `misc.disable_splash_rendering`
  * `misc.disable_watchdog_warning`
  * `misc.disable_xdg_env_checks`
  * `misc.enable_anr_dialog`
  * `misc.enable_swallow`
  * `misc.exit_window_retains_fullscreen`
  * `misc.focus_on_activate`
  * `misc.font_family`
  * `misc.force_default_wallpaper`
  * `misc.initial_workspace_tracking`
  * `misc.key_press_enables_dpms`
  * `misc.layers_hog_keyboard_focus`
  * `misc.lockdead_screen_delay`
  * `misc.middle_click_paste`
  * `misc.mouse_move_enables_dpms`
  * `misc.mouse_move_focuses_monitor`
  * `misc.name_vk_after_proc`
  * `misc.on_focus_under_fullscreen`
  * `misc.render_unfocused_fps`
  * `misc.screencopy_force_8b`
  * `misc.session_lock_xray`
  * `misc.size_limits_tiled`
  * `misc.splash_font_family`
  * `misc.swallow_exception_regex`
  * `misc.swallow_regex`
  * `misc.vrr`
  * `opengl.nvidia_anti_flicker`
  * `quirks.prefer_hdr`
  * `quirks.skip_non_kms_dmabuf_formats`
  * `render.cm_auto_hdr`
  * `render.cm_enabled`
  * `render.cm_sdr_eotf`
  * `render.commit_timing_enabled`
  * `render.ctm_animation`
  * `render.direct_scanout`
  * `render.expand_undersized_textures`
  * `render.fp16_sdr_tf`
  * `render.icc_vcgt_enabled`
  * `render.keep_unmodified_copy`
  * `render.new_render_scheduling`
  * `render.non_shader_cm`
  * `render.non_shader_cm_interop`
  * `render.send_content_type`
  * `render.use_fp16`
  * `render.use_shader_blur_blend`
  * `render.xp_mode`
  * `scrolling.column_width`
  * `scrolling.direction`
  * `scrolling.explicit_column_widths`
  * `scrolling.focus_fit_method`
  * `scrolling.follow_focus`
  * `scrolling.follow_min_visible`
  * `scrolling.fullscreen_on_one_column`
  * `scrolling.wrap_focus`
  * `scrolling.wrap_swapcol`
  * `xwayland.create_abstract_socket`
  * `xwayland.enabled`
  * `xwayland.force_zero_scaling`
  * `xwayland.use_nearest_neighbor`

## Used by

<!-- TODO: Add references to functions and fields that use this alias. -->
